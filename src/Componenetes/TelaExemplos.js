import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Velocidade do vídeo de fundo da roda. 1 = velocidade original do arquivo.
// Abaixo de 1 deixa mais lento (ex.: 0.6 = 40% mais devagar).
const VELOCIDADE_RODA = 0.6;

export default function TelaExemplos() {
  const videoRodaRef = useRef(null);
  const exemplos = [
    { sup: "Rápido", inf: "Devagar", supSound: "/Audios/Ciranda_voztoc_RAPIDO.wav", infSound: "/Audios/Ciranda_voztoc_DEVAGAR.wav" },
    { sup: "Agudo", inf: "Grave", supSound: "/Audios/Ciranda_Piano_SibM_AGUDO.wav", infSound: "/Audios/Ciranda_Piano_DoM_GRAVE.wav" },
  ];

  const [variacao, setVariacao] = useState(0);
  const [currentAudio, setCurrentAudio] = useState(null);
  // "direita" = roda no sentido original do vídeo. "esquerda" = mesma
  // gravação espelhada horizontalmente, o que inverte o sentido do giro.
  const [direcaoRoda, setDirecaoRoda] = useState("direita");
  const navigate = useNavigate();

  // Ao trocar de exemplo, volta a roda pro sentido padrão
  useEffect(() => {
    setDirecaoRoda("direita");
  }, [variacao]);

  // playbackRate precisa ser reaplicado sempre que o <video> remonta a
  // fonte (alguns navegadores resetam pra 1 nesse momento)
  useEffect(() => {
    if (videoRodaRef.current) {
      videoRodaRef.current.playbackRate = VELOCIDADE_RODA;
    }
  }, []);

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

  const handleSup = () => {
    playSound(exemplos[variacao].supSound);
    setDirecaoRoda("direita");
  };

  const handleInf = () => {
    playSound(exemplos[variacao].infSound);
    setDirecaoRoda("esquerda");
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

      <FundoRoda
        ref={videoRodaRef}
        autoPlay
        loop
        muted
        playsInline
        espelhado={direcaoRoda === "esquerda"}
        onLoadedMetadata={(e) => {
          e.currentTarget.playbackRate = VELOCIDADE_RODA;
        }}
      >
        <source src="/Audios/Video/roda_loop.mp4" type="video/mp4" />
      </FundoRoda>
      <SobreposicaoRoda />

      <CaixaTitulo>
        <TituloExemplo>
          Mais <span>{exemplos[variacao].sup}</span> vs Mais{" "}
          <span>{exemplos[variacao].inf}</span>
        </TituloExemplo>
      </CaixaTitulo>

      {/* Botões de som: flutuantes, centralizados, sem painel lateral */}
      <PainelSom>
        <BotaoSom onClick={handleSup}>Mais {exemplos[variacao].sup}</BotaoSom>
        <BotaoSom onClick={handleInf}>Mais {exemplos[variacao].inf}</BotaoSom>
      </PainelSom>

      {/* Mesmo padrão de rodapé usado em TelaAtividades / TelaAtividade / TelaNiveis */}
      <NavegacaoRodape>
        <BotaoAcao onClick={handleInicio}>Início</BotaoAcao>
        <BotaoAcao onClick={handleNext}>Seguir</BotaoAcao>
      </NavegacaoRodape>
    </Container>
  );
}

// Estilização

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: 'Nunito', 'Comic Sans MS', sans-serif;
`;

const FundoRoda = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;

  /* Espelha horizontalmente: mesma gravação, giro em sentido contrário */
  transform: ${(props) => (props.espelhado ? "scaleX(-1)" : "none")};
  transition: transform 0.15s ease-out;
`;

/* Disfarça a marca d'água do vídeo de fundo (não removível por corte, já que
   cobre o quadro inteiro em grade) sob um véu claro. Reduz o contraste da
   cena junto — é uma troca deliberada: a roda fica mais discreta, mas a
   marca some de vista. */
const SobreposicaoRoda = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(240, 248, 255, 0.68);
  z-index: 1;
`;

/* Caixa pequena, fixa no topo-centro, sobrepondo o vídeo sem cobrir a cena */
const CaixaTitulo = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  max-width: 80%;

  background: rgba(255, 255, 255, 0.9);
  border: 3px solid rgba(0, 112, 192, 0.55);
  border-radius: 30px;
  padding: 14px 34px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.2);
`;

const TituloExemplo = styled.h2`
  margin: 0;
  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-weight: 600;
  font-size: 26px;
  line-height: 1.3;
  color: #0070c0;
  text-align: center;
  white-space: nowrap;

  span {
    color: #00b050;
    font-weight: 700;
    text-transform: uppercase;
  }
`;

const PainelSom = styled.div`
  position: absolute;
  bottom: 150px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;

  display: flex;
  gap: 30px;
`;

const NavegacaoRodape = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 100px;
  position: absolute;
  bottom: 40px;
  left: 0;
  z-index: 2;

  display: flex;
  justify-content: space-between;
`;

// Botão base: mesma silhueta usada nas outras telas do app (pílula,
// gradiente, borda branca), agora com a fonte "Fredoka" no lugar de
// Comic Sans só nos textos de botão/título — mantém uma letra ainda de
// fácil leitura (sem serifas, sem itálico, traços simples), só com um
// desenho mais trabalhado.
const BotaoBase = styled.button`
  min-width: 220px;
  width: auto;
  height: auto;

  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
  border-radius: 50px;
  border: 4px solid rgba(255, 255, 255, 0.9);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 8px 18px rgba(0, 0, 0, 0.28);
  cursor: pointer;
  transition: all 0.3s ease-out;
  outline: none;

  &:hover {
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.35);
    transform: translateY(-5px) scale(1.04);
  }

  &:active {
    transform: translateY(2px) scale(0.97);
  }
`;

const BotaoSom = styled(BotaoBase)`
  font-size: 24px;
  padding: 18px 32px;
  background: linear-gradient(180deg, #00b050 0%, #00e676 100%);

  &:hover {
    background: linear-gradient(180deg, #00cc5c 0%, #33ff99 100%);
  }
`;

const BotaoAcao = styled(BotaoBase)`
  font-size: 26px;
  padding: 16px 36px;
  background: linear-gradient(180deg, #0070c0 0%, #00b0f0 100%);

  &:hover {
    background: linear-gradient(180deg, #0088e6 0%, #17c8ff 100%);
  }

  &:active {
    background: linear-gradient(180deg, #005b8c 0%, #0099cc 100%);
  }
`;