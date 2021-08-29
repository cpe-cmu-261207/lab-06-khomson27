import { useEffect, useState } from "react";
import axios from 'axios'

type bpi = {
    USD: {
        code: string;
        rate: number;
        description: string;
        rate_float: number;
    };
    THB: {
        code: string;
        rate: number;
        description: string;
        rate_float: number;
    };
}

type time = {
    updated: string;
    updatedISO: string;
    updateduk: string;
}

type dt = {
    time: time;
    disclaimer: string;
    bpi: bpi;
}

const Current = () => {
    const [dt, setdt] = useState<dt | null>(null)
    const [loading, setloading] = useState<boolean>(true)
    const [error, seterror] = useState<boolean>(false)

    useEffect(() => {
        axios.get('https://api.coindesk.com/v1/bpi/currentprice/thb.json')
        .then (resp => {
            setdt(resp.data)
            setloading(false)
        })
        .catch(err => {
            setloading(false)
            seterror(true)
        })
    },[])

    const lender = () => {
        if (loading) {
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Current price</p>
                    <p className='text-2xl'>Loading ...</p>
                </div>
            )
        }else if (error) {
            return (
            <div className='text-center space-y-3'>
                <p className='text-2xl font-semibold'>Current price</p>
                <p className='text-2xl text-red-500'>There was an error. Please try again later.</p>
            </div>
            )
        }else {
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Current price</p>
                    <p className='text-2xl'>{dt?.bpi.THB.rate_float .toLocaleString()} THB</p>
                    <p> (Last updated {dt?.time.updated}) </p>
                </div>
            )
        }
    }

    return (
        <div>
            {lender()}
        </div>
    )
}

export default Current
