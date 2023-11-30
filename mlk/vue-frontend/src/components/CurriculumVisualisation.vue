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
      <VueFlow :nodeTypes="nodeTypes" v-if="isLoaded" :nodes="nodes" :edges="edges" fit-view-on-init>
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
import { VueFlow, Position, MarkerType, Panel } from "@vue-flow/core";
import { Controls } from "@vue-flow/controls";
import '@vue-flow/controls/dist/style.css'
import { MiniMap } from "@vue-flow/minimap";
import { ref, onMounted, markRaw  } from "vue";
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

    onMounted(() => {
      const data = astStore.curriculumData;
      if (data) {
        const tempNodes = [];
        for (let semester = 1; semester <= data.noSemesters; semester++) {
          tempNodes.push({
            id: `semester-${semester}`,
            label: `Semester ${semester}`,
            position: { x: (semester - 1) * 250, y: 0 },
            style: {
              width: "200px",
              height: `${
                data.modules.filter((m) => m.semester === semester).length *50 +60 }px`,
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
                data: { module: mod },
                position: { x: 25, y: index * 50 + 50 },
                extent: "parent",
                parentNode: `semester-${semester}`,
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
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

    return { nodes, edges, isLoaded, toggleEdges, nodeTypes };
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
