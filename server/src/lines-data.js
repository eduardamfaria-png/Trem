// Dados de referência das linhas da SuperVia (simplificado para fins do app).
// A lista de estações é representativa, e as coordenadas são aproximadas —
// suficientes para estimar a estação mais próxima do usuário, não para
// navegação de precisão.
export const LINES = [
  {
    id: "deodoro",
    name: "Deodoro",
    color: "#00A651",
    stations: [
      { name: "Central do Brasil", lat: -22.9035, lng: -43.1965 },
      { name: "São Cristóvão", lat: -22.8963, lng: -43.2214 },
      { name: "Maracanã", lat: -22.9121, lng: -43.2302 },
      { name: "Triagem", lat: -22.8935, lng: -43.2609 },
      { name: "Piedade", lat: -22.8825, lng: -43.2875 },
      { name: "Encantado", lat: -22.8815, lng: -43.2955 },
      { name: "Madureira", lat: -22.8735, lng: -43.3395 },
      { name: "Marechal Hermes", lat: -22.8677, lng: -43.3721 },
      { name: "Deodoro", lat: -22.8586, lng: -43.3877 },
    ],
  },
  {
    id: "santa-cruz",
    name: "Santa Cruz",
    color: "#004C97",
    stations: [
      { name: "Central do Brasil", lat: -22.9035, lng: -43.1965 },
      { name: "Del Castilho", lat: -22.8825, lng: -43.2775 },
      { name: "Ricardo de Albuquerque", lat: -22.8285, lng: -43.4165 },
      { name: "Campo Grande", lat: -22.9027, lng: -43.5613 },
      { name: "Cosmos", lat: -22.8917, lng: -43.5901 },
      { name: "Inhoaíba", lat: -22.8801, lng: -43.6172 },
      { name: "Paciência", lat: -22.9095, lng: -43.6516 },
      { name: "Santa Cruz", lat: -22.9187, lng: -43.6863 },
    ],
  },
  {
    id: "japeri",
    name: "Japeri",
    color: "#00A651",
    stations: [
      { name: "Central do Brasil", lat: -22.9035, lng: -43.1965 },
      { name: "Del Castilho", lat: -22.8825, lng: -43.2775 },
      { name: "Nova Iguaçu", lat: -22.7592, lng: -43.4511 },
      { name: "Austin", lat: -22.7515, lng: -43.4751 },
      { name: "Queimados", lat: -22.7108, lng: -43.5545 },
      { name: "Japeri", lat: -22.6432, lng: -43.6525 },
    ],
  },
  {
    id: "belford-roxo",
    name: "Belford Roxo",
    color: "#004C97",
    stations: [
      { name: "Central do Brasil", lat: -22.9035, lng: -43.1965 },
      { name: "Del Castilho", lat: -22.8825, lng: -43.2775 },
      { name: "Nova Iguaçu", lat: -22.7592, lng: -43.4511 },
      { name: "Belford Roxo", lat: -22.7638, lng: -43.3993 },
    ],
  },
  {
    id: "saracuruna",
    name: "Saracuruna",
    color: "#00A651",
    stations: [
      { name: "Central do Brasil", lat: -22.9035, lng: -43.1965 },
      { name: "Del Castilho", lat: -22.8825, lng: -43.2775 },
      { name: "Duque de Caxias", lat: -22.7856, lng: -43.3117 },
      { name: "Gramacho", lat: -22.7715, lng: -43.2853 },
      { name: "Saracuruna", lat: -22.7423, lng: -43.287 },
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
