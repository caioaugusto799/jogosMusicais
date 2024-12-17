import { useState } from "react";
import Atividades from "./Atividades";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { getInfos, getAtividades, setCompletion } from "../Dados/Dados";
import { createRef, useRef } from "react/cjs/react.production.min";
import { useNavigate } from "react-router-dom";
import PaginaId from "../styled";

export default function TelaAtividade() {
  const { nomeAtividade, nivel, passo } = useParams();
  const [infos, def, texto] = getInfos(nomeAtividade, nivel, passo);

  const [sound, setSound] = useState(new Audio());
  const [sel, setSel] = useState(null);
  const [showConfirmButton, setShowConfirmButton] = useState(false); // Show confirm button
  const [showFeedback, setShowFeedback] = useState(false); // Show feedback
  const [isCorrect, setIsCorrect] = useState(null); // Track whether the selected answer is correct

  function playAudio(elemento) {
    setSel(elemento);
    setShowConfirmButton(true); // Show confirm button once an option is selected
    setShowFeedback(false); // Hide feedback when a new option is selected

    sound.pause();

    const musica = "/Audios/" + elemento.arquivo;
    const new_sound = new Audio(musica);
    new_sound.play();
    setSound(new_sound);
    console.log("playing ", musica);
    console.log(new_sound);
  }

  const ativText = () => {
    if (nomeAtividade === "qual_e_o_par") {
      return <span style={{ color: "#06995a" }}>Qual é o Par?</span>;
    }
    if (nomeAtividade === "rapido_devagar") {
      return (
        <>
          <span style={{ color: "#06995a" }}>Mais Rápido </span>
          <span>ou </span>
          <span style={{ color: "#06995a" }}>Mais Devagar</span>
        </>
      );
    }
    if (nomeAtividade === "grave_agudo") {
      return (
        <>
          <span style={{ color: "#06995a" }}>Mais Agudo </span>
          <span>ou </span>
          <span style={{ color: "#06995a" }}>Mais Grave</span>
        </>
      );
    }
    return <></>;
  };

  if (infos.length === 0) {
    console.log("fim");
    setCompletion(nomeAtividade, nivel);
    let parte_final = null;
    if (nivel < 3) {
      parte_final = (
        <>
          <Header>
            <p>PARABÉNS!!!!</p>
            <span style={{ color: "#00b0f0" }}>VOCÊ FINALIZOU O </span>
            <span style={{ color: "#00b050" }}>NÍVEL {nivel} </span>
            <span style={{ color: "#00b0f0" }}>COM </span>
            <span>SUCESSO !</span>
          </Header>
          <Navegacao>
            <Link to="/atividades">
              <button>Voltar</button>
            </Link>
            <Link to={`/atividade/${nomeAtividade}`}>
              <button>Avançar</button>
            </Link>
          </Navegacao>
        </>
      );
    } else {
      parte_final = (
        <>
          <Header>
            <p>PARABÉNS!!!!</p>
            <span style={{ color: "#00b0f0" }}>
              VOCÊ FINALIZOU A ATIVIDADE{" "}
            </span>
            <p>{ativText()}</p>
            <span style={{ color: "#00b0f0" }}>COM </span>
            <span>SUCESSO !</span>
          </Header>
          <Navegacao>
            <Link to="/atividades/">
              <button>Voltar</button>
            </Link>
            <Link to="/atividades/">
              <button>Parar</button>
            </Link>
          </Navegacao>
        </>
      );
    }

    return (
      <Page>
        <Header>
          <p>VAMOS CIRANDAR!</p>
          {ativText()}
        </Header>
        {parte_final}
      </Page>
    );
  }

  function press_Prox() {
    setSel(null);
    setShowConfirmButton(false);
    setShowFeedback(false);
    setIsCorrect(null); // Reset correctness state
    sound.pause();
  }

  const proxButton = () => {
    // Button should only appear when feedback has been shown and the answer is correct
    if (!showFeedback || isCorrect === null || !isCorrect) return <></>; 
    return (
      <Link
        to={{
          pathname: `/atividade/${nomeAtividade}/${nivel}/${
            Number(passo) + 1
          }`,
        }}
        onClick={press_Prox}
      >
        <button>Próximo</button>
      </Link>
    );
  };

  const handleConfirm = () => {
    if (sel && sel.corr === 1) {
      setIsCorrect(true); // If correct, set isCorrect to true
    } else {
      setIsCorrect(false); // If incorrect, set isCorrect to false
    }
    setShowFeedback(true); // Show feedback after confirmation
    setShowConfirmButton(false); // Hide confirm button
  };

  return (
    <>
      <PaginaId>
        {nivel}.{passo}
      </PaginaId>
      <Page>
        <Header>Vamos Cirandar</Header>
        <Titulo>{getAtividades()[nomeAtividade]}</Titulo>
        <Dado>
          <Play
            name="play-circle"
            onClick={() => playAudio(def)}
          ></Play>{" "}
          Ouça o início da Ciranda Cirandinha
        </Dado>
        <Pergunta>{texto}</Pergunta>
        <Alternativas>
          {infos.map((elemento) => (
            <Alternativa
              key={elemento.opcao}
              style={{ color: elemento === sel ? "red" : "green" }}
              onClick={() => playAudio(elemento)}
            >
              {elemento.opcao}
            </Alternativa>
          ))}
        </Alternativas>
        {showConfirmButton && (
          <ConfirmButton onClick={handleConfirm}>Confirmar</ConfirmButton>
        )}
        {showFeedback && (
          <Feedback isCorrect={isCorrect}>
            {isCorrect ? "✅ Resposta correta!" : "❌ Resposta incorreta!"}
          </Feedback>
        )}
        <Navegacao>
          <Link to="/atividades">
            <button>Voltar</button>
          </Link>
          {proxButton()}
        </Navegacao>
      </Page>
    </>
  );
}

const Navegacao = styled.ul`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: absolute;
  bottom: 25px;
  display: flex;
  justify-content: space-between;
`;

const Page = styled.main`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  width: 100%;
  margin: 20px 0;
  text-align: center;
  color: #0070c0;
  font-size: 40px;
`;

const Titulo = styled.h2`
  width: 100%;
  margin: 15px 0;
  text-align: center;
  color: green;
  font-size: 30px;
`;

const Dado = styled.p`
  color: rgb(7, 166, 219);
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Pergunta = styled.p`
  font-size: 30px;
  color: green;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Play = styled("ion-icon")`
  font-size: 50px;
  &:hover {
    color: green;
  }
`;

const Alternativas = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Alternativa = styled.p`
  font-size: 50px;
  margin: 50px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  font-size: 24px;
  background-color: #0070c0;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background-color: #005b8c;
  }
`;

const Feedback = styled.div`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => (props.isCorrect ? "green" : "red")};
`;
