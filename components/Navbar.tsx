import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import {
  AiOutlineSetting,
} from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { Router, useRouter } from "next/router";
import useAuthStore from "../store/authStore";
import { BiSearch } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import decode from "jwt-decode";

import Modal from "./ModalAuth";
import axios from "axios";
import { SiNextdotjs } from "react-icons/si";
import { MdCancel, MdOutlineAccountCircle } from "react-icons/md";
import { FiMail, FiSend } from "react-icons/fi";
import Profile from "../pages/profile/[id]";
import { GiExitDoor } from "react-icons/gi";

const Navbar: NextPage = () => {
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showModal, setShowModal] = React.useState(openModal);
  const [showMenuDropdown, setMenuDropdown] = useState<boolean>(false)
  const router = useRouter();
  const { userProfile, setUser, removeUser } = useAuthStore();

  const handleSearch = () => {
    if (search) {
      router.push({
        pathname: `/search/${search}`,
      });
    }
  };
  useEffect(() => {
    if (userProfile) {
      const decodedToken: any = decode(userProfile.accessToken);
      if (decodedToken.exp * 1000 < new Date().getTime()) removeUser();
    }
  }, [userProfile]);

  return (
    <div className="border-b-2 flex items-center justify-between py-2 px-4">
      <Link href={"/"}>
        <div className=" cursor-pointer flex items-center">
          {/* <Image src={imgLogo} /> */}
          <SiNextdotjs className="flex items-baseline text-3xl" />
          <span className="flex items-center pl-1 text-2xl font-bold font-serif">
            NextVid
          </span>
        </div>
      </Link>
      <div className="relative flex items-center justify-between w-[310px] rounded-[30px] bg-search ">
        <input
          placeholder="Search accounts and videos"
          type="text"
          value={search}
          onKeyPress={(e) => {
            if (e.key == "Enter") handleSearch();
          }}
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm bg-transparent text-inherit px-[20px] outline-none rounded-l-[30px] border-r-2 border-gray-400 flex-1 h-full"
        />
        {search?.length > 0 && (
          <MdCancel
            className="absolute right-[17%] cursor-pointer text-gray-400"
            onClick={() => {
              setSearch("");
            }}
          />
        )}
        <BiSearch
          className="px-[10px] text-[42px] text-gray-400 cursor-pointer"
          onClick={handleSearch}
        />
      </div>
      <div className="flex gap-5 items-center ">
        {userProfile ? (
          <>
            <Link href="/upload">
              <button className="flex gap-2 w-[100px] items-center border-2 border-gray-200 rounded-[3px] p-[4px] pb-[5px] pl-[8px]">
                <IoMdAdd /> {` `}
                <span>Upload</span>
              </button>
            </Link>
            <FiSend className="text-2xl" />
            <FiMail className="text-2xl" />
            <div className="flex items-center relative" onMouseEnter={()=>{setMenuDropdown(true)}} onMouseLeave={()=>{setMenuDropdown(false)}}>
              <Image
                src={userProfile.avatar}
                width={32}
                height={32}
                className="rounded-full cursor-pointer"
              />
              <div className={`${showMenuDropdown ? 'block' : 'hidden'} shadow-lg  bg-white rounded-[8px] w-[200px] absolute top-[100%] z-30 right-[0%]`}>
              <Link href={`/profile/${userProfile.id}`}>
                <div className="cursor-pointer hover:bg-gray-100 rounded-sm p-2 pl-3 gap-3 text-[18px] flex items-center">
                  <MdOutlineAccountCircle /> Profile
                </div>
                </Link>
                <div className="cursor-pointer hover:bg-gray-100 rounded-sm p-2 pl-3 gap-3 text-[18px] flex items-center">
                  <AiOutlineSetting /> Setting
                </div>
                <div className="cursor-pointer hover:bg-gray-100 rounded-sm p-2 pl-3 gap-3 flex text-[18px] items-center" onClick={removeUser}>
                  <GiExitDoor />
                  Logout
                </div>
              </div>
            </div>
          </>
        ) : (
          // <GoogleLogin
          //   onSuccess={(response) => createOrGetUser(response, addUs er)}
          //   onError={() => console.log("Login Failed")}
          // />
          <>
            <button
              className="flex gap-2 w-[100px] h-[36px] items-center border-2 border-gray-200 rounded-[3px] p-[6px] pr-[7px]"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <IoMdAdd /> {` `}
              <span>Upload</span>
            </button>
            <button
              className="w-[100px] h-[36px] bg-primary rounded-[3px] text-white font-semibold align-middle"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Log in
            </button>
            <Modal showModal={showModal} setShowModal={setShowModal} />
          </>
        )}
        {!userProfile && (
          <BsThreeDotsVertical className="text-xl cursor-pointer" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
