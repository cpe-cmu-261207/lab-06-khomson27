import { useHistory } from "react-router-dom";

const Select = () => {
    let history = useHistory();

    const Clickdata = () => {
        const input = document.querySelectorAll('input')
        if (input[0].value !== '' && input[1].value !== '' && input[0].value <= input[1].value) {
            history.push(`/history/result?start=${input[0].value}&end=${input[1].value}`)
        }
        else {
            alert('Please select start date and end date correctly')
        }
    }

    return (
        <div className='text-center space-y-3 space-x-3'>
            <p className='text-2xl font-semibold'>Select historical range</p>
            <span>From date</span>
            <input type='date' onChange={e => console.log(e.target.value)}></input>
            <span>To date</span>
            <input type='date' onChange={e => console.log(e.target.value)}></input>
            <br />
            <button onClick={Clickdata}>Get data</button>
        </div>
    )

}

export default Select
