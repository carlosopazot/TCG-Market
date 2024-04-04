import { Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios'

const Searchbar = () => {

  const { handleSearch } = useContext(SearchContext)
  const [ options, setOptions ] = useState([])
  const navigate = useNavigate()

  const handleSearchInput = async (value) => {
    try {
      const response = await axios.get(`https://api.scryfall.com/cards/search?q=${value}`);
      const { data } = response;
      const cardNames = data.data.map((card) => ({
        label: card.name,
        value: card.name,
      }));
      setOptions(cardNames);
    } catch (error) {
      console.error('Error fetching card names:', error);
      setOptions([]);
    }
  };

  const handleSelect = (value) => {
    handleSearch(value)
    navigate('/search')
  }

  return (
    <Select
      showSearch
      style={{ width: '240px' }}
      placeholder='Busca una carta'
      size='large'
      onSelect={handleSelect}
      onSearch={handleSearchInput}
      notFoundContent={null}
      allowClear
      options={options}
      suffixIcon={<SearchOutlined />}
    />
  )
}

export default Searchbar
