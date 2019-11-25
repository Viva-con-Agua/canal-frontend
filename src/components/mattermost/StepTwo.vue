<template>
        <el-form :model="passwords" :rules="rules"  ref="passwords" :label-position="'top'" label-width="120px">
        <p>
          {{ $i18n.t('components.stepTwo.whyCanal') }}
        </p>
        <p>
          {{ $i18n.t('components.stepTwo.newPassword') }}
        </p>

        <el-form-item :label="$i18n.t('elements.label.password')" prop="passwords.passwordOne" ref="passwords">
          <el-input v-model="passwords.passwordOne" :placeholder="$i18n.t('elements.placeholder.password')" show-password></el-input>
        </el-form-item>
        <el-form-item :label="$i18n.t('elements.label.checkPassword')" prop="passwords.passwordTwo" ref="passwords">
          <el-input v-model="passwords.passwordTwo" :placeholder="$i18n.t('elements.placeholder.checkPassword')" show-password></el-input>
        </el-form-item>
        <el-form-item :label="$i18n.t('elements.label.dsgvo')" prop="passwords.dsgvo" ref="dsgvo">
          <el-checkbox v-model="passwords.dsgvo">{{ $i18n.t('elements.checkBoxs.dsgvo') }}<a href="https://www.vivaconagua.org/datenschutzerklaerung">DSGVO</a></el-checkbox>
        </el-form-item>
        <el-button-group style="margin: 12px;float: right;" >
          <el-button @click="prev" icon="el-icon-arrow-left" type="secondary">{{ $i18n.t('elements.buttons.back') }}</el-button>
          <el-button @click="submitForm" type="primary">{{ $i18n.t('elements.buttons.next') }}<i class="el-icon-arrow-right "></i></el-button>
        </el-button-group>
      </el-form>
</template>
<script>
//import { VuePassword } from 'vue-password'
import axios from 'axios'
export default {
  name: 'StepTwo',
  components: {
    },
  data () {
    // RegEx	Description
    // ^	The password string will start this way
    // (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
    // (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
    // (?=.*[0-9])	The string must contain at least 1 numeric character
    // (?=.[!@#\$%\^&])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
    // (?=.{8,})	The string must be eight characters or longer
    //  const RegExp = ("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{10,})");

    var validatePassOne = (rule, passwordOne, callback) => {
      if (passwordOne === '') {
        callback(new Error( this.$i18n.t('components.stepTwo.rules.inputPasswordOne') ));
      } else {
        if (passwordOne !== '') {
          this.$refs.passwords.validateField('passwords');
        }
        callback();
      }
    };
    var validatePassTwo = (rule, passwordTwo, callback) => {
      if (passwordTwo === '') {
        callback(new Error( this.$i18n.t('components.stepTwo.rules.inputPasswordTwo') ));
      } else if (passwordTwo !== this.passwords.passwordOne) {
        callback(new Error( this.$i18n.t('components.stepTwo.rules.inputMismatched') ));
      } else {
        callback();
      }
    };

    return {
      passwords: {
        passwordOne: "",
        passwordTwo: "",
        dsgvo: false,
      },
      rules: {
        passwordOne: [
          { required: true, pattern:/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{10,})/ ,message: this.$i18n.t('components.stepTwo.rules.inputPattern'), trigger: 'blur' },
          { validator: validatePassOne, trigger: 'blur'}
        ],
        passwordTwo: [
          { required: true },
          { validator: validatePassTwo, trigger: 'blur'}
        ],
        dsgvo: [
          { required: true, message: this.$i18n.t('components.stepTwo.rules.readDSGVO'), trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    prev() {
      this.$emit('prev')
    },
    submitForm() {
      this.$refs.passwords.validate((valid) => {
        if (valid && this.checked == true) {
          axios
            .post('/backend/canal/mattermost/user', { 'password': this.passwords.passwordOne })
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
