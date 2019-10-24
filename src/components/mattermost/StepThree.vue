<template>
<span>
<p style="font-weight: bold">
          Primaaa! Ich danke dir! Viel Spass mit Mattermost.
        </p>

        <el-button-group style="margin: 12px;float: right;" >
          <el-button @click="prev" icon="el-icon-arrow-left" type="secondary">zurück</el-button>
          <el-button @click="next" type="primary">fertig<i class="el-icon-circle-check "></i></el-button>
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

