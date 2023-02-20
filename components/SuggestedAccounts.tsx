import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { NextPage } from "next";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import Image from "next/image";
import { IUser } from "../utils/types";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const SuggestedAccounts: NextPage = () => {
  const [users, setUsers] = useState<IUser[]>();

  const fetchAcc = async()=> {
    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await axios.get(`${BE_URL}/user/suggest`)
    setUsers(res.data)
  }

  useEffect(() => {
    fetchAcc();
  }, []);


  return (
    <div className="xl:border-b-2 border-gray-200 xl:pb-4">
      <p className="text-violet-500 font-semibold text-sm mt-[10px] ml-[5px] mb-[10px]">Suggested Accounts</p>

      <div className="mt-4">
        {users?.map((user: IUser) => (
          <Link href={`/profile/${user.id}`} key={user.id}>
            <div className="mb-2 flex items-center gap-4 cursor-pointer">
            <Image
              className="rounded-full"
              src={user.avatar}
              width={38}
              height={38}
            />
            <div>
              <p className="flex items-center gap-1 text-[15px] font-bold p-0 m-0">
                {user.username}
                <GoVerified className="text-blue-400"/>
              </p>
              <p className="text-[15px] text-gray-400 p-0 m-0">{user.full_name}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
