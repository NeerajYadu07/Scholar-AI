'use client'
import { ReactNode, useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../atoms/button'
import { X } from 'lucide-react'

export interface IImageUploadProps {
  src?: Blob | MediaSource | string
  clearImage: () => void
  children: ReactNode
}

export const ImagePreview = ({
  src,
  clearImage,
  children,
}: IImageUploadProps) => {
  const [imageUrl, setImageUrl] = useState('')
  console.log(src)

  useEffect(() => {
    // Check if `src` is a FileList and has at least one file
    if (src instanceof FileList) {
      const file = src[0] // Get the first file from the FileList
      const objectUrl = URL.createObjectURL(file)
      setImageUrl(objectUrl)

      // Cleanup
      return () => {
        URL.revokeObjectURL(objectUrl)
      }
    }
    else{
      setImageUrl(src as string)
    }
  }, [src])

  if (src && imageUrl) {
    return (
      <div className="grid relative w-full items-center justify-center h-full grid-cols-1 grid-rows-1 aspect-square">
        <Image
          src={imageUrl || '/user.jpg'}
          alt=""
          width={500}
          height={500}
          className="object-cover w-full h-full col-start-1 row-start-1 rounded shadow"
        />
        <Button
          variant={'destructive'}
          className="absolute right-0 top-0 col-start-1 row-start-1 p-2 text-white bg-black/30 justify-self-center"
          onClick={()=>{
            setImageUrl('')
            clearImage()
          }}
        >
          <X />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center w-full h-full  min-h-[12rem] bg-gray-100 shadow-inner">
      {children}
    </div>
  )
}
