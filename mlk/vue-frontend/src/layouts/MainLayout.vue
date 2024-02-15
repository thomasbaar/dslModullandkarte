<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-green">
      <q-toolbar >
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Modullandkarte
        </q-toolbar-title>
        <div style="font-size: 1.5em;">HTW Berlin</div>

      </q-toolbar>

      <q-expansion-item v-if="showCurriculum" v-model="infoExpanded" icon="info"
        label="Mehr Informationen zum aktuell dargestellten Curriculum" class="bg-white text-green"
        expand-icon-class="text-green" expand-icon="expand_more">
        <div class="q-pa-md">
          <div class="curriculum-info">
            <p>Studiengang: {{ curriculumData.fullName }}  {{ curriculumData.displayShortName }}</p>
            <p>Semesteranzahl: {{ curriculumData.noSemesters }}</p>
            <p>Anzahl Module des Studiengangs: {{ curriculumData.modules.length}}</p>
            <p><a :href="curriculumData.url" target="_blank" class="curriculum-link">Link zum amtlichen Dokument des dargestellten Curriculum</a>
            </p>
          </div>
        </div>
      </q-expansion-item>

    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="text-h6 menu-header text-weight-bold">
          Menu
        </q-item-label>

        <q-item clickable @click="showLangium = true; showVisualization = false; showCurriculum = false">
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>
          <q-item-section>
            Langium Input
          </q-item-section>
        </q-item>
        <q-item clickable @click="showLangium = false; showVisualization = true; showCurriculum = false">
          <q-item-section avatar>
            <q-icon name="text_snippet" />
          </q-item-section>
          <q-item-section>
            Textuelle Visualisierung
          </q-item-section>
        </q-item>
        <q-item clickable @click="showLangium = false; showVisualization = false; showCurriculum = true">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            Curriculum Visualisation
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div v-show="showLangium">
        <iframe src="http://localhost:3000" style="width: 1380px; height: 830px;" frameborder="0"></iframe>
      </div>
      <div v-show="showVisualization">
        <AstVisualizer />
      </div>
      <div v-if="showCurriculum">
        <CurriculumVisualisation />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import AstVisualizer from 'src/components/AstVisualizer.vue'
import CurriculumVisualisation from 'src/components/CurriculumVisualisation.vue'
import { useAstStore } from '../stores/astStore.js';


export default defineComponent({
  name: 'MainLayout',

  components: {
    AstVisualizer,
    CurriculumVisualisation
  },

  setup() {

    const astStore = useAstStore();
    const curriculumData = computed(() => astStore.curriculumData);

    const leftDrawerOpen = ref(false);
    const showLangium = ref(true);
    const showVisualization = ref(false);
    const showCurriculum = ref(false);
    const infoExpanded = ref(false);

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    function toggleInfo() {
      infoExpanded.value = !infoExpanded.value;
    }

    return {
      curriculumData,
      leftDrawerOpen,
      showLangium,
      showVisualization,
      showCurriculum,
      toggleLeftDrawer,
      toggleInfo,
      infoExpanded,
    };
  }
});
</script>


<style scoped>
.menu-header {
  color: black;
}

.curriculum-link {
  /*color: black;*/
  text-decoration: underline;
}

.curriculum-link:hover {
  color: #e0e0e0;
}
</style>