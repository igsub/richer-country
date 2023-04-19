import { GetStaticProps, type NextPage } from "next";
import CountryCard from "~/components/CountryCard";
import type { Country } from "./types"
import { getOptionsForVote } from "~/utils/getRandomCountry";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
 
interface IHomeProps {
  countries: Country[]
}

const Home: NextPage<IHomeProps> = ({ countries }) => {
  const [options, setOptions] = useState<Country[]>([])
  const { mutate } = api.countries.vote.useMutation()
  useEffect(() => {
    setOptions(getOptionsForVote(countries))
  }, [])

  const handleCLick = (option: Country, idx: number) => {
    mutate({
      name: option.name.official,
      flag: option.flags.png,
      alt: option.flags.alt,
      voted: true
    })
    const otherOptionIdx = idx === 0 ? 1 : 0
    const otherCountry = options[otherOptionIdx]

    mutate({
      name: otherCountry?.name.official || "",
      flag: otherCountry?.flags.png || "" ,
      alt: otherCountry?.flags.alt || "" ,
      voted: false
    })
    
    setOptions(getOptionsForVote(countries))
  }

  return (
    <div className="flex flex-col self-center justify-center items-center min-h-screen gap-4">
      <h1 className="text-2xl">Wich country is richer?</h1>
      {options.length ?
      <div className="flex items-center flex-col lg:flex-row gap-10">
        <CountryCard country={options[0]!} onClick={() => handleCLick(options[0]!, 0)} />
        <p>VS</p>
        <CountryCard country={options[1]!} onClick={() => handleCLick(options[1]!, 1)} />
      </div>
      : null }
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags')
  const countries: Country[] = await res.json()
  
  return {
    props: {
      countries: countries,
    },
  }
}

export default Home;
