import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { useRouter } from "next/router";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { IUser } from "../utils/types";

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);
  const { pathname } = useRouter();
  const { userProfile, setUser, removeUser } = useAuthStore();

  
  
  useEffect(() => {
    const fetchUser = async () => {
      const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await axios.get(`${BE_URL}/user/${userProfile?.id}`);
      console.log(res.data);
      setUser({...userProfile, ...res.data});
    };
    if (userProfile) fetchUser(); // thay vì gọi hàm này thì có thể viết 1 api mới lấy thông tin của người dùng rồi setUser()
    setIsSSR(false);
  }, []);

  if (isSSR) return null;
  let styleApp; 
  let styleSidebar;
  let styleComp;
  if (pathname == "/" || pathname.includes('search')) {
    styleApp = "m-auto xl:w-[1140px] m-auto overflow-hidden h-[100vh]";
    styleSidebar = "w-[32%] h-[92vh] overflow-hidden xl:hover:overflow-auto";
    styleComp="mt-4 h-[88vh] flex-1"
  } else {
    styleApp = "m-auto overflow-hidden h-[100vh]";
    styleSidebar = "w-[20%] h-[92vh] overflow-hidden xl:hover:overflow-auto";
    styleComp="mt-4 overflow-y-scroll h-[88vh] flex-1"

  }
  return (
      <div className={styleApp}>
        <Navbar />
        <div className="flex gap-6 md:gap-20 ">
          {" "}
          {/* gap-6 = 24px*/}
          <div className={styleSidebar}>
            <Sidebar />
          </div>
          <div className={styleComp}>
            <Component {...pageProps} />
          </div>
        </div>
      </div>
  );
}

export default MyApp;
