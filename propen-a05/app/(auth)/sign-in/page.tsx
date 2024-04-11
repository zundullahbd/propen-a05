import SignInForm from "@/app/components/form/SignInForm";
import { ClientSideSessionProvider } from "@/app/components/ui/ClientSideSessionProvider";

const page = () => {
  return (
    <div className='flex h-screen'>
      <div className='w-1/2 bg-center bg-no-repeat bg-cover' style={{ backgroundImage: `url(/landing.svg)` }} />
      <div className='w-1/2 h-screen bg-transparent'>
        <ClientSideSessionProvider>
          <SignInForm />
        </ClientSideSessionProvider>
      </div>
    </div>
  );
};

export default page;