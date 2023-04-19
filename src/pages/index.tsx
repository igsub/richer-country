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

  useEffect(() => {
    setOptions(getOptionsForVote(countries))
  }, [])

  const handleCLick = (option: Country) => {
    
  }

  return (
    <div className="flex flex-col self-center justify-center items-center min-h-screen gap-4">
      <h1 className="text-2xl">Wich country is richer?</h1>
      <div className="flex items-center gap-10">
        {options.length ?
        <>
          <CountryCard country={options[0]!} onClick={handleCLick} />
          <p>VS</p>
          <CountryCard country={options[1]!} onClick={handleCLick} />
        </>
        : null }

      </div>
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
