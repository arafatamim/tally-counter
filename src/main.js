import { createApp } from "vue";
import App from "./App.vue";
import "normalize.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlusSquare,
  faMinusSquare,
  faQuestionCircle,
  faTrashAlt,
  faTimesCircle,
  faArrowAltCircleDown,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onSwipeMove, onSwipeStop } from "./utils/gesture";

library.add(
  faPlusSquare,
  faMinusSquare,
  faQuestionCircle,
  faTrashAlt,
  faTimesCircle,
  faArrowAltCircleDown
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .directive("swipe-move", onSwipeMove)
  .directive("swipe-stop", onSwipeStop)
  .mount("#app");
