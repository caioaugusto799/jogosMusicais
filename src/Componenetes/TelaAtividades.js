import styled from "styled-components";
import { Link } from "react-router-dom";

export default function TelaAtividades() {
  const handleExit = () => {
    if (window.confirm("Tem certeza de que deseja sair?")) {
      window.close();
      window.location.href = "/";
    }
  };

  return (
    <Container>
      <FundoParque src="/Audios/Video/parque_loop_nuvens.gif" alt="" />

      <CaixaTitulo>
        <Header>Vamos Cirandar!</Header>
      </CaixaTitulo>

      <AreaConteudo>
        <CaixaOpcoes>
          <RotuloOpcoes>
            <ion-icon name="list-outline"></ion-icon>
            Escolha uma atividade
          </RotuloOpcoes>
          <ListaJogos>
            <Link to="/atividade/qual_e_o_par" style={{ textDecoration: 'none' }}>
              <BotaoJogo>
                <ion-icon name="extension-puzzle-outline"></ion-icon>
                <span>Qual é o par?</span>
              </BotaoJogo>
            </Link>

            <Link to="/atividade/rapido_devagar" style={{ textDecoration: 'none' }}>
              <BotaoJogo>
                <ion-icon name="speedometer-outline"></ion-icon>
                <span>Mais Rápido ou Mais Devagar</span>
              </BotaoJogo>
            </Link>

            <Link to="/atividade/grave_agudo" style={{ textDecoration: 'none' }}>
              <BotaoJogo>
                <ion-icon name="swap-vertical-outline"></ion-icon>
                <span>Mais Agudo ou Mais Grave</span>
              </BotaoJogo>
            </Link>
          </ListaJogos>
        </CaixaOpcoes>
      </AreaConteudo>

      <NavegacaoRodape>
        <Link to="/exemplos" style={{ textDecoration: 'none' }}>
          <BotaoAcao>Voltar</BotaoAcao>
        </Link>

        <BotaoAcao onClick={handleExit}>Sair</BotaoAcao>
      </NavegacaoRodape>
    </Container>
  );
}


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

/* Mesmo GIF em loop da TelaInicial (nuvens se movendo no parque), reaproveitado
   aqui pra manter a mesma identidade visual entre as duas telas. Fica atrás de
   tudo (z-index -1) — os cartões brancos de título e opções continuam com
   fundo opaco próprio, então a legibilidade não depende de escurecer a
   imagem. */
const FundoParque = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const CaixaTitulo = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);

  background-color: #ffffff;
  border: 4px solid #0070c0;
  border-radius: 30px;
  padding: 15px 50px;
`;

const Header = styled.h1`
  width: 100%;
  text-align: center;

  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-size: 58px;
  color: #0070c0;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 3px;

  padding-bottom: 12px;
  border-bottom: 5px solid #00b0f0;
`;

const AreaConteudo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Alinha o conteúdo começando pelo topo */
  align-items: center;
  padding-top: 200px; /* Dá espaço para o Header não cobrir os botões */

  /* Precisa ser "positioned" (mesmo sem z-index explícito) pra ficar acima
     do FundoParque: um elemento position:absolute sempre pinta por cima de
     conteúdo estático do mesmo pai, independente da ordem no DOM. Sem isso,
     o fundo cobriria os botões em vez de ficar atrás deles. */
  position: relative;
`;

const CaixaOpcoes = styled.div`
  background-color: #ffffff;
  border: 4px solid #00b050;
  border-radius: 30px;
  padding: 55px 90px;
  min-width: 700px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RotuloOpcoes = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;

  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;

  background-color: #00b050;
  border-radius: 50px;
  padding: 10px 22px;
  margin-bottom: 30px;

  ion-icon {
    font-size: 22px;
  }
`;

const ListaJogos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
`;

const NavegacaoRodape = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 40px;
  position: absolute;
  bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BotaoJogo = styled.button`
  width: 650px;
  height: auto;
  min-height: 105px;
  font-size: 34px;
  padding: 22px 35px;
  border-radius: 60px;
  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  border: 6px solid rgba(255, 255, 255, 0.9);
  background: linear-gradient(180deg, #00b050 0%, #00e676 100%);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease-out;

  display: grid;
  grid-template-columns: 70px 1fr;
  align-items: center;

  ion-icon {
    font-size: 42px;
    justify-self: center;
  }

  span {
    justify-self: center;
    text-align: center;
    line-height: 1.2;
    min-width: 0;
    width: 100%;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.4);
    background: linear-gradient(180deg, #00cc5c 0%, #33ff99 100%);
  }

  &:active {
    transform: translateY(4px) scale(0.97);
  }
`;

const BotaoAcao = styled.button`
  width: 200px;
  font-size: 28px;
  padding: 15px 0;
  border-radius: 50px;
  font-family: 'Fredoka', 'Comic Sans MS', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
  background: linear-gradient(180deg, #0070c0 0%, #00b0f0 100%);
  border: 4px solid rgba(255, 255, 255, 0.9);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    transform: translateY(-5px) scale(1.05);
    background: linear-gradient(180deg, #0088e6 0%, #17c8ff 100%);
  }

  &:active {
    transform: translateY(2px) scale(0.96);
  }
`;