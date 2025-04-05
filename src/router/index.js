import { createRouter, createWebHistory } from 'vue-router';
import VerifyEmail from '@/components/VerifyEmail.vue'; // Import the component

const routes = [
  {
    path: '/verify-email',
    component: VerifyEmail, // Ensure this is correctly mapped
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
