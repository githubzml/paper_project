import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/style/change.less"

import { Button, Input, Form, FormItem, Dialog } from 'element-ui';

Vue.use(Button)
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);

Vue.use(Dialog);



Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')