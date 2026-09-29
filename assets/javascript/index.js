// Content is baked into index.html at build time (see util/build.js). This
// file is progressive enhancement only: theme toggle, sidebar nav, and the
// scroll-reveal animation -- none of it is required to read the page.

function setupObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-fade').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    setupObserver();
    document.querySelectorAll('aside a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('aside div a').forEach(a => a.classList.remove('sidebar-active'));
            this.classList.add('sidebar-active');
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        });
    });
});
export function toggleTheme() {
    document.documentElement.classList.toggle('light-mode');
    const isLight = document.documentElement.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
};
window.toggleTheme = toggleTheme
if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light-mode');
}
