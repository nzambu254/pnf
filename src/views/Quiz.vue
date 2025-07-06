<template>
  <div class="quiz-container">
    <h2>Prime Number Quiz</h2>
    <div v-if="currentQuestion" class="question-container">
      <p class="question-text">Is {{ currentQuestion.number }} a prime number?</p>
      <div class="answer-buttons">
        <button @click="answer(true)" class="yes-button">Yes</button>
        <button @click="answer(false)" class="no-button">No</button>
      </div>
    </div>
    <div v-else class="quiz-result">
      <p>Quiz complete! Score: {{ score }}/{{ questions.length }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

const questions = ref([])
const currentIndex = ref(0)
const score = ref(0)

onMounted(async () => {
  const snapshot = await getDocs(collection(db, 'flashcards'))
  questions.value = snapshot.docs.map(doc => doc.data()).sort(() => 0.5 - Math.random()).slice(0, 10)
})

const currentQuestion = computed(() => questions.value[currentIndex.value])

function answer(userAnswer) {
  if (userAnswer === currentQuestion.value.isPrime) score.value++
  currentIndex.value++
}
</script>

<style scoped>
.quiz-container {
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.question-container {
  margin-top: 1rem;
}

.question-text {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.answer-buttons {
  display: flex;
  gap: 0.5rem;
}

.yes-button, .no-button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s;
}

.yes-button {
  background-color: #10b981;
  color: white;
}

.no-button {
  background-color: #ef4444;
  color: white;
}

.yes-button:hover, .no-button:hover {
  opacity: 0.9;
}

.quiz-result {
  margin-top: 1rem;
  font-size: 1.25rem;
}
</style>