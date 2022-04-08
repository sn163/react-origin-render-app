import React, {useState, useEffect} from 'react';
import { ButtonContainer } from './ButtonContainer';


export const MyTest: React.FC<{}> = () => {
  const [checked, setChecked] = useState(true)

  return (
    <div>
      <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
      <label> Render button </label>
      {checked && <ButtonContainer />}
      </div>
  
  )
};
