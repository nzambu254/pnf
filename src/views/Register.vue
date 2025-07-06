<template>
  <div class="auth-container">
    <h2>Register</h2>
    <input v-model="email" type="email" placeholder="Email" class="auth-input" />
    <input v-model="password" type="password" placeholder="Password" class="auth-input" />
    <button @click="register" class="auth-button">Register</button>
    <p class="auth-footer">
      Already have an account? <RouterLink to="/login">Login here</RouterLink>
    </p>
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
/* Same styles as Login.vue */
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
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.auth-button:hover {
  background-color: #059669;
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