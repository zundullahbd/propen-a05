// SignInForm.tsx
'use client'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
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
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-red-600 ring-opacity-100`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="close.png"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-slate-600">
                  Error!
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Invalid Email or Password!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l">
          <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        Close
      </button>
          </div>
        </div>
      ))

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
              <Input placeholder='johndoe@mail.com' {...field} />
            </FormControl>
            <FormMessage className="text-gray-400 p-1"/>
          </FormItem>
        )} />
        <FormField control={form.control} name='password' render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type='password' placeholder='password' {...field} />
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