import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Flashcards from '../views/Flashcards.vue'
import Quiz from '../views/Quiz.vue'
import Progress from '../views/Progress.vue'
import { auth } from '../firebase'

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Home,
    meta: { 
      title: 'PrimeLearn - Home',
      requiresAuth: false 
    } 
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: Login,
    meta: { 
      title: 'PrimeLearn - Login',
      requiresAuth: false 
    } 
  },
  { 
    path: '/register', 
    name: 'Register', 
    component: Register,
    meta: { 
      title: 'PrimeLearn - Register',
      requiresAuth: false 
    } 
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { 
      title: 'PrimeLearn - Dashboard',
      requiresAuth: true 
    }
  },
  {
    path: '/flashcards',
    name: 'Flashcards',
    component: Flashcards,
    meta: { 
      title: 'PrimeLearn - Flashcards',
      requiresAuth: true 
    }
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz,
    meta: { 
      title: 'PrimeLearn - Quiz',
      requiresAuth: true 
    }
  },
  {
    path: '/progress',
    name: 'Progress',
    component: Progress,
    meta: { 
      title: 'PrimeLearn - Progress',
      requiresAuth: true 
    }
  },
  { 
    path: '/:pathMatch(.*)*', 
    redirect: '/' 
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

let isAuthChecked = false
let currentUser = null

const authListener = auth.onAuthStateChanged(user => {
  currentUser = user
  isAuthChecked = true
})

router.afterEach(() => {
  // Optional post-navigation logic
})

router.beforeEach(async (to, from, next) => {
  if (!isAuthChecked) {
    await new Promise(resolve => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        currentUser = user
        isAuthChecked = true
        unsubscribe()
        resolve()
      })
    })
  }

  document.title = to.meta.title || 'PrimeLearn'

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if (requiresAuth && !currentUser) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if ((to.name === 'Login' || to.name === 'Register') && currentUser) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router