import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl"> Go to register</h1>
      <Link className="bg-green-500 text-white p-2 font-bold my-2 transition-colors" href={"/register"}>Click here!</Link>
    </div>
  );
}
