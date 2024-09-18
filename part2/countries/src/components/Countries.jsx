import Country from "./Country"
const Countries = ({ countries, setFilter }) => {

  const parseCountries = (countries) => {
    if (countries.length > 10) return <div>Too many matches, specify another filter</div>
    if (countries.length == 0) return <div>No country found</div>
    if (countries.length == 1) return <Country countryInfo={countries[0]} />
    return (
      <ul>
        {countries.map(countryInfo => {
					return <li key={countryInfo.name.common}>
						{countryInfo.name.common}
						<button onClick={() => setFilter(countryInfo.name.common)}>Show Country</button></li>
        })}
      </ul>
    )
  }

  console.log(countries.length)
  return (
    <div>
      <h4>Filter: </h4>
      {parseCountries(countries)}
    </div>
  )
}

export default Countries