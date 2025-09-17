// Sidebar Navigation Logic
const links = document.querySelectorAll('#menu .nav-link');
const sections = document.querySelectorAll('.content-section');

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Remove active class from all links
    links.forEach(l => l.classList.remove('active'));

    // Add active class to clicked link
    link.classList.add('active');

    const sectionId = link.getAttribute('data-section');

    // Hide all sections
    sections.forEach(section => section.classList.add('d-none'));

    // Show selected section
    document.getElementById(sectionId).classList.remove('d-none');
  });
});

  const sidebarLinks = document.querySelectorAll('.nav-link');

  function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.add('d-none');
    });

    // Show the selected section
    document.getElementById(sectionId).classList.remove('d-none');

    // Update sidebar active state
    sidebarLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === sectionId) {
        link.classList.add('active');
      }
    });
  }

  // Handle sidebar clicks
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
    });
  });



