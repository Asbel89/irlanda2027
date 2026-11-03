(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded', init);

  function init(){
    applyConfig();
    initAnalytics();
    initNavbar();
    initSmoothScroll();
    initFaq();
    initModules();
    initTimeline();
    initCtaTracking();
    initCountUp();
    initScrollReveal();
    initStickyBar();
  }

  function applyConfig(){
    var c = window.SITE_CONFIG || {};
    document.querySelectorAll('.js-checkout').forEach(function(el){
      el.href = c.checkoutUrl || '#';
    });
    var wa = c.whatsapp || {};
    if(wa.number){
      var url = 'https://wa.me/'+wa.number+'?text='+encodeURIComponent(wa.defaultMessage||'');
      document.querySelectorAll('.js-wa').forEach(function(el){ el.href = url; });
    }
    var p = c.pricing || {};
    document.querySelectorAll('[data-cfg="price"]').forEach(function(el){
      el.textContent = p.currencySymbol+' '+p.priceCurrent;
    });
    document.querySelectorAll('[data-cfg="installments"]').forEach(function(el){
      el.textContent = 'ou '+p.installmentsCount+'x de '+p.currencySymbol+' '+p.installmentValue;
    });
    document.querySelectorAll('[data-cfg="methods"]').forEach(function(el){
      el.textContent = p.paymentMethodsText;
    });
    document.querySelectorAll('[data-cfg="guarantee"]').forEach(function(el){
      el.textContent = p.guaranteeDays;
    });
  }

  function initAnalytics(){
    var a = (window.SITE_CONFIG||{}).analytics||{};
    if(a.googleAnalyticsId){
      var s = document.createElement('script');
      s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id='+a.googleAnalyticsId;
      document.head.appendChild(s);
      window.dataLayer=window.dataLayer||[];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag=gtag; gtag('js',new Date()); gtag('config',a.googleAnalyticsId);
    }
    if(a.metaPixelId){
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init',a.metaPixelId);window.fbq('track','PageView');
    }
  }

  function initCtaTracking(){
    var dbg = ((window.SITE_CONFIG||{}).analytics||{}).debugMode;
    document.querySelectorAll('.js-checkout').forEach(function(btn){
      btn.addEventListener('click',function(){
        var loc = this.dataset.cta||'unknown';
        if(dbg) console.log('[CTA] '+loc, new Date().toISOString());
        if(typeof window.gtag==='function') window.gtag('event','begin_checkout',{event_label:loc});
        if(typeof window.fbq==='function') window.fbq('track','InitiateCheckout',{content_name:'Guia Irlanda 2027'});
      });
    });
    document.querySelectorAll('.js-wa').forEach(function(btn){
      btn.addEventListener('click',function(){
        if(dbg) console.log('[WA] click');
        if(typeof window.gtag==='function') window.gtag('event','contact',{method:'WhatsApp'});
        if(typeof window.fbq==='function') window.fbq('track','Contact');
      });
    });
  }

  function initNavbar(){
    var nav = document.querySelector('.nav');
    if(!nav) return;
    var last = 0;
    window.addEventListener('scroll',function(){
      var y = window.scrollY;
      if(y>60) nav.classList.add('nav--solid'); else nav.classList.remove('nav--solid');
      if(y>600 && y>last) nav.classList.add('nav--hide'); else nav.classList.remove('nav--hide');
      last = y;
    },{passive:true});
  }

  function initSmoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click',function(e){
        var h = this.getAttribute('href');
        if(!h||h==='#') return;
        var t = document.querySelector(h);
        if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }
      });
    });
  }

  function initFaq(){
    document.querySelectorAll('.faq__item').forEach(function(item){
      var btn = item.querySelector('.faq__q');
      if(!btn) return;
      btn.addEventListener('click',function(){
        var open = item.classList.contains('open');
        document.querySelectorAll('.faq__item.open').forEach(function(o){ o.classList.remove('open'); });
        if(!open) item.classList.add('open');
      });
    });
  }

  function initModules(){
    document.querySelectorAll('.mod-card__toggle').forEach(function(btn){
      btn.addEventListener('click',function(){
        var card = this.closest('.mod-card');
        if(!card) return;
        card.classList.toggle('expanded');
        this.textContent = card.classList.contains('expanded') ? 'Ocultar ↑' : 'Ver tópicos ↓';
      });
    });
  }

  function initTimeline(){
    var tabs = document.querySelectorAll('.tl__tab');
    var panels = document.querySelectorAll('.tl__panel');
    if(!tabs.length) return;
    tabs.forEach(function(tab){
      tab.addEventListener('click',function(){
        var s = this.dataset.step;
        tabs.forEach(function(t){ t.classList.remove('active'); });
        this.classList.add('active');
        panels.forEach(function(p){
          p.classList.toggle('active', p.dataset.panel===s);
        });
      });
    });
  }

  /* Animated count-up for stat numbers */
  function initCountUp(){
    var observed = false;
    var els = document.querySelectorAll('[data-count]');
    if(!els.length) return;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting && !observed){
          observed = true;
          els.forEach(function(el){
            var target = parseInt(el.dataset.count,10);
            var duration = 1800, start = 0, startTime = null;
            function step(ts){
              if(!startTime) startTime=ts;
              var p = Math.min((ts-startTime)/duration,1);
              var ease = 1-Math.pow(1-p,3);
              el.textContent = Math.floor(ease*target);
              if(p<1) requestAnimationFrame(step);
              else el.textContent = target;
            }
            requestAnimationFrame(step);
          });
        }
      });
    },{threshold:0.3});
    els.forEach(function(el){ io.observe(el); });
  }

  /* Scroll reveal animation */
  function initScrollReveal(){
    var items = document.querySelectorAll('.reveal');
    if(!items.length) return;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    },{threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    items.forEach(function(el){ io.observe(el); });
  }

  /* Sticky bottom CTA bar on mobile */
  function initStickyBar(){
    var bar = document.querySelector('.sticky-bar');
    if(!bar) return;
    window.addEventListener('scroll',function(){
      if(window.scrollY > 700) bar.classList.add('visible'); else bar.classList.remove('visible');
    },{passive:true});
  }
})();
