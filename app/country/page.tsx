'use client'

import PublicNavbar from '@/src/components/molecules/navbar'
import { Button, Image, Tag } from 'antd'
import { useRouter } from 'next/navigation'
import { FaLongArrowAltLeft } from "react-icons/fa"
import { useSelector } from 'react-redux'
import { configurationSelector } from '@/src/store/redux/slices/configuration.store'
import { useEffect } from 'react'

export default function Home() {
    const router = useRouter()
    const { country, countries } = useSelector(configurationSelector)

    useEffect(() => {
        if (!country || country === null)
            router.push('/')
    }, [country, router])

    return (
        <div className='w-full h-auto overflow-hidden'>
            <div className='w-full h-[12vh] max-h-[12vh] z-40 shadow-md'>
                <PublicNavbar />
            </div>
            <div className="flex w-full h-[12vh] max-h-[12vh] z-40 py-5 px-20 justify-between items-center">
                <div className='w-4/12'>
                    <Button
                        className='flex items-center text-medium'
                        icon={<FaLongArrowAltLeft />}
                        onClick={() => router.back()}
                    >
                        Back
                    </Button>
                </div>
            </div>
            <div className='w-full h-auto flex justify-center gap-6 px-20 mt-4'>
                <div className='w-5/12 h-auto overflow-hidden'>
                    <Image
                        alt='Card background'
                        className='object-cover w-10/12 h-auto rounded-xl'
                        src={country?.flags?.png}
                    />
                </div>
                <div className='w-6/12 h-[25vh] p-3'>
                    <p
                        className='overflow-hidden text-ellipsis line-clamp-1 font-countries-montserrat font-bold text-[1.2em] mt-[1em] cursor-pointer'
                    >
                        {country?.name?.common}
                    </p>
                    <div className="w-full h-auto flex">
                        <div className="w-6/12">
                            <p className='font-countries-montserrat font-semibold text-countries-black-1 text-[0.78em] mt-[1.5em] overflow-hidden text-ellipsis line-clamp-2'>
                                Population: <span className="text-countries-black-1/60">
                                    {country?.population}
                                </span>
                            </p>
                            <p className='font-countries-montserrat font-semibold text-countries-black-1 text-[0.78em] mt-[1em] overflow-hidden text-ellipsis line-clamp-2'>
                                Region: <span className="text-countries-black-1/60">
                                    {country?.region}
                                </span>
                            </p>
                            <p className='font-countries-montserrat font-semibold text-countries-black-1 text-[0.78em] mt-[1em] overflow-hidden text-ellipsis line-clamp-2'>
                                Capital: <span className="text-countries-black-1/60">
                                    {(country?.capital ?? [])?.map(
                                        (cap: any) => <span key={cap}>{cap} {
                                            ((country?.capital ?? [])[(country?.capital ?? [])?.length - 1] !== cap) ?
                                                <span>, </span> : null
                                            }</span>)}
                                </span>
                            </p>
                        </div>
                        <div className="w-6/12">
                            <p className='font-countries-montserrat font-semibold text-countries-black-1 text-[0.78em] mt-[1.5em] overflow-hidden text-ellipsis line-clamp-2'>
                                Top Level Domain: <span className="text-countries-black-1/60">
                                    {(country?.tld ?? [])?.map(
                                        (domain: any) => <span key={domain}>{domain} {
                                            ((country?.tld ?? [])[(country?.tld ?? [])?.length - 1] !== domain) ?
                                                <span>, </span> : null
                                            }</span>)}
                                </span>
                            </p>
                            <p className='font-countries-montserrat font-semibold text-countries-black-1 text-[0.78em] mt-[1em] overflow-hidden text-ellipsis line-clamp-2'>
                                Currencies: <span className="text-countries-black-1/60">
                                    {Object.entries(country?.currencies ?? {}).map(([code, currency]) => (
                                        <span key={code}>
                                            {(currency as any)?.name} ({code}) {(currency as any)?.symbol}
                                            {Object.keys(country?.currencies ?? {}).indexOf(code) !== Object.keys(
                                                country?.currencies ?? {}).length - 1 ? ', ' : null}
                                        </span>
                                    ))}
                                </span>
                            </p>
                            <p className='font-countries-montserrat font-semibold text-countries-black-1 text-[0.78em] mt-[1em] overflow-hidden text-ellipsis line-clamp-2'>
                                Languages: <span className="text-countries-black-1/60">
                                    {Object.entries(country?.languages ?? {}).map(([code, language]) => (
                                        <span key={code}>
                                            {(language as any)} ({code})
                                            {Object.keys(country?.languages ?? {}).indexOf(code) !== Object.keys(
                                                country?.languages ?? {}).length - 1 ? ', ' : null}
                                        </span>
                                    ))}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-auto flex flex-wrap mt-6">
                        <span className="text-countries-black-1/60 gap-4">
                            {country?.borders?.map((borderCode: any, index: any) => {
                                const borderCountry = countries?.find((country: any) => country.cca3 === borderCode);
                                return (
                                    <Tag className='font-countries-montserrat font-semibold text-countries-black-1 text-[0.98em]' key={borderCode}>
                                        {borderCountry?.name?.common}
                                    </Tag>
                                );
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
