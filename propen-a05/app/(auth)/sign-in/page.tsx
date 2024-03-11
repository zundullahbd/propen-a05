import SignInForm from "@/app/components/form/SignInForm";

const page = () => {
  return (
    <div className='flex h-screen'>
      <div className='w-1/2 bg-center bg-no-repeat bg-cover' style={{ backgroundImage: `url(/landing.svg)` }} />
      <div className='w-1/2 h-screen bg-transparent'>
        <SignInForm />
      </div>
    </div>
  );
};

export default page;