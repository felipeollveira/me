document.addEventListener('DOMContentLoaded', () => {

  function getActiveFilter() {
    const activeBtn = document.querySelector('.filters button.active');
    return activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
  }

  function showSkeletons() {
    portfolioContainer.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      portfolioContainer.appendChild(template.content.cloneNode(true));
    }
  }

  async function fetchProjects(lang = currentLang) {
    showSkeletons();

    try {
      const response = await fetch(`https://projects-tau-pearl.vercel.app/api/projects?lang=${lang}`);
      if (!response.ok) throw new Error(`Erro na rede! Status: ${response.status}`);

      const projects = await response.json();
      allProjects = projects.sort(() => Math.random() - 0.5);

      const filter = getActiveFilter();
      const filtered = filter === 'all' ? allProjects : allProjects.filter(p => p.category === filter);
      displayProjects(filtered);

    } catch (error) {
      console.error("Falha ao carregar projetos:", error);
      portfolioContainer.innerHTML = `<p class="portfolio-error">${translations[currentLang].error}</p>`;
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".filters button.active").classList.remove("active");
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      const filteredProjects = filter === "all"
        ? allProjects
        : allProjects.filter(project => project.category === filter);
      displayProjects(filteredProjects);
    });
  });

  fetchProjects();

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
      fetchProjects(btn.dataset.lang);
    });
  });

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('project-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});
