/**
 * GUIA IRLANDA 2027 — ARQUIVO DE CONFIGURAÇÃO CENTRALIZADA
 * 
 * Altere aqui os dados do seu produto, links de checkout, preços,
 * contato de suporte e identificadores de analytics.
 * Tudo na landing page será atualizado automaticamente com estes valores!
 */

window.SITE_CONFIG = {
  // Nome do Produto e Ano
  productName: "Guia Irlanda 2027",
  edition: "Edição 2026/2027",

  // Link para o checkout real da sua plataforma (Hotmart, Kiwify, Eduzz, CartPanda, etc.)
  // Substitua pelo seu link de afiliado ou checkout final:
  checkoutUrl: "https://pay.kiwify.com.br/SEU_CHECKOUT_AQUI",

  // Preço e Condições de Pagamento
  pricing: {
    currencySymbol: "R$",
    priceCurrent: "97,00",          // Valor à vista
    installmentsCount: "12",       // Número de parcelas
    installmentValue: "9,74",       // Valor aproximado de cada parcela
    paymentMethodsText: "Cartão de Crédito, PIX e Boleto Bancário",
    accessType: "Acesso Digital Imediato",
    guaranteeDays: "7 dias de garantia incondicional"
  },

  // WhatsApp de Suporte / Dúvidas
  whatsapp: {
    // Número com DDI e DDD (ex: 5511999999999)
    number: "5511999999999",
    // Mensagem pré-definida ao abrir o WhatsApp
    defaultMessage: "Olá! Vi a página do Guia Irlanda 2027 e gostaria de tirar algumas dúvidas antes de adquirir."
  },

  // Contato e Suporte Oficial
  support: {
    email: "contato@guiairlanda2027.com.br",
    responseHours: "Segunda a sexta, das 09h às 18h (horário de Brasília)",
    instagram: "@guiairlanda2027"
  },

  // Rastreamento e Métricas de Conversão
  analytics: {
    // Insira seu ID do Google Analytics 4 (ex: "G-XXXXXXXXXX") ou deixe em branco se não for usar agora
    googleAnalyticsId: "",
    // Insira seu ID do Meta Pixel (Facebook) (ex: "123456789012345") ou deixe em branco
    metaPixelId: "",
    // Ativa logs no console do navegador para conferir cliques em botões
    debugMode: true
  }
};
