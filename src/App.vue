<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isLoggedIn = ref(false)
const auth = getAuth()

const hideNavbarRoutes = ['/', '/login', '/admin/login', '/register']

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
    <header 
      class="top-navbar" 
      :class="{ 'authenticated': isLoggedIn }"
      v-if="!hideNavbarRoutes.includes(route.path)"
    >
      <div class="navbar-content">
        <div class="logo-container">
          <div class="logo-icon">
            <span class="logo-symbol">P</span>
          </div>
          <RouterLink to="/dashboard" class="logo-text">
            <h1>PrimeLearn</h1>
          </RouterLink>
        </div>
        
        <nav class="nav-links">
          <div class="nav-center">
            <div v-if="isLoggedIn" class="user-nav-links">
              <RouterLink to="/dashboard" class="nav-item">
                <span class="nav-icon">🏠</span>
                <span>Dashboard</span>
              </RouterLink>
              <RouterLink to="/flashcards" class="nav-item">
                <span class="nav-icon">📚</span>
                <span>Flashcards</span>
              </RouterLink>
              <RouterLink to="/quiz" class="nav-item">
                <span class="nav-icon">❓</span>
                <span>Quiz</span>
              </RouterLink>
              <RouterLink to="/progress" class="nav-item">
                <span class="nav-icon">📈</span>
                <span>Progress</span>
              </RouterLink>
            </div>
          </div>
          
          <div v-if="isLoggedIn" class="user-section">
            <div class="user-avatar">
              <span class="avatar-icon">👤</span>
            </div>
            <button @click="handleLogout" class="logout-btn">
              <span class="logout-icon">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </header>

    <main class="main-content" :class="{ 'full-height': hideNavbarRoutes.includes(route.path) }">
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(10px);
  color: white;
  padding: 1.25rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 80px;
}

.navbar-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.logo-icon {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.logo-symbol {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.logo-text {
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.logo-text:hover {
  transform: scale(1.02);
}

.logo-text h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #fff, #f0f8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-left: 3rem;
  height: 100%;
}

.nav-center {
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
}

.user-nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  font-size: 0.95rem;
  position: relative;
  overflow: hidden;
}

.nav-item:hover {
  color: white;
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-item.router-link-exact-active {
  color: white;
  background: rgba(255, 255, 255, 0.2);
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.nav-item.router-link-exact-active::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  border-radius: 2px;
}

.nav-icon {
  font-size: 1.1rem;
  opacity: 0.9;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.avatar-icon {
  font-size: 1.2rem;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.75rem 1.25rem;
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.9rem;
  font-family: inherit;
  font-weight: 500;
  box-shadow: 0 3px 10px rgba(255, 107, 107, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.logout-btn:hover {
  background: linear-gradient(135deg, #ee5a52, #ff6b6b);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

.logout-btn:active {
  transform: translateY(0);
}

.logout-icon {
  font-size: 1rem;
}

.main-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.main-content.full-height {
  min-height: 100vh;
}

.content-container {
  width: 100%;
  max-width: 1400px;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 2.5rem;
  min-height: calc(100vh - 8rem);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .navbar-content {
    max-width: 100%;
    padding: 0 1rem;
  }
  
  .nav-links {
    margin-left: 2rem;
  }
  
  .user-nav-links {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .top-navbar {
    padding: 1rem;
    min-height: auto;
  }
  
  .navbar-content {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
  
  .logo-container {
    justify-content: center;
  }
  
  .nav-links {
    flex-direction: column;
    gap: 1rem;
    margin-left: 0;
  }
  
  .nav-center {
    width: 100%;
  }
  
  .user-nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 20px;
  }
  
  .user-section {
    justify-content: center;
    margin-left: 0;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .content-container {
    padding: 1.5rem;
    border-radius: 0.75rem;
  }
}

@media (max-width: 480px) {
  .logo-text h1 {
    font-size: 1.5rem;
  }
  
  .logo-icon {
    width: 40px;
    height: 40px;
  }
  
  .user-nav-links {
    gap: 0.75rem;
    padding: 0.75rem;
  }
  
  .nav-item {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
  
  .nav-item span:not(.nav-icon) {
    display: none;
  }
  
  .logout-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
  
  .logout-btn span:not(.logout-icon) {
    display: none;
  }
  
  .content-container {
    padding: 1rem;
  }
}

/* Enhanced animations and effects */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.top-navbar {
  animation: fadeInUp 0.6s ease-out;
}

.nav-item, .logout-btn {
  position: relative;
  overflow: hidden;
}

.nav-item::after, .logout-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.nav-item:hover::after, .logout-btn:hover::after {
  left: 100%;
}
</style>