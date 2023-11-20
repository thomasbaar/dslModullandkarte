<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Modullandkarte
        </q-toolbar-title>

        <div>HTW Berlin</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item clickable @click="showLangium = true; showVisualization = false">
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>
          <q-item-section>
            Langium Input
          </q-item-section>
        </q-item>
        <q-item clickable @click="showLangium = false; showVisualization = true">
          <q-item-section avatar>
            <q-icon name="show_chart" />
          </q-item-section>
          <q-item-section>
            Visualisierung
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div v-if="showLangium">
        <iframe src="http://localhost:3000" style="width: 100%; height: 600px;" frameborder="0"></iframe>
      </div>
      <div v-if="showVisualization">
        <AstVisualizer />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import AstVisualizer from 'src/components/AstVisualizer.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    AstVisualizer
  },

  setup() {
    const leftDrawerOpen = ref(false)
    const showLangium = ref(true)
    const showVisualization = ref(false)

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return {
      leftDrawerOpen,
      showLangium,
      showVisualization,
      toggleLeftDrawer
    }
  }
})
</script>
