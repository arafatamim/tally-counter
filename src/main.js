import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "normalize.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlusSquare,
  faMinusSquare,
  faQuestionCircle,
  faTrashAlt,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faPlusSquare,
  faMinusSquare,
  faQuestionCircle,
  faTrashAlt,
  faTimesCircle
);

// Vue.component("tippy", TippyComponent);
// Vue.component("font-awesome-icon", FontAwesomeIcon);
// Vue.directive("swipe", {
//   bind: function(el, binding) {
//     if (typeof binding.value === "function") {
//       const mc = new Hammer(el);
//       // mc.get("pan").set({ direction: Hammer.DIRECTION_HORIZONTAL });
//       mc.on("swipe", binding.value);
//     }
//   },
// });

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  // .directive("click-outside", {
  //   mounted(el, binding, vnode) {
  //     el.clickOutsideEvent = function(event) {
  //       if (!(el == event.target || el.contains(event.target))) {
  //         vnode.context[binding.expression](event);
  //       }
  //     };
  //     document.body.addEventListener("click", el.clickOutsideEvent);
  //   },
  //   unmounted(el) {
  //     document.body.removeEventListener("click", el.clickOutsideEvent);
  //   },
  // })
  .mount("#app");
