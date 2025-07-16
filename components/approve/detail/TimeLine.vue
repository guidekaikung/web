<template>
  <div class="q-pa-md">
    <q-markup-table separator="vertical" wrap-cells>
      <thead>
        <tr>
          <th class="text-center" style="width: 10%">TIMELINE</th>
          <th class="text-center">ลำดับ</th>
          <th class="text-center">ผู้ดำเนินการ</th>
          <th class="text-center">ขั้นตอน/รายละเอียด</th>
          <th class="text-center">เอกสาร</th>
          <th class="text-center">Action</th>      
          <th class="text-center">เลขที่หนังสือ</th>
          <th class="text-center">หมายเหตุ</th>
          <th class="text-center">ลงวันที่</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in model" :key="i">
          <td style="position: relative">
            <div class="timeline" :class="timelineClass(row, i)">
              <q-icon
                v-if="typeof row.no === 'number'"
                :name="row.status === 20 ? 'check_circle' : 'schedule'"
                :color="row.status === 20 ? 'green' : 'grey'"
                size="30px"
                style="z-index: 10; background-color: white; border-radius: 50%"
              />
              <div
                v-else
                class="timeline timeline-line-full"
                :class="
                  row.status === 20
                    ? 'success-top success-bottom'
                    : 'unsuccess-top unsuccess-bottom'
                "
              ></div>
            </div>
          </td>
          <td style="height: 60px" class="text-left">{{ row.no }}</td>
          <td style="height: 60px" class="text-left">{{ row.operator }}</td>
          <td style="height: 60px" class="text-left">{{ row.detail }}</td>
          <td style="height: 60px" class="text-left">
  <a
    v-if="row.document"
    :href="`/api/uploads/get-download?step=${encodeURIComponent(row.no)}&file=${encodeURIComponent(row.document)}`"
    target="_blank"
    class="text-primary"
  >
    ดาวน์โหลด
  </a>
  <span v-else>-</span>
</td>

          <td style="height: 60px" class="text-left">
  <q-btn flat label="Upload" @click="triggerUpload(i)" />
<input
  type="file"
  class="hidden"
  accept=".doc,.docx,.xls,.xlsx,.pdf"
  :ref="(el) => setFileInputRef(el, i)"
  @change="handleFileChange($event, row.no)"
/>
</td>         
          <td style="height: 60px" class="text-left">{{ row.document_no }}</td>
          <td style="height: 60px" class="text-left">{{ row.comment }}</td>
          <td style="height: 60px" class="text-left">{{ row.date }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
interface TimelineItem {
  no: number | string;
  operator: string;
  detail: string;
  status: number;
  statusDesciption: string;
  document: string;
  document_no: string;
  date: string;
  comment: string;
}
const step = ref(10);
// const model = ref<TimelineItem[]>([]);

// const { data: responseData, error } = await useFetch("/api/get-approve-detail");

// if (error.value) {
//   console.error("Error fetching data:", error.value);
// } else {
//   if (responseData.value) {
//     model.value = responseData.value; // Assign only if responseData.value is not null
//   } else {
//     console.warn("No data received.");
//   }
// }

  const model = ref<TimelineItem[]>([
    {
          no: 1,
          operator: 'กฟฟ.',
          detail: 'Upload File ZAAR020 (from SAP)',
          document: 'File ZAAR020  รายงานขออนุมัติจำหน่ายมิเตอร์ชำรุด',
          document_no: '',
          status: 20,
          statusDesciption: '',
          date: '2024-09-11T11:20:30',
          comment:''
        },
        {
          no: 2,
          operator: 'กฟฟ.',
          detail: 'รายงานผลจากคณะกรรมการสอบหาข้อเท็จจริง (ส่งหนังสือถึง กบล.)',
          document: 'หนังสือขออนุมัติจำหน่ายมิเตอร์และอุปกรณ์ประกอบ',
          document_no: 'น.3กฟส.ลบ.(มต.)123/2567 ลว.31.01.2567',
          status: 20,
          statusDesciption: '',
          date: '2024-09-12T14:30:00',
          comment:''
        },
        {
          no: 3,
          operator: 'กบล.',
          detail: `อนุมัติจำหน่าย`,
          document: 'หนังสืออนุมัติจำหน่ายจากผู้มีอำนาจลงนาม',
          document_no: 'น.3กบล.(มต.) 567/2567 ลว.15.02.2567 ',
          status: 20,
          statusDesciption: '',
          date: '2024-09-13T09:00:00',
          comment:''
        },
        {
          no: 4,
          operator: `คณะกรรมการประเมินราคา`,
          detail: 'กำหนดราคาขายขั้นต่ำ โดยดำเนินการตามข้อ 5 และ 6',
          document: 'คำนวณราคาและขออนุมัติเห็นชอบราคาขายขั้นต่ำ',
          document_no: '',
          status: 10,
          statusDesciption: '',
          date: '2024-09-14T15:45:00',
          comment:''
        },
        {
          no: '4.1',
          operator: 'คณะกรรมการประเมินราคา',
          detail: 'คำนวณราคาขายของมิเตอร์ ซีที พีที',
          document: 'ตารางคำนวณการประเมินราคา',
          document_no: '',
          status: 20,
          statusDesciption: '',
          date: '2024-09-15T10:20:00',
          comment:''
        },
        {
          no: '4.2',
          operator: `คณะกรรมการประเมินราคา`,
          detail: `เสนอผู้มีอำนาจฯ*เห็นชอบราคาขั้นต่ำ`,
          document: 'หนังสืออนุมัติเห็นชอบราคาขายขั้นต่ำ',
          document_no: '',
          status: 10,
          statusDesciption: '',
          date: '2024-09-16T08:00:00',
          comment:''
        },
        {
          no: 5,
          operator: 'กฟฟ.',
          detail: 'จัดทำหนังสือขออนุมัติหลักการขายจากผู้มีอำนาจสั่งขาย',
          document: 'หนังสืออนุมัติหลักการขาย',
          document_no: '',
          status: 10,
          statusDesciption: '',
          date: '2024-09-17T16:30:00',
          comment:''
        },
        {
          no: 6,
          operator: 'กฟฟ.',
          detail: 'วิธีการขาย มี 3 วิธี',
          document: '',
          document_no: '',
          status: 10,
          statusDesciption: '',
          date: '2024-09-18T12:15:00',
          comment:''
        },
        {
          no: 7,
          operator: 'กฟฟ.',
          detail: 'จัดทำเอกสารประกาศขายและเผยแพร่การขาย (แจ้ง กบพ.ลงประกาศ)',
          document: 'เอกสารประกาศขายและเผยแพร่การขาย',
          document_no: '',
          status: 10,
          statusDesciption: '',
          date: '2024-09-18T12:15:00',
          comment:''
        },
        {
          no: '7.1',
          operator: 'คณะกรรมการดำเนินการขาย',
          detail: 'ผู้สนใจเข้ารับซอง ให้ กฟฟ.จัดทำเอกสารลงทะเบียนการรับซอง (ตามวันที่กำหนดไว้ในหนังสือประกาศขาย)',
          document: 'เอกสารลงทะเบียน',
          document_no: '',
          status: 10,
          statusDesciption: '',
          date: '2024-09-18T12:15:00',
          comment:''
        }
        ,
        {
          no: '7.2',
          operator: 'กฟฟ.',
          detail: `ผู้เสนอราคายื่นซองเสนอราคา พร้อมวางหลักประกันซอง
      (ยื่นซองฯ พร้อมวางหลักประกัน 5%) ให้ กฟฟ.จัดทำทะเบียนรับซองเสนอราคา และทำตารางเปรียบเทียบราคา`,
          document: 'ทะเบียนการรับเอกสาร พร้อมวางหลักประกันซอง และตารางเปรียบเทียบราคาเปิดซอง',
          document_no: '',
          status: 10,
          statusDesciption: '',
          date: '2024-09-18T12:15:00',
          comment:''
        },
        {
          no: 8,
          operator: 'คณะกรรมการดำเนินการขาย',
          detail: `ขออนุมัติรับราคาและขออนุมัติหลักการขายจากผู้มีอำนาจสั่งขาย`,
          document: 'หนังสืออนุมัติรับราคา',
          document_no: '',
          status: 10,
          statusDesciption: '',
          date: '2024-09-18T12:15:00',
          comment:''
        }
        ,
        {
          no: 9,
          operator: 'คณะกรรมการดำเนินการขาย',
          detail: `รับชำระเงิน และออกใบเสร็จให้ผู้รับซื้อ`,
          document: 'ใบเสร็จรับเงิน',
          document_no: '',
          status: 10,
          statusDesciption: '',
          date: '2024-09-18T12:15:00',
          comment:''
        } ,
        {
          no: 10,
          operator: 'กฟฟ.',
          detail: `ตัดจำหน่าย (ZMME024) และพิมพ์ใบจ่ายของ (ตัดจำหน่าย MIGO MvT 555)`,
          document: 'ใบจ่ายของ (ตัดจำหน่าย MvT 555)',
          document_no: '',
          status: 10,
          statusDesciption: '',
          date: '2024-09-18T12:15:00',
          comment:''
        },
        {
          no: 11,
          operator: 'คณะกรรมการส่งมอบพัสดุ',
          detail: `คณะกรรมการส่งมอบพัสดุ ทำหนังสือรายงานผลการดำเนินการขาย และส่งมอบ`,
          document: 'หนังสือรายงานการส่งมอบและรับมอบ',
          document_no: '',
          status: 10,
          statusDesciption: '',
          date: '2024-09-18T12:15:00',
          comment:''
        },
        {
          no: 12,
          operator: 'คณะกรรมการส่งมอบพัสดุ',
          detail: `รายงานผลการขาย ส่งให้ กบฟ. เพื่อตัดจำหน่ายออกจากบัญชีสินทรัพย์`,
          document: 'หนังสือรายงานการขาย',
          document_no: '',
          status: 10,
          statusDesciption: '',
          date: '2024-09-18T12:15:00',
          comment:''
        },
        {
          no: 13,
          operator: 'กบฟ.',
          detail: `ตัดจำหน่ายทรัพย์สินออกจากระบบบัญชีสินทรัพย์`,
          document: 'ตัดจำหน่ายทรัพย์สิน (AA)',
          document_no: '',
          status: 10,
          statusDesciption: '',
          date: '2024-09-18T12:15:00',
          comment:''
        }
        
      
]);

import axios from 'axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const fileInputRefs = ref<HTMLInputElement[]>([])

const setFileInputRef = (el: HTMLInputElement | null, index: number) => {
  if (el) fileInputRefs.value[index] = el
}

const triggerUpload = (index: number) => {
  const input = fileInputRefs.value[index]
  if (input) input.click()
}

const handleFileChange = async (event: Event, stepNo: number | string) => {
  const input = event.target as HTMLInputElement
  const file = input?.files?.[0]
  if (!file) return

  // ✅ ตรวจสอบชนิดไฟล์เบื้องต้นฝั่ง Frontend ด้วยชื่อ
  const allowedExtensions = ['.doc', '.docx', '.xls', '.xlsx', '.pdf']
  const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()

  if (!allowedExtensions.includes(fileExtension)) {
    $q.notify({
      type: 'negative',
      message: 'อนุญาตเฉพาะไฟล์ .doc .docx .xls .xlsx .pdf เท่านั้น',
    })
    input.value = ''
    return
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('step', String(stepNo))

  try {
    const res = await axios.post('/api/uploads/post-upload', formData)

    if (!res.data.success) {
      $q.notify({
        type: 'negative',
        message: res.data.error || 'อัปโหลดล้มเหลว',
      })
      return
    }

    $q.notify({
      type: 'positive',
      message: 'อัปโหลดไฟล์สำเร็จ',
    })

    const index = model.value.findIndex((row) => row.no === stepNo)
    if (index !== -1) {
      model.value[index].document = res.data.saved
    }

  } catch (err) {
    console.error('❌ Upload error:', err)
    $q.notify({
      type: 'negative',
      message: 'เกิดข้อผิดพลาดในการอัปโหลดไฟล์',
    })
  } finally {
    input.value = ''
  }
}

function timelineClass(row: TimelineItem, index: number) {
  let response = "";
  if (row.status === 20) {
    response += "success-top success-bottom ";

    if (index === 0) {
      response += "timeline-line-bottom";
    } else if (typeof model.value[index].no !== "number") {
      response += "timeline-line-full";
    } else if (index + 1 === model.value.length) {
      response += "timeline-line-top";
    } else if (model.value[index + 1].status) {
      response += "timeline-line-top timeline-line-bottom";
    }
  } else if (row.status === 10) {
    if (model.value[index - 1].status === 20) {
      response +=
        "success-top unsuccess-bottom timeline-line-top timeline-line-bottom";
    } else if (index === model.value.length - 1) {
      response += "unsuccess-top timeline-line-top timeline-line-bottom";
    } else {
      response +=
        "unsuccess-top unsuccess-bottom timeline-line-top timeline-line-bottom";
    }
  }
  return response;
}
</script>

<style scoped>
.timeline {
  width: 30px;
  margin: 0 auto;
}
.unsuccess-top::before {
  background-color: #959595 !important;
}

.unsuccess-bottom::after {
  background-color: #959595 !important;
}

.unsuccess-full::before,
.unsuccess-full::after {
  background-color: #959595 !important;
}

.success-top::before {
  background-color: #4caf50 !important;
}

.success-bottom::after {
  background-color: #4caf50 !important;
}

.success-full::before,
.success-full::after {
  background-color: #4caf50 !important;
}

.timeline-line-full::before {
  content: "";
  position: absolute;
  width: 2px;
  height: 100%;
  transform: translate(-50%);
  top: 0;
  left: 50%;
  z-index: 0;
}

.timeline-line-top::before {
  content: "";
  position: absolute;
  width: 2px;
  height: 50%;
  transform: translate(-50%);
  top: 0;
  left: 50%;
  z-index: 0;
}

.timeline-line-bottom::after {
  content: "";
  position: absolute;
  width: 2px;
  height: 50%;
  transform: translate(-50%);
  bottom: 0;
  left: 50%;
  z-index: 0;
}
</style>
