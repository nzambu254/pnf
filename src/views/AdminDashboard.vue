<template>
  <div class="admin-dashboard">
    <!-- Admin Header -->
    <header class="admin-header">
      <h1>Admin Performance Dashboard</h1>
      <div class="admin-controls">
        <button @click="refreshData" class="refresh-btn">
          <span class="btn-icon">🔄</span> Refresh Data
        </button>
        <div class="time-filter">
          <select v-model="timeRange" class="filter-select">
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>
    </header>

    <!-- Summary Stats -->
    <div class="summary-stats">
      <div class="summary-card">
        <div class="summary-icon">👥</div>
        <h3>Total Users</h3>
        <p>{{ summaryData.totalUsers || 0 }}</p>
      </div>
      <div class="summary-card">
        <div class="summary-icon">📚</div>
        <h3>Avg Flashcards Studied</h3>
        <p>{{ summaryData.avgFlashcards || 0 }}</p>
      </div>
      <div class="summary-card">
        <div class="summary-icon">✅</div>
        <h3>Avg Quiz Accuracy</h3>
        <p>{{ summaryData.avgAccuracy ? `${summaryData.avgAccuracy}%` : 'N/A' }}</p>
      </div>
      <div class="summary-card">
        <div class="summary-icon">📈</div>
        <h3>Active Users</h3>
        <p>{{ summaryData.activeUsers || 0 }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="admin-content">
      <!-- User Performance Table -->
      <div class="performance-section">
        <h2>User Performance Metrics</h2>
        <div class="table-container">
          <table class="performance-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Level</th>
                <th>Flashcards</th>
                <th>Quiz Accuracy</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in userPerformance" :key="user.id">
                <td>{{ user.name }}</td>
                <td>
                  <span class="level-badge" :class="getLevelClass(user.level)">
                    {{ user.level }}
                  </span>
                </td>
                <td>{{ user.flashcards }}</td>
                <td>
                  <div class="accuracy-bar" :style="{ width: user.accuracy + '%' }"></div>
                  <span>{{ user.accuracy }}%</span>
                </td>
                <td>{{ formatDate(user.lastActive) }}</td>
                <td>
                  <button @click="viewUserDetails(user.id)" class="action-btn view-btn">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="charts-section">
        <div class="chart-card">
          <h3>User Progress Over Time</h3>
          <div class="chart-container">
            <!-- Chart would be rendered here with a library like Chart.js -->
            <div class="chart-placeholder">
              <img src="https://via.placeholder.com/500x300?text=Progress+Chart" alt="Progress Chart">
            </div>
          </div>
        </div>
        <div class="chart-card">
          <h3>Level Distribution</h3>
          <div class="chart-container">
            <!-- Chart would be rendered here with a library like Chart.js -->
            <div class="chart-placeholder">
              <img src="https://via.placeholder.com/500x300?text=Level+Distribution" alt="Level Distribution">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      timeRange: '7',
      summaryData: {
        totalUsers: 124,
        avgFlashcards: 42,
        avgAccuracy: 78,
        activeUsers: 89
      },
      userPerformance: [
        { id: 1, name: 'Alice Johnson', level: 'Advanced', flashcards: 87, accuracy: 92, lastActive: '2023-06-15' },
        { id: 2, name: 'Bob Smith', level: 'Intermediate', flashcards: 45, accuracy: 78, lastActive: '2023-06-14' },
        { id: 3, name: 'Charlie Brown', level: 'Beginner', flashcards: 12, accuracy: 65, lastActive: '2023-06-10' },
        { id: 4, name: 'Diana Prince', level: 'Advanced', flashcards: 95, accuracy: 94, lastActive: '2023-06-15' },
        { id: 5, name: 'Ethan Hunt', level: 'Intermediate', flashcards: 38, accuracy: 72, lastActive: '2023-06-13' },
        { id: 6, name: 'Fiona Green', level: 'Beginner', flashcards: 8, accuracy: 58, lastActive: '2023-06-08' },
        { id: 7, name: 'George Wilson', level: 'Intermediate', flashcards: 52, accuracy: 81, lastActive: '2023-06-15' }
      ]
    }
  },
  methods: {
    refreshData() {
      // In a real app, this would fetch fresh data from your API
      console.log('Refreshing data with time range:', this.timeRange);
    },
    viewUserDetails(userId) {
      // Navigate to user detail view
      console.log('Viewing details for user:', userId);
      this.$router.push(`/admin/users/${userId}`);
    },
    formatDate(dateString) {
      // Simple date formatting - use a library like date-fns in production
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    getLevelClass(level) {
      return {
        'beginner': level === 'Beginner',
        'intermediate': level === 'Intermediate',
        'advanced': level === 'Advanced'
      };
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  min-height: 100vh;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 25px;
  background: linear-gradient(90deg, #2575fc 0%, #6a11cb 100%);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(106, 17, 203, 0.3);
}

.admin-header h1 {
  margin: 0;
  font-size: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.admin-controls {
  display: flex;
  gap: 15px;
  align-items: center;
}

.refresh-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.refresh-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.btn-icon {
  margin-right: 8px;
}

.filter-select {
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background: white;
  cursor: pointer;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-5px);
}

.summary-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.summary-card h3 {
  margin: 0 0 10px;
  color: #555;
  font-size: 1rem;
}

.summary-card p {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  color: #2c3e50;
}

.admin-content {
  display: grid;
  gap: 30px;
}

.performance-section {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.performance-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
}

.table-container {
  overflow-x: auto;
}

.performance-table {
  width: 100%;
  border-collapse: collapse;
}

.performance-table th {
  background: #f8f9fa;
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #e9ecef;
}

.performance-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #e9ecef;
  vertical-align: middle;
}

.level-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.level-badge.beginner {
  background: #ffeeba;
  color: #856404;
}

.level-badge.intermediate {
  background: #bee5eb;
  color: #0c5460;
}

.level-badge.advanced {
  background: #c3e6cb;
  color: #155724;
}

.accuracy-bar {
  display: inline-block;
  height: 6px;
  background: linear-gradient(90deg, #4FACFE 0%, #00F2FE 100%);
  border-radius: 3px;
  margin-right: 8px;
  vertical-align: middle;
}

.action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.view-btn {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
}

.view-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 20px;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.chart-card h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c3e50;
}

.chart-placeholder {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
}

.chart-placeholder img {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 768px) {
  .admin-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .summary-stats {
    grid-template-columns: 1fr 1fr;
  }
  
  .charts-section {
    grid-template-columns: 1fr;
  }
  
  .performance-table th, 
  .performance-table td {
    padding: 8px 10px;
  }
}

@media (max-width: 480px) {
  .summary-stats {
    grid-template-columns: 1fr;
  }
  
  .admin-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>