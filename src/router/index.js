import { createRouter, createWebHistory } from 'vue-router'
import LandingPageLayout from '../pages/LandingPage_layout.vue'
import LandingPage from '../pages/LandingPage.vue'
import AboutUs from '../pages/AboutUsPage.vue'

const routes = [
    { 
        path: '/', 
        name: 'Home', 
        component: LandingPageLayout,
        children: [
            {
                path: '/',
                name: 'LandingPage',
                component: LandingPage
            },
            {
                path: '/aboutus',
                name: 'AboutUs',
                component: AboutUs
            }
        ]
    },


]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
