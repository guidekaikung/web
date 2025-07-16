<template>
  <div class="q-pa-md">
    <div class="q-pa-md">
      <q-btn color="purple" label="+ เพิ่มกรรมการ" @click="openDialog" />
    </div>

    <CommitteeListDataTable :rows="rows" @dataUpdated="handleDataUpdated" />

    <!-- 👇 dialog สำหรับเพิ่มกรรมการ -->
    <CommitteeDialog ref="dialogRef" @save="onDialogSave" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommitteeDialog from '~/components/committee/edit/dialog.vue' // ✅ path นี้ต้องตรงกับโฟลเดอร์จริง
definePageMeta({ middleware: ["auth"] })

const rows = ref<any[]>([
  {
    committee_position: "ประธานกรรมการ",
    create_date: "2024-09-01",
    committee_name: "คุณปิยธิดา",
    order: 1,
  },
  {
    committee_position: "กรรมการ",
    create_date: "2024-09-01",
    committee_name: "คุณวิเชียร",
    order: 2,
  },
  {
    committee_position: "กรรมการ",
    create_date: "2024-09-01",
    committee_name: "คุณศิริพร",
    order: 3,
  }
])

// === dialog ref & logic ===
const dialogRef = ref()

const openDialog = () => {
  dialogRef.value.open()
}

const onDialogSave = (newItem: any) => {
  const nextOrder = rows.value.length + 1
  rows.value = [
    ...rows.value,
    {
      ...newItem,
      order: nextOrder,
      create_date: new Date().toISOString().split("T")[0],
    }
  ]
}

const handleDataUpdated = () => {
  rows.value = [...rows.value]
}
</script>


<!-- <template>
  <div class="q-pa-md">
    <div class="q-pa-md">
      <q-btn color="purple" label="+ เพิ่มกรรมการ"></q-btn>
    </div>
    <CommitteeListDataTable :rows="rows" @dataUpdated="handleDataUpdated" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["auth"] })

const rows = ref<any[]>([
  {
    committee_position: "ประธานกรรมการ",
    create_date: "2024-09-01",
    committee_name: "คุณปิยธิดา",
    order: 1,
  },
  {
    committee_position: "กรรมการ",
    create_date: "2024-09-01",
    committee_name: "คุณวิเชียร",
    order: 2,
  },
  {
    committee_position: "กรรมการ",
    create_date: "2024-09-01",
    committee_name: "คุณศิริพร",
    order: 3,
  }
])

const handleDataUpdated = () => {
  rows.value = [...rows.value]
}
</script>
 -->