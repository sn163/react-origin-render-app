import React, {useState} from 'react';
import { ButtonContainer } from './ButtonContainer';


export const MyTest: React.FC<{}> = () => {
  const [newCount, setNewCount] = useState(0)
  const [checked, setChecked] = useState(false)

  const handleCheck = () => {
    if (!checked) setChecked(true)
    else setChecked(false)
  }

  return (
    <div>
      <input type="checkbox" checked={checked} onChange={handleCheck} />
      <label> Render button </label>
      {checked && <ButtonContainer newCount={newCount}/>}
      </div>
  
  )
};
