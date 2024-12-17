const Atividades = [
  {
    nome: "qual_e_o_par",
    titulo: "Qual é o par?",
    niveis: [
      {
        titulo: "Nível 1",
        status: true,
        audios: [
          {
            atividade: 1,
            dado: "TrechoDado_Ciranda_Parte1_FaM_AndBase",
            alternativas: [
              { audio: "OpcaoA_CaiCaiBalao_Parte2_FaM_AndBase", certa: false },
              { audio: "OpcaoB_Ciranda_Parte2_FaM_AndBase", certa: true },
            ],
          },

          {
            atividade: 2,
            dado: "TrechoDado_Ciranda_Parte1_FaM_AndBase",
            alternativas: [
              { audio: "OpcaoB_Ciranda_Parte2_FaM_AndBase", certa: true },
              { audio: "OpcaoA_ParabensVoce_Parte2_FaM_AndBase", certa: false },
              { audio: "OpcaoC_CaiCaiBalao_Parte2_FaM_AndBase", certa: false },
            ],
          },

          {
            atividade: 3,
            dado: "TrechoDado_Ciranda_Parte1_FaM_AndBase",
            alternativas: [
              { audio: "OpcaoA_Parabens_Parte1_FaM_AndBase", certa: false },
              { audio: "OpcaoB_SitioMario_Parte1_FaM_AndBase", certa: false },
              { audio: "OpcaoD_CaiCaiBalao_Parte1_FaM_AndBase", certa: false },
              { audio: "OpcaoC_Ciranda_Parte1_FaM_AndBase", certa: true },
            ],
          },
        ],
      },

      {
        titulo: "Nível 2",
        status: true,
        audios: [
          {
            atividade: 1,
            dado: "TrechoDado_Ciranda_Parte1_FaM_AndBase",
            alternativas: [
              { audio: "OpcaoA_CaiCaiBalao_Parte2_FaM_AndBase", certa: false },
              { audio: "OpcaoB_Ciranda_Parte2_FaM_AndBase", certa: true },
            ],
          },

          {
            atividade: 2,
            dado: "TrechoDado_Ciranda_Parte1_FaM_AndBase",
            alternativas: [
              { audio: "OpcaoA_ParabensVoce_Parte2_FaM_AndBase", certa: false },
              { audio: "OpcaoB_Ciranda_Parte2_FaM_AndBase", certa: true },
              { audio: "OpcaoC_CaiCaiBalao_Parte2_FaM_AndBase", certa: false },
            ],
          },

          {
            atividade: 3,
            dado: "TrechoDado_Ciranda_Parte1_FaM_AndBase",
            alternativas: [
              { audio: "OpcaoC_Ciranda_Parte1_FaM_AndBase", certa: true },
              { audio: "OpcaoB_SitioMario_Parte1_FaM_AndBase", certa: false },
              { audio: "OpcaoA_Parabens_Parte1_FaM_AndBase", certa: false },
              { audio: "OpcaoD_CaiCaiBalao_Parte1_FaM_AndBase", certa: false },
            ],
          },
        ],
      },

      {
        titulo: "Nível 3",
        status: true,
        audios: [
          {
            atividade: 1,
            dado: "TrechoDado_Ciranda_Parte1_FaM_AndBase",
            alternativas: [
              { audio: "OpcaoA_CaiCaiBalao_Parte2_FaM_AndBase", certa: false },
              { audio: "OpcaoB_Ciranda_Parte2_FaM_AndBase", certa: true },
            ],
          },

          {
            atividade: 2,
            dado: "TrechoDado_Ciranda_Parte1_FaM_AndBase",
            alternativas: [
              { audio: "OpcaoA_ParabensVoce_Parte2_FaM_AndBase", certa: false },
              { audio: "OpcaoB_Ciranda_Parte2_FaM_AndBase", certa: true },
              { audio: "OpcaoC_CaiCaiBalao_Parte2_FaM_AndBase", certa: false },
            ],
          },

          {
            atividade: 3,
            dado: "TrechoDado_Ciranda_Parte1_FaM_AndBase",
            alternativas: [
              { audio: "OpcaoA_Parabens_Parte1_FaM_AndBase", certa: false },
              { audio: "OpcaoB_SitioMario_Parte1_FaM_AndBase", certa: false },
              { audio: "OpcaoC_Ciranda_Parte1_FaM_AndBase", certa: true },
              { audio: "OpcaoD_CaiCaiBalao_Parte1_FaM_AndBase", certa: false },
            ],
          },
        ],
      },

      {
        titulo: "Nível 4",
        status: false,
        audios: [{}],
      },
    ],
  },
  {
    nome: "mais_rapido_ou_mais_devagar",
    titulo: "Mais Rápido ou Mais Devagar",
    niveis: [
      { titulo: "Nível 1", status: true },
      { titulo: "Nível 2", status: true },
      { titulo: "Nível 3", status: true },
      { titulo: "Nível 4", status: false },
    ],
  },
  {
    nome: "mais_forte_ou_mais_fraco",
    titulo: "Mais Forte ou Mais Fraco",
    niveis: [
      { titulo: "Nível 1", status: false },
      { titulo: "Nível 2", status: false },
      { titulo: "Nível 3", status: false },
      { titulo: "Nível 4", status: false },
    ],
  },
  {
    nome: "mais_agudo_ou_mais_grave",
    titulo: "Mais Agudo ou Mais Grave",
    niveis: [
      { titulo: "Nível 1", status: true },
      { titulo: "Nível 2", status: true },
      { titulo: "Nível 3", status: true },
      { titulo: "Nível 4", status: false },
    ],
  },
];

export default Atividades;
