import { readFile } from 'fs/promises'
import path from 'path'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const filename = query.file as string
  const step = query.step as string

  if (!filename || !step) {
    throw createError({ statusCode: 400, statusMessage: 'Missing step or file parameter' })
  }

  const filePath = path.resolve('server/api/uploads/file', step, filename)

  try {
    const file = await readFile(filePath)

    const ext = path.extname(filename)
    const nameWithoutExt = path.basename(filename, ext)

    // ✅ Escape dot ใน step (เช่น "4.2") และตัด timestamp
    const prefixRegex = new RegExp(`^${step.replace(/\./g, '\\.')}_`)
    const nameWithoutStep = nameWithoutExt.replace(prefixRegex, '')
    const nameWithoutTimestamp = nameWithoutStep.replace(/_\d{8}_\d{6}$/, '')

    const downloadName = `${nameWithoutTimestamp}${ext}`

    const mimeMap: Record<string, string> = {
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xls': 'application/vnd.ms-excel',
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }

    setHeader(event, 'Content-Type', mimeMap[ext] || 'application/octet-stream')
    setHeader(event, 'Content-Disposition', `attachment; filename="${downloadName}"`)
    return file
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'File not found' })
  }
})
