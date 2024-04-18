import { Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const CardSearch = ({
  onSearch,
  onSelect,
  searchResults,
  loading,
  selectedCard,
}) => {
  const handleSearch = (value) => {
    onSearch(value)
  }

  const handleSelectChange = (value) => {
    onSelect(value)
  }
  return (
    <Select
      allowClear
      showSearch
      placeholder="Ej: Counterspell"
      optionLabelProp="label"
      filterOption={false}
      onSearch={handleSearch}
      defaultOpen={false}
      onSelect={handleSelectChange}
      value={selectedCard}
      style={{ width: '100%' }}
      suffixIcon={<SearchOutlined />}
      notFoundContent={null}
      options={(searchResults || []).map((d) => ({
        value: d,
        label: d,
      }))}
      loading={loading}
      size="large"
    />
  )
}

export default CardSearch
