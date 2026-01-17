document.addEventListener('DOMContentLoaded', function() {
                const emailInput = document.getElementById('emailInput');
                const passwordInput = document.getElementById('passwordInput');
                const rememberCheckbox = document.getElementById('remember');
                const loginBtn = document.getElementById('loginBtn');
                const messageDiv = document.getElementById('message');

                const USERS_KEY = 'registeredUsers';

                // УДАЛЕНО: автоматическая проверка сохраненного пользователя
                // Это мешало работе ссылки "Продолжить без аккаунта"

                function loadUsers() {
                    const usersJSON = localStorage.getItem(USERS_KEY);
                    return usersJSON ? JSON.parse(usersJSON) : [];
                }

                function showMessage(text, isError = false) {
                    messageDiv.textContent = text;
                    messageDiv.style.color = isError ? '#ff6b6b' : '#51cf66';
                    
                    setTimeout(() => {
                        messageDiv.textContent = '';
                    }, 5000);
                }

                function handleLogin() {
                    const email = emailInput.value.trim();
                    const password = passwordInput.value.trim();
                    const remember = rememberCheckbox.checked;

                    if (!email || !password) {
                        showMessage('Пожалуйста, заполните все поля', true);
                        return;
                    }

                    const users = loadUsers();
                    
                    const user = users.find(u => u.email === email && u.password === password);
                    
                    if (user) {
                        // Сохраняем информацию о текущем пользователе
                        const currentUser = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            loginTime: new Date().toISOString()
                        };
                        
                        if (remember) {
                            localStorage.setItem('currentUser', JSON.stringify(currentUser));
                        } else {
                            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                        }
                        
                        showMessage('✓ Вход выполнен успешно! Переход на главную...', false);
                        
                        // ПЕРЕХОД НА gl.html через 1 секунду
                        setTimeout(() => {
                            window.location.href = 'gl.html';
                        }, 1000);
                        
                    } else {
                        showMessage('Неверный email или пароль', true);
                        passwordInput.value = '';
                        passwordInput.focus();
                    }
                }

                // Добавляем обработчик для кнопки "Продолжить без аккаунта"
                // Этот обработчик сохраняет информацию о госте
                document.querySelector('.register-link1').addEventListener('click', function(e) {
                    e.preventDefault(); // Предотвращаем стандартный переход по ссылке
                    
                    // Создаем запись для гостя
                    const guestUser = {
                        id: 'guest',
                        name: 'Гость',
                        email: '',
                        isGuest: true,
                        loginTime: new Date().toISOString()
                    };
                    
                    // Сохраняем информацию о госте в sessionStorage
                    sessionStorage.setItem('currentUser', JSON.stringify(guestUser));
                    
                    // Переходим на главную страницу
                    window.location.href = 'gl.html';
                });

                loginBtn.addEventListener('click', handleLogin);

                emailInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') passwordInput.focus();
                });

                passwordInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') handleLogin();
                });

                emailInput.focus();
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