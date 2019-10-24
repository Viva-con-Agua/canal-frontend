<template>
        <el-form :model="pwds" :rules="rules"  ref="pwds" :label-position="'top'" label-width="120px">
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
</template>
<script>

import {VuePasswordAuto} from 'vue-password'
import axios from 'axios'
export default {
  name: 'StepTwo',
  components: {
    VuePasswordAuto,
  },
  data () {
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
      pwds: {
        pwd1: "",
        pwd2: "",
      },
      rules: {
        pwd2: [
          { validator: validatePass, trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    prev() {
      this.$emit('prev')
    },
    submitForm() {
      this.$refs.pwds.validate((valid) => {
        if (valid) {
          axios
            .post('/backend/canal/mattermost/user', { 'password': this.pwds.pwd1 })
            .then(() => {
                  this.$emit('next')
            })
            .catch(function (error) {
            switch (error.response.status) {
              case 400:
                this.$emit('exist');
                break;
            }
          })
        }
      });
    },
  }
}
</script>
