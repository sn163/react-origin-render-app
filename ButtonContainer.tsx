import React, {useState, useEffect} from 'react';
let controller;

export const ButtonContainer: React.FC<{}> = () => {
  const [count, newCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [cancel, setCancel] = useState(true)
  const [origin, setOrigin] = useState(() => {
    const saved = localStorage.getItem(origin)
  })

  
const handleClick = () => {





}


  return (
    <div>
      <button onClick={handleClick} > Click me {loading && '(loading)'} </button>
      <button disabled={cancel}> Cancel </button>
      </div>
  
  )
};