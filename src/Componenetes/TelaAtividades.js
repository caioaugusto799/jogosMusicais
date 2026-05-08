import styled from "styled-components";
import { Link } from "react-router-dom";

export default function TelaAtividades() {
  const handleExit = () => {
    if (window.confirm("Tem certeza de que deseja sair?")) {
      window.close(); 
      window.location.href = "/";
    }
  };

  return (
    <Container>
      {/* Título fixo no topo */}
      <Header>Vamos Cirandar!</Header>

      <AreaConteudo>
        <ListaJogos>
          <Link to="/atividade/qual_e_o_par" style={{ textDecoration: 'none' }}>
            <BotaoJogo>Qual é o par?</BotaoJogo>
          </Link>
          
          <Link to="/atividade/rapido_devagar" style={{ textDecoration: 'none' }}>
            <BotaoJogo>Mais Rápido ou Mais Devagar</BotaoJogo>
          </Link>

          <Link to="/atividade/grave_agudo" style={{ textDecoration: 'none' }}>
            <BotaoJogo>Mais Agudo ou Mais Grave</BotaoJogo>
          </Link>
        </ListaJogos>
      </AreaConteudo>

      <NavegacaoRodape>
        <Link to="/exemplos" style={{ textDecoration: 'none' }}>
          <BotaoAcao>Voltar</BotaoAcao>
        </Link>
        
        <BotaoAcao onClick={handleExit}>Parar</BotaoAcao>
      </NavegacaoRodape>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f0f8ff;
  position: relative;
  overflow: hidden;
`;


const Header = styled.h1`
  position: absolute;
  top: 40px; /* Distância do topo */
  width: 100%;
  text-align: center;
  
  font-size: 75px;
  color: #0070c0;
  font-family: 'Comic Sans MS', sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
`;

const AreaConteudo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Alinha o conteúdo começando pelo topo */
  align-items: center;
  padding-top: 180px; /* Dá espaço para o Header não cobrir os botões */
`;

const ListaJogos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px; /* Mantém o mesmo espaçamento entre os botões */
`;

const NavegacaoRodape = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 40px;
  position: absolute;
  bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BotaoJogo = styled.button`
  width: 600px;
  font-size: 35px;
  padding: 25px;
  border-radius: 60px;
  font-family: 'Comic Sans MS', sans-serif;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  border: 6px solid rgba(255, 255, 255, 0.9);
  background: linear-gradient(180deg, #00b050 0%, #00e676 100%);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.4);
    background: linear-gradient(180deg, #00cc5c 0%, #33ff99 100%);
  }

  &:active {
    transform: translateY(4px) scale(0.97);
  }
`;

const BotaoAcao = styled.button`
  width: 200px;
  font-size: 28px;
  padding: 15px 0;
  border-radius: 50px;
  font-family: 'Comic Sans MS', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  background: linear-gradient(180deg, #0070c0 0%, #00b0f0 100%);
  border: 4px solid rgba(255, 255, 255, 0.9);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    transform: translateY(-5px) scale(1.05);
    background: linear-gradient(180deg, #0088e6 0%, #17c8ff 100%);
  }

  &:active {
    transform: translateY(2px) scale(0.96);
  }
`;