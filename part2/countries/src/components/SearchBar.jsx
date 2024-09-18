const SearchBar = ({ newFilter, setNewFilter }) => {
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }   

  return (
    <div>
      find countries
      <input value={newFilter} onChange={handleFilterChange} enterKeyHint="Enter Country Name" />
    </div>
  )
}

export default SearchBar