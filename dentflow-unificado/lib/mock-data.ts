export type ServiceStatus =
  | "aguardando_avaliador"
  | "aprovado"
  | "a_caminho"
  | "em_execucao"
  | "concluido"
  | "glosado"
  | "recusado"

export const statusLabels: Record<ServiceStatus, string> = {
  aguardando_avaliador: "Aguardando Avaliador",
  aprovado: "Aprovado",
  a_caminho: "Funileiro a caminho",
  em_execucao: "Em execução",
  concluido: "Concluído",
  glosado: "Glosado",
  recusado: "Recusado",
}

export type Origem = "seguradora" | "cliente_direto"

export interface Servico {
  id: string
  placa: string
  cliente: string
  veiculo: string
  seguradora: string | null
  origem: Origem
  tecnico: string | null
  avaliador: string | null
  valorIA: number
  valorSeguradora: number | null
  valorFinal: number | null
  status: ServiceStatus
  esperaMin: number
  slaMin: number
  amassados: number
  cidade: string
  criadoEm: string
}

export const servicos: Servico[] = [
  {
    id: "SRV-2041",
    placa: "AB-529-KT",
    cliente: "Sophie Laurent",
    veiculo: "Renault Clio 2021",
    seguradora: "AXA Seguros",
    origem: "seguradora",
    tecnico: "Marco Silva",
    avaliador: "Elena Costa",
    valorIA: 420,
    valorSeguradora: 380,
    valorFinal: null,
    status: "aguardando_avaliador",
    esperaMin: 27,
    slaMin: 20,
    amassados: 3,
    cidade: "Lisboa",
    criadoEm: "09:12",
  },
  {
    id: "SRV-2042",
    placa: "1-GKD-234",
    cliente: "Lucas Meyer",
    veiculo: "VW Golf 2020",
    seguradora: "Allianz",
    origem: "seguradora",
    tecnico: "Rui Fonseca",
    avaliador: "Elena Costa",
    valorIA: 610,
    valorSeguradora: 590,
    valorFinal: null,
    status: "aguardando_avaliador",
    esperaMin: 8,
    slaMin: 20,
    amassados: 5,
    cidade: "Porto",
    criadoEm: "09:41",
  },
  {
    id: "SRV-2043",
    placa: "EF-771-MN",
    cliente: "Marta Oliveira",
    veiculo: "Peugeot 208 2022",
    seguradora: null,
    origem: "cliente_direto",
    tecnico: null,
    avaliador: "Elena Costa",
    valorIA: 250,
    valorSeguradora: null,
    valorFinal: null,
    status: "aguardando_avaliador",
    esperaMin: 15,
    slaMin: 20,
    amassados: 2,
    cidade: "Braga",
    criadoEm: "09:58",
  },
  {
    id: "SRV-2039",
    placa: "GH-108-QR",
    cliente: "Thomas Weber",
    veiculo: "BMW Série 1 2019",
    seguradora: "Generali",
    origem: "seguradora",
    tecnico: "Marco Silva",
    avaliador: "Elena Costa",
    valorIA: 890,
    valorSeguradora: 750,
    valorFinal: 820,
    status: "em_execucao",
    esperaMin: 12,
    slaMin: 20,
    amassados: 7,
    cidade: "Lisboa",
    criadoEm: "08:30",
  },
  {
    id: "SRV-2037",
    placa: "IJ-455-ST",
    cliente: "Camille Dubois",
    veiculo: "Audi A3 2021",
    seguradora: "AXA Seguros",
    origem: "seguradora",
    tecnico: "Rui Fonseca",
    avaliador: "Elena Costa",
    valorIA: 340,
    valorSeguradora: 340,
    valorFinal: 340,
    status: "a_caminho",
    esperaMin: 6,
    slaMin: 20,
    amassados: 2,
    cidade: "Coimbra",
    criadoEm: "08:05",
  },
  {
    id: "SRV-2031",
    placa: "KL-982-UV",
    cliente: "André Santos",
    veiculo: "Mercedes CLA 2020",
    seguradora: "Allianz",
    origem: "seguradora",
    tecnico: "Marco Silva",
    avaliador: "Elena Costa",
    valorIA: 1240,
    valorSeguradora: 1100,
    valorFinal: 1180,
    status: "concluido",
    esperaMin: 9,
    slaMin: 20,
    amassados: 9,
    cidade: "Lisboa",
    criadoEm: "Ontem",
  },
  {
    id: "SRV-2028",
    placa: "MN-330-WX",
    cliente: "Isabelle Moreau",
    veiculo: "Fiat 500 2018",
    seguradora: "Generali",
    origem: "seguradora",
    tecnico: "Rui Fonseca",
    avaliador: "Elena Costa",
    valorIA: 480,
    valorSeguradora: 300,
    valorFinal: null,
    status: "glosado",
    esperaMin: 34,
    slaMin: 20,
    amassados: 4,
    cidade: "Faro",
    criadoEm: "Ontem",
  },
  {
    id: "SRV-2022",
    placa: "OP-617-YZ",
    cliente: "Diogo Ramos",
    veiculo: "Toyota Corolla 2022",
    seguradora: null,
    origem: "cliente_direto",
    tecnico: "Marco Silva",
    avaliador: "Elena Costa",
    valorIA: 560,
    valorSeguradora: null,
    valorFinal: 560,
    status: "concluido",
    esperaMin: 11,
    slaMin: 20,
    amassados: 4,
    cidade: "Porto",
    criadoEm: "Ontem",
  },
]

export interface Tecnico {
  id: string
  nome: string
  funcao: "Funileiro" | "Avaliador"
  online: boolean
  cidade: string
  servicosHoje: number
  avaliacao: number
}

export const equipe: Tecnico[] = [
  { id: "T-01", nome: "Marco Silva", funcao: "Funileiro", online: true, cidade: "Lisboa", servicosHoje: 6, avaliacao: 4.9 },
  { id: "T-02", nome: "Rui Fonseca", funcao: "Funileiro", online: true, cidade: "Porto", servicosHoje: 4, avaliacao: 4.7 },
  { id: "T-03", nome: "Pedro Alves", funcao: "Funileiro", online: false, cidade: "Braga", servicosHoje: 2, avaliacao: 4.8 },
  { id: "T-04", nome: "Elena Costa", funcao: "Avaliador", online: true, cidade: "Lisboa", servicosHoje: 18, avaliacao: 5.0 },
  { id: "T-05", nome: "João Neves", funcao: "Avaliador", online: false, cidade: "Porto", servicosHoje: 9, avaliacao: 4.6 },
]

export const kpis = {
  totalMes: 342,
  ticketMedio: 528,
  taxaAprovacao: 87,
  tempoMedioMin: 34,
  receitaComissao: 27840,
}

export const serviePorDia = [
  { dia: "Seg", servicos: 42, receita: 3200 },
  { dia: "Ter", servicos: 51, receita: 4100 },
  { dia: "Qua", servicos: 38, receita: 2900 },
  { dia: "Qui", servicos: 60, receita: 5200 },
  { dia: "Sex", servicos: 72, receita: 6400 },
  { dia: "Sáb", servicos: 55, receita: 4300 },
  { dia: "Dom", servicos: 24, receita: 1740 },
]

export function eur(v: number) {
  return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v)
}
