"use client"

import React, { ChangeEvent, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { userValidations } from '@/lib/validations/user';
import { z } from "zod"
import Image from 'next/image'
import { Textarea } from '../ui/textarea'
import { isBase64Image } from '@/lib/utils'
import { useUploadThing } from '@/lib/uploadthing'
import {useRouter, usePathname} from 'next/navigation'

import {updateUser} from '@/lib/actions/user.actions'


interface IProps{
    user : {
        id: string,
        objectId: string,
        name: string,
        username: string,
        bio: string,
        image: string
    };
    btnTitle : string;
}
const AccountProfile = ({user,btnTitle}:IProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const {startUpload} = useUploadThing("media");
  const router = useRouter();
  const pathname = usePathname();

    const form = useForm({
      resolver: zodResolver(userValidations),
      defaultValues: {
        profile_photo: user?.image || '',
        name: user?.name || '',
        username: user?.username || '',
        bio: user?.bio || '',
      }
    });
    const handleFileUpload = async(e : ChangeEvent<HTMLElement>,fieldChange : (value : string) => void) => {

      e.preventDefault();

      const fileReader = new FileReader();

      if(e.target.files && e.target.files.length > 0){
        const file = e.target.files[0];

        setFiles(Array.from(e.target.files));
        if(!file.type.includes('image')){
          return;
        }

        fileReader.onload = async(event) => {
          const imageUrl = event.target?.result?.toString()
          fieldChange(imageUrl)
        }

        fileReader.readAsDataURL(file)
      }
    }

    async function onSubmit(values: z.infer<typeof userValidations>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.

      console.log(values)

      const blop = values.profile_photo;

      const hasChanged = isBase64Image(blop)

      if(hasChanged){
        const imgRes = await startUpload(files)

        if(imgRes && imgRes[0].fileUrl){
          values.profile_photo = imgRes[0].fileUrl; 
        }

      }
      const updatedUser = {...values, id: user.id}
     await updateUser(updatedUser,'/')

     if(pathname == '/profile/edit'){
      router.back()
     }
     else{
      router.push('/')
     }
      console.log(values)
    }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
       className="flex flex-col justify-start gap-8"
       >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className='account-form_image-label'>
                {
                  field.value ? (
                    <Image 
                      width={96}
                      height = {96}
                      src={field.value}
                      alt="Profile Photo"
                      priority
                      className='rounded-full object-contain'

                    />
                  ) : (
                    <Image 
                      width={24}
                      height = {24}
                      src='/assets/profile.svg'
                      alt="Profile Photo"
                      className='rounded-full object-contain'

                    />
                  )
                }
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input type = 'file'
                accept='image/*'
                placeholder="Upload a Photo" className='account-form_image-input'
                onChange = {e => handleFileUpload(e,field.onChange)}
                  />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-2 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Name
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input type = 'text'
              
                placeholder="Type Your Name" 
                className='account-form_input p-2 '
                 {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-2 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
               User Name
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input type = 'text'
                placeholder="Type Your User Name" className='account-form_input p-2 '
                 {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

        
<FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-2 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Bio
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Textarea rows={5}
                
                placeholder="Type Your Bio" className='account-form_input p-2 '
                 {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className='bg-primary-500'>Submit</Button>
      </form>
    </Form>
  )
}

export default AccountProfile