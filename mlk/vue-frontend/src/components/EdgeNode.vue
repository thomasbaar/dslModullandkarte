<template>
  <q-card class="edge-node">
    <q-card-section class="edge-clicked-content">
      <div class="text-h5 text-center node-title">{{ moduleInfo.shortName }}</div>
      <q-table class="table" :rows="topicsTableData" :columns="topicColumns" row-key="label" flat bordered wrap-cells
        :hide-header="false" :hide-bottom="true" no-data-label="No topics available" :rows-per-page-options="[0]"
        separator="cell"></q-table>
    </q-card-section>
    <q-icon name="close" class="close-icon" @click="closeNode" />
  </q-card>
</template>
  
<script>
import { defineComponent, computed } from 'vue';
import { QCard, QCardSection, QTable } from 'quasar';

export default defineComponent({
  components: { QCard, QCardSection, QTable },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {

    const moduleInfo = computed(() => {

      if (!props.data) {
        console.error('Moduldaten sind nicht verfügbar');
        return {}; 
      }
      return props.data;
    });
    console.log(moduleInfo.value);

    const topicsTableData = computed(() => props.data.topics.map(topic => ({
      label: topic.topicName,
      value: topic.keywords.join(', ')
    })));

    const topicColumns = computed(() => [
      { name: 'label', required: true, field: 'label', label: 'Topics', align: 'left', headerStyle: 'font-weight: bold; font-size: 18px;'},
      { name: 'value', required: true, field: 'value', label: 'Main concepts', align: 'left', headerStyle: 'font-weight: bold; font-size: 18px;'},
    ]);

    const closeNode = () => {
      props.data.handleClose(props.data.nodeId);
    };


    return { moduleInfo, topicsTableData, topicColumns, closeNode };
  },
});
</script>
  
<style scoped>
.edge-node {
  border: 2px solid black;
  padding: 10px;
  max-width: 500px;
}

.table {
  border: 2px solid black;
}

.text-center {
  text-align: center;
}

.node-title {
  margin-bottom: 15px;
  font-weight: bold;
}

.close-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  font-size: 24px;
}


</style>
  