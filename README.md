# Guia Irlanda 2027 — Landing Page de Alta Conversão

Landing page profissional, moderna e de alta conversão desenvolvida para a venda do produto digital **Guia Irlanda 2027**.

O projeto foi construído com foco em **autoridade, design premium (estilo fintechs/startups internacionais), copywriting persuasivo (AIDA / PAS), máxima performance e conformidade ética e legal**.

---

## 🎨 Identidade Visual e Paleta de Cores

- **Verde Escuro:** `#123C2D` (profundidade, sofisticação e autoridade)
- **Verde Principal:** `#1E704A` (destaques, elementos interativos e botões secundários)
- **Dourado:** `#D8AA55` (CTAs de conversão de alto impacto, insígnias e molduras)
- **Branco:** `#FFFFFF` (clareza e contraste)
- **Cinza Claro:** `#F5F7F5` (seções de respiro e leitura agradável)
- **Preto Suave:** `#17211C` (tipografia de alta legibilidade)
- **Tipografia:** Google Fonts *Plus Jakarta Sans* e *Outfit*

---

## 📁 Estrutura do Projeto

```text
vendadoebook/
├── index.html            # Estrutura semântica completa com todas as 11 seções
├── css/
│   └── styles.css        # Estilos modernos, responsivos e microanimações
├── js/
│   ├── config.js         # ⚙️ ARQUIVO DE CONFIGURAÇÃO CENTRALIZADA (links, preço, WhatsApp, pixels)
│   └── main.js           # Interatividades (FAQ, timeline, modais, rastreamento de cliques)
├── assets/
│   └── images/           # Fotografias reais de alta resolução de Dublin e Irlanda
│       ├── dublin-hero.jpg
│       ├── dublin-city.jpg
│       ├── dublin-evening.jpg
│       ├── dublin-docklands.jpg
│       └── ireland-landscape.jpg
├── server.js             # Servidor de desenvolvimento local ultra-leve (zero dependências)
├── package.json          # Atalhos de execução (npm start / npm run dev)
└── README.md             # Documentação e instruções de personalização
```

---

## ⚙️ Como Personalizar Links, Preços e Pixels

Todas as variáveis do site são controladas pelo arquivo **[`js/config.js`](file:///c:/Users/asbel/OneDrive/Desktop/projeto/vendadoebook/js/config.js)**. Ao alterar um valor neste arquivo, **toda a landing page é atualizada automaticamente**:

```javascript
window.SITE_CONFIG = {
  // 1. Link para o seu checkout (Kiwify, Hotmart, Eduzz, CartPanda, etc.)
  checkoutUrl: "https://pay.kiwify.com.br/SEU_CHECKOUT_AQUI",

  // 2. Preço e condições de pagamento
  pricing: {
    currencySymbol: "R$",
    priceCurrent: "97,00",          // Valor à vista
    installmentsCount: "12",       // Número de parcelas
    installmentValue: "9,74",       // Valor aproximado de cada parcela
    paymentMethodsText: "Cartão de Crédito, PIX e Boleto Bancário",
    accessType: "Acesso Digital Imediato",
    guaranteeDays: "7 dias de garantia incondicional"
  },

  // 3. WhatsApp de suporte e mensagem inicial
  whatsapp: {
    number: "5511999999999",       // Seu número com DDI e DDD
    defaultMessage: "Olá! Vi a página do Guia Irlanda 2027 e gostaria de tirar algumas dúvidas."
  },

  // 4. E-mail e redes sociais
  support: {
    email: "contato@guiairlanda2027.com.br",
    instagram: "@guiairlanda2027"
  },

  // 5. Rastreamento de conversão e anúncios
  analytics: {
    googleAnalyticsId: "",         // Ex: "G-XXXXXXXXXX"
    metaPixelId: "",               // Ex: "123456789012345"
    debugMode: true                // Mostra cliques no console para conferir
  }
};
```

---

## 🚀 Como Testar Localmente

Você tem duas maneiras muito simples de rodar a landing page no seu computador:

### Opção 1 — Servidor Local Integrado (Recomendado)
No terminal da pasta do projeto, execute:

```bash
npm start
```
ou:
```bash
node server.js
```

Em seguida, abra o navegador em: **`http://localhost:3000`**

### Opção 2 — Abertura Direta
Dê um duplo clique no arquivo `index.html` para abrir diretamente no seu navegador preferido (Chrome, Edge, Safari, Firefox).

---

## 📑 As 11 Seções Estratégicas Construídas

1. **Seção 1 — Hero (Primeira Impressão):** Headline de alto impacto, proposta de valor independente, CTAs primário e secundário, badges de confiança e mockup 3D do produto digital.
2. **Seção 2 — Identificação com o Problema:** 6 cards abordando as dores e inseguranças reais (Documentação, Dinheiro, Acomodação, Trabalho, Chegada e Planejamento).
3. **Seção 3 — Quebra de Objeção (Agências vs Guia):** Quadro comparativo elegante mostrando onde as agências tradicionais cobram taxas ocultas versus a autonomia e economia com o Guia.
4. **Seção 4 — Apresentação do Produto:** Detalhamento visual dos **12 módulos práticos reais**, com acordeão expansível para visualização de tópicos.
5. **Seção 5 — A Jornada Completa:** Timeline interativa em 6 etapas cronológicas (O Sonho, O Planejamento, A Preparação, A Viagem, A Chegada, A Adaptação).
6. **Seção 6 — Diferencial: Suporte:** Apresentação clara do suporte oferecido, com transparência e sem promessas mirabolantes.
7. **Seção 7 — Para Quem É o Guia?:** Segmentação clara entre quem ainda está no Brasil (preparando 2026/2027) e quem já desembarcou na Irlanda.
8. **Seção 8 — Benefícios e Transformação:** 6 pilares de transformação emocional (da confusão à segurança) e comparativo antes x depois.
9. **Seção 9 — Oferta e Conversão:** Checkout box com destaque visual, preço configurável, parcelamento, selo de garantia de 7 dias e botão de compra direto.
10. **Seção 10 — FAQ Interativo:** Acordeão com as 9 perguntas e respostas completas sobre independência de agência, requisitos de inglês e entrega.
11. **Seção 11 — CTA Final:** Fechamento persuasivo sobre imagem de Dublin com reforço da chamada para ação.
12. **Footer & Compliance Legal:** Termos de Uso, Política de Privacidade e Aviso Legal de Isenção em conformidade com o Código de Defesa do Consumidor.

---

## 🌐 Como Publicar (Deploy)

A página é 100% estática, com carregamento ultra-rápido (sub-segundo):

- **Vercel / Netlify:** Basta conectar o repositório do GitHub ou arrastar a pasta do projeto. Funciona imediatamente sem etapa de build.
- **GitHub Pages:** Ative nas configurações do repositório apontando para a branch `main` e diretório raiz `/`.
- **Hospedagens Tradicionais (Hostinger, cPanel, Apache, Nginx):** Envie os arquivos da pasta para o diretório `public_html`.

