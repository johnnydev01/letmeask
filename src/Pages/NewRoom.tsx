import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Button } from "../components/Button";
import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { AuthContext } from '../contexts/AuthContext';
import { useAuth } from '../hooks/useAuth';

export function NewRoom(){
    // const { user } = useAuth(); 

    return(
        <div id="page-auth">
        <aside>
            <img src={illustration} alt="" />
            <strong>Crie Sala de Q&amp;A ao vivo</strong>
            <p>Tire as dúvidas da sua audiência em tempo-real</p>
        </aside>
        <main>
            <div className="main-content">
                <img src={logoImg} alt="Letmeaks" />
                <h2>Criar uma nova sala</h2>
                <form action="">
                    <input 
                        type="text"
                        placeholder="Nome da Sala"
                    />
                    <Button type="submit" >
                        Criar sala
                    </Button>
                </form>
                <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                </p> 
            </div>
        </main>
    </div>
    )
}