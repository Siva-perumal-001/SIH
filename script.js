document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.getElementById('signup-btn');
    const loginBtn = document.getElementById('login-btn');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const formTitle = document.getElementById('form-title');
    const formSubtitle = document.getElementById('form-subtitle');
    const togglePasswordFields = document.querySelectorAll('.toggle-password');

    // Toggle between forms
    signupBtn.addEventListener('click', () => {
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
        formTitle.textContent = "Begin Your Adventure";
        formSubtitle.textContent = "Sign Up with Open account";
    });

    loginBtn.addEventListener('click', () => {
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        formTitle.textContent = "Welcome Back";
        formSubtitle.textContent = "Log In to continue";
    });

    // Toggle password visibility
    togglePasswordFields.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling;
            input.type = input.type === 'password' ? 'text' : 'password';
        });
    });
});
