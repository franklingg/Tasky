import React from 'react';
import './styles.css';

export default function myInput({label,onChange,value,varName}){
    return(
        <div className='inputWrapper'>
            <label>{label}</label>
            <input type="text" name={varName} required onChange={onChange} value={value}/>
        </div>
    )
}