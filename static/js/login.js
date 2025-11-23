// Auth Login JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const loginForm = document.querySelector('.auth-login-form');
  const loginBtn = document.getElementById('login-btn');
  const passwordToggle = document.getElementById('password-toggle');
  const passwordInput = document.querySelector('input[type="password"]');
  const loadingSpinner = document.getElementById('loading-spinner');
  
  // Password visibility toggle
  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', function() {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      
      const toggleIcon = this.querySelector('.toggle-icon');
      toggleIcon.textContent = isPassword ? '🔒' : '👁️';
      
      // Add animation
      this.style.transform = 'scale(1.1)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  }
  
  // Form submission with loading state
  if (loginForm && loginBtn) {
    loginForm.addEventListener('submit', function(e) {
      // Basic validation
      const inputs = this.querySelectorAll('input[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          showFieldError(input, 'This field is required');
        } else {
          clearFieldError(input);
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        // Shake animation for errors
        loginForm.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          loginForm.style.animation = '';
        }, 500);
        return;
      }
      
      // Show loading state
      loginBtn.classList.add('loading');
      loginBtn.disabled = true;
      loginBtn.querySelector('.btn-text').textContent = 'Logging in...';
      
      // Simulate network delay for demo (remove in production)
      setTimeout(() => {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
        loginBtn.querySelector('.btn-text').textContent = 'Login';
      }, 2000);
    });
  }
  
  // FIXED: Better input focus management
  const formInputs = loginForm?.querySelectorAll('input');
  formInputs?.forEach(input => {
    // Add focus effects - only to the focused input
    input.addEventListener('focus', function() {
      // Remove focus from all other inputs
      formInputs.forEach(otherInput => {
        if (otherInput !== this) {
          otherInput.parentElement.classList.remove('focused');
        }
      });
      
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
      
      // Validation on blur
      if (this.hasAttribute('required') && !this.value.trim()) {
        showFieldError(this, 'This field is required');
      } else {
        clearFieldError(this);
        
        // Email validation
        if (this.type === 'email' && this.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(this.value)) {
            showFieldError(this, 'Please enter a valid email address');
          }
        }
      }
    });
    
    input.addEventListener('input', function() {
      // Clear error when user starts typing
      if (this.value.trim()) {
        clearFieldError(this);
      }
    });
  });
  
  // Field error handling
  function showFieldError(input, message) {
    const formGroup = input.closest('.auth-form-group');
    formGroup.classList.add('has-error');
    
    let errorContainer = formGroup.querySelector('.auth-field-errors');
    if (!errorContainer) {
      errorContainer = document.createElement('div');
      errorContainer.className = 'auth-field-errors';
      formGroup.appendChild(errorContainer);
    }
    
    errorContainer.innerHTML = `<span class="auth-error-text">${message}</span>`;
    
    // Add shake animation to the specific field
    formGroup.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
      formGroup.style.animation = '';
    }, 500);
  }
  
  function clearFieldError(input) {
    const formGroup = input.closest('.auth-form-group');
    formGroup.classList.remove('has-error');
    
    const errorContainer = formGroup.querySelector('.auth-field-errors');
    if (errorContainer) {
      errorContainer.remove();
    }
  }
  
  // Remember me functionality
  const rememberCheckbox = document.querySelector('.auth-checkbox');
  if (rememberCheckbox) {
    // Check if we have saved credentials
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
      const usernameInput = document.querySelector('input[type="text"], input[type="email"]');
      if (usernameInput) {
        usernameInput.value = savedUsername;
        rememberCheckbox.checked = true;
      }
    }
    
    rememberCheckbox.addEventListener('change', function() {
      if (this.checked) {
        const usernameInput = document.querySelector('input[type="text"], input[type="email"]');
        if (usernameInput && usernameInput.value) {
          localStorage.setItem('rememberedUsername', usernameInput.value);
        }
      } else {
        localStorage.removeItem('rememberedUsername');
      }
    });
  }
  
  // Add input animations
  const style = document.createElement('style');
  style.textContent = `
    .auth-input-container.focused {
      transform: translateY(-1px);
    }
    
    .auth-form-group.has-error {
      animation: shake 0.5s ease-in-out;
    }
    
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0px 1000px #f0f9ff inset;
      -webkit-text-fill-color: #374151;
      transition: background-color 5000s ease-in-out 0s;
    }
    
    /* FIXED: Better focus isolation */
    .auth-input-container input:focus {
      isolation: isolate;
    }
  `;
  document.head.appendChild(style);
  
  // Add some interactive background elements
  createFloatingParticles();
  
  function createFloatingParticles() {
    const container = document.querySelector('.auth-login-container');
    const particles = 15;
    
    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      container.appendChild(particle);
    }
    
    // Add particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
      @keyframes floatParticle {
        0% {
          transform: translateY(100vh) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100px) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(particleStyle);
  }
});