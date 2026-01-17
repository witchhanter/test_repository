document.addEventListener('DOMContentLoaded', function() {
            const userInfo = document.getElementById('userInfo');
            const logoutBtn = document.getElementById('logoutBtn');
            const currentTime = document.getElementById('currentTime');
            
            // Проверяем, авторизован ли пользователь
            function checkAuth() {
                const savedUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
                
                if (!savedUser) {
                    // Если пользователь не авторизован, возвращаем на страницу входа
                    window.location.href = 'index.html';
                    return null;
                }
                
                return JSON.parse(savedUser);
            }
            
            // Загружаем данные пользователя
            const currentUser = checkAuth();
            
            if (currentUser) {
                // Отображаем информацию о пользователе
                userInfo.innerHTML = `
                    👤 <strong>${currentUser.name}</strong><br>
                    📧 ${currentUser.email}<br>
                    ⏰ Вход: ${new Date(currentUser.loginTime).toLocaleString('ru-RU')}
                `;
            }
            
            // Обновляем текущее время
            function updateTime() {
                currentTime.textContent = new Date().toLocaleString('ru-RU');
            }
            
            updateTime();
            setInterval(updateTime, 1000);
            
            // Обработчик выхода
            logoutBtn.addEventListener('click', function() {
                // Удаляем данные пользователя
                localStorage.removeItem('currentUser');
                sessionStorage.removeItem('currentUser');
                
                // Переходим на страницу входа
                window.location.href = 'login.html';
            });
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