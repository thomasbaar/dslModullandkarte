<template>
  <q-card class="detailed-node" :class="{ 'expanded': isExpanded, 
  'edge-clicked': expandedByEdgeClick && !isExpanded, 'not-expanded': !isExpanded && !expandedByEdgeClick }">
    <q-card-section class="text-center" v-if="!isExpanded && !expandedByEdgeClick" @click="toggleExpanded">
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
      <div class="close-icon" >
    <q-icon name="close" size="24px" @click="toggleExpanded" />
  </div>
       <div class="text-h5 text-center node-title">{{ nodeData.module.shortName }}</div>
      <q-table
        class="table"
        :rows="tableData"
        :columns="columns"
        row-key="label"
        flat
        bordered
        wrap-cells
        :hide-header="true"
        :hide-bottom="true"
        no-data-label="No data available"
        :rows-per-page-options="[0]"
        separator="cell"
      >
      <template v-slot:body="props">
  <q-tr :props="props" class="row-padding">
    <q-td v-for="col in props.cols" :key="col.name" :props="props">
      <template v-if="col.name === 'value'">

        <div v-if="props.row.label !== 'Lernergebnis/Kompetenzen'">
          {{ props.row.value }}
        </div>
        <div v-else>
          <span v-if="!expandedDescriptions.has(props.row.label)">
            {{ props.row.value }}
          </span>
          <span v-else>
            {{ props.row.fullDescription }}
          </span>
          <q-icon
            name="expand_more"
            class="cursor-pointer"
            @click.stop="toggleDescription(props.row)"
          />
        </div>
      </template>
      <template v-else>
        {{ props.row[col.field] }}
      </template>
    </q-td>
  </q-tr>
</template>

    </q-table>
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
    Handle,
     
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
        {
        label: 'Lernergebnis/Kompetenzen',
        value: mod.description ? mod.description.slice(0, 50) + '...' : 'Keine Beschreibung verfügbar.',
        fullDescription: mod.description || 'Keine Beschreibung verfügbar.',
        isDescriptionExpanded: false
        },
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
    
    const expandedDescriptions = ref(new Set());

    const toggleDescription = (row) => {
      const key = row.label;
      if (expandedDescriptions.value.has(key)) {
        expandedDescriptions.value.delete(key);
      } else {
        expandedDescriptions.value.add(key);
      }
      expandedDescriptions.value = new Set(expandedDescriptions.value);
    };


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
    return { nodeData: props.data, isExpanded, toggleExpanded, columns, tableData, expandedByEdgeClick, topicsTableData, expandedDescriptions, toggleDescription };
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
  max-width: 500px;
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

.close-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
}

</style>
