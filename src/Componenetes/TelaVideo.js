import { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const TEMPO_AVISO_VISIVEL = 4000; // ms que o aviso de pular fica na tela após um toque

export default function TelaVideo() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [entrando, setEntrando] = useState(true);
  const [bloqueado, setBloqueado] = useState(false);
  const [mostrarPular, setMostrarPular] = useState(false);
  const escondeTimeoutRef = useRef(null);

  useEffect(() => {
    // Revela a cena suavemente assim que a tela monta (saída da Tela Inicial já
    // deixou a tela preta; aqui só desfazemos esse preto aos poucos)
    const t = setTimeout(() => setEntrando(false), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Alguns navegadores bloqueiam autoplay com som mesmo após um clique.
    // Se isso acontecer, mostramos um botão de "Tocar" em vez de deixar a
    // tela travada sem explicação.
    const video = videoRef.current;
    if (!video) return;
    const promise = video.play();
    if (promise !== undefined) {
      promise.catch(() => setBloqueado(true));
    }
  }, []);

  const irParaExemplos = useCallback(() => {
    if (videoRef.current) videoRef.current.pause();
    navigate("/exemplos");
  }, [navigate]);

  const handleTocarManual = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setBloqueado(false);
    }
  };

  // Toque em qualquer parte do vídeo revela o aviso de pular, que some
  // sozinho depois de um tempo se ninguém tocar nele
  const handleTelaClick = () => {
    if (bloqueado) return; // nesse estado o toque já serve pra iniciar o vídeo
    setMostrarPular(true);
    if (escondeTimeoutRef.current) clearTimeout(escondeTimeoutRef.current);
    escondeTimeoutRef.current = setTimeout(() => {
      setMostrarPular(false);
    }, TEMPO_AVISO_VISIVEL);
  };

  useEffect(() => {
    return () => {
      if (escondeTimeoutRef.current) clearTimeout(escondeTimeoutRef.current);
    };
  }, []);

  // Aceita a tecla Enter para quem estiver num computador com teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        irParaExemplos();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [irParaExemplos]);

  return (
    <Container onClick={handleTelaClick}>
      <Video ref={videoRef} autoPlay playsInline onEnded={irParaExemplos}>
        <source src="/Audios/Video/VideoFinal.mp4" type="video/mp4" />
      </Video>

      {bloqueado && (
        <BotaoTocar onClick={handleTocarManual}>
          <ion-icon name="play-circle"></ion-icon>
          Tocar
        </BotaoTocar>
      )}

      {mostrarPular && (
        <AvisoPular
          onClick={(e) => {
            e.stopPropagation();
            irParaExemplos();
          }}
        >
          <ion-icon name="play-skip-forward-outline"></ion-icon>
          <span>
            Toque aqui ou ENTER
            <br />
            para pular
          </span>
        </AvisoPular>
      )}

      <FadeOverlay entrando={entrando} />
    </Container>
  );
}


const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #000;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  font-family: 'Nunito', 'Comic Sans MS', sans-serif;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BotaoTocar = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;

  display: flex;
  align-items: center;
  gap: 15px;

  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;

  background: linear-gradient(180deg, #0070c0 0%, #00b0f0 100%);
  border: 5px solid rgba(255, 255, 255, 0.9);
  border-radius: 50px;
  padding: 25px 55px;
  cursor: pointer;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.4);

  ion-icon {
    font-size: 46px;
  }
`;

const entrada = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AvisoPular = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 15;

  /* Sobrescreve o "button { width: 200px; height: 90px; }" global do
     style.css, que estava espremendo o texto e quebrando palavra por
     palavra */
  width: auto;
  height: auto;

  display: flex;
  align-items: center;
  gap: 12px;

  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: white;
  text-align: left;
  line-height: 1.3;
  white-space: nowrap;

  background: rgba(0, 40, 70, 0.75);
  border: 3px solid rgba(255, 255, 255, 0.9);
  border-radius: 50px;
  padding: 14px 26px;
  cursor: pointer;

  animation: ${entrada} 0.3s ease-out;

  ion-icon {
    font-size: 30px;
    flex-shrink: 0;
  }
`;

const FadeOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 20;
  pointer-events: none;

  opacity: ${(props) => (props.entrando ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;