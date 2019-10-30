<template>
  <div id="app" v-if="login===true&&hasNoAccount===true">
    <widget-top-navigation />
    
    <div id=content>
        <VcAFrame :title="$i18n.t('elements.title')">
        <VcAColumn size="90%">


    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <span class="head">
          {{ $i18n.t('elements.title') }}
        </span>

        <el-steps class="steps" :active="active" finish-status="success">
          <el-step :title="$i18n.t('elements.step1')"></el-step>
          <el-step :title="$i18n.t('elements.step2')"></el-step>
          <el-step :title="$i18n.t('elements.step3')"></el-step>
        </el-steps>

      </div>
      <div v-if="active===0">
        <StepOne v-on:accept="next"/>
      </div>
      
      <div v-if="active===1">
        <StepTwo v-on:prev="prev" v-on:next="next"/>
      </div>
      
      <div v-if="active===2">
        <StepThree v-on:prev="prev" v-on:next="finish"/>
      </div>
      
      <div v-if="active===3">
        <StepFour/>
      </div>
    
    </el-card>
        </VcAColumn>
    </VcAFrame>
    </div>
    <widget-bottom-navigation />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
//import VueAxios from 'vue-axios'
import {WidgetTopNavigation, WidgetBottomNavigation} from 'vca-widget-navigation'
import StepOne from '@/components/mattermost/StepOne'
import StepTwo from '@/components/mattermost/StepTwo'
import StepThree from '@/components/mattermost/StepThree'
import StepFour from '@/components/mattermost/StepFour'
import { VcAFrame, VcAColumn} from 'vca-widget-base'
import 'vca-widget-base/dist/vca-widget-base.css'

export default {
  name: 'hellomattermost',
  components: {
 //   VuePassword,
    WidgetTopNavigation,
    WidgetBottomNavigation,
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    VcAFrame, 
    VcAColumn, 
  },

  data() {
    return {
      hasNoAccount: true,
      login: true,
      active: 0,
    };
  },
  methods: {
    finish(){
       if (this.active++ > 2) this.active = 0;
       window.location.href = process.env.VUE_APP_MM_URL;
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    prev() {
      if (this.active-- > 2) this.active = 0;
    },
    authenticate () {
      axios
        .get('/backend/canal/auth/login')
        .then(() => {
          this.login = true;
          this.exists();
          
        })
        .catch (function (error) {
          switch (error.response.status) {
            case 401:
              location = "/arise/#/signin/L2NhbmFs";
          }
        })
    },
    exists () {
      axios
        .get('/backend/canal/mattermost/user/exists')
        .then(() => {
          this.hasNoAccount = true;
          //window.location.href = process.env.VUE_APP_MM_URL;
        })
        .catch(() => {
          location = "mattermost.";
        }) 
    }
  },
  mounted () {
    this.authenticate();
  }
}
</script>

<style>

  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: min-content;
  }
  #content {
    flex-grow: 1;
    display: flex;
    overflow: auto;
    width: 100%;
  }
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}*/

.head {
  text-align: center;
  font-weight: bold;
}

.steps {
  padding-top: 3%;
}

.box-card {
  margin: 0 auto auto auto;
  width: 60%;
}



</style>
