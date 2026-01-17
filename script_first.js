document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    const loginBtn = document.getElementById('loginBtn');
    
    // Пароль для проверки
    const CORRECT_PASSWORD = '1';
    
    // URL сайта для перехода после ввода правильного пароля
    const TARGET_URL = 'login.html'; 

    loginBtn.addEventListener('click', function() {
        const enteredPassword = passwordInput.value;
        
        if (enteredPassword === CORRECT_PASSWORD) {
            
            window.location.href = TARGET_URL;
        } else {
            
            alert('Неверный пароль! Попробуйте еще раз.');
            passwordInput.value = ''; 
            passwordInput.focus(); 
        }
    });
    
    
    passwordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            loginBtn.click(); 
        }
    });
    
   
    passwordInput.focus();
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