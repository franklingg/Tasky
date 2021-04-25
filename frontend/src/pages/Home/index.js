import React from 'react';
import Header from '../../components/Header';
import './styles.css';
import api from '../../service/api';

export default function Home() {
    const [registerForm, setRegisterForm] = React.useState(true);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const toggleForm = ()=> setRegisterForm(!registerForm);
    const changeName = event => setName(event.target.value);
    const changeEmail = event => setEmail(event.target.value);
    const changePassword = event => setPassword(event.target.value);

    const handleSubmit = (event)=>{
        event.preventDefault();
        const data = {name, email, password};
        
        const URI = '/users/' + (registerForm ? 'register' : 'login');
        api.post(URI,data)
        .then(res=>alert(res.status))
        .catch(err=> alert(err.response.data.error));
    }

    return(
        <>
            <Header toggler={toggleForm} isRegister={registerForm}/>
            <main className='home'>
                <img className='home__img' src='home.svg' alt='Imagem da página principal do Tasky'/>
                <form className='home__register' onSubmit={handleSubmit}>
                    {registerForm ?
                    <>
                    <h2 className='home__form-title'>Cadastre-se</h2>
                    <label>Nome</label>
                    <input type="text" value={name} onChange={changeName} />
                    </> :
                    <h2 className='home__form-title'>Faça Login</h2>
                    }
                    <label>Email</label>
                    <input type="email" value={email} onChange={changeEmail} />
                    <label>Senha</label>
                    <input type="password" value={password} onChange={changePassword} />
                    <input type="submit" value="Entrar" />
                </form>
            </main>
        </>
    )
} 