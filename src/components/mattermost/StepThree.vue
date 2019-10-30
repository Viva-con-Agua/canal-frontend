<template>
<span>
<p style="font-weight: bold">
           {{ $i18n.t('components.stepThree.thanks') }}
        </p>

        <el-button-group style="margin: 12px;float: right;" >
          <el-button @click="prev" icon="el-icon-arrow-left" type="secondary">{{ $i18n.t('elements.buttons.back') }}</el-button>
          <el-button @click="next" type="primary">{{ $i18n.t('elements.buttons.finish') }}<i class="el-icon-circle-check "></i></el-button>
        </el-button-group>
      </span>
</template>
<script>
export default {
  name: 'StepThree',
  methods: {
    next () {
      this.$emit('next')
    },
    prev () {
      this.$emit('prev')
    }
  }
}
</script>

