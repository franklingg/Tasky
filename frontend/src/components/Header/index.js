import React from 'react';

export default function Header() {

    return(
        <div className='header'>
            <h1>Esse é o header</h1>
            <a href="/">Login</a>
            <a href="/tasks">Tasks</a>
        </div>
    );
}