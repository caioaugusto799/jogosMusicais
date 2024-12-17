import styled from "styled-components";
import { Link } from "react-router-dom";
import { getAtividades } from "../Dados/Dados";

export default function TelaAtividades() {
  // Função para sair do jogo
  const handleExit = () => {
    if (window.confirm("Tem certeza de que deseja sair?")) {
      window.close(); // Tenta fechar a aba
      // Alternativa para navegadores que bloqueiam window.close()
      window.location.href = "/";
    }
  };

  return (
    <Page>
      <Jogos>
        <Header>Vamos Cirandar!</Header>
        <Link to={{ pathname: "/atividade/qual_e_o_par" }}>
          <Jogo>Qual é o par?</Jogo>
        </Link>
        <Link to={{ pathname: "/atividade/rapido_devagar" }}>
          <Jogo>Mais Rápido ou Mais Devagar</Jogo>
        </Link>
        {/* <Link to={{ pathname: "/atividade/mais_forte_ou_mais_fraco" }}>
          <Jogo>Mais Forte ou Mais Fraco</Jogo>
        </Link> */}
        <Link to={{ pathname: "/atividade/grave_agudo" }}>
          <Jogo>Mais Agudo ou Mais Grave</Jogo>
        </Link>
      </Jogos>

      <Navegacao>
        <Link to={{ pathname: "/exemplos" }}>
          <button>Voltar</button>
        </Link>
        <button onClick={handleExit}>Parar</button>
      </Navegacao>
    </Page>
  );
}

// Estilizações
const Header = styled.h1`
  width: 100%;
  height: auto;
  margin: 20px 0;
  text-align: center;
  color: rgb(7, 166, 219);
  font-size: 40px;
`;

const Page = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Jogos = styled.ul`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Jogo = styled.button`
  width: 500px;
  max-height: 10vh;
  margin: 20px;
`;

const Navegacao = styled.ul`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: absolute;
  bottom: 25px;
  display: flex;
  justify-content: space-between;
`;