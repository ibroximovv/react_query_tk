import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import type { UploadProps } from 'antd'

interface UploadsProps {
  onImageSelect: (file: File | null) => void
}

const Uploads: React.FC<UploadsProps> = ({ onImageSelect }) => {
  const [fileList, setFileList] = useState<any[]>([])

  const uploadProps: UploadProps = {
    fileList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('Faqat rasm fayllarini yuklash mumkin!')
        return false
      }

      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        message.error("Rasm hajmi 5MB dan kichik bo'lishi kerak!")
        return false
      }

      setFileList([file])
      onImageSelect(file)
      return false
    },
    onRemove: () => {
      setFileList([])
      onImageSelect(null)
    },
    accept: "image/*",
    maxCount: 1
  }

  return (
    <div>
      <p className="pb-3">* Rasm tanlang:</p>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>
          Rasm tanlash
        </Button>
      </Upload>
    </div>
  )
}

export default Uploads