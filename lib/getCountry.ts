async function getCountry(countryName: string) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  return res.json();
}

export default getCountry;
