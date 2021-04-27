import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

export default function Header(props) {

    return(
        <div className='header'>
            <Link className='header__logo' to="/">
                <img className='header__logo-img' src='logo.png' alt='Logotipo do Tasky' />
            </Link>
            <button className='header__login' onClick={props.toggler}>{props.isRegister? 'Login':'Register'}</button>
            <Link className='header__tasks' to="/tasks">Minhas Tarefas</Link>
        </div>
    );
}