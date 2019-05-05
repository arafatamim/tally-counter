import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "normalize.css";
import Hammer from "hammerjs";
import VueTippy, { TippyComponent } from "vue-tippy";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlusSquare,
  faMinusSquare,
  faQuestionCircle,
  faTrashAlt
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlusSquare, faMinusSquare, faQuestionCircle, faTrashAlt);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("tippy", TippyComponent);
Vue.directive("swipe", {
  bind: function(el, binding) {
    if (typeof binding.value === "function") {
      const mc = new Hammer(el);
      // mc.get("pan").set({ direction: Hammer.DIRECTION_HORIZONTAL });
      mc.on("swipe", binding.value);
    }
  }
});
Vue.use(VueTippy);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
