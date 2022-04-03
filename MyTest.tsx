import React, {useState, useEffect} from 'react';
import { ButtonContainer } from './ButtonContainer';


export const MyTest: React.FC<{}> = () => {
  const [checked, setChecked] = useState(true)



  const handleCheck = () => {

    if (!checked) setChecked(true)
    else setChecked(false)

  }

  return (
    <div>
      <input type="checkbox" checked={checked} onChange={handleCheck} />
      <label> Render button </label>
      {checked && <ButtonContainer />}
      </div>
  
  )
};
