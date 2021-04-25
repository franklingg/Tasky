import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

export default function Header() {

    return(
        <div className='header'>
            <Link className='header__logo' to="/">
                <img className='header__logo-img' src='logo.png' alt='Logotipo do Tasky' />
            </Link>
            <button className='header__login'>Login</button>
            <Link className='header__tasks' to="/tasks">Minhas Tarefas</Link>
        </div>
    );
}