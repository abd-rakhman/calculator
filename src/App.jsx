import { useState } from 'react'
import './App.css'
import { useMemo } from 'react'

const NumButton = ({ value, setDisplay }) => {
  const onClick = () => {
    setDisplay((prevDisplay) => {
      return prevDisplay == '0' ? value : prevDisplay + value
    })
  }
  return <button className="btn" onClick={onClick}>{value}</button>
}

const ArithmeticButton = ({ value, onClick }) => {
  return <button className="btn arithmetic" onClick={onClick}>{value}</button>
}

const OperationButton = ({ value, onClick }) => {
  return <button className="btn operation" onClick={onClick}>{value}</button>
}

function App() {
  const [display, setDisplay] = useState('0')
  const [memory, setMemory] = useState('0')
  const [operator, setOperator] = useState(null)

  const fontSize = useMemo(() => {
    if (display.length > 12) {
      return '1.2rem'
    } else if (display.toString().length > 9) {
      return '1.5rem'
    } else {
      return '3rem'
    }
  }, [display])

  const handleEqual = () => {
    const numMemory = parseFloat(memory)
    const numDisplay = parseFloat(display)
    if (operator === null) {
      return
    } else if (operator === '+') {
      const calc = numMemory + numDisplay
      setDisplay(calc.toString())
    } else if (operator === '-') {
      const calc = numMemory - numDisplay
      setDisplay(calc.toString())
    } else if (operator === 'x') {
      const calc = numMemory * numDisplay
      setDisplay(calc.toString())
    } else if (operator === '/') {
      const calc = numMemory / numDisplay
      setDisplay(calc.toString())
    } else {
      return
    }
    setMemory(0)
    setOperator(null)
  }

  const setNewOperator = (newOperator) => {
    const numDisplay = parseFloat(display)
    const numMemory = parseFloat(memory)
    if (operator === null) {
      setMemory(display)
    } else if (operator === '+') {
      const calc = numMemory + numDisplay
      setMemory(calc.toString())
    } else if (operator === '-') {
      const calc = numMemory - numDisplay
      setMemory(calc.toString())
    } else if (operator === 'x') {
      const calc = numMemory * numDisplay
      setMemory(calc.toString())
    } else if (operator === '/') {
      const calc = numMemory / numDisplay
      setMemory(calc.toString())
    }
    setOperator(newOperator)
    setDisplay(0)
  }

  return (
    <>
      <div className="calculator">
        <div className="display">
          <span className="field" style={{ fontSize: fontSize }} >{display}</span>
        </div>
        <div className="numpad">
          <OperationButton value={display == '0' && operator == null ? "AC" : "C"} onClick={() => {
            if (display == '0') {
              setMemory('0')
              setOperator(null)
            } else {
              setDisplay('0')
            }
          }} />
          <OperationButton value="+/-" onClick={() => {
            const displayNum = parseFloat(display)
            const calc = displayNum * -1
            setDisplay(calc.toString())
          }} />
          <OperationButton value="%" onClick={() => {
            const displayNum = parseFloat(display)
            const calc = displayNum / 100
            setDisplay(calc.toString())
          }} />
          <ArithmeticButton value="/" onClick={() => setNewOperator('/')} />
          <NumButton value="7" setDisplay={setDisplay} />
          <NumButton value="8" setDisplay={setDisplay} />
          <NumButton value="9" setDisplay={setDisplay} />
          <ArithmeticButton value="x" onClick={() => setNewOperator('x')} />
          <NumButton value="4" setDisplay={setDisplay} />
          <NumButton value="5" setDisplay={setDisplay} />
          <NumButton value="6" setDisplay={setDisplay} />
          <ArithmeticButton value="+" onClick={() => setNewOperator('+')} />
          <NumButton value="1" setDisplay={setDisplay} />
          <NumButton value="2" setDisplay={setDisplay} />
          <NumButton value="3" setDisplay={setDisplay} />
          <ArithmeticButton value="-" onClick={() => setNewOperator('-')} />
          <button className="btn zero-button" onClick={() => {
            setDisplay((prevDisplay) => {
              return prevDisplay == 0 ? 0 : prevDisplay + '0'
            })
          }}>0</button>
          <button className="btn" onClick={() => {
            if (display.toString().indexOf('.') === -1) {
              setDisplay(display + '.')
            }
          }}>.</button>
          <ArithmeticButton value="=" onClick={handleEqual} />
        </div>
      </div>
    </>
  )
}

export default App
