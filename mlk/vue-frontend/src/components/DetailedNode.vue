<template>
  <q-card @click="toggleExpanded" class="detailed-node" :class="{ 'expanded': isExpanded, 
  'edge-clicked': expandedByEdgeClick && !isExpanded, 'not-expanded': !isExpanded && !expandedByEdgeClick }">    
  <q-card-section class="text-center" v-if="!isExpanded && !expandedByEdgeClick">
      <span style="font-size: 18px; font-weight: bold;">{{nodeData.module.shortName}} </span>
    </q-card-section>


  <q-card-section v-else-if="expandedByEdgeClick && !isExpanded" class="edge-clicked-content">
    <div class="text-h5 text-center node-title">{{ nodeData.module.shortName }}</div>
    <q-table
      class="table"
      :rows="topicsTableData"
      :columns="[{ name: 'label', required: true, field: 'label', label: 'Topic', align: 'left' }, 
                  { name: 'value', required: true, field: 'value', label: 'Key Concepts', align: 'left' }]"
      row-key="label"
      flat
      bordered
      :hide-header="false"
      :hide-bottom="true"
      no-data-label="No topics available"
      :rows-per-page-options="[0]"
      separator="cell"
    ></q-table>
  </q-card-section>

    <q-card-section v-else class="expanded-content">
       <div class="text-h5 text-center node-title">{{ nodeData.module.shortName }}</div>
      <q-table
        class="table"
        :rows="tableData"
        :columns="columns"
        row-key="label"
        flat
        bordered
        :hide-header="true"
        :hide-bottom="true"
        no-data-label="No data available"
        :rows-per-page-options="[0]"
        separator="cell"
      ></q-table>
    </q-card-section>
    <Handle type="target" position="left" />
    <Handle type="source" position="right" />
  </q-card>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { QCard, QCardSection, QTable } from 'quasar';
import { Handle } from '@vue-flow/core';

export default defineComponent({
  components: { 
    QCard,
    QCardSection,
    QTable,
    Handle
  },
  props: {
    data: {
      type: Object,
      required: true,
    },

  },
  setup(props) {
    const isExpanded = ref(false);
    const toggleExpanded = () => {
      isExpanded.value = !isExpanded.value;
    };
    const expandedByEdgeClick = computed(() => props.data.expandedByEdgeClick);

    const columns = computed(() => [
      { name: 'label', required: true, field: 'label', align: 'left' },
      { name: 'value', required: true, field: 'value', align: 'left' },
    ]);

    const tableData = computed(() => {
      const mod = props.data.module;
      return [
        { label: 'Official ID', value: mod.officialID || 'TBD' },
        { label: 'Official Name', value: mod.officialName || 'TBD' },
        { label: 'Verwendbarkeit des Moduls', value: 'TBD' },
        { label: 'Anerkannte Module', value: 'TBD' },
        { label: 'Pflicht / Wahlfplicht', value: 'Pflicht' },
        { label: 'Form', value: 'TBD' },
        { label: 'SWS', value: 'TBD' },
        { label: 'LP', value: mod.etcs.toString() },
        { label: 'NSt', value: '1a' },
        { label: 'NV', value: '-' },
        { label: 'EV', value: 'TBD' },
      ];
    });

    const topicsTableData = computed(() => {
      return props.data.module.topics.map(topic => ({
        label: topic.topicName,
        value: topic.keywords.join(', ')
      }));
    });

/*    watch(() => props.data.expandedByEdgeClick, (newValue) => {
      console.log('expandedByEdgeClick changed:', newValue);
    });
*/
    return { nodeData: props.data, isExpanded, toggleExpanded, columns, tableData, expandedByEdgeClick, topicsTableData };
  },
});
</script>

<style scoped>
.detailed-node {
  border: 2px solid black;
  padding: 10px;
  cursor: pointer;
}

.detailed-node.not-expanded {
  width: 250px;
}

.edge-clicked {
  background: white;
}

.detailed-node.expanded {
   padding: 0px;
   font-weight: bold;
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

</style>
