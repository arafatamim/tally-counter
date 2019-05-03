import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import 'normalize.css';
import { VueHammer } from 'vue2-hammer'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlusSquare, faMinusSquare);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueHammer);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
