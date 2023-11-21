<template>
  <div>
    <pre>{{ curriculumData }}</pre>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useAstStore } from 'src/stores/astStore';

export default {
  name: 'AstVisualizer',

  setup() {
    const astStore = useAstStore();
    const curriculumData = computed(() => astStore.curriculumData);

    // Loggen des curriculumData-Objekts
    console.log("Curriculum Data:", curriculumData.value);

    return { curriculumData };
  }
};
</script>

<style scoped>
pre {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
}
</style>
