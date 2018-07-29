import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'

import VuexHistory from './history';

Vue.use(VuexHistory);

Vue.config.productionTip = false

new Vue({
  store,
  mounted() {
    this.$store.dispatch('emptySheet');
  },
  render: h => h(App)
}).$mount('#app')
