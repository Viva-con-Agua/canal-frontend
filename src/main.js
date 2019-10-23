import Vue from 'vue'
import ElementUI, {Button, Menu, Steps, Card, Form, Input} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {WidgetTopNavigation, WidgetBottomNavigation} from 'vca-widget-navigation'
import VuePassword from 'vue-password'
import axios from 'axios'
import VueAxios from "vue-axios";
import App from './hellomattermost.vue'
import i18n from './i18n'

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.use(
  axios,
  VueAxios,
  Button,
  Menu,
  Steps,
  Card,
  Form,
  Input,
  VuePassword,
  WidgetTopNavigation,
  WidgetBottomNavigation,);


new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
