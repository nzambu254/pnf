<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <h1 class="auth-title">Create Account</h1>
        <p class="auth-subtitle">Get started with your new account</p>
      </div>
      
      <form @submit.prevent="register" class="auth-form">
        <div class="input-group">
          <label for="email">Email Address</label>
          <input 
            v-model="email" 
            id="email"
            type="email" 
            placeholder="Enter your email" 
            class="auth-input" 
            required
          />
        </div>
        
        <div class="input-group">
          <label for="password">Password</label>
          <input 
            v-model="password" 
            id="password"
            type="password" 
            placeholder="Create a password" 
            class="auth-input" 
            required
          />
        </div>
        
        <button type="submit" class="auth-button">
          <span>Sign Up</span>
        </button>
        
        <div class="auth-footer">
          <p>Already have an account? <RouterLink to="/login" class="auth-link">Sign in</RouterLink></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

async function register() {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email.value, password.value)
    await setDoc(doc(db, 'users', cred.user.uid), {
      email: email.value,
      createdAt: Date.now(),
    })
    router.push('/dashboard')
  } catch (error) {
    alert(error.message)
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 2rem;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
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
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.auth-button {
  width: 100%;
  padding: 0.875rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
}

.auth-button:hover {
  background-color: #059669;
  transform: translateY(-1px);
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
  color: #10b981;
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