import styled from "styled-components";
import { Link } from "react-router-dom";

export default function TelaInicial() {
  return (
    <Container>
      <Header>Vamos Cirandar!</Header>
      
      <Link to={{ pathname: "/video" }}>
        <VamosJogar>VAMOS JOGAR!</VamosJogar>
      </Link>
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
`;

const Header = styled.h1`
  position: absolute;
  top: 50px;
  width: 100%;
  text-align: center;
  
  font-size: 80px; /* Aumentei um pouco o título também */
  color: #0070c0;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const VamosJogar = styled.button`
  /* AUMENTO DE TAMANHO: Font e Padding significativamente maiores */
  font-size: 45px; 
  padding: 50px 120px; 
  
  /* Ajuste do arredondamento para o novo tamanho */
  border-radius: 100px; 
  
  font-family: 'Comic Sans MS', 'Cursive', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
  
  /* Gradiente e Profundidade */
  background: linear-gradient(180deg, #0070c0 0%, #00b0f0 100%);
  
  /* Borda mais grossa para acompanhar o tamanho */
  border: 8px solid rgba(255, 255, 255, 0.9);
  
  /* Sombra projetada mais forte */
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.3);
  
  cursor: pointer;
  transition: all 0.3s ease-out;
  outline: none;

  &:hover {
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.4);
    transform: translateY(-8px) scale(1.03); /* Sobe e cresce um pouquinho */
    background: linear-gradient(180deg, #0088e6 0%, #17c8ff 100%);
  }

  &:active {
    transform: translateY(4px) scale(0.96);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
    background: linear-gradient(180deg, #005b8c 0%, #0099cc 100%);
  }
`;