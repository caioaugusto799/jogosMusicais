import styled from "styled-components"
import PaginaId from "../styled"
import { Link } from "react-router-dom"

export default function TelaInicial(){
    return(<>
        <Link to={{pathname: "/video"}}><VamosJogar >Vamos Brincar!</VamosJogar></Link> 
    </>)
}

const VamosJogar = styled.button`
    position: absolute;
    right: 25px;
    bottom: 25px;
`