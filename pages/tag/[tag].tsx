import React, { useState } from "react";
import axios from "axios";
import { IUser, IBlog } from "../../utils/types";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import NoVideos from "../../components/NoResult";
import VideoCard from "../../components/VideoCard";
import Link from "next/link";
import VideoCardLite from "../../components/VideoCardLite";
import { FaSlackHash } from "react-icons/fa";
import hashImg from "../../public/hashtag.png";
import { HiHashtag, HiOutlineDotsHorizontal } from "react-icons/hi";
import { GrShareOption } from "react-icons/gr";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Search = ({ blogs, tag }: { blogs: IBlog[]; tag: string }) => {
  console.log(tag);
  return (
    <div>
      <div className="flex gap-8 mt-[10px] items-start  ">
        <div className="w-[100px] h-[100px]">
          <Image src={hashImg} />
        </div>
        <div>

        <div className="flex items-center text-2xl font-bold">
          <HiHashtag className="" />
          <span>{tag}</span>
        </div>
        <p className="text-gray-700 font-normal">4.1B Views</p>
        </div>
        <div className="absolute top-[12%] left-[60%] flex text-2xl gap-3">
            <GrShareOption />
            <HiOutlineDotsHorizontal className="justify-end" />
          </div>
      </div>
      <div className="mt-2 w-[40%] text-justify text-gray-500">
      Life is a beautiful journey that is meant to be embraced to the fullest every day. However, that doesn't mean you always wake up ready to seize the day, and sometimes need a reminder that life is a great gift.
      </div>
      <div className="mt-[50px]">
        <div className="flex flex-col gap-10 h-full">
          {blogs.length ? (
            <div className="flex flex-wrap  gap-4">
              {blogs?.map((video: IBlog) => (
                <VideoCardLite
                  blog={video}
                  isSearchDisplay={false}
                  key={video.id}
                />
              ))}
            </div>
          ) : (
            <NoVideos text="No videos found" isFindAcc={false} />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  query: { tag },
}: {
  query: { tag: string };
}) => {
  const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  let response = await axios.get(`${BE_URL}/blog/search/${tag}`);

  const data: { blogs: IBlog[] | []; tag: string } = {
    blogs: response.data || [],
    tag: tag,
  };

  return {
    props: data,
  };
};

export default Search;
