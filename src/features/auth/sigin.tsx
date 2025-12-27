
import { Image } from "@/components/image";
import SignInForm from "./form/signin_form";

const Signin = () => {

    return (
        <div className="w-screen h-screen my-auto flex justify-center items-center overflow-hidden">
            <div className="hidden md:block md:flex-1 h-full relative">
                <Image
                    src="/images/bg.png"
                    alt="Background"
                    fill
                    className="object-cover"
                />
                <p className="font-bold absolute bottom-6 left-6 text-white z-10">
                    www.chms.com
                </p>
            </div>
            <div className="h-full pt-10 w-full md:w-[450px] md:flex-none">
                <div className="flex flex-col items-center h-full space-y-4 pt-20 pb-4">
                    <Image src={"/images/logo.png"} alt="Logo" className="w-[200px] h-[100px]" priority />
                    {/* <p className="text-center text-[12px] text-gray-400">Church Management System</p> */}
                    <div className="mt-5 h-fit w-full space-y-2 mx-3">
                        <p className="text-center text-[24px] font-bold">Welcome Back</p>
                        <p className="text-center text-xs text-gray-400 pb-4">Login to access your dashboard</p>
                        <SignInForm />
                    </div>
                </div>
            </div>
            {/* <p className="font-bold absolute bottom-2.5 left-2.5 text-[14px] text-white">www.chms.com</p> */}
        </div >
    )
}

export default Signin;