import { setCountry } from "@/src/store/redux/slices/configuration.store"
import { Image } from "antd"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"

export default function CountryCard({ country }: { country: any }) {
    const dispatch = useDispatch()
    const router = useRouter()
    
    const handleShowCountry = (country: any) => {
        if (country === null) return
        dispatch(setCountry(country))
        router.push('/country')
    }
    return (
        <div className='relative w-full h-[50vh] max-sm:h-[auto] bg-white border-[1.2px] border-countries-gray-1/40 shadow-md rounded-xl overflow-hidden'>
            <div className='w-full h-[25vh] max-sm:h-auto max-sm:min-h-[18vh] overflow-hidden'>
                <Image
                    alt='Card background'
                    sizes="100%"
                    className='object-cover rounded-xl w-full'
                    src={country?.flags?.png}
                />
            </div>
            <div className='w-full h-[25vh] max-sm:pb-8 max-sm:h-auto p-3' onClick={() => handleShowCountry(country ?? null)}>
                <p
                    className='overflow-hidden text-ellipsis line-clamp-1 font-countries-montserrat font-bold text-[0.86em] max-sm:text-[.92em] mt-[1em] cursor-pointer'
                >
                    {country?.name?.common}
                </p>
                <p className='font-countries-montserrat font-semibold text-countries-black-1 text-[0.78em] max-sm:text-[.83em] mt-[1.2em] overflow-hidden text-ellipsis line-clamp-2'>
                    Population: <span className="text-countries-black-1/60">
                        {country?.population}
                    </span>
                </p>
                <p className='font-countries-montserrat font-semibold text-countries-black-1 text-[0.78em] max-sm:text-[.83em] mt-[0.5em] overflow-hidden text-ellipsis line-clamp-2'>
                    Region: <span className="text-countries-black-1/60">
                        {country?.region}
                    </span>
                </p>
                <p className='font-countries-montserrat font-semibold text-countries-black-1 text-[0.78em] max-sm:text-[.83em] mt-[0.5em] overflow-hidden text-ellipsis line-clamp-2'>
                    Capital: <span className="text-countries-black-1/60">
                        {(country?.capital ?? [])[0]}
                    </span>
                </p>
            </div>
        </div>
    )
}