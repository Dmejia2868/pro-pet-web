import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import LoginSignUp from '../pages/LoginSignUp.vue';
import DogList from '../pages/DogList.vue';
import Owner from '../pages/Owner.vue';



const routes = [
  { path: '/', component: LoginSignUp },
  { path: '/dashboard', component: Dashboard },
  { path: '/dogslist', component: DogList },
  { path: '/users/owner', component: Owner },
  
  {
    path: "/request",
    name: "AdoptionRequest",
    component: () => import("../pages/AdoptionRequests.vue")
  },
  {
    path: "/adopted-dog",
    name: "AdoptedDog",
    component: () => import("../pages/AdoptedDogs.vue")
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
