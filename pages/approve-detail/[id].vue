<template>
    <div>
       <ApproveDetailTimeLine :id="route.params.id" :rows="rows" />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware:["auth"],
})
interface Props {
  rows: any[];
}
const props = withDefaults(defineProps<Props>(), {
    rows: () => []
});

const route = useRoute()

</script>

<style scoped>

</style>