<template>
  <div class="flashcards-container">
    <div class="flashcards-header">
      <h1>Prime Numbers Flashcards</h1>
      <div class="controls">
        <select v-model="difficulty" @change="loadFlashcards">
          <option value="beginner">Beginner (1-50)</option>
          <option value="intermediate">Intermediate (1-100)</option>
          <option value="advanced">Advanced (1-200)</option>
          <option value="expert">Expert (1-500)</option>
        </select>
        <button @click="shuffleCards" class="shuffle-btn">Shuffle</button>
        <button @click="toggleStudyMode" class="study-mode-btn">
          {{ studyMode ? 'Exit Study Mode' : 'Study Mode' }}
        </button>
      </div>
    </div>

    <div class="flashcard-wrapper">
      <div 
        class="flashcard" 
        :class="{ 'is-flipped': card.isFlipped, 'marked-difficult': card.isDifficult }"
        v-for="(card, index) in filteredCards" 
        :key="card.number"
        @click="flipCard(index)"
      >
        <div class="flashcard-front">
          <h2>{{ card.number }}</h2>
          <p v-if="studyMode">Click to reveal</p>
        </div>
        <div class="flashcard-back">
          <h2>{{ card.number }}</h2>
          <p :class="{ 'prime-text': card.isPrime, 'composite-text': !card.isPrime }">
            {{ card.isPrime ? 'Prime Number' : 'Composite Number' }}
          </p>
          <div v-if="!card.isPrime" class="factors">
            <p>Factors:</p>
            <div class="factor-list">
              <span v-for="factor in card.factors" :key="factor">{{ factor }}</span>
            </div>
          </div>
          <div class="factor-tree" v-if="card.factorTree && card.factorTree.length > 0">
            <p>Factor Tree:</p>
            <div class="tree-visualization">
              <div v-for="(level, i) in card.factorTree" :key="i" class="tree-level">
                <div v-for="num in level" :key="num" class="tree-number">{{ num }}</div>
              </div>
            </div>
          </div>
          <button 
            @click.stop="toggleDifficult(card.number)" 
            class="difficult-btn"
          >
            {{ card.isDifficult ? '✓ Difficult' : 'Mark as Difficult' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="filteredCards.length === 0" class="no-cards">
      <p>No flashcards to display. Try changing your filters.</p>
    </div>

    <div class="pagination" v-if="filteredCards.length > 0">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { mapState } from 'vuex';


export default {
  name: 'Flashcards',
  data() {
    return {
      difficulty: 'beginner',
      allCards: [],
      displayedCards: [],
      currentPage: 1,
      cardsPerPage: 12,
      studyMode: false,
      filter: null
    };
  },
  computed: {
    ...mapState(['user']),
    filteredCards() {
      let cards = [...this.displayedCards];
      
      // Apply filter if any
      if (this.$route.query.filter === 'difficult' && this.user) {
        cards = cards.filter(card => card.isDifficult);
      }
      
      // Pagination
      const start = (this.currentPage - 1) * this.cardsPerPage;
      const end = start + this.cardsPerPage;
      return cards.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.displayedCards.length / this.cardsPerPage);
    }
  },
  watch: {
    difficulty() {
      this.loadFlashcards();
    },
    '$route.query.filter'(newFilter) {
      this.filter = newFilter;
      this.currentPage = 1;
    }
  },
  async created() {
    this.filter = this.$route.query.filter || null;
    await this.loadFlashcards();
  },
  methods: {
    async loadFlashcards() {
      let maxNumber;
      switch (this.difficulty) {
        case 'beginner': maxNumber = 50; break;
        case 'intermediate': maxNumber = 100; break;
        case 'advanced': maxNumber = 200; break;
        case 'expert': maxNumber = 500; break;
        default: maxNumber = 50;
      }

      this.allCards = this.generatePrimeCards(maxNumber);
      this.displayedCards = [...this.allCards];
      
      if (this.user) {
        await this.markDifficultCards();
      }
    },
    generatePrimeCards(max) {
      const cards = [];
      for (let i = 2; i <= max; i++) {
        const isPrime = this.isPrime(i);
        const factors = isPrime ? [] : this.getFactors(i);
        const factorTree = isPrime ? [] : this.generateFactorTree(i);
        
        cards.push({
          number: i,
          isPrime,
          factors,
          factorTree,
          isFlipped: false,
          isDifficult: false
        });
      }
      return cards;
    },
    isPrime(num) {
      if (num <= 1) return false;
      if (num === 2) return true;
      if (num % 2 === 0) return false;
      
      for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
      }
      return true;
    },
    getFactors(num) {
      const factors = [];
      for (let i = 2; i < num; i++) {
        if (num % i === 0) factors.push(i);
      }
      return factors;
    },
    generateFactorTree(num) {
      if (this.isPrime(num)) return [[num]];
      
      const tree = [[num]];
      let currentFactors = [num];
      
      while (true) {
        const nextLevel = [];
        let allPrimes = true;
        
        for (const factor of currentFactors) {
          if (this.isPrime(factor)) {
            nextLevel.push(factor);
          } else {
            allPrimes = false;
            const firstDivisor = this.findFirstDivisor(factor);
            nextLevel.push(firstDivisor, factor / firstDivisor);
          }
        }
        
        if (allPrimes) break;
        
        tree.push([...nextLevel]);
        currentFactors = nextLevel;
      }
      
      return tree;
    },
    findFirstDivisor(num) {
      if (num % 2 === 0) return 2;
      for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return i;
      }
      return num;
    },
    flipCard(index) {
      this.filteredCards[index].isFlipped = !this.filteredCards[index].isFlipped;
      
      // Track viewed flashcards for progress
      if (this.user && !this.filteredCards[index].isFlipped) {
        this.recordFlashcardView(this.filteredCards[index].number);
      }
    },
    shuffleCards() {
      this.displayedCards = [...this.allCards].sort(() => Math.random() - 0.5);
      this.currentPage = 1;
    },
    toggleStudyMode() {
      this.studyMode = !this.studyMode;
      // Flip all cards back when exiting study mode
      if (!this.studyMode) {
        this.displayedCards.forEach(card => card.isFlipped = false);
      }
    },
    async markDifficultCards() {
      try {
        const userDoc = doc(db, 'users', this.user.uid);
        const docSnap = await getDoc(userDoc);
        
        if (docSnap.exists()) {
          const difficultNumbers = docSnap.data().progress?.difficultNumbers || [];
          this.displayedCards.forEach(card => {
            card.isDifficult = difficultNumbers.includes(card.number);
          });
        }
      } catch (error) {
        console.error("Error fetching difficult numbers:", error);
      }
    },
    async toggleDifficult(number) {
      if (!this.user) return;
      
      const card = this.displayedCards.find(c => c.number === number);
      if (!card) return;
      
      card.isDifficult = !card.isDifficult;
      
      try {
        const userDoc = doc(db, 'users', this.user.uid);
        
        if (card.isDifficult) {
          await updateDoc(userDoc, {
            'progress.difficultNumbers': arrayUnion(number)
          });
        } else {
          await updateDoc(userDoc, {
            'progress.difficultNumbers': arrayRemove(number)
          });
        }
      } catch (error) {
        console.error("Error updating difficult numbers:", error);
        card.isDifficult = !card.isDifficult; // Revert on error
      }
    },
    async recordFlashcardView(number) {
      if (!this.user) return;
      
      try {
        const userDoc = doc(db, 'users', this.user.uid);
        await updateDoc(userDoc, {
          'progress.totalFlashcards': increment(1),
          'progress.lastViewed': new Date(),
          'progress.viewedNumbers': arrayUnion(number)
        });
      } catch (error) {
        console.error("Error recording flashcard view:", error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
};
</script>

<style scoped>
.flashcards-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.flashcards-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.controls {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

select {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
}

button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
}

.shuffle-btn {
  background-color: #2196F3;
  color: white;
}

.study-mode-btn {
  background-color: #FF9800;
  color: white;
}

.flashcard-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.flashcard {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 300px;
  perspective: 1000px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s, box-shadow 0.3s;
  cursor: pointer;
}

.flashcard:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.flashcard.is-flipped {
  transform: rotateY(180deg);
}

.flashcard-front, .flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
}

.flashcard-front {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.flashcard-back {
  background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
  transform: rotateY(180deg);
}

.flashcard h2 {
  font-size: 2.5rem;
  margin: 0 0 15px;
  color: #2c3e50;
}

.prime-text {
  color: #4CAF50;
  font-weight: bold;
}

.composite-text {
  color: #F44336;
  font-weight: bold;
}

.factors {
  margin-top: 15px;
  text-align: center;
}

.factor-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.factor-list span {
  background: #e0e0e0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.factor-tree {
  margin-top: 15px;
  text-align: center;
}

.tree-visualization {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.tree-level {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.tree-number {
  background: #e3f2fd;
  padding: 6px 12px;
  border-radius: 4px;
  margin: 0 5px;
  position: relative;
}

.tree-number:not(:last-child)::after {
  content: "×";
  position: absolute;
  right: -12px;
  color: #666;
}

.difficult-btn {
  margin-top: auto;
  background-color: #607D8B;
  color: white;
  width: 100%;
}

.marked-difficult .flashcard-back {
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
}

.marked-difficult .difficult-btn {
  background-color: #FF5722;
}

.no-cards {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.pagination button {
  padding: 8px 16px;
  background-color: #2c3e50;
  color: white;
  border: none;
}

.pagination button:disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .flashcards-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .flashcard-wrapper {
    grid-template-columns: 1fr;
  }
}
</style>