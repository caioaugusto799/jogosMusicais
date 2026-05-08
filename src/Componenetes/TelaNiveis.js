import { useParams, Link } from 'react-router-dom';
import styled from "styled-components";
import { getNiveis, getAtividades, getCompletion } from "../Dados/Dados";

export default function TelaNiveis() {
    const { nomeAtividade } = useParams();
    const ativs = getAtividades();
    const niveis = getNiveis(nomeAtividade);
    
    return (
        <Container>
            <Header>Vamos Cirandar!</Header>

            <AreaConteudo>
                <SubTitulo>{ativs.get(nomeAtividade)}</SubTitulo>
                
                <ListaNiveis>
                    {/* Nível 1 - (Sempre Aberto) */}
                    <Link to={`/atividade/${nomeAtividade}/1/1`} style={{ textDecoration: 'none' }}>
                        <BotaoNivel Aberto={true}>
                            Nível 1 
                            <ion-icon name="lock-open-outline"></ion-icon>
                        </BotaoNivel>
                    </Link>

                    {/* Mapeamento filtrado: ignoramos o 1 porque já está acima */}
                    {niveis.filter(n => n > 1).map(nivel => {
                        const estaConcluidoAnterior = getCompletion(nomeAtividade, nivel - 1);
                        
                        if (estaConcluidoAnterior) {
                            return (
                                <Link key={nivel} to={`/atividade/${nomeAtividade}/${nivel}/1`} style={{ textDecoration: 'none' }}>
                                    <BotaoNivel Aberto={true}>
                                        Nível {nivel} 
                                        <ion-icon name="lock-open-outline"></ion-icon>
                                    </BotaoNivel>
                                </Link>
                            );
                        } else {
                            return (
                                <BotaoNivel key={nivel} Aberto={false}>
                                    Nível {nivel} 
                                    <ion-icon name="lock-closed-outline"></ion-icon>
                                </BotaoNivel>
                            );
                        }
                    })}
                </ListaNiveis>
            </AreaConteudo>

            <NavegacaoRodape>
                <Link to="/atividades" style={{ textDecoration: 'none' }}>
                    <BotaoAcao>Voltar</BotaoAcao>
                </Link>
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
  font-family: 'Comic Sans MS', sans-serif;
`;

const Header = styled.h1`
  position: absolute;
  top: 40px;
  width: 100%;
  text-align: center;
  font-size: 70px;
  color: #0070c0;
  text-transform: uppercase;
  font-weight: bold;
`;

const AreaConteudo = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 160px;
`;

const SubTitulo = styled.h2`
  font-size: 40px;
  color: #00b050;
  font-weight: bold;
  margin-bottom: 40px;
  text-transform: uppercase;
`;

const ListaNiveis = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BotaoNivel = styled.button`
  width: 450px;
  font-size: 30px;
  padding: 20px;
  border-radius: 50px;
  font-family: 'Comic Sans MS', sans-serif;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  
  background: ${props => props.Aberto 
    ? "linear-gradient(180deg, #00b050 0%, #00e676 100%)" 
    : "linear-gradient(180deg, #bdc3c7 0%, #95a5a6 100%)"};
  
  border: 5px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  cursor: ${props => props.Aberto ? "pointer" : "not-allowed"};
  transition: all 0.3s ease-out;

  ion-icon { font-size: 35px; }

  &:hover {
    ${props => props.Aberto && `
        transform: translateY(-5px) scale(1.03);
        box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.3);
    `}
  }
`;

const NavegacaoRodape = styled.div`
  width: 100%;
  padding: 0 100px;
  position: absolute;
  bottom: 40px;
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
`;

const BotaoAcao = styled.button`
  width: 220px;
  font-size: 28px;
  padding: 15px 0;
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

  &:hover {
    transform: translateY(-5px);
    background: linear-gradient(180deg, #0088e6 0%, #17c8ff 100%);
  }
`;