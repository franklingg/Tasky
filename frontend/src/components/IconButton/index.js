import React from 'react';
import './styles.css';

export default function Header({iconName,clickHandler,color}) {
    return(
        <button className='iconButton' onClick={clickHandler} style={{color:color,borderColor:color}}>
            <i className={'fa fa-'+iconName}/>
        </button>
    );
}