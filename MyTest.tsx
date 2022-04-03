import React, {useState, useEffect} from 'react';
import { ButtonContainer } from './ButtonContainer';


export const MyTest: React.FC<{}> = () => {
  const [newCount, setNewCount] = useState(1)
  const [checked, setChecked] = useState(false)

  

  const handleCheck = () => {
   
    if (!checked) {
      setNewCount(newCount + 1)
      setChecked(true)
    } else {
      setChecked(false)
      setNewCount(1)
    }
  }

  return (
    <div>
      <input type="checkbox" checked={checked} onChange={handleCheck} />
      <label> Render button </label>
      {checked && <ButtonContainer newCount={newCount}/>}
      </div>
  
  )
};
