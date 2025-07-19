async function getRegionCountries(region: string) {
  const res = await fetch(`https://restcountries.com/v3.1/subregion/${region}`);
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  return res.json();
}

export default getRegionCountries;
