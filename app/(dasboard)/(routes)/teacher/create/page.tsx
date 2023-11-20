'use client'

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { 
    Form, 
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import toast from 'react-hot-toast';


const formSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required',
    }),
})

const CreateCoursePage = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
        },
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmitHandler = async (values: z.infer<typeof formSchema>) => {

        try {
            const response = await axios.post("/api/courses", values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success('Course created!')
        } catch {
            toast.error('Something Went Wrong!')
        }
    }

  return (
    <div className='max-w-5xl mx-auto flex md:justify-center md:items-center h-full p-6'>
        <div>
            <h1 className='text-2xl'>Name your course</h1>
            <p className='text-sm text-slate-600'>What would you like to name your course? Don&apos;t worry, you can change it after</p>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitHandler)} className='space-y-8 mt-8'>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Course Title
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder='e.g. "The Advance Web Development Course"'
                                        {...field}
                                    />
                                </FormControl>

                                <FormDescription>
                                    What will you teach in this course?
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center gap-x-2">
                        <Link href='/'>
                            <Button
                                variant='ghost'
                                type='button'
                            >
                                Cancel
                            </Button>
                        </Link>

                        <Button
                            type='submit'
                            disabled={!isValid || isSubmitting}
                        >
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default CreateCoursePage