<template>
   <span>
        <p>
          {{ $i18n.t('components.stepOne.whatIsMattermost') }}
        </p>
        <p>
          {{ $i18n.t('components.stepOne.getMattermost') }}
        </p>
        <p>
          {{ $i18n.t('components.stepOne.howToMattermost') }}
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
