import React, { useState } from "react";
import axios from "axios";
import { IUser, IBlog } from "../../utils/types";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import NoVideos from "../../components/NoResult";
import VideoCard from "../../components/VideoCard";
import Link from "next/link";
import VideoCardLite from "../../components/VideoCardLite";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Search = ({users, blogs}: {users: IUser[], blogs: IBlog[]}) => {
  const [numDisplay, setNumDisplay] = useState<Number>(1);
  const acc = numDisplay == 2
    ? "border-b-2 border-black text-bold"
    : "text-gray-400";
  const vid = numDisplay == 3
    ? "border-b-2 border-black text-bold"
    : "text-gray-400";

    const top = numDisplay == 1
    ? "border-b-2 border-black text-bold"
    : "text-gray-400";
  return (
    <div>
      <div className="flex gap-8 mt-[10px] border-b-2">
        <p
          className={`text-[15px] font-bold cursor-pointer select-none pb-[3px] ${top}`}
          onClick={() => setNumDisplay(1)}
        >
          Top {blogs.length >0 && `(${blogs.length})`}
        </p>
        <p
          className={`text-[15px] font-bold cursor-pointer select-none pb-[3px] ${acc}`}
          onClick={() => setNumDisplay(2)}
        >
          Accounts {users.length >0 && `(${users.length})`}
        </p>
        <p
          className={`text-[15px] font-bold cursor-pointer select-none pb-[3px] ${vid}`}
          onClick={() => setNumDisplay(3)}
        >
          Videos {blogs.length >0 && `(${blogs.length})`}
        </p>
      </div>
      <div className="mt-[50px]">
        <div className="flex flex-col gap-10 h-full">
          {numDisplay == 2 ? (
            <>
              {users.length ? (
               users.map((user: IUser) => (
                <Link href={`/profile/${user.id}`} key={user.id}>
                  <div className="flex items-center gap-4 cursor-pointer">
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
                    <p className="text-[15px] text-gray-400 p-0 m-0">{user.username}</p>
                  </div>
                </div>
                </Link>
              ))
              ) : (
                <NoVideos text={`No Account Found`} isFindAcc={true} />
              )}
            </>
          ) : (
            <>
              {blogs.length ? (
                <div className="flex flex-wrap  gap-4">
                  {blogs?.map((video: IBlog) => (
                  <VideoCardLite blog={video} isSearchDisplay={true} key={video.id} />
                ))}
                </div>
              ) : (
                <NoVideos text='No videos found' isFindAcc={false}  />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
 
export const getServerSideProps = async ({
  query: { searchQuery },
}: {
  query: { searchQuery: string };
}) => {
  const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  let response1 = await axios.get(`${BE_URL}/blog/search/${searchQuery}`);
  let response2 = await axios.get(`${BE_URL}/user/search/${searchQuery}`);
  
  console.log(response1.data) 
  console.log(response2.data)
  const data : {users: IUser[] | [], blogs: IBlog[] | []} = {users: response2.data || [], blogs: response1.data|| []}

  return {
    props: data,
  };
};

export default Search;
 