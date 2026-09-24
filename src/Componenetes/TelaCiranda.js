import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Mesma lógica de velocidade de vídeo usada na TelaExemplos, pra manter a
// roda com o mesmo "jeito" de girar nas duas telas.
const VELOCIDADE_RODA = 0.6;

function formatarTempo(segundos) {
  if (!isFinite(segundos) || segundos < 0) segundos = 0;
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min}:${seg.toString().padStart(2, "0")}`;
}

export default function TelaCiranda() {
  const videoRodaRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const [tocando, setTocando] = useState(false);
  const [tempoAtual, setTempoAtual] = useState(0);
  const [duracao, setDuracao] = useState(0);

  useEffect(() => {
    if (videoRodaRef.current) {
      videoRodaRef.current.playbackRate = VELOCIDADE_RODA;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const aoAtualizarTempo = () => setTempoAtual(audio.currentTime);
    const aoCarregarMetadados = () => setDuracao(audio.duration);
    const aoTerminar = () => {
      setTocando(false);
      audio.currentTime = 0;
      setTempoAtual(0);
      if (videoRodaRef.current) videoRodaRef.current.pause();
    };

    audio.addEventListener("timeupdate", aoAtualizarTempo);
    audio.addEventListener("loadedmetadata", aoCarregarMetadados);
    audio.addEventListener("ended", aoTerminar);

    return () => {
      audio.removeEventListener("timeupdate", aoAtualizarTempo);
      audio.removeEventListener("loadedmetadata", aoCarregarMetadados);
      audio.removeEventListener("ended", aoTerminar);
    };
  }, []);

  const alternarPlayPause = () => {
    const audio = audioRef.current;
    const video = videoRodaRef.current;
    if (!audio) return;

    if (tocando) {
      audio.pause();
      if (video) video.pause();
      setTocando(false);
    } else {
      audio.play();
      if (video) {
        video.playbackRate = VELOCIDADE_RODA;
        video.play();
      }
      setTocando(true);
    }
  };

  const pararTudo = () => {
    const audio = audioRef.current;
    const video = videoRodaRef.current;
    if (audio) audio.pause();
    if (video) video.pause();
    setTocando(false);
  };

  const handleInicio = () => {
    pararTudo();
    navigate("/");
  };

  const handleSeguir = () => {
    pararTudo();
    navigate("/exemplos");
  };

  const progresso = duracao > 0 ? (tempoAtual / duracao) * 100 : 0;

  return (
    <Container>
      <audio ref={audioRef} src="/Audios/Ciranda_Completa.mp3" preload="metadata" />

      {/* Mesmo vídeo de fundo da TelaExemplos. Sem loop automático: fica
          parado até o usuário apertar play, e congela no frame atual
          sempre que o áudio pausa — é o próprio elemento <video> pausando
          junto, não um efeito visual separado. */}
      <FundoRoda ref={videoRodaRef} muted playsInline loop>
        <source src="/Audios/Video/roda_loop.mp4" type="video/mp4" />
      </FundoRoda>
      <SobreposicaoRoda />

      <CaixaTitulo>
        <TituloExemplo>Vamos ouvir a Ciranda!</TituloExemplo>
      </CaixaTitulo>

      <PainelPlayer>
        <BotaoPlayPause onClick={alternarPlayPause}>
          <ion-icon name={tocando ? "pause" : "play"}></ion-icon>
        </BotaoPlayPause>

        <BarraProgresso>
          <PreenchimentoProgresso style={{ width: `${progresso}%` }} />
        </BarraProgresso>

        <Tempo>
          {formatarTempo(tempoAtual)} / {formatarTempo(duracao)}
        </Tempo>
      </PainelPlayer>

      <NavegacaoRodape>
        <BotaoAcao onClick={handleInicio}>Início</BotaoAcao>
        <BotaoAcao onClick={handleSeguir}>Seguir</BotaoAcao>
      </NavegacaoRodape>
    </Container>
  );
}

// Estilização — reaproveita as mesmas peças/paleta da TelaExemplos

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
`;

const SobreposicaoRoda = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(240, 248, 255, 0.68);
  z-index: 1;
`;

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
`;

const PainelPlayer = styled.div`
  position: absolute;
  bottom: 150px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;

  background: rgba(255, 255, 255, 0.9);
  border: 3px solid rgba(0, 112, 192, 0.55);
  border-radius: 40px;
  padding: 24px 50px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  min-width: 420px;
`;

const BotaoPlayPause = styled.button`
  width: 90px;
  height: 90px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  background: linear-gradient(180deg, #00b050 0%, #00e676 100%);
  border: 4px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0px 8px 18px rgba(0, 0, 0, 0.28);
  cursor: pointer;
  transition: all 0.2s ease-out;

  ion-icon {
    font-size: 44px;
  }

  &:hover {
    transform: scale(1.06);
    background: linear-gradient(180deg, #00cc5c 0%, #33ff99 100%);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const BarraProgresso = styled.div`
  width: 100%;
  height: 14px;
  border-radius: 10px;
  background: #dce9f5;
  overflow: hidden;
`;

const PreenchimentoProgresso = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #0070c0 0%, #00b0f0 100%);
  border-radius: 10px;
  transition: width 0.15s linear;
`;

const Tempo = styled.span`
  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #0070c0;
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

const BotaoAcao = styled.button`
  min-width: 220px;
  width: auto;
  height: auto;

  font-size: 26px;
  padding: 16px 36px;

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

  background: linear-gradient(180deg, #0070c0 0%, #00b0f0 100%);

  &:hover {
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.35);
    transform: translateY(-5px) scale(1.04);
    background: linear-gradient(180deg, #0088e6 0%, #17c8ff 100%);
  }

  &:active {
    transform: translateY(2px) scale(0.97);
    background: linear-gradient(180deg, #005b8c 0%, #0099cc 100%);
  }
`;
