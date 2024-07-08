"use client"
import { cn } from '@/util/styles'
import { useRef } from 'react'
import { BaseComponent } from '@/util/types'
import { UseFormReset } from 'react-hook-form'
import { ZodSchema } from 'zod'
import { Title3 } from '../atoms/typography'
import { Input } from '../atoms/input'
import { useToast } from '../molecules/Toaster/use-toast'

interface JsonFileInputProps extends BaseComponent {
  schema: ZodSchema
  reset: UseFormReset<any>
}

export const JsonFileInput = ({
  schema,
  reset,
  className,
  children,
}: JsonFileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string)
          const validatedData = schema.safeParse(jsonData)
          if (validatedData.success) {
            toast({ title: 'Form populated successfully. 🎉' })
            reset(validatedData.data)
          } else {
            reset()
            toast({
              title: 'Data validation failed.',
              description: validatedData.error.message,
            })
            if (fileInputRef.current) {
              fileInputRef.current.value = ''
            }
          }
        } catch (error) {
          toast({ title: 'Error reading JSON file.' })
          reset()
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div
      className={cn(
        'h-60 flex flex-col justify-center items-center border rounded-lg bg-white dark:bg-slate-500 shadow-lg',
        className
      )}
    >
      <Title3 className="mb-2">
        Upload Data <span className="text-xs text-gray-500">(.json)</span>
      </Title3>
      <Input
        type="file"
        ref={fileInputRef}
        accept=".json"
        onChange={handleFileChange}
        className="bg-primary-100 border-2 border-primary max-w-56 shadow-xl"
      />
    </div>
  )
}
