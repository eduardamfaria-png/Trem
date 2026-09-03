# Na Linha 🚆

App para passageiros da SuperVia atualizarem em tempo real o que está
acontecendo nas linhas — atrasos, trens parados, lotação, problemas técnicos
etc. — para que outros passageiros e quem está esperando saibam da situação
antes de embarcar.

Visual com as cores verde e azul da SuperVia.

## Estrutura

- `server/` — API em Node/Express + Socket.IO + SQLite. Guarda os relatos
  (com foto opcional) e transmite novidades em tempo real para quem está
  acompanhando a linha.
- `client/` — App web (React + Vite), mobile-first, com:
  - lista das linhas e o status atual de cada uma;
  - linha selecionada: trajeto com estações, feed de relatos ao vivo e botão
    para publicar uma atualização (categoria, estação, foto, comentário,
    nome opcional);
  - confirmação de relatos de outros passageiros ("👍 Confirmar");
  - **Minha Viagem**: ao tocar em "Iniciar minha viagem nesta linha", o app
    usa a localização do próprio celular para mostrar em qual estação você
    está mais perto — essa localização **nunca é enviada ao servidor nem
    aparece para outros usuários**, fica só no seu aparelho. Enquanto a
    viagem está ativa, chegam notificações na hora sobre relatos de outros
    passageiros na linha, indicando quantas estações à frente (ou atrás) da
    sua posição eles aconteceram — como um alerta de trânsito, mas
    alimentado pelos próprios passageiros;
  - **Stories**: relatos com foto publicados nas últimas 24h aparecem como
    círculos no topo da tela da linha (estilo Snapchat/Instagram); tocar
    abre a foto em tela cheia com legenda, estação, autor e horário.

## Como rodar localmente

Em dois terminais:

```bash
# Terminal 1 — API
cd server
npm install
npm run dev      # http://localhost:3001

# Terminal 2 — App web
cd client
npm install
npm run dev       # http://localhost:5173
```

O Vite já está configurado para redirecionar `/api`, `/uploads` e
`/socket.io` para a API em `localhost:3001`, então basta abrir
`http://localhost:5173`.

Ao abrir "Minha Viagem" ou publicar um relato com foto, o navegador vai
pedir permissão de localização/câmera — isso é esperado.

## Observações

- As coordenadas das estações são aproximadas, suficientes para estimar a
  estação mais próxima, mas não para navegação de precisão.
- Fotos enviadas ficam salvas em `server/uploads/` (fora do controle de
  versão).

## Próximos passos possíveis

- Autenticação/moderação para reduzir relatos falsos.
- Lista completa e oficial de estações por linha.
- Notificações push nativas (via service worker) mesmo com o app fechado.
- Apagar automaticamente fotos de stories após 24h no servidor.
