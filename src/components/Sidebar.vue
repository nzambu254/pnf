<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="logo-container">
        <img alt="PrimeLearn Logo" src="@/assets/logo.svg" width="32" height="32" />
      </div>
      <h2 class="sidebar-title">PrimeLearn</h2>
    </div>
    
    <nav class="sidebar-nav">
      <RouterLink to="/dashboard" class="sidebar-link">
        <span class="material-icons">dashboard</span>
        <span class="link-text">Dashboard</span>
      </RouterLink>
      
      <RouterLink to="/flashcards" class="sidebar-link">
        <span class="material-icons">style</span>
        <span class="link-text">Flashcards</span>
      </RouterLink>
      
      <RouterLink to="/quiz" class="sidebar-link">
        <span class="material-icons">quiz</span>
        <span class="link-text">Quiz</span>
      </RouterLink>
      
      <RouterLink to="/progress" class="sidebar-link">
        <span class="material-icons">trending_up</span>
        <span class="link-text">Progress</span>
      </RouterLink>
    </nav>
    
    <div class="sidebar-footer">
      <div class="user-info">
        <span class="material-icons">account_circle</span>
        <span class="user-name">User Profile</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.sidebar {
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #1e40af 0%, #1e3a8a 100%);
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow-y: auto;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.sidebar-title {
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin: 0;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  font-size: 0.925rem;
  position: relative;
  overflow: hidden;
}

.sidebar-link:hover {
  background: rgba(255, 255, 255, 0.12);
  color: white;
  transform: translateX(4px);
}

.sidebar-link.router-link-exact-active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
}

.sidebar-link.router-link-exact-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background: white;
  border-radius: 0 2px 2px 0;
}

.material-icons {
  font-size: 1.25rem;
  opacity: 0.9;
}

.link-text {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.sidebar-footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.user-info:hover {
  background: rgba(255, 255, 255, 0.15);
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Responsive design */
@media (max-width: 768px) {
  .sidebar {
    width: 260px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
  }
}

/* Scrollbar styling */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>