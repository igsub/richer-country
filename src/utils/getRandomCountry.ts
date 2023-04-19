import type { Country } from "~/pages/types";

export const defaultOption: Country = {
  name: {
    official: "Not Found",
  },
  flags: {
    png: "/international-flag.svg",
    alt: "Country not found"
  }
}

export const getRandomCountry: (countries: Country[], notThisOne?: Country) => Country = (
  countries,
  notThisOne
) => {
  const country = countries[Math.floor(Math.random() * countries.length) + 1] || defaultOption

  if (country?.name.official !== notThisOne?.name.official) return country
  return getRandomCountry(countries, notThisOne)
}

export const getOptionsForVote: (countries: Country[]) => Country[] = (countries) => {
  const firstId = getRandomCountry(countries)
  const secondId = getRandomCountry(countries, firstId)

  return [firstId, secondId]
}