import './styles.css';
import Header from '../../components/Header';

export default function Forbidden(props){

    const returnHome = () => props.history.push('/');
    return(
        <>
            <Header first="Página principal" action={returnHome} />
            <div className="forbidden">
                <img className="forbidden__image" src="forbidden.svg" alt="Página não acessível deste ponto"></img>
                <section className="forbidden__info">
                    <h1 className="forbidden__info-title">Sem permissão</h1>
                    <p className="forbidden__info-message">
                        Você não pode acessar a página a partir <br />
                        deste ponto, retorne à página principal <br />
                        e tente de outra forma
                    </p>
                </section>
            </div>
        </>
    );
}