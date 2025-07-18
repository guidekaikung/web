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

      const allowedExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx']
      const ext = path.extname(file.originalFilename || '').toLowerCase()
      if (!allowedExtensions.includes(ext)) {
        return resolve({ success: false, error: 'ไม่อนุญาตให้ส่งไฟล์ประเภทนี้' })
      }

      const namePart = path.parse(file.originalFilename || '').name

      const now = new Date()
      const pad = (n: number) => n.toString().padStart(2, '0')
      const mmddyyyy = `${pad(now.getMonth() + 1)}${pad(now.getDate())}${now.getFullYear()}`
      const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
      const timestamp = `${mmddyyyy}_${time}`

      // ✅ รวมชื่อใหม่: 4.2_ใบเสร็จเงิน_07162025_150512.pdf
      const newFilename = `${step}_${mmddyyyy}${ext}`

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
