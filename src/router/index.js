import { createRouter, createWebHistory } from "vue-router";

import Create_card_quiz from "../components/dashboard_components/Create_card_quiz.vue";
import Empty_folder from "../components/dashboard_components/Empty_folder.vue";
import JoinRoom from "../components/JoinRoom.vue";
import Quiz from "../components/Quiz.vue";
import QuizPlayer from "../components/QuizPlayer.vue";
import RoomCreation from "../components/RoomCreation.vue";
import AboutUsPage from "../pages/AboutUsPage.vue";
import CreateQuiz from "../pages/Dashboard/CreateQuiz.vue";
import DashboardLayout from "../pages/Dashboard/DashboardLayout.vue";
import DashboardPage from "../pages/Dashboard/DashboardPage.vue";
import HostGame from "../pages/Dashboard/HostGame.vue";
import MyQuizzes from "../pages/Dashboard/MyQuizzes.vue";
import Settings from "../pages/Dashboard/Settings.vue";
import LandingPage from "../pages/LandingPage.vue";
import LandingPageLayout from "../pages/LandingPage_layout.vue";
import QuizPage from "../pages/QuizPage.vue";

const routes = [
  // Route For Landing Page
  {
    path: "/",
    name: "Home",
    component: LandingPageLayout,
    children: [
      {
        path: "/aboutus",
        name: "AboutUs",
        component: AboutUsPage,
      },
      {
        path: "/",
        name: "LandingPage",
        component: LandingPage,
      },
    ],
  },

  // Test Quiz
  {
    path: "/quiz",
    name: "QuizPage",
    component: QuizPage,
  },
  {
    path: "/create-quiz",
    name: "createQuiz",
    component: Quiz,
  },
  {
    path: "/create-room",
    name: "RoomCreate",
    component: RoomCreation,
  },
  {
    path: "/join-room",
    name: "JoinRoom",
    component: JoinRoom,
  },
  {
    path: "/quiz/:roomCode",
    name: "quizPlayer",
    component: QuizPlayer,
  },

  // Route For Dashboard
  {
    path: "/pages",
    component: DashboardLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: DashboardPage,
        children: [
          {
            path: "quiz-card",
            name: "Recent",
            component: Create_card_quiz,
          },
          {
            path: "upcoming-game",
            name: "Upcoming",
            component: Empty_folder,
          },
        ],
      },
      {
        path: "create-quiz",
        name: "CreateQuiz",
        component: CreateQuiz,
      },
      {
        path: "my-quizzes",
        name: "MyQuizzes",
        component: MyQuizzes,
      },
      {
        path: "host-game",
        name: "HostGame",
        component: HostGame,
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
