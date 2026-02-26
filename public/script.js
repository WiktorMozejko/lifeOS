// Form toggle
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    loginForm.classList.toggle('active');
    registerForm.classList.toggle('active');
    
    // Clear error messages
    document.getElementById('login-error').textContent = '';
    document.getElementById('register-error').textContent = '';
}

// Login handler
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showDashboard(data.user);
        } else {
            errorDiv.textContent = data.error || 'Błąd logowania';
            errorDiv.classList.add('show');
        }
    } catch (error) {
        errorDiv.textContent = 'Błąd połączenia: ' + error.message;
        errorDiv.classList.add('show');
    }
});

// Register handler
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;
    const errorDiv = document.getElementById('register-error');
    
    if (password !== passwordConfirm) {
        errorDiv.textContent = 'Hasła nie są identyczne';
        errorDiv.classList.add('show');
        return;
    }
    
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, fullName })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            errorDiv.textContent = '';
            errorDiv.classList.remove('show');
            alert('Rejestracja pomyślna! Teraz się zaloguj.');
            toggleForms();
            document.getElementById('register-form').reset();
        } else {
            errorDiv.textContent = data.error || 'Błąd rejestracji';
            errorDiv.classList.add('show');
        }
    } catch (error) {
        errorDiv.textContent = 'Błąd połączenia: ' + error.message;
        errorDiv.classList.add('show');
    }
});

// Show dashboard
function showDashboard(user) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const dashboard = document.getElementById('dashboard');
    
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');
    dashboard.classList.add('active');
    
    document.getElementById('user-name').textContent = user.email.split('@')[0];
    document.getElementById('user-email').textContent = user.email;
}

// Logout handler
function logout() {
    fetch('/api/auth/logout', {
        method: 'POST'
    }).then(() => {
        location.reload();
    });
}

// Check if user is already logged in
window.addEventListener('load', async () => {
    try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
            const data = await response.json();
            showDashboard(data.user);
        }
    } catch (error) {
        console.log('Not logged in');
    }
});
