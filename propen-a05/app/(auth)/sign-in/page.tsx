import SignInForm from "@/app/components/form/SignInForm";
import { ClientSideSessionProvider } from "@/app/components/ui/ClientSideSessionProvider";

const page = () => {
  return (
	    <ClientSideSessionProvider>
          <SignInForm />
        </ClientSideSessionProvider>
  );
};

export default page;