const Country = ({ countryInfo }) => {
  return (
    <div>
      <h1>{countryInfo.name.common}</h1>
      <div>
        Capital: {countryInfo.capital}
      </div>
      <div>
        Area: {countryInfo.area}
      </div>
      <h5>Languages: </h5>
      <ul>
        {/* {Array.from(countryInfo.languages).map(a => {a})} */}
        {Object.values(countryInfo.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={countryInfo.flags.png} /> 
    </div>
  )
}

export default Country