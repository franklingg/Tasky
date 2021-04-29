import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

export default function Header(props) {

    return(
        <div className='header'>
            <Link className='header__logo' to="/">
                <img className='header__logo-img' src='logo.png' alt='Logotipo do Tasky' />
            </Link>
            <button className='header__btn' onClick={props.action}>{props.isFirst? props.second:props.first}</button>
        </div>
    );
}