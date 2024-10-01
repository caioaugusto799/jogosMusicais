import Atividades from "./Atividades"
import { useParams,Link } from 'react-router-dom';
import styled from "styled-components";
import { useState } from "react";
import {getNiveis, getAtividades, getCompletion} from "../Dados/Dados";

export default function TelaNiveis(){

    const {nomeAtividade} = useParams();

    console.log(getCompletion());

    const ativs = getAtividades();
    const niveis  = getNiveis(nomeAtividade);
    
    return(
        <Page>
            <Header>Vamos Cirandar</Header>
            <Titulo>{ativs.get(nomeAtividade)}</Titulo>
            <Niveis>
            <Link to={{pathname: `/atividade/${nomeAtividade}/1/1`}}><Nivel> Nível: 1  {(true)? <ion-icon name="lock-closed-outline"></ion-icon>:<ion-icon name="lock-open-outline"></ion-icon>}</Nivel></Link>
                {niveis.map(nivel => {
                    if (getCompletion(nomeAtividade, nivel-1))
                        return <Link to={{pathname: `/atividade/${nomeAtividade}/${nivel}/1`}}>
                                <Nivel> Nível: {nivel}  {(true)? <ion-icon name="lock-closed-outline"></ion-icon>:<ion-icon name="lock-open-outline"></ion-icon>}
                                </Nivel>
                            </Link>
                    return <></>
                    })}
            </Niveis>

            <Navegacao>
                <Link to={{pathname: `/atividades`}} ><button>Voltar</button></Link>
            </Navegacao>
        </Page>
    )
}

const Header = styled.h1`
    width: 100%;
    height: auto;
    margin: 20px 0;
    text-align: center;
    color: rgb(7, 166, 219);
    font-size: 40px;
`

const Titulo = styled.h2`
    width: 100%;
    height: auto;
    margin: 15px 0;
    text-align: center;
    color: green;
    font-size: 30px;
`

const Page = styled.main`
    width:100%;
    height: 100%;

    padding-bottom: 200px;
    padding-top: 100px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
`

const Nivel = styled.button`
    margin: 30px;
`

const Niveis = styled.ul`

`
const Navegacao = styled.ul`
    width: 100%;

    box-sizing: border-box;

    padding: 20px;

    position: absolute;
    bottom: 25px;

    display: flex;
    justify-content: space-between;
`