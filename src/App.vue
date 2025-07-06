<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const auth = getAuth()

onMounted(() => {
  auth.onAuthStateChanged((user) => {
    isLoggedIn.value = !!user
  })
})

async function handleLogout() {
  try {
    await signOut(auth)
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<template>
  <div class="app-container">
    <header class="top-navbar" :class="{ 'authenticated': isLoggedIn }">
      <div class="navbar-content">
        <div class="logo-container">
          <RouterLink to="/" class="logo-text">
            <h1>PrimeLearn</h1>
          </RouterLink>
        </div>
        
        <nav class="nav-links">
          <div class="nav-center">
            <RouterLink v-if="!isLoggedIn" to="/">Home</RouterLink>
            <RouterLink v-if="!isLoggedIn" to="/login">Login</RouterLink>
            <RouterLink v-if="!isLoggedIn" to="/register">Register</RouterLink>
            
            <div v-if="isLoggedIn" class="user-nav-links">
              <RouterLink to="/dashboard">Dashboard</RouterLink>
              <RouterLink to="/flashcards">Flashcards</RouterLink>
              <RouterLink to="/quiz">Quiz</RouterLink>
              <RouterLink to="/progress">Progress</RouterLink>
            </div>
          </div>
          
          <div v-if="isLoggedIn" class="logout-container">
            <button @click="handleLogout" class="logout-btn">
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <div class="content-container">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
}

.top-navbar {
  background-color: #1e40af;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.top-navbar.authenticated {
  background-color: rgb(211, 193, 218);
  color: #1e40af;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.logo-text {
  text-decoration: none;
  color: inherit;
}

.logo-text h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-left: 2rem;
}

.nav-center {
  display: flex;
  justify-content: center;
  flex: 1;
  gap: 1.5rem;
  align-items: center;
}

.user-nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.logout-container {
  margin-left: auto;
}

.nav-links a {
  color: inherit;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  font-weight: 500;
}

.top-navbar:not(.authenticated) a:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.top-navbar.authenticated a {
  color: #4b5563;
}

.top-navbar.authenticated a:hover {
  color: #1e40af;
  background-color: rgba(30, 64, 175, 0.05);
}

.top-navbar.authenticated a.router-link-exact-active {
  color: #1e40af;
  font-weight: 600;
  background-color: rgba(30, 64, 175, 0.1);
}

.logout-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  font-size: inherit;
  font-family: inherit;
  font-weight: 500;
}

.logout-btn:hover {
  background-color: rgba(239, 68, 68, 0.1);
  transform: translateY(-1px);
}

.main-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.content-container {
  width: 100%;
  max-width: 1200px;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2rem;
  min-height: calc(100vh - 8rem);
}

@media (max-width: 768px) {
  .navbar-content {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .logo-container {
    justify-content: center;
  }
  
  .nav-links {
    flex-direction: column;
    gap: 0.5rem;
    margin-left: 0;
  }
  
  .nav-center {
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .user-nav-links {
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .logout-container {
    margin-left: 0;
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .content-container {
    padding: 1.5rem;
    border-radius: 0.5rem;
  }
}

@media (max-width: 480px) {
  .top-navbar {
    padding: 1rem;
  }
  
  .nav-center {
    gap: 0.5rem;
  }
  
  .user-nav-links {
    gap: 0.5rem;
  }
  
  .nav-links a {
    padding: 0.375rem 0.75rem;
    font-size: 0.9rem;
  }
  
  .logout-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.9rem;
  }
  
  .content-container {
    padding: 1rem;
  }
}
</style>