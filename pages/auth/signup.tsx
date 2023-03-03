import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import axios from "axios";
import Router from "next/router";
import uploadImg from "../../utils/UploadImgToCloud";
import Link from "next/link";

export interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const [step, setStep] = useState(1);
  const [imgData, setImgData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({})
  const [checkPass, setCheckPass] = useState<boolean>(true)
  const onChange = (e: any) => {
    // Assuming only image
    var files = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(files);

    reader.onloadend = function () {
      setImgData([reader.result]);
    };

    console.log(imgData); // Would see a path?
    // TODO: concat files
  };
  const checkPassword = (e: any) => {
    if(e.target.value != formData.password) setCheckPass(false) 
    else setCheckPass(true)
  }
  const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  console.log(BE_URL)

  const onSubmit = async () => {
    const full_name = formData.firstname + ' ' + formData.lastname
    const {email, username, password} = formData
    const avatar = await uploadImg(imgData)
    
    const acc = {full_name, email, username, password, avatar}
    const res = await axios.post(`${BE_URL}/auth/signup`, acc,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",  
      },
    });
    if(res.status === 201) Router.push('/auth/signin')
  }

  return (
    <div className=" flex w-full flex-wrap absolute left-0 top-0 justify-center bg-no-repeat bg-cover bg-center bg-auth-img">
      <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-white">
            {/* <Image src="" className="mb-3" /> */}
            <h1 className="mb-3 font-bold text-5xl">Hi ? Welcome Back Aji </h1>
            <p className="pr-3">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
        <div className="flex justify-center   z-10">
          <div className="p-12 bg-white mx-auto w-[550px] ">
            {step == 1 ? (
              <>
                <div className="mb-4">
                  <h3 className="font-semibold text-2xl text-gray-800">
                    Sign In{" "}
                  </h3>
                  <p className="text-gray-500">
                    Please sign in to your account.
                  </p>
                </div>
                <div className="space-y-5">
                  <div className="flex justify-between gap-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 tracking-wide">
                        First name
                      </label>
                      <input
                        className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                        type=""
                        placeholder="Jon"
                        name="firstname"
                        value={formData?.firstname}
                        onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 tracking-wide">
                        Last name
                      </label>
                      <input
                        className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                        type=""
                        placeholder="Snow"
                        name="lastname"
                        value={formData?.lastname}
                        onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 tracking-wide">
                      Email
                    </label>
                    <input
                      className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                      type=""
                      placeholder="mail@gmail.com"
                      name="email"
                      value={formData?.email}
                      onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 tracking-wide">
                      Username
                    </label>
                    <input
                      className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                      type="email"
                      placeholder="Jonsnow1704"
                      name="username"
                      value={formData?.username}
                      onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})}
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
                      value={formData?.password}
                      onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                      Confirm Password {!checkPass && <span className="text-red-700">Not valid</span>}
                    </label>
                    <input
                      className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                      type="password" 
                      placeholder="Enter your password"  
                      onChange={checkPassword}
                    />
                  </div>
                  <div
                    className="flex justify-center"
                    onClick={() => {
                      setStep(2);
                    }}
                  >
                    <MdNavigateNext className="text-5xl text-white bg-primary pl-[2px] hover:bg-opacity-70 rounded-full shadow-lg cursor-pointer" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="flex justify-center text-6xl mb-16 font-serif">
                    Chose avatar
                  </h2>
                  <form>
                    <input type="file" name="user[image]" onChange={onChange} />
                  </form>
                  {/* Only show first image, for now. */}
                  <div className="flex justify-center">
                    {imgData ? (
                      <Image src={imgData} className=" mt-5 rounded-xl h-[225px]" />
                    ) : (
                      <Image
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEX///8mJiYAAAAaGhrS0tJ5eXkhISEfHx8dHR0YGBgMDAwUFBQ+Pj4WFhb8/PwPDw/39/fx8fHq6uqsrKyUlJTLy8vf39/BwcHb29tERERmZmYrKyucnJw4ODhUVFQwMDBJSUlvb2+EhIS8vLxdXV2oqKiKiop/f39ra2uqqqpPT09ZWVlGAuoHAAAJJElEQVR4nO2d6ZaiOhCAm0QCBmQTVBDclx7n/d/v6vQ1CWq3QBZCn3znzK9pIUWSqkpRVXx8GAwGg8FgMBgMBoPBYDAYDAaDwWAwGH4XQZxNS/uw8St/c7DLaRYHfQ9JJLOp7QMQetBBNxzohQD49nTW98DEMEsvXgiR9QiC2Nukwxdyvwm9Z+mIlF54mfY9RB7icoy/F+9/ITEso74H2pGgXOI34n2Bl8dBqp3Mfzt/dB79ed/DbU28BU3l+ycj+Iz7HnI7MjRpId+NMcr6HnQbyhcLFI1DDL7A4fjF/4O072E3p3jUMGiMgb87zhdJFEXxYj7dXT2AyaOUuOh74A2Jc68+chhWu+zJImQnH8P6H3r5IDZj4tfHPZlss2+MQWY79YcB/UTtYLsQ1wWEYPfToJMTntRF1H4Wo5qACNjvJiU+A4cVsdLd+K/G7L7ym1iAxSZkfjP+K32MXJzZwYJzM4czSAHzq/AseYxcTJmhItD81JCxDlCL3ylnxgjooEWbXy5dRkR9D4051RlO1W6YSU5FdHJJ4+OmpK4MWradh6SijweXUsbHTcLYiQ4LLWFiAVBPw/9JJcRdzgkjugTgVvjoBDCiaqbjKptSEcFI8OhE8JfsI3joeIktcRfcrpeQCDOFk667KEZI40ksiLYHfzpfZE8ek6vdWTEhxyDEY802ZKl7uqnTkkgIeMJmGZlETzObGOT3HeSsuC50cEQsBQksiKLHe64LzemF2vi18knvixSt+UL0gY/0XKbEGI53nFciz8rR6igcEwXBbcfoCQzrFLKZk2GNua+1vC9ToFMQnNgKaHNf63x34LXaiMShCfkjEPu7NnU/BYxMFHRl8av45L7i0VLAyERBtmHI/zo3II4bEDAyQdDH7guI567IgtDHNV3cJXREnAi2d1UjYMmLgvjLAlTpx8fufg7WyFwQZ3J8EnA14tVgfV7uEwknRsImaC3hr12lVNOIeG900lDTUGshIgioo7WgFl/EG9zV3anRyOJTrw3zSxjQmKmAkYnC+vWe9+8/PYk8AROnTasTMI1iQO5r0bOmPuZQUiQK6BSJohqe228r9YwmiosIf5DXA55eyZj07SFnVD8jUX2NPJobzJuZC9eFiN1BuWYJbqmYt2t0LWi2SK8qkCS0cb0WIxrLCjVySr84kLfcWMhbbv1SFZhMhc6PP7J0zlRgFhjsGlO0Sb4w55tkOWRMxtCx0xX2TMaQPsd7hgLyDXDBZH3pdKygzGgCNMLtM/dih2bujTXNME1pCjSq2mqbmEkwDXWzhYQ1nQW3pYhxDpnHI2l8/MyYaiDHaZUFvR5GFvTHkc1kb+GDZy5TcwG6aWJF2Gw1Aj41dJ7TkEnVD0W8v5JHcGFLZryqyUqd1SpKIN/ZRD4Ru6EsBM5vq4JOtaogt9K+7DmpWBGtiZP+JGOcLmvVa21VcC8ktVm8LlVkf+dFj3ZWWCuzdNcDEPBWn/dQAwyBlY4elU4wKivwUCw70b8274vouUrWA7BIp6MkSeLrv9E+LRzw1GsBF9rvQUKtGO1/nEkIwHXTIRcAPHGe/2BIlc63IDh8FuFHoFYh7gbEReOOCjcQHlrHgSv7qllXjBu44ouy9kRUht574a54XjocFVMnSmH4tntLCNPhLVBKdLzgp94JjHgTfDkOdf4Ii5MPQveFeG4I/JNeLye6EsyOhQdAOHH/74Tl/jONxXGm2asJPpL59PS5yv3Kz1efp2k2CAfUYDAYDH0QRHESR7/KCv4jiGf7cnfIl6TX1zI/nMvp4ld0+AwWU/tiAeyNHVqKbv3r8IkBumyPi0G7pfF+u/bwi86eRFIYhutiP9CzRbxfgZ+kI1K6GOTTwTlxQbbF+EW06TspQ/w5H9KmjP7krSNRLvDLoazWKEVvT/YvJ9KDuyHIGKcNozOvmICT9hvyDwp/kAB98cNfeG6p9X7MNq+jpMj1btY+XPv5JvfX4c3qe+5rSUON+9FGL/vOOh52q6Lcj9j1l4z25aePsPdC3yJQaLod99Zz31kXO6v024hFnJV/0QutC6GOAeLg/DSB1yna7t9pjmRuj58sJwJb7Zy5WfWoQSHYTJuttujq/TwGVb21ZnHG/eM0eMhulU/z+Db4Oo3d01QlcAKP8rW2a3FpPdgZoFETTLsuIOxmt6++Ql3p4EIT0xitalvwquw7dzPb1jJPrIkenZPjvGYk+Ax2VssesqAOySfxQ+PgE2cXpbRmdDRIP4k2rIAQ8mcvj9bsmnCrnhdqXUAx6SLBFmsk4l/2eQtLFzmyKxX2Wh7EJlsiIM6ZnLMujtdjC8WSTZgVsAUpC4sxG1hEp4ZOzGutn8WmLtfy//rqf50wh3WndWfkt1dnszi9ftxwpnwACZ7BG8maLlS0Fn75BpyY3taujGec0Dovy+vBC88YoyWpSmnB7HOBirohUU4fsDRFQMsRr+tUteFnKoAwb7vLH+5CRVS9TplvBECZdfMFrRZTXHNJm3cjR6b3H5MeEorb7jK2XrIKYOs2Fdp9Wn1vTWR3wD/TNtoKi03op0jQUraKiyryNDsW33aAdjNWsXJod2i0VDWJ1ExxtohoBlPpr2oSK7VV89QyIaTgdh+selPU3t8mRlGR73agTWLVlLMmdCduVNxvRkIzyr6Vcia3DFUcFGmfFmWd72fklhN5PjCBWnuF7UdIK0UVVl9Yv6Q2ML2V5DfMON33BForjGMSH0NI/9CfIcZQSL/ZptBPoDiynyvTME5l/CsR1/LuHcf72R5Zku9Uh37YQ3alKW2up7amlSxT6W1BsLLVUofZHXLtBf36G1Kb8BIQDdfpq3XNmd63ofL2qbaiD3uous8z9NnKPdBcevsIDAmAI1/mbWLSJwmpziCgt7Zk3pqcnHroTEmWj9QjDXG7hTRfb8f2Hq6R2m6fbHfuT3O1h5xLpSo5ehf13apIz0GpT3d3NxaSze4riLMh5FMv30HMISps1RQktiDTINKPjTpQNSTCJ7Xz56F5KZM80EaipVppIWEuz+kPLl3qmUSDfCMhB9u2NXcykBqnnb/o4aUcua9nzv2LCCS/LSnvFee9IT8CNhv1iWa1QgaDwWAwGAwGg8FgMBgMBoPBYDAYDC34D1tUfJvKOJzJAAAAAElFTkSuQmCC"
                        className=" mt-5 rounded-xl"
                      />
                    )}
                  </div>

                  <div className="flex items-center mt-8 mb-14">
                    {/* <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-800">
                      <a href="#">Accept term of usage</a>
                    </label> */}
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                      onClick={onSubmit}
                    >
                      Sign up
                    </button>
                  </div>
                  <div
                    className="flex justify-center mt-[10px]"
                    onClick={() => {
                      setStep(1);
                    }}
                  >
                    <MdNavigateBefore className="text-5xl text-white bg-primary pr-[1px] hover:bg-opacity-70 rounded-full shadow-lg cursor-pointer" />
                  </div>
                </div>
              </>
            )}

            <div className="pt-5 text-center text-gray-400 text-xs">
              <span>
                Copyright © 2021-2022
                <Link href="https://codepen.io/uidesignhub">

                <span
                  
                  title="Ajimon"
                  className="text-green hover:text-green-500 "
                  >
                  AJI
                </span>
                  </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
 