import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { getInfos, getAtividades, setCompletion } from "../Dados/Dados";

export default function TelaAtividade() {
  const { nomeAtividade, nivel, passo } = useParams();
  const [infos, def, texto] = getInfos(nomeAtividade, nivel, passo);

  const [sound, setSound] = useState(new Audio());
  const [sel, setSel] = useState(null);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    return () => {
      if (sound) sound.pause();
    };
  }, [sound]);

  function playAudio(elemento, isOpcao = false) {
    if (isOpcao) {
      setSel(elemento);
      setShowConfirmButton(true);
    }
    setShowFeedback(false);
    sound.pause();

    const musica = "/Audios/" + elemento.arquivo;
    const new_sound = new Audio(musica);
    new_sound.play();
    setSound(new_sound);
  }

  const ativText = () => {
    const cores = { verde: "#00b050", azul: "#0070c0" };
    if (nomeAtividade === "qual_e_o_par") return <span style={{ color: cores.verde }}>Qual é o Par?</span>;
    if (nomeAtividade === "rapido_devagar") return (
      <>
        <span style={{ color: cores.verde }}>Mais Rápido </span>
        <span style={{ color: cores.azul }}>ou </span>
        <span style={{ color: cores.verde }}>Mais Devagar</span>
      </>
    );
    if (nomeAtividade === "grave_agudo") return (
      <>
        <span style={{ color: cores.verde }}>Mais Agudo </span>
        <span style={{ color: cores.azul }}>ou </span>
        <span style={{ color: cores.verde }}>Mais Grave</span>
      </>
    );
    return <></>;
  };

  // ==========================================
  // TELA DE VITÓRIA (FINALIZAÇÃO)
  // ==========================================
  if (infos.length === 0) {
    setCompletion(nomeAtividade, nivel);
    
    return (
      <Container>
        <HeaderTitulo>VAMOS CIRANDAR!</HeaderTitulo>
        
        <AreaConteudo>
          <CaixaVitoria>
            <TextoParabens>PARABÉNS!!!!</TextoParabens>
            
            {nivel < 3 ? (
              <TextoConclusao>
                VOCÊ FINALIZOU O <br/>
                <span className="destaque-verde">NÍVEL {nivel}</span> <br/>
                COM SUCESSO!
              </TextoConclusao>
            ) : (
              <TextoConclusao>
                VOCÊ FINALIZOU A ATIVIDADE <br/>
                <div style={{margin: '20px 0'}}>{ativText()}</div>
                COM SUCESSO!
              </TextoConclusao>
            )}
          </CaixaVitoria>
        </AreaConteudo>

        <NavegacaoRodape>
          <Link to="/atividades" style={{ textDecoration: 'none' }} onClick={() => sound.pause()}>
            <BotaoAcao>Voltar</BotaoAcao>
          </Link>
          
          {nivel < 3 ? (
            <Link to={`/atividade/${nomeAtividade}`} style={{ textDecoration: 'none' }} onClick={() => sound.pause()}>
              <BotaoVerde>Avançar</BotaoVerde>
            </Link>
          ) : (
            <Link to="/atividades" style={{ textDecoration: 'none' }} onClick={() => sound.pause()}>
              <BotaoAcao>Parar</BotaoAcao>
            </Link>
          )}
        </NavegacaoRodape>
      </Container>
    );
  }

  // ==========================================
  // TELA DE JOGO
  // ==========================================
  const proxButton = () => {
    if (!showFeedback || !isCorrect) return <></>; 
    return (
      <Link
        to={{ pathname: `/atividade/${nomeAtividade}/${nivel}/${Number(passo) + 1}` }}
        style={{ textDecoration: 'none' }}
        onClick={() => { setSel(null); setShowConfirmButton(false); setShowFeedback(false); setIsCorrect(null); sound.pause(); }}
      >
        <BotaoVerde>Próximo</BotaoVerde>
      </Link>
    );
  };

  return (
    <Container>
      <MarcadorPagina>{nivel}.{passo}</MarcadorPagina>
      <HeaderTitulo>Vamos Cirandar</HeaderTitulo>
      
      <AreaConteudo>
        <SubTitulo>{getAtividades()[nomeAtividade]}</SubTitulo>
        
        <CaixaInstrucao>
          <Dado>
            <Play name="play-circle" onClick={() => playAudio(def, false)}></Play>
            <span>Ouça o início da Ciranda Cirandinha</span>
          </Dado>
          <Pergunta>{texto}</Pergunta>
        </CaixaInstrucao>

        <AlternativasContainer>
          {infos.map((elemento) => (
            <BotaoAlternativa
              key={elemento.opcao}
              selecionado={elemento === sel}
              onClick={() => playAudio(elemento, true)}
            >
              {elemento.opcao}
            </BotaoAlternativa>
          ))}
        </AlternativasContainer>

        <AreaFeedback>
          {showConfirmButton && <BotaoVerde onClick={() => { setIsCorrect(sel && sel.corr === 1); setShowFeedback(true); setShowConfirmButton(false); }}>Confirmar</BotaoVerde>}
          {showFeedback && <Feedback isCorrect={isCorrect}>{isCorrect ? "✅ Resposta Correta!" : "❌ Resposta Incorreta!"}</Feedback>}
        </AreaFeedback>
      </AreaConteudo>

      <NavegacaoRodape>
        <Link to="/atividades" style={{ textDecoration: 'none' }} onClick={() => sound.pause()}>
          <BotaoAcao>Voltar</BotaoAcao>
        </Link>
        {proxButton()}
      </NavegacaoRodape>
    </Container>
  );
}

// ==========================================
// ESTILIZAÇÃO
// ==========================================

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f0f8ff;
  position: relative;
  overflow: hidden;
  font-family: 'Comic Sans MS', sans-serif;
`;

const MarcadorPagina = styled.div`
  position: absolute;
  top: 30px;
  right: 40px;
  font-size: 38px;
  font-weight: bold;
  color: #0070c0;
  background: white;
  padding: 15px 30px;
  border-radius: 25px;
  border: 4px solid #0070c0;
  box-shadow: 0px 5px 15px rgba(0,0,0,0.15);
`;

const HeaderTitulo = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 60px;
  color: #0070c0;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 40px;
`;

const AreaConteudo = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centraliza o conteúdo principal */
  padding-bottom: 100px;
`;

const SubTitulo = styled.h2`
  font-size: 35px;
  color: #00b050;
  font-weight: bold;
  margin-bottom: 25px;
`;

const CaixaInstrucao = styled.div`
  background: white;
  padding: 25px 50px;
  border-radius: 35px;
  border: 5px solid #00b0f0;
  box-shadow: 0px 8px 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const CaixaVitoria = styled(CaixaInstrucao)`
  border: 8px solid #ffcc00; /* Borda dourada para vitória */
  box-shadow: 0px 0px 30px rgba(255, 204, 0, 0.5);
  padding: 60px 100px;
`;

const TextoParabens = styled.p`
  font-size: 80px;
  color: #ffcc00;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  margin-bottom: 20px;
`;

const TextoConclusao = styled.div`
  font-size: 40px;
  text-align: center;
  color: #0070c0;
  font-weight: bold;
  line-height: 1.4;
  
  .destaque-verde { color: #00b050; font-size: 50px; }
`;

const Dado = styled.div`
  color: #0070c0;
  font-size: 42px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
`;

const Play = styled("ion-icon")`
  font-size: 140px; 
  color: #0070c0;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { color: #00b050; transform: scale(1.1); }
`;

const Pergunta = styled.p`
  font-size: 36px;
  color: #00b050;
  font-weight: bold;
  text-align: center;
`;

const AlternativasContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 30px;
`;

const BotaoAlternativa = styled.button`
  font-size: 55px;
  width: 110px;
  height: 110px;
  border-radius: 30px;
  font-family: 'Comic Sans MS', sans-serif;
  font-weight: bold;
  cursor: pointer;
  color: white;
  background: ${(props) => (props.selecionado ? "linear-gradient(180deg, #ff4757 0%, #ff6b81 100%)" : "linear-gradient(180deg, #00b050 0%, #00e676 100%)")};
  border: 5px solid white;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;
  &:hover { transform: translateY(-8px); }
`;

const AreaFeedback = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Feedback = styled.div`
  font-size: 38px;
  font-weight: bold;
  color: ${(props) => (props.isCorrect ? "#00b050" : "#ff4757")};
  background: white;
  padding: 15px 40px;
  border-radius: 20px;
  border: 4px solid ${(props) => (props.isCorrect ? "#00b050" : "#ff4757")};
`;

const NavegacaoRodape = styled.div`
  width: 100%;
  padding: 0 100px; 
  position: absolute;
  bottom: 40px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box; 
`;

const BotaoAcao = styled.button`
  width: 230px;
  font-size: 30px;
  padding: 18px 0;
  border-radius: 50px;
  font-family: 'Comic Sans MS', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  background: linear-gradient(180deg, #0070c0 0%, #00b0f0 100%);
  border: 4px solid rgba(255, 255, 255, 0.9);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s;
  &:hover { transform: translateY(-5px); background: linear-gradient(180deg, #0088e6 0%, #17c8ff 100%); }
`;

const BotaoVerde = styled(BotaoAcao)`
  background: linear-gradient(180deg, #00b050 0%, #00e676 100%);
  &:hover { background: linear-gradient(180deg, #00cc5c 0%, #33ff99 100%); }
`;