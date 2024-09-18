const Filter = ({ newFilter, setNewFilter }) => {
    const handleFilterChange = (event) => {
        console.log('filter changed')
        setNewFilter(event.target.value)
    }

    console.log('loaded')
    return (
        <div className='input_div'>
            <div>Filter Names: </div> <input value={newFilter} onChange={handleFilterChange} enterKeyHint='Enter Name Filter' />
        </div>
    )
}

export default Filter