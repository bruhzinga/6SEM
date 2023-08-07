import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
//App has 3 states: x, y, and result
//x and y are the values of the inputs
//result is the result of the calculation (x + y) which is got from a request to the server
//result is initialized to 0

function App() {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [result, setResult] = useState('')


    function handleChange(event) {

        if (isNaN(event.target.value))
        {
            alert('Please enter a number')
            return
        }

      if (event.target.name === 'x') {
        setX(event.target.value)
      }
        if (event.target.name === 'y') {
            setY(event.target.value)
        }
    }


    useEffect(() => {

        if (!x || !y)
        {
            return
        }

        fetch(`http://localhost:51201/sum?X=${x}&Y=${y}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/text',
                'Accept':'*/*',
                'Content-length': 0
            },
        })
            .then(response => response.text())
            .then(data => {
                setResult(`${data}`)
            });
    }, [x, y])

    /*function handleSubmit(event) {
        event.preventDefault()
        //fetch the result from the server with method POST
        fetch(`https://localhost:44306/sum?X=${x}&Y=${y}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/text',
                'Accept':'*!/!*',
                'Content-length': 0
            },
        })
            .then(response => response.text())
            .then(data => {
                setResult(`${data}`)
            });


    }*/




    return (
        <div className="App">
            <form  className='SumForm'>
                <label>
                    First number:
                    <textarea name="x" value={x} onChange={handleChange}/>
                </label>
                <label>
                    Second number:
                    <textarea name="y" value={y} onChange={handleChange}/>
                </label>
            </form>
            <div  className="result">
                {result && <p>Result: {result}</p>}
            </div>


        </div>
    )
}

export default App
