<template>
  <div>
    <svg style="display: none">
      <defs>
        <marker
          id="arrow-black"
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="rgb(118, 185, 0)" />
        </marker>
      </defs>
    </svg>

    <div class="vue-flow-container">
      <VueFlow :nodeTypes="nodeTypes" v-if="isLoaded" :nodes="nodes" :edges="edges" fit-view-on-init @edge-click="onEdgeClick">
        <MiniMap position="bottom-left" />
        <Controls position="top-right" />
        <Panel position="bottom-right">
          <label class="toggle-label">
            <input type="checkbox" class="toggle-checkbox" />
            Show NV
          </label>
          <label class="toggle-label">
            <input
              type="checkbox"
              class="toggle-checkbox"
              @change="toggleEdges"
            />
            Show EV
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
import { MiniMap } from "@vue-flow/minimap";
import { ref, onMounted, markRaw } from "vue";
import { useAstStore } from "src/stores/astStore";
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";
import DetailedNode from './DetailedNode.vue';

export default {
  name: "CurriculumVisualisation",
  components: { VueFlow, MiniMap, Panel, Controls},
  setup() {
    const astStore = useAstStore();
    const isLoaded = ref(false);
    const nodes = ref([]);
    const edges = ref([]);
    const showEdges = ref(false);
    const vueFlowInstance = useVueFlow();

    const nodeTypes = {
      detailedNode: markRaw(DetailedNode),
    };


    const toggleEdges = () => {
      showEdges.value = !showEdges.value;
      updateEdges();
    };

    const updateEdges = () => {
      const data = astStore.curriculumData;
      if (data && showEdges.value) {
        edges.value = data.suppInfo.map((supp) => ({
          id: `e${supp.predec}-${supp.succ}`,
          source: supp.predec,
          target: supp.succ,
          markerEnd: { type: MarkerType.Arrow, color: "green" },
          style: { strokeWidth: "3px", stroke: "green" },
        }));
      } else {
        edges.value = [];
      }
    };

/*const onEdgeClick = (edge) => {
  const edgeData = edge.edge;
  const sourceNodeId = edgeData.source;
  const targetNodeId = edgeData.target;


  const sourceNode = nodes.value.find(node => node.id === sourceNodeId);
  if (sourceNode) {
    sourceNode.expandedByEdgeClick = !sourceNode.expandedByEdgeClick;
    console.log(sourceNode)
  } else {
    console.log("Source node not found");
  }
};
*/

const onEdgeClick = (edge) => {
      const edgeData = edge.edge;
  
      const sourceNodeId = edgeData.source;

      // Finden Sie die Node im VueFlow-Instanz-Status
      const node = vueFlowInstance.findNode(sourceNodeId);
      if (node) {
        // Aktualisieren Sie die Daten der Node
            console.log(node.data);
        node.data = {
          ...node.data,
          expandedByEdgeClick: !node.data.expandedByEdgeClick
        };      
        }
    };

/*
const onEdgeClick = (edge) => {
  const edgeData = edge.edge;
  const sourceNodeId = edgeData.source;
  const nodeIndex = nodes.value.findIndex(node => node.id === sourceNodeId);

  if (nodeIndex !== -1) {
    const updatedNode = { 
      ...nodes.value[nodeIndex], 
      data: { 
        ...nodes.value[nodeIndex].data, 
        expandedByEdgeClick: !nodes.value[nodeIndex].data.expandedByEdgeClick 
      }
    };

    nodes.value.splice(nodeIndex, 1, updatedNode);
  }
};
*/

    onMounted(() => {
      const data = astStore.curriculumData;
      if (data) {
        const tempNodes = [];
        for (let semester = 1; semester <= data.noSemesters; semester++) {
          tempNodes.push({
            id: `semester-${semester}`,
            label: `<span style="font-size: 30px; font-weight: bold;">Semester ${semester}</span>`,
            position: { x: (semester - 1) * 400, y: 0 },
            style: {
              width: "300px",
              height: `${
                data.modules.filter((m) => m.semester === semester).length * 120 + 90 }px`,
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
                //label: mod.shortName,
                type: 'detailedNode',
                data: { module: mod,
                expandedByEdgeClick: false },
                position: { x: 25, y: index * 120 + 80 },
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

    return { nodes, edges, isLoaded, toggleEdges, nodeTypes, onEdgeClick };
  },
};
</script>

<style scoped>
.vue-flow-container {
  background-color: #f8f8f8;
  width: 1620px;
  height: 875px;
}

.toggle-label {
  display: flex;
  align-items: center;
  background-color: green;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 5px;
}

.toggle-checkbox {
  margin-right: 15px;
  transform: scale(1.5);
}

</style>
