const translations = {
  pt: {
    role:         'Engenheiro de Software',
    nav_projects:  'Projetos',
    nav_store:   'Loja',
    hero_bio:      'Tive o prazer de trabalhar em diversos projetos e conhecer pessoas incríveis.<br>Veja alguns dos resultados.',
    filter_all:    'Todos',
    filter_dev:    'Apps & Dev',
    filter_ai:     'IA & LLMs',
    filter_bots:   'Bots',
    filter_web:    'Web',
    contact_title:   'Entre em contato',
    contact_eyebrow: 'Contato',
    contact_heading: 'Tem um projeto em mente?',
    contact_sub:     'Me manda uma mensagem pelo WhatsApp ou por e-mail. Costumo responder no mesmo dia.',
    card_details:  'Ver Detalhes',
    modal_link:    'Acessar Projeto →',
    empty:              'Nenhum projeto encontrado.',
    error:              'Não foi possível carregar os projetos.',
    store_eyebrow:      'Loja',
    store_title:        'Produtos & Ferramentas',
    store_subtitle:     'Apps, scripts e templates que uso e recomendo.',
    store_partners_label: 'Parceiros',
    store_partner_eyebrow: 'Empresa de tecnologia',
    store_partner_desc: 'Tecnologia com agilidade. Conheça nossos projetos e soluções.',
    store_tag_app:      'App',
    store_free:         'Grátis',
    store_btn_play:     'Baixar grátis',
    store_tag_script:   'Bot',
    store_tag_template: 'Template',
    store_tag_mentoring:'Mentoria',
    store_tag_ai:       'IA',
    store_btn:          'Quero esse →',
    store_error:        'Algo deu errado ao carregar os produtos.',
    store_retry:        'Tentar novamente',
  },
  en: {
    role:         'Software Engineer',
    nav_projects:  'Projects',
    nav_store:   'Store',
    hero_bio:      "I've had the pleasure of working on diverse projects and meeting incredible people.<br>Check out some of my work.",
    filter_all:    'All',
    filter_dev:    'Apps & Dev',
    filter_ai:     'AI & LLMs',
    filter_bots:   'Bots',
    filter_web:    'Web',
    contact_title:   'Get in touch',
    contact_eyebrow: 'Contact',
    contact_heading: 'Got a project in mind?',
    contact_sub:     'Send me a message on WhatsApp or by e-mail. I usually reply the same day.',
    card_details:  'See Details',
    modal_link:    'View Project →',
    empty:              'No projects found.',
    error:              'Failed to load projects.',
    store_eyebrow:      'Store',
    store_title:        'Products & Tools',
    store_subtitle:     'Apps, scripts and templates I use and recommend.',
    store_partners_label: 'Partners',
    store_partner_eyebrow: 'Company I work for',
    store_partner_desc: 'Technology with agility. Check out our projects and solutions.',
    store_tag_app:      'App',
    store_free:         'Free',
    store_btn_play:     'Download free',
    store_tag_script:   'Bot',
    store_tag_template: 'Template',
    store_tag_mentoring:'Mentoring',
    store_tag_ai:       'AI',
    store_btn:          'I want this →',
    store_error:        'Something went wrong while loading the products.',
    store_retry:        'Try again',
  },
};

let currentLang = localStorage.getItem('lang') || 'pt';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update dynamically rendered card overlays
  document.querySelectorAll('.overlay a').forEach(el => {
    el.textContent = translations[lang].card_details;
  });

  if (typeof currentModalProject !== 'undefined' && currentModalProject) {
    document.getElementById('modal-desc').textContent = getDesc(currentModalProject);
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

setLanguage(currentLang);
