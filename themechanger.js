const themeToggler = document.querySelector('.themetoggler');
themeToggler.addEventListener('mousedown', () => {
    document.body.classList.toggle('darkmode');
});