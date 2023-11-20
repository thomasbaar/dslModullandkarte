<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount } from 'vue'
import { useAstStore } from 'src/stores/astStore';

export default defineComponent({
  name: 'App',

  setup() {
    const astStore = useAstStore();

    function receiveMessage(event) {
      if (event.origin !== 'http://localhost:3000') {
        return;
      }
      astStore.setCurriculumData(event.data);

      console.log('Empfangene Daten in Vue:', event.data);
    }

    onMounted(() => {
      window.addEventListener('message', receiveMessage, false);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('message', receiveMessage, false);
    });
  }
})
</script>
