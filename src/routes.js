// routes.js

import Room from "./views/Room.vue";
import Home from "./views/Home.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/room/:id", component: Room }
];

export default routes;
