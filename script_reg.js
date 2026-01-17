document.addEventListener('DOMContentLoaded', function() {
                const nameInput = document.getElementById('nameInput');
                const emailInput = document.getElementById('emailInput');
                const passwordInput = document.getElementById('passwordInput');
                const confirmPasswordInput = document.getElementById('confirmPasswordInput');
                const agreeCheckbox = document.getElementById('agreeCheckbox');
                const registerBtn = document.getElementById('registerBtn');
                const messageDiv = document.getElementById('message');

                const USERS_KEY = 'registeredUsers';

                function loadUsers() {
                    const usersJSON = localStorage.getItem(USERS_KEY);
                    return usersJSON ? JSON.parse(usersJSON) : [];
                }

                function saveUsers(users) {
                    localStorage.setItem(USERS_KEY, JSON.stringify(users));
                }

                function emailExists(email, users) {
                    return users.some(user => user.email === email);
                }

                function showMessage(text, isError = false) {
                    messageDiv.textContent = text;
                    messageDiv.style.color = isError ? '#ff6b6b' : '#51cf66';
                    
                    setTimeout(() => {
                        messageDiv.textContent = '';
                    }, 5000);
                }

                function validateEmail(email) {
                    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return re.test(email);
                }

                function handleRegistration() {
                    const name = nameInput.value.trim();
                    const email = emailInput.value.trim();
                    const password = passwordInput.value.trim();
                    const confirmPassword = confirmPasswordInput.value.trim();
                    const agree = agreeCheckbox.checked;

                    if (!name || !email || !password || !confirmPassword) {
                        showMessage('Пожалуйста, заполните все поля', true);
                        return;
                    }

                    if (name.length < 2) {
                        showMessage('Имя должно содержать минимум 2 символа', true);
                        return;
                    }

                    if (!validateEmail(email)) {
                        showMessage('Введите корректный email', true);
                        return;
                    }

                    if (password.length < 6) {
                        showMessage('Пароль должен содержать минимум 6 символов', true);
                        return;
                    }

                    if (password !== confirmPassword) {
                        showMessage('Пароли не совпадают', true);
                        return;
                    }

                    if (!agree) {
                        showMessage('Необходимо согласиться с условиями', true);
                        return;
                    }

                    const users = loadUsers();

                    if (emailExists(email, users)) {
                        showMessage('Пользователь с таким email уже зарегистрирован', true);
                        return;
                    }

                    const newUser = {
                        id: Date.now(),
                        name: name,
                        email: email,
                        password: password,
                        registrationDate: new Date().toISOString()
                    };

                    users.push(newUser);
                    saveUsers(users);

                    // Сохраняем данные текущего пользователя для автоматического входа
                    localStorage.setItem('currentUser', JSON.stringify({
                        id: newUser.id,
                        name: newUser.name,
                        email: newUser.email,
                        loginTime: new Date().toISOString()
                    }));

                    showMessage('✓ Регистрация успешна! Переход на главную...', false);

                    // ПЕРЕХОД НА gl.html через 1 секунду
                    setTimeout(() => {
                        window.location.href = 'gl.html';
                    }, 1000);
                }

                registerBtn.addEventListener('click', handleRegistration);

                nameInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') emailInput.focus();
                });

                emailInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') passwordInput.focus();
                });

                passwordInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') confirmPasswordInput.focus();
                });

                confirmPasswordInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') handleRegistration();
                });

                nameInput.focus();
            });


// АНИМАШКЕ
const faders = document.querySelectorAll('.fade-up');

const appearOptions = {
  threshold: 0.1
};

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));