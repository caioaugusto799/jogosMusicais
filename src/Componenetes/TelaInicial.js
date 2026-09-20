import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function TelaInicial() {
  const navigate = useNavigate();
  const [saindo, setSaindo] = useState(false);

  const handleJogar = () => {
    setSaindo(true);
    // Espera o fade para preto terminar antes de trocar de tela
    setTimeout(() => {
      navigate("/video");
    }, 500);
  };

  return (
    <Container>
      <FundoGif src="/Audios/Video/parque_loop_nuvens.gif" alt="" />
      <Sobreposicao />

      <Header>Vamos Cirandar!</Header>

      <VamosJogar onClick={handleJogar}>VAMOS JOGAR!</VamosJogar>

      <FadeOverlay saindo={saindo} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f8ff;
  position: relative;
  overflow: hidden;
  font-family: 'Nunito', 'Comic Sans MS', sans-serif;
`;

const FundoGif = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const Sobreposicao = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(240, 248, 255, 0.45);
  z-index: 1;
`;

const Header = styled.h1`
  position: absolute;
  top: 50px;
  width: 100%;
  text-align: center;
  z-index: 2;

  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-size: 80px;
  color: #0070c0;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0px 3px 10px rgba(255, 255, 255, 0.8);
`;

const VamosJogar = styled.button`
  position: relative;
  z-index: 2;

  width: auto;
  height: auto;
  min-width: 560px;
  white-space: nowrap;

  font-size: 52px;
  padding: 55px 130px;

  border-radius: 100px;

  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);

  background: linear-gradient(180deg, #0070c0 0%, #00b0f0 100%);

  border: 8px solid rgba(255, 255, 255, 0.9);

  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.3);

  cursor: pointer;
  transition: all 0.3s ease-out;
  outline: none;

  &:hover {
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.4);
    transform: translateY(-8px) scale(1.03);
    background: linear-gradient(180deg, #0088e6 0%, #17c8ff 100%);
  }

  &:active {
    transform: translateY(4px) scale(0.96);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
    background: linear-gradient(180deg, #005b8c 0%, #0099cc 100%);
  }
`;

const FadeOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 10;
  pointer-events: none;

  opacity: ${(props) => (props.saindo ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;