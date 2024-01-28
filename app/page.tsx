'use client'

import { useMemo, useState } from 'react'
import PublicNavbar from '@/src/components/molecules/navbar'
import Link from 'next/link'
import { Input, Select } from 'antd'
import { IoSearchOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { useGetCountries } from '@/src/services'
import CountryCard from '@/src/components/molecules/cards'
import { useDispatch } from 'react-redux'
import { setCountries } from '@/src/store/redux/slices/configuration.store'

export default function Home() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [query, setQuery] = useState('all')

    const {
        data: countriesData,
        isLoading,
        error,
        refetch,
    } = useGetCountries(query)
    const data = useMemo(() => countriesData ?? [], [
        countriesData
    ])
    dispatch(setCountries(data as Array<any>))

    const onChange = (value: string) => {
        if (value === '') return setQuery('all')
        setQuery(`region/${value.toLowerCase()}`)
    }

    const handleInputChange = (value: string) => {
        if (value === '') return setQuery('all')
        setQuery(`name/${value.toLowerCase()}`)
    }
      
    // Filter `option.label` match the user type `input`
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <div className='w-full h-auto overflow-hidden'>
            <div className='w-full h-[12vh] max-h-[12vh] z-40 shadow-md'>
                <PublicNavbar />
            </div>
            <div className="flex w-full h-[12vh] max-h-[12vh] z-40 py-5 px-20 max-sm:px-6 justify-between items-center">
                <div className='max-sm:w-8/12 w-5/12'>
                    <Input
                        placeholder="Search for a country"
                        prefix={<IoSearchOutline className="site-form-item-icon" />}
                        onChange={(event) => handleInputChange(event.target.value)}
                    />
                </div>
                <Select
                    showSearch
                    placeholder="Filter by region"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={filterOption}
                        options={[
                        {
                            value: '',
                            label: 'All Regions',
                        },
                        {
                            value: 'africa',
                            label: 'Africa',
                        },
                        {
                            value: 'europe',
                            label: 'Europe',
                        },
                        {
                            value: 'america',
                            label: 'America',
                        },
                        {
                            value: 'asia',
                            label: 'Asia',
                        },
                        {
                            value: 'oceania',
                            label: 'Oceania',
                        },
                    ]}
                />
            </div>
            <div className='w-full h-auto flex flex-col items-center justify-center px-20 max-sm:px-6 mt-4 pb-8'>
                <div className='w-full h-auto grid grid-flow-row grid-cols-4 gap-8 max-sm:grid-cols-1 max-md:grid-cols-2'>
                    {(data as Array<any>)?.map((country, index) => <CountryCard key={index} country={country} />)}
                </div>
                {isLoading ? <div className="w-full h-40 flex items-center justify-center text-countries-black/90 font-countries-montserrat font-sm">
                    loading . . .
                </div> : null}
                {!isLoading && (data as Array<any>)?.length === 0 ? <div className="w-full h-40 flex items-center justify-center text-countries-black/90 font-countries-montserrat font-md font-semibold">
                    No Countries to show
                </div> : null}
            </div>
        </div>
    )
}
