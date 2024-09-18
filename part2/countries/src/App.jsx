import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import Countries from './components/Countries'
import CountryServices from './services/countries'
import './App.css'

function App() {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    CountryServices
      .getAllCountries()
      .then(allCountries => {
        console.log(allCountries)
        if (allCountries.filter(countryInfo => countryInfo.name.common.toLowerCase() == filter.toLowerCase()).length == 1) {
          setCountries(allCountries.filter(countryInfo => countryInfo.name.common.toLowerCase() == filter.toLowerCase()))
        } else {
          setCountries(
            allCountries.filter(countryInfo => countryInfo.name.common.toLowerCase().includes(filter.toLowerCase())),
          )

        }
      })
  }, [filter])

  return (
    <>
      <div>
        <SearchBar newFilter={filter} setNewFilter={setFilter} />
        <Countries countries={countries} setFilter={setFilter} />
      </div>
    </>
  )
}

export default App
