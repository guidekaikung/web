<template>
  <div class="q-pa-md">
    <div class="q-pa-md">
      <NuxtLink to="/approve-add"
        ><q-btn color="purple" label="+ สร้างขออนุมัติจำหน่าย"></q-btn
      ></NuxtLink>
    </div>
    <ApproveListDataTable :rows="rows"/>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware:["auth"],
})
const visibleColumns = ["name"];
const rows = [
  {
    request_no: "WAMCLBR0001",
    create_date: "2024-09-01",
    create_by: "Alice",
    order: 1,
    status: "done",
    document_no: "DOC0001",
    document_date: "2024-09-02",
    last_status: "ตัดจำหน่ายแล้ว (จบ)",
    date_count_approved: "2024-09-03",
    date_count_pending_approve: 0,
    amount_sell: 15000,
    comment: "Transaction completed successfully.",
  },
  {
    request_no: "WAMCLBR0002",
    create_date: "2024-09-02",
    create_by: "Bob",
    order: 2,
    status: "pending",
    document_no: "DOC0002",
    document_date: "2024-09-04",
    last_status: "อยู่ระหว่างขออนุมัติจำหน่าย (ขั้น 1-2)",
    date_count_approved: "",
    date_count_pending_approve: 2,
    amount_sell: 5000,
    comment: "Awaiting further information.",
  },
  {
    request_no: "WAMCLBR0003",
    create_date: "2024-09-03",
    create_by: "Charlie",
    order: 3,
    status: "pending_approve",
    document_no: "DOC0003",
    document_date: "2024-09-05",
    last_status: "กบล.รับเอกสาร (ขั้น 3.1)",
    date_count_approved: "",
    date_count_pending_approve: 3,
    amount_sell: 8000,
    comment: "Pending approval from manager.",
  },
  {
    request_no: "WAMCLBR0004",
    create_date: "2024-09-04",
    create_by: "Diana",
    order: 4,
    status: "done",
    document_no: "DOC0004",
    document_date: "2024-09-06",
    last_status: "อยู่ระหว่างอนุมัติจำหน่าย (ขั้น 3.2)",
    date_count_approved: "2024-09-07",
    date_count_pending_approve: 0,
    amount_sell: 20000,
    comment: "All steps completed.",
  },
  {
    request_no: "WAMCLBR0005",
    create_date: "2024-09-05",
    create_by: "Edward",
    order: 5,
    status: "pending",
    document_no: "DOC0005",
    document_date: "2024-09-07",
    last_status: "อยู่ระหว่างขอเห็นชอบราคาขายขั้นต่ำ (ขั้น 4-7)",
    date_count_approved: "",
    date_count_pending_approve: 1,
    amount_sell: 3000,
    comment: "Requires additional data.",
  },
  {
    request_no: "WAMCLBR0006",
    create_date: "2024-09-06",
    create_by: "Fiona",
    order: 6,
    status: "done",
    document_no: "DOC0006",
    document_date: "2024-09-08",
    last_status: "อยู่ระหว่างขออนุมัติรับราคาขาย (ขั้น 8)",
    date_count_approved: "2024-09-09",
    date_count_pending_approve: 0,
    amount_sell: 25000,
    comment: "Successfully completed.",
  },
  {
    request_no: "WAMCLBR0007",
    create_date: "2024-09-07",
    create_by: "George",
    order: 7,
    status: "pending_approve",
    document_no: "DOC0007",
    document_date: "2024-09-09",
    last_status: "รอชำระเงิน (ขั้น 9)",
    date_count_approved: "",
    date_count_pending_approve: 5,
    amount_sell: 12000,
    comment: "Under review.",
  },
  {
    request_no: "WAMCLBR0008",
    create_date: "2024-09-08",
    create_by: "Hannah",
    order: 8,
    status: "pending",
    document_no: "DOC0008",
    document_date: "2024-09-10",
    last_status: "อยู่ระหว่างส่งมอบทรัพย์สิน (ขั้น 10)",
    date_count_approved: "",
    date_count_pending_approve: 3,
    amount_sell: 7000,
    comment: "Additional documents needed.",
  },
  {
    request_no: "WAMCLBR0009",
    create_date: "2024-09-09",
    create_by: "Ian",
    order: 9,
    status: "done",
    document_no: "DOC0009",
    document_date: "2024-09-11",
    last_status: "อยู่ระหว่างรายงานการขาย (ขั้น 11)",
    date_count_approved: "2024-09-12",
    date_count_pending_approve: 0,
    amount_sell: 18000,
    comment: "Completed and approved.",
  },
  {
    request_no: "WAMCLBR0010",
    create_date: "2024-09-10",
    create_by: "Julia",
    order: 10,
    status: "pending_approve",
    document_no: "DOC0010",
    document_date: "2024-09-12",
    last_status: "รอตัดจำหน่ายทรัพย์สิน (ขั้น 12)",
    date_count_approved: "",
    date_count_pending_approve: 4,
    amount_sell: 9000,
    comment: "Pending manager's approval.",
  }

];


</script>
