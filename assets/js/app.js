document.addEventListener('DOMContentLoaded', () => {
  const projectsList = document.getElementById('projects-list');
  fetch('https://api.github.com/users/Ramaraju-devops/repos?sort=updated')
    .then(response => response.json())
    .then(repos => {
      projectsList.innerHTML = '';
      repos.forEach(repo => {
        const project = document.createElement('div');
        project.className = 'project-card';
        project.innerHTML = `
          <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
          <p>${repo.description ? repo.description : 'No description provided.'}</p>
        `;
        projectsList.appendChild(project);
      });
    })
    .catch(error => {
      projectsList.innerHTML = '<p>Unable to load projects at this time.</p>';
    });
}); 