
import { Card, Upload, Button, Flex, Spin, Typography } from 'antd'
import ImgCrop from 'antd-img-crop'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { UserContext } from '../../context/UserContext'
import { ThemeContext } from '../../context/ThemeContext'
import { StoreContext } from '../../context/StoreContext'
import { useContext, useState } from 'react'
import AvatarProfile from '../AvatarProfile/AvatarProfile'

const { Text } = Typography

const AvatarUpdate = () => {
  const fileList = []
  const [ loading, setLoading ] = useState(false)
  const [ imageUrl, setImageUrl ] = useState(null)
  const { user, updateAvatar } = useContext(UserContext)
  const { openMessage } = useContext(ThemeContext)
  const { updateAvatarStore } = useContext(StoreContext)

  const storage = getStorage()

  const handleUpload = async (file) => {
    setLoading(true);
    try {
      const storageRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      await updateAvatar(downloadURL);
      setImageUrl(downloadURL);
      await updateAvatarStore(downloadURL);
      openMessage('success','Tu foto se actualizó correctamente');
    } catch (error) {
      openMessage('error', 'Error al subir la foto de perfil');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      openMessage('error','You can only upload image files!');
      return false;
    }
    handleUpload(file);
    return false; // Prevent default upload behavior since we handle it ourselves
  };

  // const displayAvatar = imageUrl ? <AvatarProfile src={imageUrl} /> : <AvatarProfile size={120} name={user.name} />

  return (
    <Card title='Foto de perfil'>
      <Flex justify='center' align='center' gap={16} vertical>
        {loading ? (
          <Flex justify='center' align='center' gap={16} vertical>
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 24,
                  }}
                  spin
                />
              }
            />
            <Text>Cargando tu foto...</Text>
          </Flex>
        ) : (
          imageUrl ? (
            <AvatarProfile size={120} src={imageUrl} />
          ) : (
            <AvatarProfile size={120} name={user.name} src={user.avatar} />
          )
        )}
        <ImgCrop
          modalOk='Guardar'
          modalCancel='Cancelar'
          modalTitle='Editar foto de perfil'
        >
          <Upload
            maxCount={1}
            listType="picture"
            showUploadList={false}
            beforeUpload={handleBeforeUpload}
            defaultFileList={[...fileList]}
          >
            <Button icon={<PlusOutlined />}>Cargar foto</Button>
          </Upload>
        </ImgCrop>
      </Flex>
    </Card>
  )
}

export default AvatarUpdate