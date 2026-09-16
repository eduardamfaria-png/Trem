# Matchy-Creators

Startup de conexões entre marcas e criadores.

App Next.js montado a partir do projeto Claude Design **Matchy onboarding mobile**
(`e21bd7b6-2417-439f-8b64-8a5fe231cf98`). Cada tela é uma transcrição direta dos
arquivos `.dc.html` do handoff — mesmos valores de cor, espaçamento, tipografia,
raio e transição.

```bash
npm install
npm run dev
```

## Navegação

A nav inferior definida no design tem cinco abas, e todas funcionam:

| Aba | Rota |
|---|---|
| Feed | `/feed` |
| Explorar | `/explorar` |
| Campanhas | `/campanhas` |
| Chat | `/chat` |
| Carteira | `/carteira` |

As telas que o design não coloca na nav ficam nas rotas abaixo, alcançáveis pelos
toques que já existiam no próprio design:

| Tela | Rota | Como se chega |
|---|---|---|
| Onboarding | `/` | Entrada do app; "Ver meus matches" leva ao Feed |
| Match · busca ativa | `/match` | Aba Explorar quando o papel é marca |
| Negociação | `/negociacao` | Conversa "Casa Verde" no Chat |
| Avaliação pós-job | `/avaliacao` | Voltar leva à Carteira |
| Perfil da criadora | `/perfil/criadora` | Autor de post e sugestão de match no Feed |
| Perfil da marca | `/perfil/marca` | Autor de post e sugestão de match no Feed |

`/telas` lista tudo em um índice, para abrir qualquer tela direto.

### Papel (criadora / marca)

Campanhas e Explorar têm duas variantes no design, e a nav inferior de cada uma
indica em que aba ela vive. O papel escolhido no onboarding fica em
`localStorage` (`matchy.role`) e decide qual variante aparece:

| Papel | `/explorar` | `/campanhas` |
|---|---|---|
| criadora | grade de descoberta | campanhas abertas |
| marca | baralho de match | minhas campanhas + candidatas |

## Estrutura

```
app/            uma pasta por rota
components/     PhoneFrame, StatusBar, BottomNav, AppHeader, ImageSlot
components/screens/   telas com duas variantes ou duas rotas
lib/theme.ts    tokens de cor e fonte
lib/data.ts     conteúdo de exemplo, transcrito do handoff
lib/role.ts     papel escolhido no onboarding
public/fonts/   Bootzy TM e La Rousie
public/img/     logos e ícones
```

Os estilos são inline, com os mesmos valores literais do design. Os estados de
hover e focus, que no arquivo original vinham em `style-hover` / `style-focus`,
viraram classes utilitárias em `app/globals.css` com os valores idênticos.

## Pontos a saber

**`public/fonts/Rousie.otf` está faltando.** O arquivo passa do limite de leitura
de 256 KiB da ferramenta de sincronia, então não deu para baixá-lo junto com o
resto. O `@font-face` já aponta para esse caminho — basta copiar o arquivo do
handoff para `public/fonts/Rousie.otf` e a La Rousie passa a renderizar. Até lá,
os três usos dela (assinatura do onboarding concluído, estado vazio do match e
"Obrigada" da avaliação) caem no `cursive` do sistema.

**Moldura do aparelho.** O design apresenta cada tela dentro de um aparelho de
390×844 sobre fundo creme, e isso foi mantido. Abaixo de 480px de largura a
moldura some e a tela ocupa a viewport inteira — o conteúdo interno é o mesmo.

**Barra de status da Carteira.** No arquivo de design ela é `#FFF4E6` sobre o
fundo creme do aparelho, ou seja, o "9:41" fica invisível nessa tela. Isso foi
reproduzido como está. Se for um deslize e não intenção, é uma linha em
`app/carteira/page.tsx`: trocar `color={C.cream}` por `color={C.plum}`.

**Imagens.** O design usa `<image-slot>` com a descrição da foto que vai entrar
no lugar. Isso virou `components/ImageSlot.tsx`, que mantém o retângulo blush
com a descrição. Trocar por `<Image>` quando as fotos chegarem.
