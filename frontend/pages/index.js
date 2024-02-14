import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { use } from "passport";
export default function IndexPage() {
  function handleSignIn() {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/login`;
  }

  function handleSignOut() {
    localStorage.removeItem("details");
    window.location.href = process.env.NEXT_PUBLIC_FRONTEND_URL;
  }

  function handleRole(role){
    window.location.href = process.env.NEXT_PUBLIC_FRONTEND_URL;
  }

  const [details, setDetails] = useState(null);
  useEffect(() => {
    console.log("details", localStorage.getItem("details"));
    setDetails(JSON.parse(localStorage.getItem("details")));
  }, []);

  if (details) {
    return (
      <div className="">
        {console.log("details name: ", details.displayName)}
        <h1 className="font-bold text-center m-2.5 w-full"> Hi {details.displayName}</h1>
        <button className="m-2.5 border-2 border-black p-1" onClick={() => handleRole(details.role)}>Go to {`${details.role} page`}</button>
        <button className="m-2.5 border-2 border-black p-1" onClick={handleSignOut}>sign out</button>
      </div>
    );
  }
  return (
    <div>
      <div className="m-2.5 font-bold w-full text-center">Welcome to Category Manager</div>
      <div className="border-2 border-black mx-auto p-1 w-48 cursor-pointer text-center rounded-md " onClick={() => handleSignIn()}>
        <FcGoogle className="inline-block" />
        <span className="inline-block mx-2.5">Sign in with Google</span>
      </div>
    </div>
  );
}
