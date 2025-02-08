import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import LoginSignUp from '../pages/LoginSignUp.vue';
import DogList from '../pages/DogList.vue';
import Owner from '../pages/Owner.vue';
import Adopter from '../pages/Adopter.vue';
import AdoptionRequests from '../pages/AdoptionRequests.vue';

const routes = [
  { path: '/', component: LoginSignUp },
  { path: '/dashboard', component: Dashboard },
  { path: '/dogslist', component: DogList },
  { path: '/users/owner', component: Owner },
  { path: '/users/adopter', component: Adopter },
  { path: '/requests', component: AdoptionRequests }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
