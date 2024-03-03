<template>
    <q-card class="expanded-node">
        <q-card-section>
            <div class="text-h5 text-center node-title">{{ moduleInfo.shortName }}</div>
            <q-table class="table" :rows="tableData" :columns="columns" row-key="label" flat bordered wrap-cells
                :hide-header="true" :hide-bottom="true" no-data-label="No data available" :rows-per-page-options="[0]"
                separator="cell">
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
                                    <q-icon name="expand_more" class="cursor-pointer"
                                        @click.stop="toggleDescription(props.row)" />
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
        <q-icon name="close" class="close-icon" @click="closeNode" />
    </q-card>
</template>
  
<script>
import { ref, computed } from 'vue';
import { QCard, QCardSection, QTable } from 'quasar';

export default {
    components: {
        QCard,
        QCardSection,
        QTable,
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const expandedDescriptions = ref(new Set());
        //console.log(props.data);
        const moduleInfo = computed(() => {
   
            if (!props.data) {
                console.error('Moduldaten sind nicht verfügbar');
                return {}; 
            }
            return props.data;
        });
        //console.log(moduleInfo.value);

        const columns = computed(() => [
            { name: 'label', required: true, field: 'label', align: 'left' },
            { name: 'value', required: true, field: 'value', align: 'left' },
        ]);

        const tableData = computed(() => {
            const mod = moduleInfo.value;
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
                { label: 'Form', value: mod.form },
                { label: 'SWS', value: mod.sws.toString() },
                { label: 'LP', value: mod.etcs.toString() },
                { label: 'NV', value: '-' },
                { label: 'EV', value: 'TBD' },
            ];
        });

        const toggleDescription = (row) => {
            const key = row.label;
            if (expandedDescriptions.value.has(key)) {
                expandedDescriptions.value.delete(key);
            } else {
                expandedDescriptions.value.add(key);
            }
            expandedDescriptions.value = new Set(expandedDescriptions.value);
        };

        const closeNode = () => {
            props.data.handleClose(props.data.nodeId);
        };

        return {
            moduleInfo,
            expandedDescriptions,
            columns,
            tableData,
            toggleDescription,
            closeNode,
        };
    },
};
</script>
  
<style scoped>
.expanded-node {
    border: 2px solid black;
    padding: 10px;
    cursor: default;
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
