<template>
   <span>
        <p>
          {{ $i18n.t('components.stepOne.whatIsMattermost') }}
        </p>
        <p>
          {{ $i18n.t('components.stepOne.getMattermost') }}
          <a href="https://mattermost.com/download">Mattermost</a>
        </p>
        <p>
          {{ $i18n.t('components.stepOne.howToMattermost') }}
          <a href="https://docs.mattermost.com/guides/user.html">Guide</a>
        </p>
        <p>
          {{ $i18n.t('components.stepOne.followInstructions') }}
        </p>
        <el-button-group style="margin: 12px;float: right;" >
        <el-button @click="click" type="primary">{{ $i18n.t('elements.buttons.next') }}<i class="el-icon-arrow-right "></i></el-button>
      </el-button-group>
  </span>
</template>
<script>
export default {
  name: "StepOne",
  methods: {
      click(){
        this.$emit('accept')
      }
    
  }
}
</script>
