import React, {useState, useEffect, useRef} from 'react';

export const ButtonContainer: React.FC<{}> = () => {
  //initialize useRef's .current prop to the input of 2 & assign to the count variable to log our render counts
  const count = useRef(0)
  const controller = useRef(null)
  const [loading, setLoading] = useState(false)
  const [origin, setOrigin] = useState(() => {
    //set the origin's default state to saved
    const saved = localStorage.getItem('origin')
    //update the state to whether saved was able to access the origin data, it not then return the x string. 
    return saved || 'xx.xx.xxx.xxx'
  })
  const [mount, setMount] = useState(false)

  count.current+=1
 
  
  useEffect(() => {
    setMount(true)

    return () => { 
      setMount(false)
    }
  }, [])

  //clearing localStorage mainly for testing
  //localStorage.clear()
  
const handleClick = () => {
  //create a new instance of the abort controller to to be consumed if the fetch is aborted
  controller.current = new AbortController();
  const signal = controller.current.signal
 
  setLoading(true)
  //pass in the abort signal as an option inside the request to relate the signal and controller with the fetch
  fetch('https://httpbin.org/delay/4', { signal })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem('origin', data.origin)
    if (mount) {
      setOrigin(data.origin)
      setLoading(false)
    }
  })
  .catch(error => {
    if (mount) setLoading(false)

    if (error.name === 'AbortError') {
      console.log('Fetch canceled by user')
    } else {
      console.log('Fetch failed')
    }
  })
}

const handleCancel = () => {
  setLoading(false)
  //if the cancel button is clicked, invoke controller's abort method to abort fetch request & consume the instance
  controller.current.abort()
  console.log('Fetch has been aborted')
}


  return (
    <div>
      <button onClick={handleClick} disabled={loading}> { !loading ? 'Click me' : 'Loading...'} </button>
      <button onClick={handleCancel} disabled={!loading}> Cancel </button>
      <p> Renders: {count.current} </p>
      <p> Origin: {origin} </p>
      </div>
  
  )
};