import { Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useState } from 'react'

const Searchbar = () => {
  const [cards, setCards] = useState([])
  const [value, setValue] = useState()
  const productosRef = collection(db, 'cards')

  const fetchData = async (searchValue) => {
    const q = query(productosRef, where('name', '>=', searchValue))
    const querySnapshot = await getDocs(q)
    const cardList = querySnapshot.docs.map((doc) => ({
      value: doc.id, // o cualquier otro campo que desees usar como valor
      label: doc.data().name, // Ajusta esto según tu estructura de datos
    }))
    setCards(cardList)
  }

  const handleSearch = (searchValue) => {
    fetchData(searchValue)
  }

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  console.log(cards)

  return (
    <Select
      style={{ width: '240px' }}
      placeholder="Busca una carta en Market"
      defaultActiveFirstOption={false}
      notFoundContent={null}
      suffixIcon={<SearchOutlined />}
      filterOption={true}
      size="large"
      showSearch
      onSearch={handleSearch}
      onChange={handleChange}
      optionLabelProp="label"
      options={(cards || []).map((d) => ({
        value: d.value, // Ajusta esto según tu estructura de datos
        label: d.label, // Ajusta esto según tu estructura de datos
      }))}
    />
  )
}

export default Searchbar
