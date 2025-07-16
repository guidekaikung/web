import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default defineEventHandler(async (event) => {
  const form = formidable({ multiples: false, keepExtensions: true })

  return await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        console.error('❌ Error parsing form:', err)
        return reject(err)
      }

      const file = files.file?.[0] || files.file
      const step = (fields.step || 'unknown').toString()

      // ✅ ตรวจสอบชนิดไฟล์
      const allowedExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx']
      const ext = path.extname(file.originalFilename || '').toLowerCase()
      if (!allowedExtensions.includes(ext)) {
        return resolve({ success: false, error: 'ไม่อนุญาตให้ส่งไฟล์ประเภทนี้' })
      }

      // ✅ สร้างชื่อไฟล์แบบ วัน-เดือน-ปี_ชั่วโมง.นาที.วินาที
      const now = new Date()
      const pad = (n: number) => n.toString().padStart(2, '0')
      const day = pad(now.getDate())
      const month = pad(now.getMonth() + 1)
      const year = now.getFullYear()
      const hours = pad(now.getHours())
      const minutes = pad(now.getMinutes())
      const seconds = pad(now.getSeconds())
      const timestamp = `${day}-${month}-${year}_${hours}.${minutes}.${seconds}`

      const newFilename = `${step}_${timestamp}${ext}`

      // ✅ สร้างโฟลเดอร์แยกตาม step
      const stepDir = path.join(process.cwd(), 'server', 'api', 'uploads', 'file', step)
      if (!fs.existsSync(stepDir)) {
        fs.mkdirSync(stepDir, { recursive: true })
      }

      const finalPath = path.join(stepDir, newFilename)
      fs.renameSync(file.filepath, finalPath)

      console.log(`✅ Upload saved to ${finalPath}`)
      resolve({
        success: true,
        step,
        saved: newFilename,
        original: file.originalFilename
      })
    })
  })
})
