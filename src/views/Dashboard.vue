<template>
  <div class="dashboard">
    <header class="header">
      <h1>Prime Numbers Learning Platform</h1>
    </header>

    <div class="stats-container">
      <div class="stat-card">
        <h3>Total Flashcards Studied</h3>
        <p>{{ progressData.totalFlashcards || 0 }}</p>
      </div>
      <div class="stat-card">
        <h3>Quiz Accuracy</h3>
        <p>{{ progressData.quizAccuracy ? `${progressData.quizAccuracy}%` : 'N/A' }}</p>
      </div>
      <div class="stat-card">
        <h3>Current Level</h3>
        <p>{{ progressData.currentLevel || 'Beginner' }}</p>
      </div>
    </div>

    <div class="navigation">
      <router-link to="/flashcards" class="nav-card">
        <h2>Flashcards</h2>
        <p>Learn prime numbers with interactive flashcards</p>
      </router-link>
      <router-link to="/quiz" class="nav-card">
        <h2>Quiz</h2>
        <p>Test your knowledge with adaptive quizzes</p>
      </router-link>
      <router-link to="/progress" class="nav-card">
        <h2>Progress</h2>
        <p>Track your learning journey</p>
      </router-link>
    </div>

    <div class="quick-actions">
      <h2>Quick Actions</h2>
      <button @click="startQuickQuiz" class="action-btn">Quick Quiz</button>
      <button @click="reviewDifficult" class="action-btn">Review Difficult Items</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Dashboard',
  computed: {
    ...mapState(['progressData'])
  },
  methods: {
    ...mapActions(['updateProgress']),
    startQuickQuiz() {
      this.$router.push('/quiz?mode=quick');
    },
    reviewDifficult() {
      this.$router.push('/flashcards?filter=difficult');
    },
    fetchProgressData() {
      // Mock progress data - replace with your actual data fetching
      const mockProgress = {
        totalFlashcards: 42,
        quizAccuracy: 85,
        currentLevel: 'Intermediate',
        difficultNumbers: [17, 29, 31]
      };
      this.updateProgress(mockProgress);
    }
  },
  created() {
    this.fetchProgressData();
  }
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  margin-top: 0;
  color: #555;
  font-size: 1rem;
}

.stat-card p {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0;
  color: #2c3e50;
}

.navigation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.nav-card {
  background: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.nav-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.nav-card h2 {
  margin-top: 0;
  color: #2c3e50;
}

.nav-card p {
  color: #666;
}

.quick-actions {
  background: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.quick-actions h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
}

.action-btn {
  padding: 10px 20px;
  margin-right: 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .navigation {
    grid-template-columns: 1fr;
  }
}
</style>