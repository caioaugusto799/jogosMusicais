import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TelaExemplos() {
  const exemplos = [
    { sup: "Rápido", inf: "Devagar", supSound: "/Audios/Ciranda_voztoc_RAPIDO.wav", infSound: "/Audios/Ciranda_voztoc_DEVAGAR.wav" },
    { sup: "Agudo", inf: "Grave", supSound: "/Audios/Ciranda_Piano_SibM_AGUDO.wav", infSound: "/Audios/Ciranda_Piano_DoM_GRAVE.wav" },
    { sup: "Rápido", inf: "Devagar", supSound: "/Audios/Ciranda_Piano_RAPIDO.wav", infSound: "/Audios/Ciranda_Piano_DEVAGAR.wav" },
    { sup: "Agudo", inf: "Grave", supSound: "/Audios/Ciranda_Flauta_SibM_AGUDA.wav", infSound: "/Audios/Ciranda_Flauta_DoM_GRAVE.wav" },
  ];

  const [variacao, setVariacao] = useState(0);
  const [currentAudio, setCurrentAudio] = useState(null);
  const navigate = useNavigate();

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
  };

  const playSound = (soundPath) => {
    stopAudio();
    const audio = new Audio(soundPath);
    audio.play();
    setCurrentAudio(audio);
  };

  const handleNext = () => {
    stopAudio();
    if (variacao < exemplos.length - 1) {
      setVariacao(variacao + 1);
    } else {
      navigate("/atividades");
    }
  };

  const handleInicio = () => {
    stopAudio();
    navigate("/");
  };

  return (
    <Container>
      {/* Área central para o conteúdo dos exemplos */}
      <AreaConteudo>
        <TituloExemplo>
          Exemplo {variacao + 1}: <br />
          <span>{exemplos[variacao].sup}</span> vs <span>{exemplos[variacao].inf}</span>
        </TituloExemplo>
      </AreaConteudo>

      {/* Barra lateral com todos os botões estilizados */}
      <SidebarNavegacao>
        <SeçaoBotoes>
          <BotaoSom onClick={() => playSound(exemplos[variacao].supSound)}>
            Mais {exemplos[variacao].sup}
          </BotaoSom>
          <BotaoSom onClick={() => playSound(exemplos[variacao].infSound)}>
            Mais {exemplos[variacao].inf}
          </BotaoSom>
        </SeçaoBotoes>

        <Divisor />

        <SeçaoBotoes>
          <BotaoAcao onClick={handleInicio}>Início</BotaoAcao>
          <BotaoAcao onClick={handleNext}>Seguir</BotaoAcao>
        </SeçaoBotoes>
      </SidebarNavegacao>
    </Container>
  );
}

// Estilização
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #f0f8ff;
  overflow: hidden;
`;

const AreaConteudo = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TituloExemplo = styled.h2`
  font-size: 50px;
  color: #0070c0;
  text-align: center;
  font-family: 'Comic Sans MS', sans-serif;
  span {
    color: #00b050;
    text-transform: uppercase;
  }
`;

const SidebarNavegacao = styled.div`
  width: 320px; 
  height: 100%;
  background: linear-gradient(180deg, #005b8c 0%, #0070c0 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: -10px 0px 20px rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

const SeçaoBotoes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Divisor = styled.div`
  width: 70%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 40px 0;
  border-radius: 2px;
`;

// Botão com o mesmo estilo "VAMOS JOGAR!"
const BotaoBase = styled.button`
  width: 240px;
  font-family: 'Comic Sans MS', 'Cursive', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  border-radius: 50px;
  border: 4px solid rgba(255, 255, 255, 0.9);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease-out;
  outline: none;

  &:hover {
    box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.4);
    transform: translateY(-5px) scale(1.05);
  }

  &:active {
    transform: translateY(2px) scale(0.96);
  }
`;

// Botões de áudio (Verde para diferenciar)
const BotaoSom = styled(BotaoBase)`
  font-size: 24px;
  padding: 15px 10px;
  background: linear-gradient(180deg, #00b050 0%, #00e676 100%);
  
  &:hover {
    background: linear-gradient(180deg, #00cc5c 0%, #33ff99 100%);
  }
`;

// Botões de navegação (Azul como os outros)
const BotaoAcao = styled(BotaoBase)`
  font-size: 28px;
  padding: 18px 0;
  background: linear-gradient(180deg, #0070c0 0%, #00b0f0 100%);

  &:hover {
    background: linear-gradient(180deg, #0088e6 0%, #17c8ff 100%);
  }
  
  &:active {
    background: linear-gradient(180deg, #005b8c 0%, #0099cc 100%);
  }
`;