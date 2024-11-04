'use client'
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
import { threadValidations } from "@/lib/validations/threadValidation";
import { createThread } from "@/lib/actions/thread.actions";


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


const PostThread =  ({userId}:{userId: string}) => {

    const router = useRouter();
    const pathname = usePathname();
  
      const form = useForm({
        resolver: zodResolver(threadValidations),
        defaultValues: {
          thread: '',
          accountId: userId
        }
      });

      const onSubmit = async(values: z.infer<typeof threadValidations>) => {

        await createThread({
          text: values.thread,
          author: values.accountId,
          community: null,
          path: pathname
        })

        router.push('/')
      }
  return (
    <>
     <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-4 mt-10"
        >
        
        <FormField
                control={form.control}
                name="thread"
                render={({ field }) => (
                    <FormItem className='flex flex-col gap-2 w-full'>
                    <FormLabel className='text-base-semibold text-light-2'>
                        Content
                    </FormLabel>
                    <FormControl className='flex-1 text-base-semibold text-gray-200'>
                        <Textarea
                        rows = {10}
                        placeholder="What's on Your Mind" 
                        className='account-form_input p-2 '
                        {...field} />
                    </FormControl>
                    
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type = 'submit' className = 'bg-primary-500 py-2 rounded-lg'>Post Thread</Button>
        </form>
    </Form>

</>
  )
}

export default PostThread