import Vue from 'vue'
import ElementUI, {Button, Menu, Steps, Card, Form, Input} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {WidgetTopNavigation, WidgetBottomNavigation} from 'vca-widget-navigation'
import VuePassword from 'vue-password'
import axios from 'axios'
import VueAxios from "vue-axios";
import App from './hellomattermost.vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const locale =  navigator.language;
const i18n = new VueI18n({
    locale: locale,
    messages: {
        'en-US': require('@/lang/en_US'),
        'de-DE': require('@/lang/de_DE'),
    }
});

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(WidgetTopNavigation, { 'i18n': i18n })
Vue.use(WidgetBottomNavigation, { 'i18n': i18n })
Vue.use(
  axios,
  VueAxios,
  Button,
  Menu,
  Steps,
  Card,
  Form,
  Input,
  VuePassword,);


new Vue({
  render: h => h(App)
}).$mount('#app')
