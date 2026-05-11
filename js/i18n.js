const translations = {
  pt: {
    role:         'Engenheiro de Software',
    nav_projects:  'Projetos',
    nav_store:   'Loja',
    hero_bio:      'Tive o prazer de trabalhar em diversos projetos e conhecer pessoas incríveis.<br>Veja alguns dos meus trabalhos!',
    filter_all:    'Todos',
    filter_dev:    'Apps & Dev',
    filter_ai:     'IA & LLMs',
    filter_bots:   'Bots',
    filter_web:    'Web',
    contact_title: 'Entre em contato',
    card_details:  'Ver Detalhes',
    modal_link:    'Acessar Projeto →',
    empty:              'Nenhum projeto encontrado.',
    error:              'Não foi possível carregar os projetos.',
    store_title:        'Loja',
    store_subtitle:     'Apps, ferramentas e templates que uso',
    store_tag_app:      'App',
    store_p0_title:     'Nome do App',
    store_p0_desc:      'Descrição breve do aplicativo e o problema que ele resolve.',
    store_free:         'Grátis',
    store_btn_play:     'Play Store',
    store_tag_script:   'Script',
    store_tag_template: 'Template',
    store_tag_mentoring:'Mentoria',
    store_p1_title:     'Bot de Automação Python',
    store_p1_desc:      'Automatize tarefas repetitivas no WhatsApp ou Instagram com Python. Código limpo, documentado e pronto para rodar.',
    store_p2_title:     'Flutter UI Kit',
    store_p2_desc:      'Kit com telas prontas para apps Flutter: login, home, perfil e listagens. Customizável e com dark mode incluído.',
    store_p3_title:     'Mentoria 1h',
    store_p3_desc:      'Sessão individual para revisar seu código, tirar dúvidas de arquitetura ou planejar seu próximo projeto.',
    store_btn:          'Adquirir',
  },
  en: {
    role:         'Software Engineer',
    nav_projects:  'Projects',
    nav_store:   'Store',
    hero_bio:      "I've had the pleasure of working on diverse projects and meeting incredible people.<br>Check out some of my work!",
    filter_all:    'All',
    filter_dev:    'Apps & Dev',
    filter_ai:     'AI & LLMs',
    filter_bots:   'Bots',
    filter_web:    'Web',
    contact_title: 'Get in touch',
    card_details:  'See Details',
    modal_link:    'View Project →',
    empty:              'No projects found.',
    error:              'Failed to load projects.',
    store_title:        'Store',
    store_subtitle:     'Apps, tools and templates that I use.',
    store_tag_app:      'App',
    store_p0_title:     'App Name',
    store_p0_desc:      'Brief description of the app and the problem it solves.',
    store_free:         'Free',
    store_btn_play:     'Play Store',
    store_tag_script:   'Script',
    store_tag_template: 'Template',
    store_tag_mentoring:'Mentoring',
    store_p1_title:     'Python Automation Bot',
    store_p1_desc:      'Automate repetitive tasks on WhatsApp or Instagram with Python. Clean, documented code ready to run.',
    store_p2_title:     'Flutter UI Kit',
    store_p2_desc:      'Ready-made screens for Flutter apps: login, home, profile and listings. Customizable with dark mode included.',
    store_p3_title:     '1h Mentoring Session',
    store_p3_desc:      'One-on-one session to review your code, discuss architecture or plan your next project.',
    store_btn:          'Get it',
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
