<template>
  <div id="app" v-if="login===true&&hasNoAccount===true">
    <widget-top-navigation />

    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <span class="head">
          Say "hello" to Mattermost!
        </span>

        <el-steps class="steps" :active="active" finish-status="success">
          <el-step title="Step 1"></el-step>
          <el-step title="Step 2"></el-step>
          <el-step title="Step 3"></el-step>
        </el-steps>

      </div>
      <div v-if="active===0">
        <StepOne v-on:accept="next"/>
      </div>
      
      <div v-if="active===1">
        <StepTwo v-on:prev="prev" v-on:next="next"/>
      </div>
      
      <div v-if="active===2">
        <StepThree v-on:prev="prev" v-on:next="next"/>
      </div>
      
      <div v-if="active===3">
        <StepFour/>
      </div>
    
    </el-card>
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
  },

  data() {
    return {
      hasNoAccount: false,
      login: false,
      active: 0,
    };
  },
  methods: {
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
        })
        .catch(() => {
          this.hasNoAccount = true;
              //location = "mattermost.";
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.head {
  text-align: center;
  font-weight: bold;
}

.steps {
  padding-top: 3%;
}

.box-card {
  width: 50%;
}



</style>
