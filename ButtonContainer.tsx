import React, {useState, useEffect, useRef} from 'react';
let controller;

export const ButtonContainer: React.FC<{}> = ({newCount}) => {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [cancel, setCancel] = useState(true)
  const [origin, setOrigin] = useState(() => {
    const saved = localStorage.getItem('origin')
    const value = saved
    return value || 'xx.xx.xxx.xxx'
  })
  const counterEl = useRef(newCount)

  useEffect(()=> {
    counterEl.current+=1
  })


  localStorage.clear()
  
const handleClick = () => {
  controller = new AbortController();
  const signal = controller.signal
  setCancel(false)
  setLoading(true)

  fetch('https://httpbin.org/delay/4', { signal })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem('origin', data.origin)
    setOrigin(data.origin)
    setLoading(false)
    setCancel(true)
  })
  .catch(error => {
    setLoading(false)
    setCancel(true)
    if (error.name === 'AbortError') {
      console.log('Fetch canceled by user')
    } else {
      console.log('Fetch failed')
    }
  })
}

const handleCancel = () => {
  setLoading(false)
  controller.abort()
  console.log('Fetch has been aborted')
}


  return (
    <div>
      <button onClick={handleClick} disabled={loading}> Click me {loading && '(loading)'} </button>
      <button onClick={handleCancel} disabled={cancel}> Cancel </button>
      <p> Renders: {counterEl.current} </p>
      <p> Origin: {origin} </p>
      </div>
  
  )
};