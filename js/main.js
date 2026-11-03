/**
 * GUIA IRLANDA 2027 — JAVASCRIPT PRINCIPAL
 * Interatividades, navegação, rastreamento de conversão e integração com config.js
 */

(function () {
  'use strict';

  // Aguarda carregamento do DOM
  document.addEventListener('DOMContentLoaded', initApp);

  function initApp() {
    applyConfigValues();
    initAnalytics();
    initNavbar();
    initScrollSpy();
    initSmoothScroll();
    initFaqAccordion();
    initModuleCards();
    initTimelineTabs();
    initModals();
    initCtaTracking();
  }

  /**
   * 1. Aplica valores de SITE_CONFIG no HTML
   */
  function applyConfigValues() {
    const config = window.SITE_CONFIG || {};

    // 1.1 Links de Checkout
    const checkoutLinks = document.querySelectorAll('.js-checkout-link');
    checkoutLinks.forEach(link => {
      if (config.checkoutUrl) {
        link.href = config.checkoutUrl;
      }
    });

    // 1.2 Links de WhatsApp
    const waLinks = document.querySelectorAll('.js-whatsapp-link');
    if (config.whatsapp && config.whatsapp.number) {
      const waUrl = `https://wa.me/${config.whatsapp.number}?text=${encodeURIComponent(config.whatsapp.defaultMessage || '')}`;
      waLinks.forEach(link => {
        link.href = waUrl;
      });
    }

    // 1.3 Preços e Condições
    if (config.pricing) {
      const priceCurrentElems = document.querySelectorAll('[data-config="price-current"]');
      priceCurrentElems.forEach(el => el.textContent = `${config.pricing.currencySymbol} ${config.pricing.priceCurrent}`);

      const installmentsElems = document.querySelectorAll('[data-config="installments-text"]');
      installmentsElems.forEach(el => {
        el.textContent = `ou até ${config.pricing.installmentsCount}x de ${config.pricing.currencySymbol} ${config.pricing.installmentValue}`;
      });

      const paymentMethodsElems = document.querySelectorAll('[data-config="payment-methods"]');
      paymentMethodsElems.forEach(el => el.textContent = config.pricing.paymentMethodsText);

      const guaranteeElems = document.querySelectorAll('[data-config="guarantee-days"]');
      guaranteeElems.forEach(el => el.textContent = config.pricing.guaranteeDays);
    }

    // 1.4 Suporte e Contato
    if (config.support) {
      const emailElems = document.querySelectorAll('[data-config="support-email"]');
      emailElems.forEach(el => {
        el.textContent = config.support.email;
        if (el.tagName === 'A') el.href = `mailto:${config.support.email}`;
      });

      const igElems = document.querySelectorAll('[data-config="support-instagram"]');
      igElems.forEach(el => el.textContent = config.support.instagram);
    }
  }

  /**
   * 2. Rastreamento e Analytics (GA4 e Meta Pixel)
   */
  function initAnalytics() {
    const config = window.SITE_CONFIG || {};
    const analytics = config.analytics || {};

    // Injeta GA4 se ID estiver presente
    if (analytics.googleAnalyticsId && analytics.googleAnalyticsId.trim() !== '') {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${analytics.googleAnalyticsId}`;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', analytics.googleAnalyticsId);
    }

    // Injeta Meta Pixel se ID estiver presente
    if (analytics.metaPixelId && analytics.metaPixelId.trim() !== '') {
      /* eslint-disable */
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */
      window.fbq('init', analytics.metaPixelId);
      window.fbq('track', 'PageView');
    }
  }

  /**
   * 3. Rastreamento de cliques em CTAs
   */
  function initCtaTracking() {
    const config = window.SITE_CONFIG || {};
    const debug = config.analytics && config.analytics.debugMode;

    const ctaButtons = document.querySelectorAll('.js-checkout-link');
    ctaButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const ctaLocation = this.getAttribute('data-cta-location') || 'unknown';

        if (debug) {
          console.log(`[CONVERSÃO] Clique no CTA: ${ctaLocation}`, {
            checkoutUrl: this.href,
            time: new Date().toISOString()
          });
        }

        // Evento Google Analytics
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'begin_checkout', {
            event_category: 'ecommerce',
            event_label: ctaLocation,
            items: [{
              item_name: 'Guia Irlanda 2027',
              item_category: 'Digital Product',
              price: config.pricing ? config.pricing.priceCurrent : 97
            }]
          });
        }

        // Evento Meta Pixel
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'InitiateCheckout', {
            content_name: 'Guia Irlanda 2027',
            content_category: 'Digital Guide',
            value: 97.00,
            currency: 'BRL'
          });
        }
      });
    });

    // Rastreamento de cliques no WhatsApp
    const waButtons = document.querySelectorAll('.js-whatsapp-link');
    waButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        if (debug) console.log('[LEAD] Clique no botão de WhatsApp');
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'contact', { method: 'WhatsApp' });
        }
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Contact');
        }
      });
    });
  }

  /**
   * 4. Barra de Navegação e Menu Mobile
   */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.navbar-toggle');
    const navMenu = document.querySelector('.navbar-menu');
    const navLinks = document.querySelectorAll('.navbar-menu a');

    // Scroll Navbar Effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }, { passive: true });

    // Menu Mobile Toggle
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('is-active');
        if (isOpen) {
          navMenu.classList.remove('is-active');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('no-scroll');
        } else {
          navMenu.classList.add('is-active');
          menuToggle.setAttribute('aria-expanded', 'true');
          document.body.classList.add('no-scroll');
        }
      });

      // Fechar menu ao clicar em qualquer link
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('is-active');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('no-scroll');
        });
      });

      // Fechar se redimensionar para desktop
      window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && navMenu.classList.contains('is-active')) {
          navMenu.classList.remove('is-active');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('no-scroll');
        }
      });
    }
  }

  /**
   * 5. ScrollSpy para destacar item ativo no menu
   */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-menu a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPos = window.scrollY + 120;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

  /**
   * 6. Smooth Scroll para links internos
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * 7. FAQ Accordion
   */
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Fecha todos os outros (comportamento harmônico de acordeão)
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Alterna o atual
        if (isActive) {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /**
   * 8. Módulos Interativos (Section 4)
   */
  function initModuleCards() {
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
      const toggle = card.querySelector('.module-card-toggle');
      if (toggle) {
        toggle.addEventListener('click', () => {
          card.classList.toggle('is-expanded');
          const isExp = card.classList.contains('is-expanded');
          toggle.textContent = isExp ? 'Ocultar detalhes ↑' : 'Ver tópicos incluídos ↓';
        });
      }
    });
  }

  /**
   * 9. Timeline Interativa (Section 5)
   */
  function initTimelineTabs() {
    const stageItems = document.querySelectorAll('.timeline-stage');
    const detailPanels = document.querySelectorAll('.timeline-detail-panel');

    if (!stageItems.length || !detailPanels.length) return;

    stageItems.forEach(stage => {
      stage.addEventListener('click', function () {
        const stepNum = this.getAttribute('data-step');

        // Atualiza botões
        stageItems.forEach(s => s.classList.remove('is-active'));
        this.classList.add('is-active');

        // Atualiza painéis
        detailPanels.forEach(panel => {
          if (panel.getAttribute('data-panel') === stepNum) {
            panel.classList.add('is-active');
          } else {
            panel.classList.remove('is-active');
          }
        });
      });
    });
  }

  /**
   * 10. Modais de Informações Legais (Termos, Privacidade, Suporte)
   */
  function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('.modal-close, .modal-backdrop');

    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-modal-target');
        const modal = document.getElementById(targetId);
        if (modal) {
          modal.classList.add('is-open');
          document.body.classList.add('no-scroll');
        }
      });
    });

    closeButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const modal = this.closest('.modal');
        if (modal) {
          modal.classList.remove('is-open');
          document.body.classList.remove('no-scroll');
        }
      });
    });

    // Fechar com ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.is-open');
        if (openModal) {
          openModal.classList.remove('is-open');
          document.body.classList.remove('no-scroll');
        }
      }
    });
  }

})();
