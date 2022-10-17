<template>
  <div class="home">
    <MailEditor/>
  </div>
</template>

<script>
// @ is an alias to /src
import MailEditor from '@/components/MailEditor.vue'

export default {
  name: 'HomeView',
  components: {
    MailEditor
  }
}
</script>
