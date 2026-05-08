 Vamos Cirandar! - Jogo Musical Educativo
Vamos Cirandar! é uma aplicação web interativa e educativa desenvolvida em React pelo grupo ADACA. O jogo tem como objetivo introduzir conceitos musicais básicos (como percepção de tempo e altura) para o público infantil e portadores de TEA(Transtorno do Espectro Autista) de forma lúdica, utilizando a clássica cantiga brasileira "Ciranda, Cirandinha".

 Funcionalidades
Design Infantil e Intuitivo: Interface amigável com botões grandes, cores vibrantes, cantos arredondados, fontes divertidas (Comic Sans MS) e animações de feedback tátil.

Apresentação Interativa (Exemplos): Tela onde as crianças podem comparar conceitos musicais na prática antes de jogar (ex: Mais Rápido vs Mais Devagar, Agudo vs Grave).

Múltiplas Atividades:

Qual é o par? (Associação de trechos musicais).

Mais Rápido ou Mais Devagar (Percepção de Tempo/BPM).

Mais Agudo ou Mais Grave (Percepção de Altura/Frequência).

Sistema de Progressão (Níveis): Os níveis seguintes apenas são desbloqueados (visualização com ícone de cadeado) quando o jogador conclui o nível anterior com sucesso.

Feedback Visual e Sonoro: Retorno imediato (Correto/Incorreto) em cada tentativa, além de telas de celebração ao finalizar níveis.

Gerenciamento Inteligente de Áudio: O áudio é pausado automaticamente ao mudar de tela, evitando sobreposição de sons.

Salvamento de Progresso: Utiliza o local-storage para salvar as atividades concluídas.

 Tecnologias Utilizadas
Este projeto foi construído com as seguintes ferramentas:

React: Biblioteca JavaScript para construção da interface.

React Router Dom: Gerenciamento de rotas e navegação fluida entre as telas do jogo (SPA).

Styled Components: Estilização da aplicação baseada em componentes, permitindo CSS dinâmico e encapsulado.

Local Storage: Persistência de dados locais para salvar o progresso dos níveis.

Web Audio API (HTML5 Audio): Manipulação nativa de áudio no navegador.

Ionicons: Utilizado para os ícones de interface (Play, Cadeados, etc).

 Estrutura do Projeto
Abaixo está a estrutura principal de diretórios e arquivos do projeto:

Plaintext

 src
 ┣  Componenetes      # Telas e views principais do jogo
 ┃ ┣  TelaAtividade.js   # Lógica principal do jogo (Game Loop, perguntas e respostas)
 ┃ ┣  TelaAtividades.js  # Menu de seleção das categorias de jogos
 ┃ ┣  TelaExemplos.js    # Tela de introdução aos conceitos musicais
 ┃ ┣  TelaInicial.js     # Tela de boas-vindas
 ┃ ┣  TelaNiveis.js      # Menu de seleção de dificuldade com trava de progressão
 ┃ ┗  TelaVideo.js       # Espaço reservado para vídeo introdutório
 ┣  Dados             # Lógica de negócio e persistência de dados
 ┃ ┣  Dados.js           # Funções de busca, validação e salvamento de progresso
 ┃ ┗  dados_fixos.js     # Base de dados estática (textos, caminhos de áudio, respostas)
 ┣  App.js            # Configuração principal de Rotas (React Router)
 ┣  index.js          # Ponto de entrada da aplicação React
 ┣  reset.css         # Reset de estilos padrão do navegador
 ┣  style.css         # Estilos globais adicionais
 ┗  styled.js         # Componentes estilizados globais/compartilhados
    Como Rodar o Projeto Localmente
Siga os passos abaixo para executar o jogo na sua máquina local:

Pré-requisitos
Ter o Node.js instalado.

Os arquivos de áudio (formato .wav ou .mp3) devem estar localizados na pasta public/Audios/ para que o React consiga acessá-los durante a execução.

Instalação
Clone este repositório ou baixe o código fonte.

Abra o terminal na pasta raiz do projeto.

Instale as dependências executando:

Bash

npm install
Execução
Para iniciar o servidor de desenvolvimento, rode o comando:

Bash

npm start
A aplicação será aberta automaticamente no seu navegador no endereço http://localhost:3000.