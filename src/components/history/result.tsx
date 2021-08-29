import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route,  useLocation } from 'react-router-dom'
import axios from 'axios'


type data = {
    bpi: Record<string , number> | null;
    disclaimer: string;
    time: Record<string, string>;
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Result = () => {
    let query = useQuery();
    const s = query.get("start")
    const e = query.get("end")

    const [data, setdata] = useState<data | null>(null)
    const [loading, setloading] = useState<boolean>(true)
    const [error, seterror] = useState<boolean>(false)

    useEffect(() => {
        axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=${s}&end=${e}`)
        .then (resp => {
            setdata(resp.data)
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
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-2xl'>Loading ...</p>
                </div>
            )
        }else if (error){
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-2xl text-red-500'>There was an error. Please try again later.</p>
                </div>
            )
        }else {
            type dtype = {
                key: string;
                value: number;
            }
            const dp: dtype[] = []
            console.log(data)
    
            if(data?.bpi) {
                for (const [key, value] of Object.entries(data?.bpi)) {
                    dp.push({key,value})
                }
            }
            console.log(dp)
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-xl font-semibold'> ( From {s} To {e} )</p>
                    <ul>
                        {dp.map((elt) => <li className='text-xl' key={elt.key}>{elt.key} - {elt.value.toLocaleString()} THB</li> )}
                    </ul>
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

export default Result
