<template>
  <div class="progress-container">
    <h2>Your Progress</h2>
    <div v-if="progress.length" class="progress-list">
      <ul>
        <li v-for="(entry, i) in progress" :key="i" class="progress-item">
          Quiz {{ i + 1 }} - Score: {{ entry.score }}/10
        </li>
      </ul>
    </div>
    <div v-else class="empty-state">
      <p>No progress recorded yet.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const progress = ref([])

onMounted(async () => {
  const user = getAuth().currentUser
  if (!user) return
  const snap = await getDocs(collection(db, `users/${user.uid}/progress`))
  progress.value = snap.docs.map(doc => doc.data())
})
</script>

<style scoped>
.progress-container {
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.progress-list {
  margin-top: 1rem;
}

.progress-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.empty-state {
  margin-top: 1rem;
  color: #6b7280;
}
</style>