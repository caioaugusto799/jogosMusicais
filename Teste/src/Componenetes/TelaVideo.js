import styled from "styled-components";
import { Link } from "react-router-dom"

export default function TelaVideo(){

    return(<>
        <Navegacao>
            <button>Repetir</button>
            <Link to={{pathname: "/exemplos"}}><button>Seguir</button></Link>
            <button>Parar</button>
        </Navegacao>
    </>)
}

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