async function getContinentCountries(continant: string) {
  const res = await fetch(`https://restcountries.com/v3.1/region/${continant}`);
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  return res.json();
}

export default getContinentCountries;
