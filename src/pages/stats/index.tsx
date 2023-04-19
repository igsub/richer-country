import Image from 'next/image'
import React from 'react'
import { api } from '~/utils/api'

const index = () => {
  const { data: richerList } = api.countries.getRicherList.useQuery()
  console.log(richerList)

  return (
    <div className='flex flex-col items-center'>
    <ul className='w-full md:w-3/4'>
      {richerList?.map(country => (
        <li className='m-2 p-2 text-center rounded-lg border' key={`listItem-${country.country_name}`}>
          <div className="flex justify-start w-full">
            <Image src={country.flag} alt={country.alt} width={80} height={50}/>
            <div className="flex w-full justify-center items-center">
              <p>{country.country_name}</p>
            </div>
            <div className="flex flex-col justify-start items-center">
              <p>{country.win_percentage}%</p>
              <div className="w-28 md:w-56 lg:w-96 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div style={{ width: `${country.win_percentage}%`}} className="bg-green-600 h-2.5 rounded-full w-1/2" />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default index