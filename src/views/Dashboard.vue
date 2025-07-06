<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <p class="welcome-text">Welcome! Choose an activity:</p>
    <ul class="activity-list">
      <li><router-link to="/flashcards">Practice Flashcards</router-link></li>
      <li><router-link to="/quiz">Take a Quiz</router-link></li>
      <li><router-link to="/progress">View Progress</router-link></li>
    </ul>
  </div>
</template>

<script setup>
</script>

<style scoped>
.dashboard {
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.welcome-text {
  margin-bottom: 1rem;
}

.activity-list {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-top: 1rem;
}

.activity-list li {
  margin-bottom: 0.5rem;
}

.activity-list a {
  color: #3b82f6;
  text-decoration: none;
}

.activity-list a:hover {
  text-decoration: underline;
}
</style>