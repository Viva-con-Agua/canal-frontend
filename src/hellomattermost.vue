<template>
  <div id="app">
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

      <span v-if="active===0">
        <p>
          Mattermost ist ein freier webbasierter Instant-Messaging-Dienst. Mattermost erlaubt sowohl den Chat mit Einzelpersonen als auch Gruppenchats, die in „Kanälen“ organisiert werden. Mattermost funktioniert damit ähnlich wie die marktführenden proprietären Softwares Microsoft Teams und Slack.
        </p>
        <p>
          Du kannst Mattermost selbstverständlich auch als Client auf deinem Arbeitsgerät installieren. Um zum Downloadbereich zu gelangen klicke einfach <a href="https://mattermost.com/download">hier</a>
        </p>
        <p>
          Ein How-to-Mattermost wurde leider nicht rechzeitig fertig. :( Bitte habe dafür noch etwas Geduld.
        </p>
        <p>
          Folge den Anweisungen um deinen Pool Account mit deinem Mattermost Konto zu verknüpfen.
        </p>
        <el-button-group style="margin: 12px;float: right;" >
        <el-button @click="next" type="primary">weiter<i class="el-icon-arrow-right "></i></el-button>
      </el-button-group>
      </span>

      <el-form v-if="active===1" :model="pwds" :rules="rules"  ref="pwds" :label-position="'top'" label-width="120px">
        <p>
          Unser Ziel ist es, die best mögliche User-Experience für dich bereit zu stellen. Damit Du mit möglichst wenigen Klicks zu allen neuen Funktionen gelangst.
        </p>
        <p>
          Allerdings ist es uns nicht möglich, dein Passwort Mattermost mitzuteilen, setzte daher hier unten ein neues!
        </p>
        <p style="font-weight: bold">
          security first!!! password is a bad password
        </p>
        <el-form-item label="Passwort:" prop="pwd1">
        <VuePasswordAuto
          v-model="pwds.pwd1"
          id="second"
          type="text"
        />
        </el-form-item>
        <el-form-item label="Passwort wiederholen:" prop="pwd2" ref="pwds">
          <el-input v-model="pwds.pwd2" placeholder="Bitte erneut eintippen" show-password></el-input>
        </el-form-item>

        <el-button-group style="margin: 12px;float: right;" >
          <el-button @click="prev" icon="el-icon-arrow-left" type="secondary">zurück</el-button>
          <el-button @click="submitForm" type="primary">weiter<i class="el-icon-arrow-right "></i></el-button>
        </el-button-group>
      </el-form>

      <span v-if="active===2">

        <p style="font-weight: bold">
          Primaaa! Ich danke dir! Viel Spass mit Mattermost.
        </p>

        <el-button-group style="margin: 12px;float: right;" >
          <el-button @click="prev" icon="el-icon-arrow-left" type="secondary">zurück</el-button>
          <el-button @click="next" type="primary">fertig<i class="el-icon-circle-check "></i></el-button>
        </el-button-group>
      </span>

      <span v-if="active===3">

        <p>
          Du wirst in kürze zur Anmeldeseite von Mattermost weitergeleitet...
          Sollte dies nicht der fall sein klicke bitte <a href="https://mattermost.vivaconagua.org">hier</a>
        </p>

      </span>

    </el-card>
    <widget-bottom-navigation />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {VuePasswordAuto} from 'vue-password'
import axios from 'axios'
//import VueAxios from 'vue-axios'
import {WidgetTopNavigation, WidgetBottomNavigation} from 'vca-widget-navigation'


export default {
  name: 'hellomattermost',
  components: {
 //   VuePassword,
    VuePasswordAuto,
    WidgetTopNavigation,
    WidgetBottomNavigation,
  },

  data() {
    var validatePass = (rule, pwd1, callback) => {
      if (pwd1 === '') {
        callback(new Error('Please input the password again'));
      } else if (pwd1 !== this.pwds.pwd1) {
        callback(new Error('Two inputs don\'t match!'));
      } else {
        callback();
      }
    };
    return {
      active: 0,
      pwds: {
        pwd1: "",
        pwd2: "",
      },

      rules: {
        pwd2: [
          { validator: validatePass, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    prev() {
      if (this.active-- > 2) this.active = 0;
    },
    submitForm() {
      this.$refs.pwds.validate((valid) => {
        if (valid) {
          this.active++;
          //alert('submit!');
          this.axios
            .post('/backend/canal/mattermost/user', {'password': this.pwd1})
            .then(function (response)
            {
              switch (response.status)
              {
                case 200:
                  // eslint-disable-next-line no-console
                  window.location = "https://mattermost.stage.vivaconagua.org";
                  break;
              }
            }).catch(function (error) {
            switch (error.response.status) {
              case 500:
                // eslint-disable-next-line no-console
                console.log;
                break;
            }
          }).finally(() => this.loading = false)
        }
      });
        /*} else {
          // eslint-disable-next-line no-console
          console.log('error submit!!');
          return false;
        }
      });*/
    },
  },
  mounted () {
    axios
      .get('/backend/canal/auth/login')
      .then(response => {
        if (response.status === 200) {
          alert('cool');
        } else if(response.status === 401) {
          window.location = "/"
        }
      })
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
