export type Insurer = "Seguros Alfa" | "Porto Vida" | "Bandeirante Seguros" | "Norte Seguradora"

export type ServiceOrder = {
  id: string
  plate: string
  model: string
  color: string
  location: string
  locationType: "Pátio" | "Concessionária" | "Casa do Cliente"
  distanceKm: number
  insurer: Insurer
  dentsBudget: number
  estimatedValue: number
  isNew?: boolean
}

export type Receivable = {
  id: string
  plate: string
  insurer: Insurer
  date: string
  value: number
  status: "Aguardando" | "Glosado" | "Liberado"
}

export const newOrders: ServiceOrder[] = [
  {
    id: "OS-2041",
    plate: "RQK7A22",
    model: "VW Nivus Highline",
    color: "Prata",
    location: "Pátio Central - Av. das Nações, 1200",
    locationType: "Pátio",
    distanceKm: 3.4,
    insurer: "Porto Vida",
    dentsBudget: 10,
    estimatedValue: 1850,
    isNew: true,
  },
  {
    id: "OS-2042",
    plate: "FGT2B18",
    model: "Toyota Corolla XEI",
    color: "Branco Pérola",
    location: "Concessionária Prime - Rod. BR-101, km 12",
    locationType: "Concessionária",
    distanceKm: 8.1,
    insurer: "Seguros Alfa",
    dentsBudget: 6,
    estimatedValue: 1120,
    isNew: true,
  },
  {
    id: "OS-2043",
    plate: "KLM9C05",
    model: "Honda HR-V Touring",
    color: "Cinza Grafite",
    location: "Casa do Cliente - Rua Ipê Amarelo, 45",
    locationType: "Casa do Cliente",
    distanceKm: 12.7,
    insurer: "Bandeirante Seguros",
    dentsBudget: 14,
    estimatedValue: 2400,
  },
  {
    id: "OS-2044",
    plate: "PNB4D91",
    model: "Jeep Compass Longitude",
    color: "Preto",
    location: "Pátio Norte - Av. Industrial, 890",
    locationType: "Pátio",
    distanceKm: 5.9,
    insurer: "Norte Seguradora",
    dentsBudget: 9,
    estimatedValue: 1670,
  },
]

export const activeOrder: ServiceOrder = newOrders[0]

export const receivables: Receivable[] = [
  { id: "OS-1988", plate: "RQK7A22", insurer: "Porto Vida", date: "12/09", value: 1850, status: "Aguardando" },
  { id: "OS-1987", plate: "HTZ5F33", insurer: "Seguros Alfa", date: "11/09", value: 980, status: "Aguardando" },
  { id: "OS-1985", plate: "LWP8G12", insurer: "Bandeirante Seguros", date: "09/09", value: 2200, status: "Glosado" },
  { id: "OS-1982", plate: "MNC3H77", insurer: "Norte Seguradora", date: "07/09", value: 1340, status: "Liberado" },
  { id: "OS-1980", plate: "QAZ1J46", insurer: "Porto Vida", date: "05/09", value: 1750, status: "Liberado" },
  { id: "OS-1979", plate: "BVC6K90", insurer: "Seguros Alfa", date: "04/09", value: 620, status: "Glosado" },
  { id: "OS-1977", plate: "DFR2L58", insurer: "Norte Seguradora", date: "02/09", value: 2050, status: "Liberado" },
]

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}
