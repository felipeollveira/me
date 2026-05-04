const buttons = document.querySelectorAll(".filters button");
const portfolioContainer = document.getElementById("portfolio-container");
const template = document.getElementById('portfolio-item-template');
let allProjects = [];

function driveThumb(url) {
  if (!url) return '';
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match
    ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`
    : url;
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.1 });

function openModal(project) {
  const iframe = document.getElementById('modal-img');
  iframe.src = project.image || '';
  iframe.title = project.title;

  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-desc').textContent = project.description;

  const techsEl = document.getElementById('modal-techs');
  techsEl.innerHTML = '';
  (project.technologies || []).forEach(tech => {
    const span = document.createElement('span');
    span.textContent = tech;
    techsEl.appendChild(span);
  });

  const linkEl = document.getElementById('modal-link');
  if (project.link) {
    linkEl.href = project.link;
    linkEl.classList.remove('hidden');
  } else {
    linkEl.classList.add('hidden');
  }

  document.getElementById('project-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('project-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function displayProjects(projectsToDisplay) {
  portfolioContainer.innerHTML = '';

  if (projectsToDisplay.length === 0 && allProjects.length > 0) {
    portfolioContainer.innerHTML = `<p class="portfolio-empty">${translations[currentLang].empty}</p>`;
    return;
  }

  projectsToDisplay.forEach(project => {
    const cardClone = template.content.cloneNode(true);

    const img = cardClone.querySelector('.card-image');
    img.src = driveThumb(project.image);
    img.alt = project.title;

    cardClone.querySelector('.portfolio-item').dataset.category = project.category;
    cardClone.querySelector('.overlay p').textContent = project.description;

    const linkEl = cardClone.querySelector('.overlay a');
    linkEl.textContent = translations[currentLang].card_details;
    linkEl.removeAttribute('href');

    const techMap = {
      'node-js': 'fab fa-node-js', 'html5': 'fab fa-html5', 'figma': 'fab fa-figma',
      'film': 'fas fa-film', 'android': 'fab fa-android', 'python': 'fab fa-python'
    };
    let iconHtml = '';
    (project.technologies || []).forEach(tech => {
      const key = tech.toLowerCase().replace(/[^a-z]/g, '-');
      if (techMap[key]) iconHtml += `<i class="${techMap[key]}"></i> `;
    });
    cardClone.querySelector('h3').innerHTML = `${project.title} ${iconHtml}`;

    const item = cardClone.querySelector('.portfolio-item');
    item.style.cursor = 'pointer';
    if (project.featured) item.classList.add('featured');
    item.addEventListener('click', () => openModal(project));

    portfolioContainer.appendChild(cardClone);
  });

  document.querySelectorAll(".portfolio-item.fade").forEach(el => observer.observe(el));
}
