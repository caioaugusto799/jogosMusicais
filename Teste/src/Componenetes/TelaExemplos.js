import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TelaExemplos() {
  const exemplos = [
    { sup: "Rápido", inf: "Devagar", supSound: "/Audios/Ciranda_voztoc_RAPIDO.wav", infSound: "/Audios/Ciranda_voztoc_DEVAGAR.wav" },
    { sup: "Agudo", inf: "Grave", supSound: "/Audios/Ciranda_Piano_SibM_AGUDO.wav", infSound: "/Audios/Ciranda_Piano_DoM_GRAVE.wav" },
    { sup: "Rápido", inf: "Devagar", supSound: "/Audios/Ciranda_Piano_RAPIDO.wav", infSound: "/Audios/Ciranda_Piano_DEVAGAR.wav" },
    { sup: "Agudo", inf: "Grave", supSound: "/Audios/Ciranda_Flauta_SibM_AGUDA.wav", infSound: "/Audios/Ciranda_Flauta_DoM_GRAVE.wav" },
  ];

  const [variacao, setVariacao] = useState(0);
  const [currentAudio, setCurrentAudio] = useState(null); // Armazenando o áudio atual
  const navigate = useNavigate();

  // Função para parar o áudio atual
  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0; // Volta ao início
      setCurrentAudio(null); // Limpa o estado do áudio
    }
  };

  // Função para tocar um novo som
  const playSound = (soundPath) => {
    stopAudio(); // Pausa qualquer áudio que esteja tocando

    const audio = new Audio(soundPath);
    audio.play();
    setCurrentAudio(audio); // Armazena o áudio atual
  };

  // Função de navegação ao clicar em "Seguir"
  const handleNext = () => {
    stopAudio(); // Pausa o áudio antes de mudar para a próxima tela

    if (variacao < exemplos.length - 1) {
      setVariacao(variacao + 1);
    } else {
      navigate("/atividades"); // Redireciona para a tela de atividades
    }
  };

  // Função de navegação ao clicar em "Início"
  const handleInicio = () => {
    stopAudio(); // Pausa o áudio ao clicar em "Início"
    navigate("/"); // Redireciona para a tela inicial
  };

  return (
    <>
      <Lateral>
        <button onClick={() => playSound(exemplos[variacao].supSound)}>Mais {exemplos[variacao].sup}</button>
        <button onClick={() => playSound(exemplos[variacao].infSound)}>Mais {exemplos[variacao].inf}</button>
      </Lateral>
      <Navegacao>
        <button onClick={handleInicio}>Início</button>
        <button onClick={handleNext}>Seguir</button>
      </Navegacao>
    </>
  );
}

const Lateral = styled.ul`
  position: absolute;
  right: 25px;
  top: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 30vh;
`;

const Navegacao = styled.ul`
  position: absolute;
  bottom: 25px;
  width: 98%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
