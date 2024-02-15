<template>
  <div>
    <svg style="display: none">
      <defs>
        <marker id="arrow-black" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto"
          markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="rgb(118, 185, 0)" />
        </marker>
      </defs>
    </svg>

    <div class="vue-flow-container">
      <VueFlow :nodeTypes="nodeTypes" v-if="isLoaded" :nodes="nodes" :edges="edges" fit-view-on-init
        @edge-click="onEdgeClick" @node-click="onNodeClick">
        <Controls position="top-right" />
        <Panel position="bottom-right">

          <div class="toggle-label">
            <div>
              <input type="checkbox" class="toggle-checkbox" id="show-ev-checkbox" @change="toggleEdges" />
              <label for="show-ev-checkbox">Show EV</label>
            </div>

            <div class="filter-semester">
              <span>Filter Semester:</span>
              <div class="checkbox-container">
                <q-checkbox label="Alle Semester" v-model="allSemestersChecked"
                  @update:model-value="toggleAllSemesters" />
                <label for="alle-semester-checkbox" class="checkbox-label"></label>
              </div>
              <div>
                <q-checkbox v-for="semester in semesterList" :key="semester" :label="`${semester}`"
                  v-model="selectedSemesters" :val="`${semester}`" />
              </div>
            </div>
          </div>





          <label class="toggle-label">
            <input type="checkbox" class="toggle-checkbox" />
            Show NV
          </label>
        </Panel>
      </VueFlow>
    </div>
  </div>
</template>

<script>
import { VueFlow, Position, MarkerType, Panel, useVueFlow } from "@vue-flow/core";
import { Controls } from "@vue-flow/controls";
import '@vue-flow/controls/dist/style.css'
import { ref, onMounted, markRaw, computed, watch } from "vue";
import { useAstStore } from "src/stores/astStore";
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";
import ExpandedNode from './ExpandedNode.vue';
import EdgeNode from './EdgeNode.vue';

export default {
  name: "CurriculumVisualisation",
  components: { VueFlow, Panel, Controls },
  setup() {
    const astStore = useAstStore();
    const isLoaded = ref(false);
    const nodes = ref([]);
    const edges = ref([]);
    const showEdges = ref(false);
    const selectedSemesters = ref([]);
    const vueFlowInstance = useVueFlow();
    const specialNodeVisible = ref(false);

    const noSemesters = computed(() => astStore.curriculumData?.noSemesters || 0);

    const semesterList = computed(() => {
      // Erstellt ein Array von 1 bis noSemesters
      return Array.from({ length: astStore.curriculumData?.noSemesters || 0 }, (_, i) => i + 1);
    });

    const toggleAllSemesters = (isChecked) => {
      if (isChecked) {
        selectedSemesters.value = semesterList.value.map(i => `${i}`);
      } else {
        selectedSemesters.value = [];
      }
    };

    const allSemestersChecked = computed({
      get: () => selectedSemesters.value.length === semesterList.value.length,
      set: (isChecked) => {
        selectedSemesters.value = isChecked ? semesterList.value.map(String) : [];
      },
    });

    const nodeTypes = {
      expandedNode: markRaw(ExpandedNode),
      edgeNode: markRaw(EdgeNode),
    };

    const { onEdgeMouseEnter, onEdgeMouseLeave } = vueFlowInstance;

    onEdgeMouseEnter((event) => {
      const edgeId = event.edge.id;
      const index = edges.value.findIndex(e => e.id === edgeId);
      if (index !== -1) {

        const updatedEdge = {
          ...edges.value[index],
          style: {
            ...edges.value[index].style,
            stroke: 'red',
            strokeWidth: 6
          },
          markerEnd: {
            type: MarkerType.Arrow,
            color: "red"
          }
        };

        edges.value = [...edges.value.slice(0, index), updatedEdge, ...edges.value.slice(index + 1)];
      }
    });

    onEdgeMouseLeave((event) => {
      const edgeId = event.edge.id;
      const index = edges.value.findIndex(e => e.id === edgeId);
      if (index !== -1) {

        const updatedEdge = {
          ...edges.value[index],
          style: {
            ...edges.value[index].style,
            stroke: 'green',
            strokeWidth: 3
          },
          markerEnd: {
            type: MarkerType.Arrow,
            color: "green"
          }
        };
        edges.value = [...edges.value.slice(0, index), updatedEdge, ...edges.value.slice(index + 1)];
      }
    });






    const toggleEdges = () => {
      showEdges.value = !showEdges.value;
    };

    watch([selectedSemesters, showEdges], () => {
      updateEdges();
    });






    const createSpecialNode = (nodeId, type) => {
      const moduleData = astStore.curriculumData.modules.find(m => m.name === nodeId);
      if (moduleData) {
        const newNodeId = `${nodeId}-${type}`;
        const newNodeData = { ...moduleData, nodeId: newNodeId, handleClose: onSpecialNodeClose };

        const newNode = {
          id: newNodeId,
          type: type,
          data: newNodeData,
          position: { x: 200, y: 0 },
          hidden: false
        };
        nodes.value.push(newNode);

        nodes.value.forEach(n => n.hidden = n.id !== newNodeId);
        edges.value.forEach(e => e.hidden = true);
        specialNodeVisible.value = true;
      }
    };

    const onSpecialNodeClose = (nodeId) => {
      console.log("Close Special Node", nodeId);
      nodes.value = nodes.value.filter(n => n.id !== nodeId);
      resetView();
    };

    const createEdgeNodes = (sourceNodeId, targetNodeId) => {
      const sourceModuleData = astStore.curriculumData.modules.find(m => m.name === sourceNodeId);
      const targetModuleData = astStore.curriculumData.modules.find(m => m.name === targetNodeId);

      if (sourceModuleData && targetModuleData) {

        const sourceNewNodeId = `${sourceNodeId}-edgeNode`;
        const targetNewNodeId = `${targetNodeId}-edgeNode`;

        const sourceNewNodeData = { ...sourceModuleData, nodeId: sourceNewNodeId, handleClose: closeAllEdgeNodes };
        const targetNewNodeData = { ...targetModuleData, nodeId: targetNewNodeId, handleClose: closeAllEdgeNodes };

        const sourceNewNode = {
          id: sourceNewNodeId,
          type: 'edgeNode',
          data: sourceNewNodeData,
          position: { x: 100, y: 0 },
          hidden: false
        };

        const targetNewNode = {
          id: targetNewNodeId,
          type: 'edgeNode',
          data: targetNewNodeData,
          position: { x: 700, y: 0 },
          hidden: false
        };
        nodes.value.push(sourceNewNode, targetNewNode);
        nodes.value.forEach(n => n.hidden = (n.id !== sourceNewNodeId && n.id !== targetNewNodeId));
        edges.value.forEach(e => e.hidden = true);
        specialNodeVisible.value = true;
      }
    };

    const closeAllEdgeNodes = () => {
      nodes.value = nodes.value.filter(n => !n.id.includes('edgeNode'));
      resetView();
    };


    const onNodeClick = (event) => {
      //console.log("Klick-Event:", event);
      const node = event?.node;
      //console.log("Geklickter Node:", node);


      if (node && node.id && node.type === 'default') {
        createSpecialNode(node.id, 'expandedNode');
      } else {
        //console.error('Ungültiges Node-Objekt oder nicht-Standard Node-Typ', node);
      }
    };

    const onEdgeClick = (edge) => {
      const edgeData = edge.edge;
      createEdgeNodes(edgeData.source, edgeData.target);
    };

    const updateEdges = () => {
      const data = astStore.curriculumData;
      if (data && showEdges.value) {
        edges.value = data.suppInfo.flatMap((supp) => {

          const sourceModule = data.modules.find(mod => mod.name === supp.predec);
          if (sourceModule && selectedSemesters.value.includes(sourceModule.semester.toString())) {
            return [{
              id: `e${supp.predec}-${supp.succ}`,
              source: supp.predec,
              target: supp.succ,
              markerEnd: { type: MarkerType.Arrow, color: "green" },
              style: { strokeWidth: "3px", stroke: "green" },
              hidden: false
            }];
          }
          return [];
        });
      } else {
        edges.value = [];
      }
    };

    onMounted(() => {
      const data = astStore.curriculumData;
      if (data) {
        const tempNodes = [];
        for (let semester = 1; semester <= data.noSemesters; semester++) {
          tempNodes.push({
            id: `semester-${semester}`,
            label: `<span style="font-size: 30px; font-weight: bold;">Semester ${semester}</span>`,
            position: { x: (semester - 1) * 400, y: 0 },
            hidden: false,
            style: {
              width: "300px",
              height: `${data.modules.filter((m) => m.semester === semester).length * 80 + 70}px`,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: "2px solid",
            },
            connectable: false,
          });

          data.modules
            .filter((m) => m.semester === semester)
            .forEach((mod, index) => {
              tempNodes.push({
                id: mod.name,
                label: `<div style="font-size: 20px; text-align: center;">${mod.shortName}</div>`,
                hidden: false,
                //type: 'detailedNode',
                style: {
                  width: "250px",
                  height: `50px`,
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  border: "1px solid",
                },
                data: {
                  module: mod,
                  expandedByEdgeClick: false
                },
                position: { x: 25, y: index * 80 + 70 },
                extent: "parent",
                parentNode: `semester-${semester}`,
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
                //draggable: false,
              });
            });
        }

        nodes.value = tempNodes;
        console.log(nodes.value);
        updateEdges();
      }

      setTimeout(() => {
        isLoaded.value = true;
      }, 50);
    });

    const resetView = () => {
      nodes.value.forEach(n => n.hidden = false);
      edges.value.forEach(e => e.hidden = false);
      specialNodeVisible.value = false;
    };

    return { nodes, edges, isLoaded, toggleEdges, nodeTypes, onEdgeClick, noSemesters, selectedSemesters, semesterList, toggleAllSemesters, allSemestersChecked, updateEdges, onNodeClick, onSpecialNodeClose, closeAllEdgeNodes };
  },
};
</script>

<style scoped>
.vue-flow-container {
  background-color: #f8f8f8;
  width: 1620px;
  height: 89vh;
}

.toggle-label {
  display: block;
  background-color: green;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
}

.filter-semester {
  margin-top: 10px;
}


.toggle-checkbox {
  margin-right: 10px;
  transform: scale(1.5);
  cursor: pointer;
}

.toggle-label span,
.toggle-label label {
  font-size: 16px;
  color: white;
  cursor: pointer;
}
</style>
