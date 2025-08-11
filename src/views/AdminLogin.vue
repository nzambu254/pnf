<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <h1 class="auth-title">Admin Login</h1>
        <p class="auth-subtitle">Access the admin dashboard</p>
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <form @submit.prevent="adminLogin" class="auth-form">
        <div class="input-group">
          <label for="email">Admin Email</label>
          <input 
            v-model="email"
            id="email"
            type="email"
            placeholder="Enter admin email"
            class="auth-input"
            required
          />
        </div>
        
        <div class="input-group">
          <label for="password">Admin Password</label>
          <input 
            v-model="password"
            id="password"
            type="password"
            placeholder="Enter admin password"
            class="auth-input"
            required
          />
        </div>
        
        <button type="submit" class="auth-button" :disabled="loading">
          <span v-if="loading">Signing in...</span>
          <span v-else>Admin Sign In</span>
        </button>
        
        <div class="auth-footer">
          <p><RouterLink to="/login" class="auth-link">Back to User Login</RouterLink></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

async function adminLogin() {
  loading.value = true
  error.value = ''
  
  try {
    // Check if credentials match admin credentials
    if (email.value === 'kapkechui72@gmail.com' && password.value === '1234567') {
      // Store admin session
      sessionStorage.setItem('adminEmail', email.value)
      sessionStorage.setItem('adminPassword', password.value)
      sessionStorage.setItem('adminLoginTime', new Date().getTime())
      
      // Redirect to admin dashboard
      router.push('/admin/dashboard')
    } else {
      error.value = 'Invalid admin credentials'
    }
  } catch (err) {
    error.value = 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.auth-subtitle {
  color: #64748b;
  font-size: 0.95rem;
}

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-align: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
}

.auth-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background-color: #f8fafc;
}

.auth-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.auth-button {
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
}

.auth-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-button:active {
  transform: translateY(0);
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

.auth-link {
  color: #667eea;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.auth-link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 1.75rem;
  }
  
  .auth-title {
    font-size: 1.5rem;
  }
}
</style>