import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "swiper/css/swiper.css";
import "@/style/change.less"

import { Button, Input, Form, FormItem, Dialog, CheckboxGroup, Checkbox, Select, Option } from 'element-ui';

Vue.use(Button)
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);

Vue.use(Dialog);

Vue.use(Checkbox);
Vue.use(CheckboxGroup);

Vue.use(Select);
Vue.use(Option);







Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')