<template>
  <div class="auth-container">
    <h2>Login</h2>
    <input v-model="email" type="email" placeholder="Email" class="auth-input" />
    <input v-model="password" type="password" placeholder="Password" class="auth-input" />
    <button @click="login" class="auth-button">Login</button>
    <p class="auth-footer">
      Don't have an account? <RouterLink to="/register">Register here</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

async function login() {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/dashboard')
  } catch (error) {
    alert(error.message)
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.auth-input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
}

.auth-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.auth-button:hover {
  background-color: #2563eb;
}

.auth-footer {
  margin-top: 1rem;
  text-align: center;
}

.auth-footer a {
  color: #3b82f6;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>