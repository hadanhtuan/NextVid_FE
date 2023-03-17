import React from "react";
import { GrClose } from "react-icons/gr";
import { GrFormClose } from "react-icons/gr";
import { BsFacebook, BsGithub, BsInstagram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { AiFillInstagram, AiOutlineInstagram, AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import socialNetworksAuth from "../utils/socialNetworksAuth";
import useAuthStore from "../store/authStore";

export default function Modal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
}) {
  const login = () => {}; 

  const {setUser} = useAuthStore()
  return (
    <>
      {showModal ? (
        <>
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex justify-end ">
                  <button
                    onClick={() => setShowModal(false)}
                    className="mr-3 mt-3 p-1 rounded-full bg-gray-100 font-bold"
                  >
                    <GrFormClose className="text-[32px] font-bold" />
                  </button>
                </div>
                <div className="flex items-start justify-center p-4 rounded-t">
                  <h3 className="text-3xl font-semibold text-center">
                    Log in to NextVid
                  </h3>
                </div>
                {/*body*/}
                <div className="px-9 py-4 font-semibold">
                  <Link href={"/auth/signin"}>
                    <div
                      className="relative cursor-pointer mb-4 border-[1px] border-gray-200 flex justify-center items-center h-[44px] w-[400px]"
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      <AiOutlineUser className="absolute font-semibold left-[5%] text-xl" />
                      Use email/username
                    </div>
                  </Link>
                  <div
                    className="relative cursor-pointer mb-4 border-[1px] border-gray-200 flex justify-center items-center h-[44px] w-[400px]"
                    onClick={() => {
                      socialNetworksAuth('google',setUser)
                    }}
                  >
                    <FcGoogle className="absolute font-semibold left-[5%] text-xl" />
                    Continue with Google
                  </div>

                  <div
                    className="relative cursor-pointer mb-4 border-[1px] border-gray-200 flex justify-center items-center h-[44px] w-[400px]"
                    onClick={() => {
                      socialNetworksAuth('facebook',setUser)
                    }}
                  >
                    <BsFacebook className="absolute font-semibold left-[5%] text-xl text-blue-600" />
                    Continue with Facebook
                  </div>

                    <div
                      className="relative cursor-pointer mb-4 border-[1px] border-gray-200 flex justify-center items-center h-[44px] w-[400px]"
                      onClick={() => {
                        socialNetworksAuth('github',setUser) 
                      }}
                    >
                      <BsGithub className="absolute font-semibold left-[5%] text-xl " />
                      Continue with Github
                    </div>

                  {/* <Link href={"/auth/signin"}>
                    <div
                      className="relative cursor-pointer mb-4 border-[1px] border-gray-200 flex justify-center items-center h-[44px] w-[400px]"
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      <BsTwitter className="absolute font-semibold left-[5%] text-xl text-blue-400" />
                      Continue with Twitter
                    </div>
                  </Link> */}
                </div>

                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <p>
                    Don’t have an account?{" "}
                    <Link href="/auth/signup">

                    <span className="text-primary" >
                      Sign Up
                    </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
