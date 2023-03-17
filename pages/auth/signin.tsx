import React, {useState, useEffect} from "react";
import Image from "next/image";
import axios from "axios";
import useAuthStore from "../../store/authStore"; 
import { IUser } from "../../utils/types";
import Router from "next/router";
   
const Signin = () => {
  const [formData, setFormData] = useState<any>({})
  const [checkAuth, setCheckAuth] = useState<boolean>(false)
  const {  setUser } = useAuthStore();

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
    try {
      const res = await axios.post(`${BE_URL}/auth/signin`, formData,
      { 
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",  
        },
      })
      console.log(res)    
      const user: IUser = {id: res.data.id, username: res.data.username, full_name: res.data.full_name, avatar: res.data.avatar, accessToken: res.data.accessToken, follows: res.data.follows, blogs: res.data.blogs}
      setUser(user)
      Router.push('/')
    } catch (error) {    
      setCheckAuth(true)  
    } 
  }
 
  return (     
    <div className=" flex w-full flex-wrap absolute left-0 top-0 justify-center  bg-cover bg-center bg-auth-img2">
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-white">
            {/* <Image src="" className="mb-3" /> */}
            <h1 className="mb-3 font-bold text-5xl">The secret of getting ahead is getting started</h1>
            <p className="pr-3">
            Sharing is caring. Login to share your thoughts and experiences with the world
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p className="text-gray-500">Please sign in to your account.</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Email
                </label>
                <input
                  className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type=""
                  placeholder="mail@gmail.com"
                  name="email"
                  value={formData.email}
                  onChange={(e)=>{setFormData({...formData, [e.target.name]: e.target.value})}}
                />
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Password
                </label>
                <input
                  className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={(e)=>{setFormData({...formData, [e.target.name]: e.target.value})}}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-800">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-green-400 hover:text-green-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                {checkAuth && <p className="text-red-700 text-center mb-2">Wrong email or password</p>}
                <button
                  type="submit"
                  className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
              </div>
            </div>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <p>
                <p>

                mail: javascriptmastery@tiktok.gmail.com
                </p>
              <p>

                pass: javascriptmastery
              </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
