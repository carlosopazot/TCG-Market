import { Flex, Typography } from 'antd'
import { useState, useEffect } from 'react'

const { Title } = Typography

const SetIcon = ({ setCode, alt, setName }) => {
  const [iconUrl, setIconUrl] = useState('')

  useEffect(() => {
    async function fetchSetInfo() {
      try {
        const response = await fetch(`https://api.scryfall.com/sets/${setCode}`)
        const data = await response.json()
        if (data && data.icon_svg_uri) {
          setIconUrl(data.icon_svg_uri)
        } else {
          console.error('No se encontró el icono SVG del set')
        }
      } catch (error) {
        console.error('Error al obtener la información del set:', error)
      }
    }

    fetchSetInfo()
  }, [setCode])

  return (
    <>
      {iconUrl && (
        <Flex gap={4} align="center">
          <img src={iconUrl} alt={alt} style={{ width: '18px' }} />
          <Title ellipsis style={{ margin: 0 }} level={5}>
            {setName}
          </Title>
        </Flex>
      )}
    </>
  )
}

export default SetIcon
