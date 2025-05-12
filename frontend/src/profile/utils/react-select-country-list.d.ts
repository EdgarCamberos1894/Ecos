declare module "react-select-country-list" {
  interface Country {
    label: string;
    value: string;
  }

  interface CountryList {
    getData: () => Country[];
    getLabel: (value: string) => string | undefined;
    getValue: (label: string) => string | undefined;
  }

  export default function countryList(): CountryList;
}
