import React, { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { FiUsers } from "react-icons/fi";
import Discover from './Discorver'
import Footer from '../components/Footer';
import SuggestedAccounts from './SuggestedAccounts'
import { HiOutlineHome } from "react-icons/hi";

const Sidebar: NextPage = () => {

  const { pathname } = useRouter();

  
  const activeLink =
    "flex items-center gap-3 transition ease-in-out delay-90 hover:bg-gray-100 p-3 justify-center xl:justify-start cursor-pointer font-semibold text-primary rounded";
  const normalLink =
    "flex items-center gap-3 transition ease-in-out delay-90 hover:bg-gray-100 p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded";
  return (
    <div>
     
          <div className="flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 ">
            <div className="xl:border-b-2 border-gray-200 xl:pb-4">
              <Link href="/">
                <div className={pathname == "/" ? activeLink : normalLink}>
                  <p className="text-2xl">
                  {pathname == "/" ? <AiFillHome /> : <HiOutlineHome />} 
                  </p>
                  <span className="capitalize text-xl hidden xl:block">
                    For You
                  </span>

                </div>
              </Link>
              <Link href="/">
                <div className={pathname == "/follow" ? activeLink : normalLink}>
                  <p className="text-2xl">
                    <FiUsers />
                  </p>
                  <span className="capitalize text-xl hidden xl:block">
                    Following 
                  </span>
                </div>
              </Link>
            </div>
            <Discover />
            <SuggestedAccounts />
            <Footer />

          </div>
    </div>
  );
};

export default Sidebar;
