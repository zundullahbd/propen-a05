import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Dashboard from "@/components/ui/dashboard";
import AnimatedText from "@/components/ui/AnimatedText";
import WavyAnimation from "@/components/ui/WavyAnimation";

const page = async () => {
  const session = await getServerSession(authOptions);
  const languages = ["Under Development, Stay Tuned", "Dalam Pengembangan, Mohon Tunggu"];

  if (session?.user.role === "Executive") {
    return (
      <div className="py-10 px-10">
        <div className="flex justify-center font-bold mb-5 color: #000000">
          <Dashboard />
        </div>
      </div>
    );
  } else {
    return (
        <div className="flex justify-center">
          <AnimatedText languages={languages} />
        </div>
    );
  }
};

export default page;