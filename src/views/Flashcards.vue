<template>
  <div class="flashcards-container">
    <h2>Prime Number Flashcards</h2>
    <div 
      v-if="currentCard" 
      class="flashcard" 
      @click="flip = !flip"
    >
      <p v-if="!flip" class="card-number">{{ currentCard.number }}</p>
      <div v-else class="card-answer">
        <p v-if="currentCard.isPrime">✅ It's a Prime Number!</p>
        <p v-else>❌ Not a Prime. Factors: {{ currentCard.factors.join(' × ') }}</p>
      </div>
    </div>
    <button class="next-button" @click="nextCard">Next</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

const cards = ref([])
const currentIndex = ref(0)
const flip = ref(false)
const currentCard = ref(null)

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'flashcards'))
  cards.value = querySnapshot.docs.map(doc => doc.data())
  currentCard.value = cards.value[currentIndex.value]
})

function nextCard() {
  flip.value = false
  currentIndex.value = (currentIndex.value + 1) % cards.value.length
  currentCard.value = cards.value[currentIndex.value]
}
</script>

<style scoped>
.flashcards-container {
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.flashcard {
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.flashcard:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-number {
  font-size: 2.25rem;
  text-align: center;
}

.card-answer {
  text-align: center;
  font-size: 1.25rem;
}

.next-button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.next-button:hover {
  background-color: #2563eb;
}
</style>