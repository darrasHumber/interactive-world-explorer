type Country = {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [languageCode: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cioc?: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    [currencyCode: string]: {
      symbol: string;
      name: string;
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: {
    [languageCode: string]: string;
  };
  latlng: [number, number];
  landlocked: boolean;
  borders?: string[];
  area: number;
  demonyms: {
    [languageCode: string]: {
      f: string;
      m: string;
    };
  };
  cca3: string;
  translations: {
    [languageCode: string]: {
      official: string;
      common: string;
    };
  };
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  gini?: {
    [year: string]: number;
  };
  fifa?: string;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  startOfWeek: string;
  capitalInfo: {
    latlng: [number, number];
  };
  postalCode?: {
    format: string;
    regex: string;
  };
};
