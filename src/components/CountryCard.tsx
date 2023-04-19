import type { Country } from "~/pages/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import Image from "next/image"

interface ICountryCardProps {
  country: Country
  onClick: () => void
}

const CountryCard = (props: ICountryCardProps) => {
  const { country, onClick } = props

  return (
    <Card onClick={onClick} className="w-72 lg:w-96 shadow-sm hover:shadow-xl cursor-pointer">
      <CardHeader>
        <CardTitle>
          {country?.name.official}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex h-full justify-center">
        <Image src={country.flags.png} alt={country.flags.alt} height={200} width={400} />
      </CardContent>
    </Card>
  )
}

export default CountryCard