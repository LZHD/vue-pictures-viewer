import Vue from 'vue';
import App from './App.vue';
import { Tooltip } from 'element-ui';

Vue.use(Tooltip);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
