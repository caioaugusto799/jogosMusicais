import styled from "styled-components";
import { Link } from "react-router-dom";

export default function TelaVideo() {
  return (
    <Container>
      {/* Área preta onde o vídeo será inserido futuramente */}
      <AreaVideo>
        <PlaceholderText>Vídeo</PlaceholderText>
      </AreaVideo>

      {/* Barra lateral azul com os botões */}
      <SidebarNavegacao>
        <BotaoAcao>Repetir</BotaoAcao>
        <BotaoAcao>Parar</BotaoAcao>
        
        <Link to="/exemplos" style={{ textDecoration: 'none' }}>
          <BotaoAcao>Seguir</BotaoAcao>
        </Link>
      </SidebarNavegacao>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #000; /* Fundo geral preto */
  overflow: hidden;
`;

const AreaVideo = styled.div`
  flex-grow: 1; /* Ocupa todo o espaço restante à esquerda da sidebar */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000; 
  border-right: 2px solid #333; /* Uma linha sutil para separar do menu */
`;

const PlaceholderText = styled.p`
  color: #555;
  font-size: 24px;
  font-family: sans-serif;
`;

const SidebarNavegacao = styled.div`
  width: 280px; /* Largura da barra lateral */
  height: 100%;
  background: linear-gradient(180deg, #005b8c 0%, #0070c0 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px; /* Espaço entre os botões */
  box-shadow: -10px 0px 20px rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const BotaoAcao = styled.button`
  /* Estilo base idêntico ao "VAMOS JOGAR!" */
  font-size: 30px; 
  padding: 18px 0;
  width: 200px; /* Largura fixa para manter o alinhamento vertical */
  
  border-radius: 50px; 
  font-family: 'Comic Sans MS', 'Cursive', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  
  /* Gradiente e Profundidade */
  background: linear-gradient(180deg, #0070c0 0%, #00b0f0 100%);
  border: 4px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  
  cursor: pointer;
  transition: all 0.3s ease-out;
  outline: none;

  /* Efeito Hover */
  &:hover {
    box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.4);
    transform: translateY(-5px) scale(1.05);
    background: linear-gradient(180deg, #0088e6 0%, #17c8ff 100%);
  }

  /* Efeito Clique */
  &:active {
    transform: translateY(2px) scale(0.96);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    background: linear-gradient(180deg, #005b8c 0%, #0099cc 100%);
  }
`;