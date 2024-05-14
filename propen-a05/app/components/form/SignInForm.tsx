// SignInForm.tsx
'use client'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'sonner';
import Image from 'next/image';


const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters'),
});

const SignInForm = () => {
  const errorMessage = useSession();
  const { data: session } = useSession();
  if (session?.user) {
    window.location.href = '/home';
  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log('values', values);
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    console.log('signInData', signInData);
    if (!signInData?.error) {
      if (signInData?.ok){
        window.location.href = '/home';
      }
    } else {
      toast.success('Welcome Back!', {
				description: 'You have successfully signed in.',
			});
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-center items-center h-full space-y-4'>
      <Image
					alt='logo'
					src='/logo best price.png'
					width={80}
					height={80}
					className='absolute top-0 right-0 m-4'
				/>
        {/* <Image src="/logo best price.jpg" alt="Login" width={100} height={50} /> */}
        <h1 className="text-xl font-bold text-gray-800">Welcome to BestCare!</h1>
		    <h4 className="text-sm text-gray-700">Sign in to access our features</h4>
        <FormField control={form.control} name='email' render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder='johndoe@mail.com' {...field} style={{ width: '385px' }}/>
            </FormControl>
            <FormMessage className="text-gray-400 p-1"/>
          </FormItem>
        )} />
        <FormField control={form.control} name='password' render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type='password' placeholder='password' {...field} style={{ width: '385px' }}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
          <Button type='submit' className="w-full bg-indigo-700 hover:bg-indigo-800 btn btn-primary">Sign in</Button>
      </form>
    </Form>
  );
};

export default SignInForm;