import { Button, Input, message } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Header from "../modules/Header"
import Uploads from "../components/Uploads"
import axios from "axios"

const Create = () => {
 const [name, setName] = useState("")
 const [image, setImage] = useState<File | null>(null)
 const navigate = useNavigate()
 const queryClient = useQueryClient()

 const uploadFileMutation = useMutation({
   mutationFn: async (file: File) => {
     const formData = new FormData()
     formData.append('file', file)
     
     const response = await axios.post('http://54.210.160.235/file', formData, {
       headers: {
         'Content-Type': 'multipart/form-data'
       }
     })
     return response.data
   }
 })

 const createStackMutation = useMutation({
   mutationFn: async (data: { name: string; image: string }) => {
     const response = await axios.post('http://54.210.160.235/stacks', data)
     return response.data
   },
   onSuccess: () => {
     message.success("Muvaffaqiyatli yaratildi!")
     queryClient.invalidateQueries({ queryKey: ['stacks'] })
     setName("")
     setImage(null)
     
     setTimeout(() => {
       navigate('/')
     }, 1000)
   },
   onError: (error) => {
     console.error('Error:', error)
     message.error("Xatolik yuz berdi!")
   }
 })

 const handleSubmit = async () => {
   if (!name.trim()) {
     message.error("Yo'nalish nomini kiriting!")
     return
   }
   
   if (!image) {
     message.error("Rasm tanlang!")
     return
   }

   try {
     const uploadResult = await uploadFileMutation.mutateAsync(image)
     
     await createStackMutation.mutateAsync({
       name: name.trim(),
       image: uploadResult.filename || uploadResult.name || uploadResult.url
     })
     
   } catch (error) {
     console.error('Upload error:', error)
     message.error("Fayl yuklashda xatolik!")
   }
 }

 const isLoading = uploadFileMutation.isPending || createStackMutation.isPending

 return (
   <>
     <Header />
     <div className="p-15 flex justify-between items-center">
       <div className="w-[45%]">
         <p className="pb-3">* Yo'nalish nomini kiriting:</p>
         <Input 
           autoComplete="off" 
           name="name" 
           placeholder="CourseName"
           value={name}
           onChange={(e) => setName(e.target.value)}
         />
       </div>
       <div className="w-[45%]">
         <Uploads onImageSelect={setImage} />
         <div className="mt-4">
           <Button 
             className="w-[45%] !bg-[#0e4c1aac] !text-white"
             loading={isLoading}
             onClick={handleSubmit}
           >
             Save
           </Button>
         </div>
       </div>
     </div>
   </>
 )
}

export default Create