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
        <img :src="heroImage" alt="Students learning together">
      </div>
    </section>

    <section class="features-section">
      <h2>Our Features</h2>
      <div class="features-grid">
        <div class="feature-card" v-for="feature in features" :key="feature.title">
          <div class="feature-icon">
            <img :src="feature.icon" :alt="feature.title">
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.text }}</p>
        </div>
      </div>
    </section>

    <section class="testimonial-section">
      <div class="testimonial-content">
        <img src="https://img.icons8.com/fluency/96/user-male-circle.png" alt="Happy student" class="testimonial-avatar">
        <div class="testimonial-text">
          <blockquote>"PrimeLearn helped me improve my test scores by 30% in just one month!"</blockquote>
          <p class="testimonial-author">- Sarah Johnson, Medical Student</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import heroImage from '@/assets/image.jpeg'
import flashcardImg from '@/assets/flashcard.jpeg'
import quizImg from '@/assets/quiz.jpeg'
import progImg from '@/assets/prog.jpeg'

const features = [
  {
    title: 'Flashcards',
    text: 'Create and study with interactive flashcards to improve retention.',
    icon: flashcardImg
  },
  {
    title: 'Quizzes',
    text: 'Test your knowledge with customizable quizzes.',
    icon: quizImg
  },
  {
    title: 'Progress Tracking',
    text: 'Monitor your learning progress with detailed analytics.',
    icon: progImg
  }
]
</script>

<style scoped>
/* Prevent scrolling */
:host, html, body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}
.home-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f0f4ff 0%, #e0f7ff 100%);
  padding: 1rem;
  gap: 1rem;
}

/* Hero section compressed */
.hero-section {
  flex: 0.45;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.1) 0%, rgba(3, 169, 244, 0.1) 100%);
  border-radius: 0.75rem;
  padding: 1rem;
}
.hero-content h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #1e40af, #3b82f6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-content p {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #374151;
}
.cta-buttons {
  display: flex;
  gap: 0.5rem;
}
.cta-button {
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}
.cta-button.primary {
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
}
.cta-button.secondary {
  border: 2px solid #1e40af;
  color: #1e40af;
  background: white;
}
.hero-image img {
  max-height: 140px;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

/* Features section compressed */
.features-section {
  flex: 0.35;
  background: white;
  border-radius: 0.75rem;
  padding: 0.8rem;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
.features-section h2 {
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  background: linear-gradient(90deg, #1e40af, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 0.5rem;
}
.feature-card {
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 0.6rem;
}
.feature-icon img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 0.5rem;
}
.feature-card h3 {
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
  color: #1e293b;
}
.feature-card p {
  font-size: 0.75rem;
  color: #64748b;
}

/* Testimonial section compressed */
.testimonial-section {
  flex: 0.2;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  border-radius: 0.75rem;
  color: white;
  padding: 0.8rem;
}
.testimonial-content {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.testimonial-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
blockquote {
  font-size: 0.8rem;
  margin: 0;
}
.testimonial-author {
  font-size: 0.7rem;
}
</style>
