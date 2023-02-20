import React, { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import { MdFavorite } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaShareSquare } from "react-icons/fa";
import Tooltip from "./Tooltip";
import axios from "axios";
import { IBlog } from "../utils/types";

const LikeButton = ({
  likes,
  numComments,
  blogDetail,
  user
}: {
  likes: any;
  numComments: number;
  blogDetail: IBlog;
  user: any
}) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [currentLike, setCurrentLike] = useState<boolean>(false);

  const { userProfile }: any = useAuthStore();

  const filterLike = likes?.filter(
    (like: any) => like._ref == userProfile?._id
  );

  useEffect(() => {
    if (filterLike?.length > 0) setIsLike(true);
    else setIsLike(false);
  }, [likes, filterLike]);

  const handleLike = async () => {
    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await axios.post(
      `${BE_URL}/blog/like/${blogDetail.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    );
    setIsLike(true);
    setCurrentLike(true);
    setTimeout(() => {
      setCurrentLike(false);
    }, 1000);
    blogDetail.likes.push({ userId: user?.id || 0, blogId: blogDetail.id });
  };

  const handleUnlike = async () => {
    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await axios.delete(`${BE_URL}/blog/unlike/${blogDetail.userId}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    setIsLike(false);
    blogDetail.likes.splice(
      blogDetail.likes.findIndex((item: any) => {
        item.userId == user?.id;
      }),
      1
    );
  };
  return (
    <div className="flex justify-between items-center mt-[40px]">
      <div className="flex gap-7">
        <div className="flex gap-1  items-center">
        {isLike ? (
              <span
                className=" p-2 cursor-pointer rounded-full bg-gray-100 text-primary"
                onClick={handleUnlike}
              >
                <AiFillHeart
                  className={`${
                    !currentLike ? "animate-jump" : ""
                  }animate-bounce duration-150 text-[25px]`}
                />
              </span>
            ) : (
              <span
                className="p-2 cursor-pointer rounded-full bg-gray-100"
                onClick={handleLike}
              >
                <AiFillHeart className="text-[25px]"/>
              </span>
            )}
          <p className="text-[15px] text-detail">{likes?.length | 0}</p>
        </div>
        <div className="flex gap-1  items-center">
          <div
            className="rounded-full p-2 bg-gray-200 text-black cursor-pointer "
          >
            <AiFillMessage className="text-[20px]" />
          </div>
          <p className="text-[15px] text-detail">{numComments}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Tooltip text="Share to Facebook">
          <BsFacebook className="cursor-pointer text-[25px] text-blue-600" />
        </Tooltip>
        <Tooltip text="Share to WhatsApp">
          <IoLogoWhatsapp className="cursor-pointer text-[25px] text-green-400" />
        </Tooltip>
        <Tooltip text="Share to Twitter">
          <AiFillTwitterCircle className="cursor-pointer text-[25px] text-blue-400" />
        </Tooltip>
        <Tooltip text="More">
          <FaShareSquare className="cursor-pointer text-[25px] " />
        </Tooltip>
      </div>
    </div>
  );
};

export default LikeButton;
