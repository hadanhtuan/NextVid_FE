import React, { useState, useEffect, useRef } from "react";
import { IUser, IBlog } from "../utils/types";

import { BiCheck } from "react-icons/bi";
import { RiUserFollowLine } from "react-icons/ri";
import { RiUserUnfollowLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser';
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
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
}

const VideoCard = ({ blog }: IProps) => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [currentLike, setCurrentLike] = useState<boolean>(false);
  

  const videoRef = useRef<HTMLVideoElement>(null);
  //Trong vanila Javascript, chúng ta làm việc với DOM elements bằng cách gọi document.getElementById().
  //Với ref trong React chúng ta không cần phải làm vậy. Thuộc tính ref sẽ tham chiếu đến chính xác element cần dùng.
  const markdownRef = useRef<HTMLElement>(null);
  const { userProfile, setUser } = useAuthStore();

  function convertTags(match: string) {
    const link = match.slice(1, match.length)
    return `<a  className='font-semibold text-[18px]' href='/tag/${link}'>` + match + "</a>";
  }
 
  useEffect(()=>{
    blog.caption = blog.caption.replace(/(#|@)\w+/g, convertTags);
  }, [])



  const shouldPlay = useIsVisible(markdownRef); 

  if (!isPlaying || !shouldPlay) {
    videoRef?.current?.pause();
  } else {
    videoRef?.current?.play().catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    if (userProfile?.follows.find((item) => item.followingId === blog.userId))
      setIsFollow(true);
    console.log(isFollow);
  }, [userProfile]);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (userProfile && blog.likes.find((ele: any) => ele.userId == userProfile.id))
      setIsLike(true);
  }, [userProfile]);

  const onVideoPress = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play().catch((err) => {
        console.log(err);
      });
      setIsPlaying(true);
    }
  };

  const handleFollow = async () => {
    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    console.log(userProfile?.accessToken)
    const res = await axios.post(
      `${BE_URL}/user/follow/${blog.userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userProfile?.accessToken}`,
        },
      }
    );
    userProfile?.follows.push({
      id: 0,
      followerId: userProfile.id,
      followingId: blog.userId,
    });
    setUser(userProfile);
    setIsFollow(true);
  };

  const handleUnfollow = async () => {
    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await axios.delete(`${BE_URL}/user/unfollow/${blog.userId}`, {
      headers: {
        Authorization: `Bearer ${userProfile?.accessToken}`,
      },
    });
    userProfile?.follows.splice(
      userProfile?.follows?.findIndex((item) => item.followingId == blog?.userId),
      1
    );
    setUser(userProfile);
    setIsFollow(false);
  };

  const handleLike = async () => {
    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await axios.post(
      `${BE_URL}/blog/like/${blog.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userProfile?.accessToken}`,
        },
      }
    );
    setIsLike(true);
    setCurrentLike(true);
    setTimeout(() => {
      setCurrentLike(false);
    }, 1000);
    blog.likes.push({ userId: userProfile?.id || 0, blogId: blog.id });
  };

  const handleUnlike = async () => {
    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await axios.delete(`${BE_URL}/blog/unlike/${blog.userId}`, {
      headers: {
        Authorization: `Bearer ${userProfile?.accessToken}`,
      },
    });
    setIsLike(false);
    blog.likes.splice(
      blog.likes.findIndex((item: any) => {
        item.userId == userProfile?.id;
      }),
      1
    );
  };

  // const onMutePress = () => {
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


  return (
    <div>
      <div className="flex flex-col border-b-2 border-gray-200 pb-6 mt-5">
        <div className="flex gap-3 pb-[15px] relative">
          <Link href={`/profile/${blog?.userId}`}>
            <div className="cursor-pointer">
              <Image
                src={blog?.user?.avatar || ""}
                width="55px"
                height="55px"
                className="rounded-full"
              />
            </div>
          </Link>
          <div className="w-[68%] text">
            <div className="flex items-center gap-1 left-[65px] top-[-5px]">
              <p className="font-bold text-xl">{blog.user?.username}</p>
              <p className="text-gray-400 text-sm">{blog.user?.full_name}</p>
            </div>
            <p className="">{parse(blog.caption)}</p>
          </div>

          {userProfile ? (
            <div className="w-[120px] absolute right-4 rounded-md border-[2px] text-primary hover:bg-green-50 font-semibold border-primary  mt-1 mr-3 cursor-pointer">
              {isFollow ? (
                <div
                  className="px-4 pb-[1px] flex justify-center items-center gap-1"
                  onClick={handleUnfollow}
                >
                  <span>Unfollow</span>{" "}
                  <RiUserUnfollowLine className="font-semibold" />
                </div>
              ) : (
                <div
                  className="px-4 pb-[1px] flex justify-center items-center gap-1"
                  onClick={handleFollow}
                >
                  <span>Follow</span>{" "}
                  <RiUserFollowLine className="font-semibold" />
                </div>
              )}
            </div>
          ) : (
            <>
              <div
                className="w-[120px]  justify-center absolute right-4 rounded-md border-[2px] text-primary hover:bg-green-50 font-semibold border-primary flex items-center gap-1 px-4 pb-[1px] mt-1 mr-3 cursor-pointer"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <span>Follow</span>{" "}
                <RiUserUnfollowLine className="font-semibold" />
              </div>
              <Modal showModal={showModal} setShowModal={setShowModal} />
            </>
          )}
        </div>

        {/* video */}
        <div
          className="flex gap-4 ml-[67px] relative "
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${blog.id}`}>
            <video
              loop
              ref={videoRef}
              src={blog.video_url}
              className="lg:w-[281px] lg:h-[500px] md:h-[400px] h-[300px] w-[200px] mt-1 rounded-[10px] cursor-pointer bg-gray-100"
            />
          </Link>

          <div className="flex flex-col gap-1 text-[22px] justify-end">
            <span
              ref={markdownRef}
              className="absolute top-[40%] text-transparent"
            >
              Markdown
            </span>
            {userProfile ? (
              <>
                {" "}
                {isLike ? (
                  <span
                    className=" p-3 cursor-pointer rounded-full bg-gray-100 text-primary"
                    onClick={handleUnlike}
                  >
                    <AiFillHeart
                      className={`${
                        !currentLike ? "animate-jump" : ""
                      }animate-bounce duration-150`}
                    />
                  </span>
                ) : (
                  <span
                    className="p-3 cursor-pointer rounded-full bg-gray-100"
                    onClick={handleLike}
                  >
                    <AiFillHeart />
                  </span>
                )}
              </>
            ) : (
              <span
                className="p-3 cursor-pointer rounded-full bg-gray-100"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <AiFillHeart />
              </span>
            )}

            <span className="text-[14px] text-[#1C1C1C] font-semibold text-center">
              {blog.likes.length}
            </span>
            <Link href={`/detail/${blog.id}`}>
              <span className="p-3 cursor-pointer rounded-full bg-gray-100">
                <FaCommentDots />
              </span>
            </Link>
            <span className="text-[14px] text-[#1C1C1C] font-semibold text-center">
              {blog.comments?.length || 0}
            </span>
            <span className="p-3 cursor-pointer rounded-full bg-gray-100">
              <IoIosShareAlt />
            </span>
          </div>
          {isHover && shouldPlay && (
            <div className="absolute bottom-[10px] flex justify-between w-[281px] z-50 p-5 ">
              {isPlaying ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-white text-[12px] lg:text-3xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-white text-[12px] lg:text-3xl" />
                </button>
              )}

              {isMuted ? (
                <button
                  onClick={(e) => {
                    setIsMuted(false);
                  }}
                >
                  <FiVolumeX className="text-white text-[12px] lg:text-3xl" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    setIsMuted(true);
                  }}
                >
                  <FiVolume2 className="text-white text-[12px] lg:text-3xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
