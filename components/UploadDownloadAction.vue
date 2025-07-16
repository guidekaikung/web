<template>
  <div>
    <div v-if="!props.row.file">
      <q-uploader
        url="/api/uploads/post-upload"
        @uploaded="(info) => handleUpload(info, props.row)"
        label="อัปโหลด"
        auto-upload
        hide-upload-btn
        style="max-width: 150px;"
      />
    </div>
    <div v-else>
      <q-btn
        color="primary"
        label="ดาวน์โหลด"
        :href="`/api/uploads/download?filename=${props.row.file}`"
        target="_blank"
        icon="cloud_download"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  props: {
    row: any
  }
}>()

const emit = defineEmits<{
  (e: 'update-row', row: any): void
}>()

function handleUpload(info: any, row: any) {
  try {
    const uploadedFileName = JSON.parse(info.xhr.response).filename
    row.file = uploadedFileName
    emit('update-row', row)
  } catch (error) {
    console.error('Upload error:', error)
  }
}
</script>
