<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <img alt="PrimeLearn Logo" src="@/assets/logo.svg" width="40" height="40" />
      <h2 class="sidebar-title">PrimeLearn</h2>
    </div>
    <nav class="sidebar-nav">
      <RouterLink to="/dashboard" class="sidebar-link">
        <span class="material-icons">dashboard</span>
        <span>Dashboard</span>
      </RouterLink>
      <RouterLink to="/flashcards" class="sidebar-link">
        <span class="material-icons">style</span>
        <span>Flashcards</span>
      </RouterLink>
      <RouterLink to="/quiz" class="sidebar-link">
        <span class="material-icons">quiz</span>
        <span>Quiz</span>
      </RouterLink>
      <RouterLink to="/progress" class="sidebar-link">
        <span class="material-icons">trending_up</span>
        <span>Progress</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #1e40af;
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  padding: 1rem;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s;
}

.sidebar-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-link.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 500;
}

.material-icons {
  font-size: 1.25rem;
}
</style>