// SignInForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters'),
});

const SignInForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  if (session?.user) {
    router.push('/dashboard');
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
        window.location.href = '/dashboard';
      }
    } else {
      setErrorMessage('Invalid credentials. Please try again.'); // Set error message

    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-center items-center h-full space-y-4'>
        <Image src="/logo best price.jpg" alt="Login" width={100} height={50} />
        <h1 className="text-xl font-bold text-gray-800">Welcome to Best Price CSM!</h1>
        <FormField control={form.control} name='email' render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder='Email' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name='password' render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type='password' placeholder='Password' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <a href="#" className='flex justify-end text-sm text-blue-500'>Forgot password?</a>
        <Button type='submit'>Login</Button>
        {errorMessage && ( // Conditionally render the error message
          <div className='flex justify-center items-center'>
            <p className='text-red-500'>{errorMessage}</p>
          </div>
        )}
      </form>
    </Form>
  );
};

export default SignInForm;