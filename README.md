# Na Linha 🚆

App para passageiros da SuperVia atualizarem em tempo real o que está
acontecendo nas linhas — atrasos, trens parados, lotação, problemas técnicos
etc. — para que outros passageiros e quem está esperando saibam da situação
antes de embarcar.

Visual com as cores verde e azul da SuperVia.

## Estrutura

- `server/` — API em Node/Express + Socket.IO + SQLite. Guarda os relatos e
  transmite novidades em tempo real para quem está acompanhando a linha.
- `client/` — App web (React + Vite), mobile-first, com:
  - lista das linhas e o status atual de cada uma;
  - linha selecionada: trajeto com estações, feed de relatos ao vivo e botão
    para publicar uma atualização (categoria, estação, comentário, nome opcional);
  - confirmação de relatos de outros passageiros ("👍 Confirmar").

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

O Vite já está configurado para redirecionar `/api` e `/socket.io` para a
API em `localhost:3001`, então basta abrir `http://localhost:5173`.

## Próximos passos possíveis

- Autenticação/moderação para reduzir relatos falsos.
- Geolocalização para sugerir a estação mais próxima automaticamente.
- Lista completa e oficial de estações por linha.
- Notificações push quando a linha acompanhada mudar de status.
