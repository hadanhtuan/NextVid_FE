import React, { useState, useEffect, useRef } from "react";
import { IUser, IBlog } from "../utils/types";

import Image from "next/image";
import Link from "next/link";

import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { BsPlay } from "react-icons/bs";
import useAuthStore from "../store/authStore";
import { AiFillHeart } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { useIsVisible } from "../store/hooks";
import Modal from "./ModalAuth";
import axios from "axios";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
interface IProps {
  blog: IBlog;
  isSearchDisplay: boolean;
}

const VideoCardLite = ({ blog, isSearchDisplay }: IProps) => {
  const [isHover, setIsHover] = useState(false);



  const { userProfile } = useAuthStore();



  
  //   if(videoRef?.current) {
  //     if (isMuted) {
  //       videoRef.current.muted = false;
  //       setIsMuted(false);
  //     } else {
  //       videoRef.current.muted = true;
  //       setIsMuted(true);
  //     }
  //   }
  // }

  // let captionBold = ''
  // let i
  // for( i =  0; i<blog.caption.length; i++) {
  //   if(blog.caption[i] === '#' || blog.caption[i] === '@') {
  //     captionBold += `<b>${blog.caption[i]}`
  //     while(true) {
  //       i++;
  //       if(i >= blog.caption.length || blog.caption[i] == ' '){
  //         captionBold += `${blog.caption[i]}</b>`
  //         break;
  //       } else
  //       captionBold += `${blog.caption[i]}`
  //     }
  //   } else captionBold += blog.caption[i]
  // }
  // blog.caption = captionBold

  return (
    <div className={`mb-4 ${isSearchDisplay ? 'w-[31%]' : 'w-[17vw]'}`}>
        <div
          className=""
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${blog.id}`}>
            <video
              loop
              src={blog.video_url}
              className={`mt-1 rounded-[10px] cursor-pointer bg-gray-100 h-[53vh] w-[100%] object-cover`}
            />
          </Link>
          <p className="whitespace-nowrap overflow-hidden text-ellipsis mt-2 mb-1">{blog.caption}</p>
          {isSearchDisplay && 
          <Link href={`/profile/${blog.userId}`}>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src={blog.user?.avatar || ''} width={35} height={35} className='rounded-full'/>
            <p className="font-serif">{blog.user?.username}</p>
            </div>
          </Link>
            }
        </div>
    </div>
  );
};

export default VideoCardLite;
