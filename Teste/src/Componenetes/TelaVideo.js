import styled from "styled-components";
import { Link } from "react-router-dom";

export default function TelaVideo() {
  return (
    <>
      <Navegacao>
        <button>Repetir</button>
        <button>Parar</button>
        <Link to="/exemplos">
          <button>Seguir</button>
        </Link>
      </Navegacao>
    </>
  );
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
`;
