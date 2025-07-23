$(document).ready(function() {
  // Smooth scroll for nav links
  $('.nav-links a, .footer-links a').on('click', function(e) {
    if (this.hash !== '') {
      e.preventDefault();
      const hash = this.hash;
      $('html, body').animate({ scrollTop: $(hash).offset().top - 60 }, 700);
      $('.nav-links a').removeClass('active');
      $(this).addClass('active');
    }
  });

  // Scrollspy for nav
  $(window).on('scroll', function() {
    const scrollPos = $(document).scrollTop();
    $('.nav-links a').each(function() {
      const currLink = $(this);
      const refElement = $(currLink.attr('href'));
      if (refElement.position().top - 80 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('.nav-links a').removeClass('active');
        currLink.addClass('active');
      }
    });
  });

  // Animate skills progress bars
  function animateSkills() {
    $('.progress').each(function() {
      const width = $(this).attr('style').match(/width: (\d+)%/)[1];
      $(this).css('width', '0');
      $(this).animate({ width: width + '%' }, 1200);
    });
  }
  let skillsAnimated = false;
  $(window).on('scroll', function() {
    const skillsSection = $('#skills').offset().top - $(window).height() + 100;
    if (!skillsAnimated && $(window).scrollTop() > skillsSection) {
      animateSkills();
      skillsAnimated = true;
    }
  });

  // Typewriter effect for hero
  function typeWriterEffect(element, text, speed) {
    let i = 0;
    function typing() {
      if (i < text.length) {
        element.text(text.substring(0, i+1));
        i++;
        setTimeout(typing, speed);
      }
    }
    typing();
  }
  typeWriterEffect($('.typewriter'), 'Azure DevOps Engineer', 80);

  // Fetch GitHub projects
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

  // Contact form (static, no backend)
  $('.contact-form').on('submit', function(e) {
    e.preventDefault();
    alert('Thank you for reaching out! (Form is static)');
    this.reset();
  });
}); 