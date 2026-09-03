// Dados de referência das linhas da SuperVia (simplificado para fins do app).
// A lista de estações é representativa, não exaustiva.
export const LINES = [
  {
    id: "deodoro",
    name: "Deodoro",
    color: "#00A651",
    stations: [
      "Central do Brasil", "São Cristóvão", "Maracanã", "Triagem",
      "Piedade", "Encantado", "Madureira", "Marechal Hermes", "Deodoro",
    ],
  },
  {
    id: "santa-cruz",
    name: "Santa Cruz",
    color: "#004C97",
    stations: [
      "Central do Brasil", "Del Castilho", "Ricardo de Albuquerque",
      "Campo Grande", "Cosmos", "Inhoaíba", "Paciência", "Santa Cruz",
    ],
  },
  {
    id: "japeri",
    name: "Japeri",
    color: "#00A651",
    stations: [
      "Central do Brasil", "Del Castilho", "Nova Iguaçu", "Austin",
      "Queimados", "Japeri",
    ],
  },
  {
    id: "belford-roxo",
    name: "Belford Roxo",
    color: "#004C97",
    stations: [
      "Central do Brasil", "Del Castilho", "Nova Iguaçu", "Belford Roxo",
    ],
  },
  {
    id: "saracuruna",
    name: "Saracuruna",
    color: "#00A651",
    stations: [
      "Central do Brasil", "Del Castilho", "Duque de Caxias",
      "Gramacho", "Saracuruna",
    ],
  },
];

export const CATEGORIES = [
  { id: "normal", label: "Funcionando normalmente", severity: "ok" },
  { id: "atraso", label: "Atraso", severity: "atencao" },
  { id: "parado", label: "Trem parado", severity: "problema" },
  { id: "lotacao", label: "Lotação alta", severity: "atencao" },
  { id: "seguranca", label: "Problema de segurança", severity: "problema" },
  { id: "tecnico", label: "Problema técnico", severity: "problema" },
  { id: "outro", label: "Outro", severity: "atencao" },
];

export const SEVERITY_RANK = { ok: 0, atencao: 1, problema: 2 };
