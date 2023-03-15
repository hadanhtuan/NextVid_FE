import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IBlog } from "../../utils/types";
import Image from "next/image";
import { BiCheck, BiDownArrow, BiUpArrow } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { GoVerified } from "react-icons/go";
import { BsFillPlayFill, BsFillPauseFill, BsFlag } from "react-icons/bs";
import LikeButton from "../../components/ReactButtons";
import useAuthStore from "../../store/authStore";
import { rmSync } from "fs";
import { useRouter } from "next/router";
import Comment from "../../components/Comment";
import bg from "../../public/bg.jpg";
import imgLogo from "../../public/next-js.svg";
import { TbBrandNextjs } from "react-icons/tb";
import { async } from "@firebase/util";
import Link from "next/link";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import parse from 'html-react-parser';


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Detail = ({ blogDetail }: { blogDetail: IBlog }) => {
  const [blog, setBlog] = useState(blogDetail);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [canblogComment, setCanblogComment] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();
  const { userProfile }: any = useAuthStore();

  const onVideoClick = () => {
    // console.log(videoRef);
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };
  function convertTags(match: string) {
    const link = match.slice(1, match.length)
    return `<a  className='font-semibold text-[18px]' href='/tag/${link}'>` + match + "</a>";
  }

  useEffect(() => {
    if (userProfile) setCanblogComment(true);
    else setCanblogComment(false);
  }, [userProfile]);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);
  
  useEffect(()=>{
    setBlog({...blog, caption : blog.caption.replace(/(#|@)\w+/g, convertTags)});
  }, [])

    
  const handleLike = async (isLike: boolean) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile.id,
        blogId: blog.id,
        like: isLike,
      });
      console.log(res.data);
      setBlog({ ...blog, likes: res.data.likes });
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(`${BASE_URL}/detail/${blog.id}`);
    alert("Copied the link");
  };

  return (
    <div className="flex w-full flex-wrap absolute left-0 top-0 bg-white">
      <div className="relative w-[64vw] h-[100vh]  bg-black bg-no-repeat bg-cover bg-center">
        <div className="h-[100vh] flex justify-center bg-bg-detail bg-cover">
          <video
            loop
            src={blog.video_url}
            className="h-full w-[397px] object-cover box-border cursor-pointer"
            ref={videoRef}
            onClick={onVideoClick}
          />
        </div>
        {!isPlaying && (
          <div onClick={onVideoClick} className="absolute top-[45%] left-[46%]">
            <BsFillPlayFill className="text-white text-6xl lg:text-8xl " />
          </div>
        )}
        <div className="absolute bottom-[3%] right-[3%] ">
          {isMuted ? (
            <button
              onClick={(e) => {
                setIsMuted(false);
              }}
            >
              <FiVolumeX className="text-white text-3xl" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                setIsMuted(true);
              }}
            >
              <FiVolume2 className="text-white text-3xl" />
            </button>
          )}
        </div>
        <Link href="/  ">
        <div
          className="absolute top-[3%] left-[3%] cursor-pointer"
        >
          <button>
            <MdOutlineCancel className="text-4xl text-white" />
          </button>
        </div>
          </Link>
        <div className="absolute top-[3%] left-[9%] cursor-default w-[100px]">
          {/* <Image src={imgLogo} /> */}
            <TbBrandNextjs className="text-[38px] text-primary" />
        </div>

        <div className="absolute top-[3%] right-[3%] cursor-pointer text-white flex items-center text-[18px]">
          <BsFlag className="flex items-baseline" />{" "}
          <span className="pl-1 pb-1">Report</span>
        </div>

        {/* <div className="absolute top-0 bottom-0 right-[3%] flex flex-col justify-center text-white text-3xl gap-3">
          <BiUpArrow className="cursor-pointer" />
            <BiDownArrow className="cursor-pointer" />
        </div> */}
      </div>

      <div className="w-[36vw] h-[100vh] overflow-hidden pt-[70px] relative">
       <div className="h-[45%]">
       <div className="px-[40px]">
        <div className="flex gap-3 relative pb-[15px]">
          <Image
            src={blog.user?.avatar || ""}
            width="50px"
            height="50px"
            className="rounded-full"
          />
          <div className="flex items-center gap-1 absolute left-[65px] top-[-5px]">
            <p className="font-bold">{blog.user?.username}</p>
            <GoVerified className="text-blue-400 text-xl" />
          </div>
          <p className="text-gray-400 text-[15px]   mt-[25px] ml-[3px]">
            {blog.user?.username}
          </p>
        </div>
        <div>{parse(blog.caption)}</div>
        <LikeButton
          likes={blog.likes}
          numComments={blog?.comments?.length || 0}
          blogDetail={blogDetail}
          user={userProfile}
        />
        <div className="flex justify-between items-center bg-copyLink mt-[20px] border-2 border-gray-200 rounded-[12px]">
          <p className="w-[70%] overflow-ellipsis overflow-hidden whitespace-nowrap rounded-[12px] px-[14px] py-[8px] opacity-50">{`${BASE_URL}/detail/${blog.id}`}</p>
          <button
            onClick={handleCopy}
            className="font-bold px-[14px] py-[8px] rounded-r-[12px]  hover:opacity-30"
          >
            Copy link
          </button>
        </div>
        </div>

       </div>
        <Comment
          canPostComment={blogDetail.allow_comment}
          comments={blogDetail.comments}
          blogId={blogDetail.id}
          setBlog={setBlog}
        />
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await axios.get(`${BE_URL}/blog/${id}`);
  return {
    props: { blogDetail: res.data },
  };
};

export default Detail;
