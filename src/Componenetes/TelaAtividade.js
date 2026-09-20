import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { getInfos, getAtividades, setCompletion } from "../Dados/Dados";

export default function TelaAtividade() {
  const { nomeAtividade, nivel, passo } = useParams();
  const [infos, def, texto] = getInfos(nomeAtividade, nivel, passo);

  const [sound, setSound] = useState(new Audio());
  const [sel, setSel] = useState(null);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [ouvido, setOuvido] = useState(false);
  const [erros, setErros] = useState(0);
  const [mostrarDica, setMostrarDica] = useState(false);

  useEffect(() => {
    return () => {
      if (sound) sound.pause();
    };
  }, [sound]);

  // Reinicia a etapa (esconde pergunta/alternativas) sempre que o nível ou o passo mudam
  useEffect(() => {
    setOuvido(false);
    setErros(0);
    setMostrarDica(false);
  }, [nivel, passo]);

  // Dica após 3 respostas erradas na mesma pergunta
  useEffect(() => {
    if (erros >= 3) setMostrarDica(true);
  }, [erros]);

  // Dica após 10s sem nenhuma interação com as alternativas (reinicia a cada clique)
  useEffect(() => {
    if (!ouvido) return undefined;
    const timer = setTimeout(() => setMostrarDica(true), 20000);
    return () => clearTimeout(timer);
  }, [ouvido, sel, nivel, passo]);

  function playAudio(elemento, isOpcao = false) {
    if (isOpcao) {
      setSel(elemento);
      setShowConfirmButton(true);
    }
    setShowFeedback(false);
    sound.pause();

    const musica = "/Audios/" + elemento.arquivo;
    const new_sound = new Audio(musica);
    if (!isOpcao) {
      new_sound.onended = () => setOuvido(true);
    }
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
        <FundoParque src="/Audios/Video/parque_loop_nuvens.gif" alt="" />
        <Sobreposicao />

        <CaixaTitulo>
          <HeaderTitulo>Vamos Cirandar</HeaderTitulo>
        </CaixaTitulo>

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
      <FundoParque src="/Audios/Video/parque_loop_nuvens.gif" alt="" />
      <Sobreposicao />

      <MarcadorPagina>{nivel}.{passo}</MarcadorPagina>
      <CaixaTitulo>
        <HeaderTitulo>Vamos Cirandar</HeaderTitulo>
      </CaixaTitulo>

      <AreaConteudo>
        <SubTitulo>{getAtividades()[nomeAtividade]}</SubTitulo>

        <CaixaInstrucao>
          <TextoConvite>Vamos ouvir a Ciranda?</TextoConvite>
          <BotaoOuvir onClick={() => playAudio(def, false)}>
            <ion-icon name="play-circle"></ion-icon>
            Ouvir Áudio
          </BotaoOuvir>
        </CaixaInstrucao>

        {ouvido && (
          <>
            <CaixaPergunta>
              <RotuloPergunta>
                <ion-icon name="help-circle-outline"></ion-icon>
                Pergunta
              </RotuloPergunta>
              <Pergunta>{texto}</Pergunta>
            </CaixaPergunta>

            <TextoDica visivel={mostrarDica}>💡 Preste atenção nessa opção</TextoDica>

            <AlternativasContainer>
              {infos.map((elemento) => {
                // Só a alternativa escolhida ganha cor de resultado, e só
                // depois de confirmada — antes disso, "selecionado" apenas
                // destaca em azul (neutro), sem antecipar se está certa.
                const resultado =
                  showFeedback && elemento === sel
                    ? isCorrect
                      ? "correto"
                      : "errado"
                    : null;

                return (
                  <BotaoAlternativa
                    key={elemento.opcao}
                    selecionado={elemento === sel}
                    resultado={resultado}
                    dica={mostrarDica && elemento.corr === 1}
                    onClick={() => playAudio(elemento, true)}
                  >
                    {elemento.opcao}
                  </BotaoAlternativa>
                );
              })}
            </AlternativasContainer>

            <AreaFeedback>
              {showConfirmButton && (
                <BotaoVerde
                  onClick={() => {
                    const correto = sel && sel.corr === 1;
                    setIsCorrect(correto);
                    setShowFeedback(true);
                    setShowConfirmButton(false);
                    if (!correto) setErros((e) => e + 1);
                  }}
                >
                  Confirmar
                </BotaoVerde>
              )}
              {showFeedback && <Feedback isCorrect={isCorrect}>{isCorrect ? "✅ Acertou! Muito bem!" : "❌ Não foi essa. Tente de novo!"}</Feedback>}
            </AreaFeedback>
          </>
        )}
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
  font-family: 'Nunito', 'Comic Sans MS', sans-serif;
`;

/* Mesmo GIF de fundo usado em TelaInicial/TelaAtividades. z-index precisa
   ser 0 (não -1): com -1 a imagem escapa pra trás do background-color do
   Container e fica invisível — foi exatamente o bug que resolvemos na
   TelaAtividades. */
const FundoParque = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

/* Veu translucido por cima do fundo: reduz saturacao/contraste da foto
   pra nao competir com botoes/texto que ficam direto sobre a imagem
   (sem cartao branco atras), como o A/B da tela de perguntas. */
const Sobreposicao = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(240, 248, 255, 0.35);
  z-index: 0;
`;

const MarcadorPagina = styled.div`
  position: absolute;
  top: 30px;
  right: 40px;
  z-index: 1;
  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-size: 38px;
  font-weight: 600;
  color: #0070c0;
  background: white;
  padding: 15px 30px;
  border-radius: 25px;
  border: 4px solid #0070c0;
  box-shadow: 0px 5px 15px rgba(0,0,0,0.15);
`;

const CaixaTitulo = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;

  background-color: #ffffff;
  border: 4px solid #0070c0;
  border-radius: 30px;
  padding: 12px 45px;
`;

const HeaderTitulo = styled.h1`
  width: 100%;
  text-align: center;
  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-size: 42px;
  color: #0070c0;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 2px;

  padding-bottom: 8px;
  border-bottom: 4px solid #00b0f0;
`;

/* Precisa ser "positioned" (position: relative já basta) pra ficar acima do
   FundoParque — do contrário, um elemento position:absolute sempre pinta
   por cima de conteúdo estático do mesmo pai, cobrindo os cartões. */
const AreaConteudo = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centraliza o conteúdo principal */
  padding-top: 110px;
  padding-bottom: 100px;
  position: relative;
  z-index: 1;
`;

const SubTitulo = styled.h2`
  font-size: 35px;
  color: #00b050;
  font-weight: 700;
  margin-bottom: 25px;
`;

const CaixaInstrucao = styled.div`
  background: white;
  padding: 30px 50px;
  border-radius: 35px;
  border: 5px solid #00b0f0;
  box-shadow: 0px 8px 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 35px;
  min-width: 750px;
  margin-bottom: 55px;
`;

const TextoConvite = styled.p`
  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-size: 30px;
  font-weight: 600;
  color: #0070c0;
`;

const CaixaPergunta = styled.div`
  background: white;
  padding: 30px 50px;
  border-radius: 35px;
  border: 5px solid #00b050;
  box-shadow: 0px 8px 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 750px;
  margin-bottom: 70px;
`;

const RotuloPergunta = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;

  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;

  background-color: #00b050;
  border-radius: 50px;
  padding: 8px 18px;
  margin-bottom: 12px;

  ion-icon {
    font-size: 20px;
  }
`;

const entrada = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const CaixaVitoria = styled(CaixaInstrucao)`
  border: 8px solid #ffcc00; /* Borda dourada para vitória */
  box-shadow: 0px 0px 30px rgba(255, 204, 0, 0.5);
  padding: 60px 100px;

  animation: ${entrada} 0.6s ease-out;
  animation-fill-mode: backwards;
`;

const TextoParabens = styled.p`
  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-size: 80px;
  color: #ffcc00;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  margin-bottom: 20px;
`;

const TextoConclusao = styled.div`
  font-size: 40px;
  text-align: center;
  color: #0070c0;
  font-weight: 700;
  line-height: 1.4;

  .destaque-verde { color: #00b050; font-size: 50px; }
`;

const BotaoOuvir = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;

  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;

  background: linear-gradient(180deg, #0070c0 0%, #00b0f0 100%);
  border: 5px solid rgba(255, 255, 255, 0.9);
  border-radius: 50px;
  padding: 25px 60px;
  cursor: pointer;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;

  ion-icon {
    font-size: 60px;
  }

  &:hover {
    transform: translateY(-5px);
    background: linear-gradient(180deg, #0088e6 0%, #17c8ff 100%);
  }
`;

// Sempre ocupa o mesmo espaço (fica só com opacidade 0 quando escondida)
// pra não empurrar o resto do conteúdo — inclusive o botão "Confirmar" —
// pra baixo bem na hora em que a dica aparece.
const TextoDica = styled.p`
  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #ad8b00;
  background: #fff8e1;
  border: 3px solid #ffcc00;
  border-radius: 50px;
  padding: 10px 24px;
  margin-bottom: 20px;

  opacity: ${(props) => (props.visivel ? 1 : 0)};
  visibility: ${(props) => (props.visivel ? "visible" : "hidden")};
  pointer-events: none;
  transition: opacity 0.3s ease-out;
`;

const Pergunta = styled.p`
  font-size: 36px;
  color: #00b050;
  font-weight: 700;
  text-align: center;
`;

const AlternativasContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 30px;
`;

// Cor por estado, nessa ordem de prioridade: resultado (depois de
// confirmar) > selecionado (escolhida, ainda não confirmada) > neutro.
// Verde e vermelho ficam reservados só pro resultado — não aparecem antes
// de confirmar, pra não sugerir "certo/errado" antes da hora.
function corDeFundo(props) {
  if (props.resultado === "correto") return "linear-gradient(180deg, #00b050 0%, #00e676 100%)";
  if (props.resultado === "errado") return "linear-gradient(180deg, #ff4757 0%, #ff6b81 100%)";
  if (props.selecionado) return "linear-gradient(180deg, #0070c0 0%, #00b0f0 100%)";
  return "#ffffff";
}

function corDoTexto(props) {
  if (props.resultado || props.selecionado) return "white";
  return "#0070c0";
}

function corDaBorda(props) {
  if (props.resultado === "correto") return "6px solid #00b050";
  if (props.resultado === "errado") return "6px solid #ff4757";
  if (props.selecionado) return "6px solid #0070c0";
  return "5px solid #0070c0";
}

const BotaoAlternativa = styled.button`
  font-size: 55px;
  width: 110px;
  height: 110px;
  border-radius: 30px;
  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-weight: 600;
  cursor: pointer;
  color: ${corDoTexto};
  background: ${corDeFundo};
  border: ${corDaBorda};
  box-shadow: ${(props) => (props.selecionado ? "0px 0px 0px 4px rgba(0, 112, 192, 0.3), 0px 10px 20px rgba(0, 0, 0, 0.25)" : "0px 10px 20px rgba(0, 0, 0, 0.2)")};
  outline: ${(props) => (props.dica ? "6px solid #ffcc00" : "none")};
  outline-offset: 6px;
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
  font-weight: 700;
  color: ${(props) => (props.isCorrect ? "#00b050" : "#ff4757")};
  background: white;
  padding: 15px 40px;
  border-radius: 20px;
  border: 4px solid ${(props) => (props.isCorrect ? "#00b050" : "#ff4757")};
`;

// A faixa em si cobre a largura inteira da tela, inclusive onde não tem
// nenhum botão visível. Sem "pointer-events: none" aqui, essa área vazia
// intercepta cliques destinados a qualquer coisa que fique por baixo dela
// (como o botão "Confirmar", quando o conteúdo acima empurra ele pra perto
// do rodapé) — o clique só "passava" na fatia exata onde o botão de baixo
// escapava da faixa. Os botões dela mesma recebem "pointer-events: auto"
// de volta pra continuarem clicáveis.
const NavegacaoRodape = styled.div`
  width: 100%;
  padding: 0 100px;
  position: absolute;
  bottom: 40px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;

const BotaoAcao = styled.button`
  width: 230px;
  font-size: 30px;
  padding: 18px 0;
  border-radius: 50px;
  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-weight: 600;
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