import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom"

export default function TelaExemplos(){
    const exemplos = [{sup: "Rápido", inf: "Devagar"}, {sup: "Forte", inf:"Fraco"}, {sup: "Agudo", inf:"Grave"}]
    const [variacao, setVariacao] = useState(0);

    function Botao(){
        console.log(variacao)
        if(variacao < 2){
            return(
                <button onClick={() => {setVariacao(variacao + 1)}}>Seguir</button>
            )
        }
        else{
            return(
                <Link to={{pathname: "/atividades"}}><button>Jogar</button></Link>
            )
        }
    }

    console.log(exemplos[variacao])
    return(
        <>
            <Lateral>
                <button>Mais {exemplos[variacao].sup}</button>
                <button>Mais {exemplos[variacao].inf}</button>
            </Lateral>
            <Navegacao>
                <Link to={{pathname: "/"}}><button>Início</button></Link>
                <Botao/>
            </Navegacao>
        </>
    )
}

const Lateral = styled.ul`
    width: auto;
    height: 30vh;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    position: absolute;
    right: 25px;
    top: 20%;
`

const Navegacao = styled.ul`
    width: 100%;
    height: auto;

    box-sizing: border-box;

    padding: 20px;

    display: flex;
    justify-content: space-between;
    
    position: absolute;
    bottom: 25px;
`