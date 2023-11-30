<template>
    <div 
    @click="toggleExpanded"
    class="detailed-node"
    :class="{ 'expanded': isExpanded }"
  >
    <div v-if="!isExpanded">{{ nodeData.module.shortName }}</div>
    <div v-else>
     
      <div> {{ nodeData.module.officialID }}</div>
  
    </div>
    <Handle type="target" position="left" />


    <Handle type="source" position="right" />
  </div>
</template>

<script>
import { defineComponent, ref, toRefs } from 'vue';
import { Handle } from '@vue-flow/core';


export default defineComponent({
  components: { Handle },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { data } = toRefs(props); 
    const isExpanded = ref(false);
    //console.log('CustomNode:', data.value)

    const toggleExpanded = () => {
      isExpanded.value = !isExpanded.value;
    };

    return { nodeData: data.value, isExpanded, toggleExpanded };
  },
});
</script>

<style scoped>
.detailed-node {
  border: 2px solid black; 
  padding: 10px;
  width: 150px;
  height: 30px;

}

.detailed-node.expanded {
  height: 100px; 
  background: #ffffff;
}

</style>