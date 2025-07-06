<template>
  <div class="home-container">
    <section class="hero-section">
      <div class="hero-content">
        <h1>Welcome to PrimeLearn</h1>
        <p>Enhance your learning experience with interactive flashcards, quizzes, and progress tracking.</p>
        <div class="cta-buttons">
          <RouterLink to="/register" class="cta-button primary">Get Started</RouterLink>
          <RouterLink to="/login" class="cta-button secondary">Login</RouterLink>
        </div>
      </div>
      <div class="hero-image">
        <img src="@/assets/learning-illustration.svg" alt="Learning illustration">
      </div>
    </section>

    <section class="features-section">
      <h2>Our Features</h2>
      <div class="features-grid">
        <div class="feature-card">
          <span class="material-icons">style</span>
          <h3>Flashcards</h3>
          <p>Create and study with interactive flashcards to improve retention.</p>
        </div>
        <div class="feature-card">
          <span class="material-icons">quiz</span>
          <h3>Quizzes</h3>
          <p>Test your knowledge with customizable quizzes.</p>
        </div>
        <div class="feature-card">
          <span class="material-icons">trending_up</span>
          <h3>Progress Tracking</h3>
          <p>Monitor your learning progress with detailed analytics.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 4rem 0;
}

.hero-content {
  flex: 1;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1e40af;
}

.hero-content p {
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
}

.cta-button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.cta-button.primary {
  background-color: #1e40af;
  color: white;
}

.cta-button.primary:hover {
  background-color: #1e3a8a;
}

.cta-button.secondary {
  border: 1px solid #1e40af;
  color: #1e40af;
}

.cta-button.secondary:hover {
  background-color: #eff6ff;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
}

.hero-image img {
  max-width: 100%;
  height: auto;
}

.features-section {
  padding: 4rem 0;
  text-align: center;
}

.features-section h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1e40af;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card .material-icons {
  font-size: 2.5rem;
  color: #1e40af;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.feature-card p {
  color: #64748b;
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    padding: 2rem 0;
  }
  
  .cta-buttons {
    justify-content: center;
  }
}
</style>