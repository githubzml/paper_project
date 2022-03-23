import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "swiper/css/swiper.css";
import "@/style/change.less";
// 引入swiper样式文件
import 'swiper/css/swiper.min.css';

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
    beforeCreate() {  // 注册全局事件总线
        Vue.prototype.$bus = this
    },
    render: h => h(App)
}).$mount('#app')