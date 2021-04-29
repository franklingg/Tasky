import React from 'react';
import Header from '../../components/Header';
import './styles.css';
import api from '../../service/api';

export default function Home(props) {
    const [registerForm, setRegisterForm] = React.useState(true);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');

    React.useEffect(()=>{
        if (!registerForm && localStorage.getItem('token')) props.history.push('/tasks');
    }, [registerForm]);

    const toggleForm = ()=> {
        setErrorMsg('');
        setRegisterForm(!registerForm);
    }
    const changeName = event => setName(event.target.value);
    const changeEmail = event => setEmail(event.target.value);
    const changePassword = event => setPassword(event.target.value);

    const handleSubmit = (event)=>{
        event.preventDefault();
        const data = {name, email, password};
        setErrorMsg('');
        
        const URI = '/users/' + (registerForm ? 'register' : 'login');
        api.post(URI,data)
        .then(response=>{
            const token = response.data.token_list.slice(-1)[0];
            localStorage.setItem("token", token);
            props.history.push("/tasks");
        })
        .catch(err=> setErrorMsg(`${err.response.data.error}. Tente novamente`));
    }

    return(
        <>
            <Header action={toggleForm} isFirst={registerForm} first="Registrar" second="Login" />
            <main className='home'>
                <img className='home__img' src='home.svg' alt='Imagem da página principal do Tasky'/>
                <form className='home__register' onSubmit={handleSubmit}>
                    {registerForm ?
                    <>
                    <h2 className='home__form-title'>Cadastre-se. É fácil.</h2>
                    <label> Nome</label>
                    <input type="text" value={name} className="home__form-field" onChange={changeName} />
                    </> :
                    <h2 className='home__form-title'>Faça Login</h2>
                    }
                    <label> Email</label>
                    <input type="email" className="home__form-field" value={email} onChange={changeEmail} />
                    <label> Senha</label>
                    <input type="password" className="home__form-field" value={password} onChange={changePassword} />
                    <input type="submit" className="home__form-btn" value="Entrar" />
                    <p className="home_form-error">{errorMsg}</p>
                </form>
            </main>
        </>
    )
} 