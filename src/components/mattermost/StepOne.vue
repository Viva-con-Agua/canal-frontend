<template>
   <span>
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
        <el-button @click="click" type="primary">weiter<i class="el-icon-arrow-right "></i></el-button>
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
