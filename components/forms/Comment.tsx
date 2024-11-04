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
import { z } from "zod"
import Image from 'next/image'

import {useRouter, usePathname} from 'next/navigation'

import { commentValidations } from "@/lib/validations/threadValidation";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface IProps {
    currentUser: string;
    threadId: string;
    userImage: string;
}
const Comment = ({currentUser,threadId,userImage}:IProps) => {
    
    const router = useRouter();
    const pathname = usePathname();
  
      const form = useForm({
        resolver: zodResolver(commentValidations),
        defaultValues: {
          comment: '',
        }
      });

      const onSubmit = async(values: z.infer<typeof commentValidations>) => {

        await addCommentToThread({
          content: values.comment,
          userId: currentUser,
          threadId,
          path: pathname
        })

        form.reset();
      }
  return (
    <>
     <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
        className="comment-form"
        >
        
        <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                    <FormItem className='flex items-center gap-3 w-full h-12'>
                    <FormLabel className='h-12 w-12 relative'>
                        <Image 
                        src={userImage}
                        
                        className = 'rounded-full object-cover'
                        alt = 'Profile Image'
                        fill
                        />
                    </FormLabel>
                    <FormControl className='flex-1 text-base-semibold text-gray-200 p-4 h-10'>
                        <Input
                        
                        placeholder="Type a Comment..." 
                        className='account-form_input  bg-transparent h-8 '
                        {...field} />
                    </FormControl>
                    
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type = 'submit' className = 'bg-primary-500 py-2 rounded-lg'>Reply</Button>
        </form>
    </Form>

</>
  )
}

export default Comment