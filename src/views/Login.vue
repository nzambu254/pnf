<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <div class="logo-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="logo-icon">
            <path fill-rule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
          </svg>
        </div>
        <h1 class="auth-title">Welcome Back</h1>
        <p class="auth-subtitle">Please enter your credentials to continue</p>
      </div>
      
      <form @submit.prevent="login" class="auth-form">
        <div class="input-group">
          <label for="email">Email Address</label>
          <div class="input-container">
            <input 
              v-model="email"
              id="email"
              type="email"
              placeholder="your.email@example.com"
              class="auth-input"
              required
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="input-icon">
              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
            </svg>
          </div>
        </div>
        
        <div class="input-group">
          <label for="password">Password</label>
          <div class="input-container">
            <input 
              v-model="password"
              id="password"
              type="password"
              placeholder="••••••••"
              class="auth-input"
              required
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="input-icon">
              <path fill-rule="evenodd" d="M8 7a5 5 0 013.61 1.5c.131.117.26.235.387.36A5 5 0 0115 12a.75.75 0 001.5 0 6.5 6.5 0 10-13 0 .75.75 0 001.5 0 5 5 0 013.61-4.5zm5.921 5.309a.75.75 0 00-1.058-.081l-3.493 3.08-1.573-1.35a.75.75 0 10-.976 1.139l2.125 1.825a.75.75 0 001.054.008l4-3.5a.75.75 0 00-.081-1.061z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
            <label for="remember-me" class="ml-2 block text-sm text-gray-600">Remember me</label>
          </div>
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        
        <button type="submit" class="auth-button">
          <span v-if="!isLoading">Sign In</span>
          <svg v-else class="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button>
        
        <div class="auth-footer">
          <p class="text-sm text-gray-500">Don't have an account? 
            <RouterLink to="/register" class="auth-link">Sign up</RouterLink>
          </p>
          <div class="admin-link-container">
            <p class="text-xs text-gray-400 mb-1">Are you an administrator?</p>
            <RouterLink to="/admin/login" class="admin-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mr-1">
                <path fill-rule="evenodd" d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 101.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 013.095 2.348.75.75 0 00.992 0 26.547 26.547 0 015.93-3.95.75.75 0 00.42-.739 41.053 41.053 0 00-.39-3.114 29.925 29.925 0 00-5.199 2.801 2.25 2.25 0 01-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 01-1.084 3.45 26.503 26.503 0 00-1.281-.78A5.487 5.487 0 006 12v-.54z" clip-rule="evenodd" />
              </svg>
              Admin Portal
            </RouterLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const router = useRouter()

async function login() {
  try {
    isLoading.value = true
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/dashboard')
  } catch (error) {
    alert(error.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 1rem;
  background-image: radial-gradient(circle at 10% 20%, rgba(233, 213, 255, 0.1) 0%, rgba(243, 244, 246, 0) 90%);
}

.auth-card {
  width: 100%;
  max-width: 28rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
  padding: 2.5rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.auth-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
  transform: translateY(-2px);
}

.auth-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.logo-icon {
  width: 3rem;
  height: 3rem;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  padding: 0.75rem;
  border-radius: 1rem;
}

.auth-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
  line-height: 1.25;
}

.auth-subtitle {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.5;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.input-container {
  position: relative;
}

.auth-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.625rem;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background-color: #f9fafb;
  color: #111827;
}

.auth-input:focus {
  outline: none;
  border-color: #818cf8;
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.15);
  background-color: white;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
  transition: all 0.2s ease;
}

.auth-input:focus + .input-icon {
  color: #6366f1;
}

.auth-button {
  width: 100%;
  padding: 1rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 0.625rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
}

.auth-button:hover {
  background-color: #4f46e5;
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2), 0 2px 4px -1px rgba(79, 70, 229, 0.1);
}

.auth-button:active {
  background-color: #4338ca;
}

.auth-button:disabled {
  background-color: #c7d2fe;
  cursor: not-allowed;
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.auth-footer p {
  margin-bottom: 0.5rem;
}

.auth-link {
  color: #6366f1;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  margin-left: 0.25rem;
}

.auth-link:hover {
  color: #4f46e5;
  text-decoration: underline;
}

.admin-link-container {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f3f4f6;
}

.admin-link {
  color: #6366f1;
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid #e0e7ff;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  background-color: #f0f4ff;
  font-size: 0.875rem;
}

.admin-link:hover {
  background-color: #6366f1;
  color: white;
  border-color: #6366f1;
  text-decoration: none;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 1.75rem;
  }
  
  .auth-title {
    font-size: 1.5rem;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.auth-card {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>