import React, {useState, useEffect, useRef} from 'react';
let controller;

export const ButtonContainer: React.FC<{}> = ({newCount}) => {
  const [loading, setLoading] = useState(false)
  const [origin, setOrigin] = useState(() => {
    const saved = localStorage.getItem('origin')
    const value = saved
    return value || 'xx.xx.xxx.xxx'
  })
  const count = useRef(newCount)

  useEffect(()=> {
    count.current+=1
  })


  localStorage.clear()
  
const handleClick = () => {
  controller = new AbortController();
  const signal = controller.signal
  setLoading(true)

  fetch('https://httpbin.org/delay/4', { signal })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem('origin', data.origin)
    setOrigin(data.origin)
    setLoading(false)
  })
  .catch(error => {
    setLoading(false)
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
      <button onClick={handleCancel} disabled={!loading}> Cancel </button>
      <p> Renders: {count.current} </p>
      <p> Origin: {origin} </p>
      </div>
  
  )
};