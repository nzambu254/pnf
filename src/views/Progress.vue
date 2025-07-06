<template>
  <div class="progress-container">
    <h1>Your Learning Progress</h1>
    
    <div v-if="!user" class="auth-prompt">
      <p>Please sign in to view your progress</p>
      <router-link to="/auth" class="sign-in-btn">Go to Sign In</router-link>
    </div>
    
    <div v-else class="progress-content">
      <div class="user-info">
        <h3>Welcome back, {{ user.displayName || user.email }}!</h3>
      </div>
      
      <div class="progress-summary">
        <div class="summary-card">
          <h3>Current Level</h3>
          <div class="level-display" :class="levelClass">
            {{ progressData.currentLevel || 'Beginner' }}
          </div>
          <p v-if="nextLevel">Next: {{ nextLevel }}</p>
        </div>
        
        <div class="summary-card">
          <h3>Flashcards Studied</h3>
          <div class="big-number">{{ progressData.totalFlashcards || 0 }}</div>
          <p>unique numbers</p>
        </div>
        
        <div class="summary-card">
          <h3>Quiz Accuracy</h3>
          <div class="big-number">
            {{ progressData.quizAccuracy ? progressData.quizAccuracy + '%' : 'N/A' }}
          </div>
          <p>last quiz</p>
        </div>
        
        <div class="summary-card">
          <h3>Study Streak</h3>
          <div class="big-number">{{ progressData.studyStreak || 0 }}</div>
          <p>days</p>
        </div>
      </div>
      
      <div class="progress-section">
        <h2>Recent Activity</h2>
        <div v-if="recentActivity.length > 0" class="activity-list">
          <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
            <div class="activity-icon">
              <span v-if="activity.type === 'flashcard'">📚</span>
              <span v-else-if="activity.type === 'quiz'">📝</span>
              <span v-else>🎯</span>
            </div>
            <div class="activity-details">
              <h4>{{ formatActivityTitle(activity) }}</h4>
              <p>{{ formatDate(activity.date) }}</p>
            </div>
            <div v-if="activity.type === 'quiz'" class="activity-score">
              {{ activity.score }}/{{ activity.total }} ({{ Math.round((activity.score / activity.total) * 100) }}%)
            </div>
          </div>
        </div>
        <p v-else class="no-activity">No recent activity to display</p>
      </div>
      
      <div class="progress-section">
        <h2>Difficult Numbers</h2>
        <div v-if="difficultNumbers.length > 0" class="difficult-numbers">
          <div 
            v-for="number in difficultNumbers" 
            :key="number" 
            class="number-card"
            @click="practiceNumber(number)"
          >
            <span class="number">{{ number }}</span>
            <span class="remove-btn" @click.stop="removeDifficult(number)">×</span>
          </div>
        </div>
        <p v-else class="no-activity">You haven't marked any numbers as difficult yet</p>
      </div>
      
      <div class="progress-section chart-section">
        <h2>Performance Over Time</h2>
        <div v-if="hasChartData" class="chart-container">
          <canvas ref="progressChart"></canvas>
        </div>
        <p v-else class="no-activity">Complete some quizzes to see your progress chart</p>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from '@/firebase';
import { doc, getDoc, updateDoc, arrayRemove, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Chart, registerables } from 'chart.js';

export default {
  name: 'Progress',
  data() {
    return {
      user: null,
      progressData: {},
      difficultNumbers: [],
      recentActivity: [],
      progressChart: null,
      unsubscribe: null,
      authUnsubscribe: null
    };
  },
  computed: {
    nextLevel() {
      const current = this.progressData.currentLevel || 'Beginner';
      const levels = {
        'Beginner': 'Intermediate',
        'Intermediate': 'Advanced', 
        'Advanced': 'Expert',
        'Expert': null
      };
      return levels[current];
    },
    levelClass() {
      const level = this.progressData.currentLevel || 'Beginner';
      return level.toLowerCase();
    },
    hasChartData() {
      return this.progressData.quizHistory && this.progressData.quizHistory.length > 0;
    }
  },
  async created() {
    Chart.register(...registerables);
    
    // Listen for auth state changes
    this.authUnsubscribe = onAuthStateChanged(auth, (user) => {
      this.user = user;
      if (user) {
        this.setupProgressListener();
      } else {
        this.cleanupData();
      }
    });
  },
  beforeUnmount() {
    this.cleanup();
  },
  methods: {
    setupProgressListener() {
      if (!this.user) return;
      
      // Clean up existing listener
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      
      // Set up real-time listener for user's progress data
      const userDoc = doc(db, 'users', this.user.uid);
      this.unsubscribe = onSnapshot(userDoc, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          this.progressData = userData.progress || {};
          this.difficultNumbers = this.progressData.difficultNumbers || [];
          this.prepareRecentActivity();
          this.prepareChartData();
        } else {
          // Initialize empty progress data if document doesn't exist
          this.progressData = {};
          this.difficultNumbers = [];
          this.recentActivity = [];
        }
      }, (error) => {
        console.error("Error fetching progress data:", error);
      });
    },
    
    prepareRecentActivity() {
      this.recentActivity = [];
      
      // Add quiz history
      if (this.progressData.quizHistory && this.progressData.quizHistory.length > 0) {
        const quizActivities = this.progressData.quizHistory
          .map((quiz, index) => ({
            id: `quiz-${index}`,
            type: 'quiz',
            date: quiz.date?.toDate ? quiz.date.toDate() : new Date(quiz.date),
            score: quiz.score,
            total: quiz.total,
            quizType: quiz.type || 'Mixed',
            difficulty: quiz.difficulty || 'Medium'
          }))
          .sort((a, b) => b.date - a.date)
          .slice(0, 10);
        
        this.recentActivity.push(...quizActivities);
      }
      
      // Add flashcard sessions
      if (this.progressData.flashcardSessions && this.progressData.flashcardSessions.length > 0) {
        const flashcardActivities = this.progressData.flashcardSessions
          .map((session, index) => ({
            id: `flashcard-${index}`,
            type: 'flashcard',
            date: session.date?.toDate ? session.date.toDate() : new Date(session.date),
            count: session.count || 0,
            difficulty: session.difficulty || 'Mixed'
          }))
          .sort((a, b) => b.date - a.date)
          .slice(0, 5);
        
        this.recentActivity.push(...flashcardActivities);
      }
      
      // Sort all activities by date and limit to recent ones
      this.recentActivity.sort((a, b) => b.date - a.date);
      this.recentActivity = this.recentActivity.slice(0, 15);
    },
    
    formatActivityTitle(activity) {
      switch (activity.type) {
        case 'quiz':
          return `Quiz: ${activity.quizType} (${activity.difficulty})`;
        case 'flashcard':
          return `Studied ${activity.count} flashcards (${activity.difficulty})`;
        default:
          return 'Learning Activity';
      }
    },
    
    formatDate(date) {
      if (!date) return 'Unknown date';
      
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        return 'Today at ' + date.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
      } else if (diffDays === 1) {
        return 'Yesterday at ' + date.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else {
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      }
    },
    
    practiceNumber(number) {
      this.$router.push(`/quiz?mode=difficult&focus=${number}`);
    },
    
    async removeDifficult(number) {
      if (!this.user) return;
      
      try {
        const userDoc = doc(db, 'users', this.user.uid);
        await updateDoc(userDoc, {
          'progress.difficultNumbers': arrayRemove(number)
        });
        
        // Update local state immediately for better UX
        this.difficultNumbers = this.difficultNumbers.filter(n => n !== number);
      } catch (error) {
        console.error("Error removing difficult number:", error);
      }
    },
    
    prepareChartData() {
      if (!this.hasChartData) {
        if (this.progressChart) {
          this.progressChart.destroy();
          this.progressChart = null;
        }
        return;
      }
      
      const history = [...this.progressData.quizHistory]
        .map(quiz => ({
          ...quiz,
          date: quiz.date?.toDate ? quiz.date.toDate() : new Date(quiz.date)
        }))
        .sort((a, b) => a.date - b.date)
        .slice(-20); // Show last 20 quizzes
      
      const labels = history.map(quiz => 
        quiz.date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })
      );
      
      const data = history.map(quiz => 
        Math.round((quiz.score / quiz.total) * 100)
      );
      
      if (this.progressChart) {
        this.progressChart.data.labels = labels;
        this.progressChart.data.datasets[0].data = data;
        this.progressChart.update();
      } else {
        this.$nextTick(() => {
          this.createChart(labels, data);
        });
      }
    },
    
    createChart(labels, data) {
      if (!this.$refs.progressChart) return;
      
      const ctx = this.$refs.progressChart.getContext('2d');
      
      this.progressChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Quiz Accuracy (%)',
            data: data,
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#4CAF50',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              callbacks: {
                label: function(context) {
                  return 'Accuracy: ' + context.raw + '%';
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            },
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          }
        }
      });
    },
    
    cleanupData() {
      this.progressData = {};
      this.difficultNumbers = [];
      this.recentActivity = [];
      
      if (this.progressChart) {
        this.progressChart.destroy();
        this.progressChart = null;
      }
      
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
      }
    },
    
    cleanup() {
      if (this.progressChart) {
        this.progressChart.destroy();
      }
      
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      
      if (this.authUnsubscribe) {
        this.authUnsubscribe();
      }
    }
  }
};
</script>

<style scoped>
.progress-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.auth-prompt {
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  border-radius: 12px;
  margin: 30px 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.auth-prompt p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.sign-in-btn {
  display: inline-block;
  padding: 12px 30px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.sign-in-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.user-info {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.user-info h3 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 400;
}

.progress-content {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.progress-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.summary-card h3 {
  margin-top: 0;
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
}

.level-display {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 15px 0;
  padding: 12px;
  border-radius: 8px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.level-display.beginner {
  background: linear-gradient(135deg, #2196F3, #1976D2);
}

.level-display.intermediate {
  background: linear-gradient(135deg, #4CAF50, #388E3C);
}

.level-display.advanced {
  background: linear-gradient(135deg, #FF9800, #F57C00);
}

.level-display.expert {
  background: linear-gradient(135deg, #F44336, #D32F2F);
}

.big-number {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 15px 0;
  color: #2c3e50;
}

.progress-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.progress-section h2 {
  margin-top: 0;
  color: #2c3e50;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
  font-size: 1.5rem;
  font-weight: 600;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 18px;
  border-radius: 10px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.activity-item:hover {
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  transform: translateX(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.activity-icon {
  font-size: 1.8rem;
  margin-right: 18px;
  min-width: 40px;
  text-align: center;
}

.activity-details {
  flex: 1;
}

.activity-details h4 {
  margin: 0 0 8px;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
}

.activity-details p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.activity-score {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  color: #1976d2;
  font-size: 0.9rem;
  border: 1px solid rgba(25, 118, 210, 0.2);
}

.difficult-numbers {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.number-card {
  background: linear-gradient(135deg, #ffebee, #ffcdd2);
  border-radius: 8px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(244, 67, 54, 0.2);
}

.number-card:hover {
  background: linear-gradient(135deg, #ffcdd2, #ef9a9a);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(244, 67, 54, 0.2);
}

.number {
  font-weight: bold;
  margin-right: 10px;
  color: #c62828;
}

.remove-btn {
  color: #f44336;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 0 6px;
  border-radius: 50%;
  transition: all 0.3s ease;
  line-height: 1;
}

.remove-btn:hover {
  background-color: #f44336;
  color: white;
}

.no-activity {
  text-align: center;
  color: #666;
  padding: 40px;
  font-style: italic;
}

.chart-section {
  padding-bottom: 40px;
}

.chart-container {
  position: relative;
  height: 400px;
  margin-top: 25px;
  background: #fafafa;
  border-radius: 8px;
  padding: 20px;
}

@media (max-width: 768px) {
  .progress-container {
    padding: 15px;
  }
  
  .progress-summary {
    grid-template-columns: 1fr;
  }
  
  .activity-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  
  .activity-icon {
    margin-bottom: 10px;
  }
  
  .activity-score {
    align-self: flex-end;
    margin-top: 10px;
  }
  
  .chart-container {
    height: 300px;
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .summary-card {
    padding: 20px;
  }
  
  .progress-section {
    padding: 20px;
  }
  
  .big-number {
    font-size: 2rem;
  }
  
  .level-display {
    font-size: 1.5rem;
  }
}</style>