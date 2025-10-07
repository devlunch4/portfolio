document.addEventListener('DOMContentLoaded', () => {
  let projects = [];
  let filters = [];
  let filteredProjects = [];
  let visibleCount = 10; // Number of projects initially shown
  const loadStep = 10;   // Number of projects added each scroll

  // === Load project data ===
  fetch('projectList.json')
    .then(res => res.json())
    .then(data => {
      projects = data;
      filteredProjects = projects;
      renderProjects();
    })
    .catch(error => console.error('Error loading projectList.json:', error));

  // === Load filter buttons ===
  fetch('filterData.json')
    .then(res => res.json())
    .then(data => {
      filters = data.filterData;
      // console.log(data.filterData)
      //filters = ["all", "full stack", "front end", "back end", "other"];
      renderFilters();
    })
    .catch(error => console.error('Error loading filterData.json:', error));

  // === Render filter buttons ===
  function renderFilters() {
    const filterContainer = document.querySelector('.filters');
    filterContainer.innerHTML = '';

    filters.forEach(filter => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.dataset.filter = filter.toLowerCase();
      btn.textContent = filter.toUpperCase();
      btn.addEventListener('click', handleFilter);
      filterContainer.appendChild(btn);
    });

    // Activate "ALL" by default
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) allBtn.classList.add('active');
  }

  // === Handle filter click ===
  function handleFilter(e) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    const filter = e.target.dataset.filter;
    visibleCount = 10; // Reset visible count
    applyFilters(filter, document.getElementById('searchInput').value.toLowerCase());
  }

  // === Search projects by skill ===
  document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    visibleCount = 10; // Reset on new search
    applyFilters(activeFilter, searchTerm);
  });

  // === Apply filters + search ===
  function applyFilters(filter, searchTerm) {
    filteredProjects = projects;

    if (filter !== 'all') {
      if (filter === 'highlight') {
        // highlight 프로젝트만 선택
        filteredProjects = filteredProjects.filter(p => p.highlight === true);
    } else {
        filteredProjects = filteredProjects.filter(p => p.filter.toLowerCase() === filter);
    }
    }

    if (searchTerm) {
      const keywords = searchTerm.split(' ').filter(kw => kw.trim()); // Split into keywords
      filteredProjects = filteredProjects.filter(p =>
        keywords.some(kw => // OR condition: any keyword matches any skill
          p.skillStack.some(skill => skill.toLowerCase().includes(kw))
        )
      );
    }

    renderProjects();
  }

  // === Render projects (only visibleCount items) ===
  function renderProjects() {
    const grid = document.getElementById('projectGrid');
    grid.innerHTML = '';

    const toShow = filteredProjects.slice(0, visibleCount);
    toShow.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      if (project.highlight) card.classList.add('highlight'); // 강조 적용
      card.innerHTML = `
            ${project.img ? `<img src="${project.img}" alt="${project.name}">` : ''}
            <h3>${project.name}</h3>
            <p>${project.description.replace(/\n/g, '<br>')}</p>
            <div class="skills">
              ${project.skillStack && project.skillStack.length > 0
                ? project.skillStack.map(skill => `<span class="skill">${skill}</span>`).join('')
                : ''}
            </div>
            <div class="project-meta">
              <p class="date">Date: ${project.date}</p>
              <a href="${project.link}" target="_blank" class="view-project-btn">View Project</a>
            </div>
    `;
      // Add touch events for mobile hover effect
      card.addEventListener('touchstart', () => {
        card.classList.add('hover');
      });

      card.addEventListener('touchend', () => {
        card.classList.remove('hover');
      });

      grid.appendChild(card);
    });
  }

  // === Infinite Scroll Event ===
  window.addEventListener('scroll', () => {
    // When user reaches near bottom of the page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      // Load more if there are remaining projects
      if (visibleCount < filteredProjects.length) {
        visibleCount += loadStep;
        renderProjects();
      }
    }
  });
});
