function switchTab(tab) {
    document.getElementById('formSignin').classList.toggle('active', tab === 'signin');
    document.getElementById('formSignup').classList.toggle('active', tab === 'signup');
    document.getElementById('tabSignin').classList.toggle('active', tab === 'signin');
    document.getElementById('tabSignup').classList.toggle('active', tab === 'signup');
}
function showForm(tab) { switchTab(tab); }

const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');
const eyeIcon = document.getElementById('eyeIcon');
togglePassword.addEventListener('click', () => {
    const isPassword = password.getAttribute('type') === 'password';
    password.setAttribute('type', isPassword ? 'text' : 'password');
    eyeIcon.innerHTML = isPassword
        ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'
        : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
});

const togglePassword2 = document.getElementById('togglePassword2');
const password2 = document.getElementById('password2');
const eyeIcon2 = document.getElementById('eyeIcon2');
togglePassword2.addEventListener('click', () => {
    const isPassword = password2.getAttribute('type') === 'password';
    password2.setAttribute('type', isPassword ? 'text' : 'password');
    eyeIcon2.innerHTML = isPassword
        ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'
        : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
});

document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
});

const nav = document.querySelector('nav');
const heroSection = document.getElementById('home');

function updateNav() {
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    const heroHeight = heroSection.offsetHeight;
    if (scrolled >= heroHeight - 64) {
        nav.classList.add('nav-light');
        nav.classList.remove('nav-dark');
    } else {
        nav.classList.add('nav-dark');
        nav.classList.remove('nav-light');
    }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();