import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <p className="py-2 font-bold font-mono">Sign In here</p>
      <SignIn />
    </div>
  );
}
