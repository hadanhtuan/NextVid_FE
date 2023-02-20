import React, { useEffect, useState } from "react";
import axios from "axios";
import { IUser, IBlog } from "../../utils/types";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import VideoCardLite from "../../components/VideoCardLite";
import NoVideos from "../../components/NoResult";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import Modal from "../../components/ModalAuth";
import useAuthStore from "../../store/authStore";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { GrShareOption } from "react-icons/gr";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Profile = ({ userDetail, userLikedBlogs }: { userDetail: IUser, userLikedBlogs: IBlog[] }) => {
  const [isDisplayVid, setIsDisPlayVid] = useState<Boolean>(true);
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [showModal, setShowModal] = React.useState(false);
  const [followerQty, setFollowerQty] = useState<number>(0);

  const { userProfile, setUser } = useAuthStore();

  useEffect(() => {
    handleFetchFollowsQty();
  }, [userDetail]);

  useEffect(() => {
    if (userProfile?.follows.find((item) => item.followingId === userDetail.id))
      setIsFollow(true);
  }, [userProfile]); 

  const videos = isDisplayVid
    ? "border-b-2 border-black text-bold"
    : "text-gray-400";
  const liked = !isDisplayVid
    ? "border-b-2 border-black text-bold"
    : "text-gray-400";

  const handleFollow = async () => {
    setIsFollow(true);
    setFollowerQty(followerQty + 1);
    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await axios.post(
      `${BE_URL}/user/follow/${userDetail.id}`,
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
      followingId: userDetail.id,
    });
    setUser(userProfile);
  };

  const handleUnfollow = async () => {
    setIsFollow(false);
    setFollowerQty(followerQty - 1);

    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await axios.delete(`${BE_URL}/user/unfollow/${userDetail.id}`, {
      headers: {
        Authorization: `Bearer ${userProfile?.accessToken}`,
      },
    });
    userProfile?.follows.splice(
      userProfile?.follows?.findIndex((item) => item.followingId == userDetail?.id),
      1
    );
    setUser(userProfile);
  };

  const handleFetchFollowsQty = async () => {
    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await axios.get(`${BE_URL}/user/follower/${userDetail.id}`);
    console.log(res.data);
    setFollowerQty(Number(res.data.count));
  };
  return (
    <div className="p-3">
      <div>
        <div className="relative flex items-center gap-4 cursor-pointer">
          <div className="">
            <Image
              className="rounded-full"
              src={userDetail?.avatar}
              width={110}
              height={110}
            />
          </div>
          <div>
            <p className="flex items-center gap-1 text-[28px] font-bold p-0 m-0">
              {userDetail.username}
              <GoVerified className="text-blue-400" />
            </p>
            <p className="text-[23px]  p-0 m-0">{userDetail.full_name}</p>
            {userProfile ? (
              <div className="w-[200px] mt-5 h-[35px] justify-center rounded-md text-white bg-primary hover:bg-green-400 font-semibold flex items-center gap-1 cursor-pointer">
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
                  className="w-[200px] mt-5 h-[35px] justify-center rounded-md text-white bg-primary hover:bg-green-400 font-semibold flex items-center gap-1 cursor-pointer"
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
          <div className="absolute top-[10%] left-[70%] flex text-2xl gap-3">
            <GrShareOption />
            <HiOutlineDotsHorizontal className="justify-end" />
          </div>
        </div>
        <div className="flex gap-4  mt-5">
          <span className="text-[18px]">
            <span className="text-xl font-bold">{followerQty}</span> Follower
          </span>
          <span className="text-[18px]">
            <span className="text-xl font-bold">
              {userDetail.follows?.length}
            </span>{" "}
            Following
          </span>
          <span className="text-[18px]">
            <span className="text-xl font-bold">
              {userDetail.blogs?.length}
            </span>{" "}
            Videos
          </span>
        </div>
      </div>
      <div className="flex gap-4 mt-[50px] border-b-2">
        <p
          className={`text-[18px] cursor-pointer select-none pb-[3px] ${videos}`}
          onClick={() => setIsDisPlayVid(true)}
        >
          Videos
        </p>
        <p
          className={`text-[18px] cursor-pointer select-none pb-[3px] ${liked}`}
          onClick={() => setIsDisPlayVid(false)}
        >
          Likes
        </p>
      </div>
      <div className="mt-[50px]">
        <div className="flex flex-wrap gap-4 h-full">
          {isDisplayVid ? (
            <>
              {userDetail.blogs.length ? (
                userDetail.blogs?.map((video: IBlog) => (
                  <VideoCardLite blog={video} isSearchDisplay={false} key={video.id} />
                ))
              ) : (
                <NoVideos
                  text={`No Videos Yet`}
                  isFindAcc={false}
                />
              )}
            </>
          ) : (
            <>
              {userLikedBlogs.length ? (
                userLikedBlogs?.map((video: IBlog) => (
                  <VideoCardLite blog={video} isSearchDisplay={false} key={video.id} />
                ))
              ) : (
                <NoVideos
                  text={`No Liked Videos Yet`}
                  isFindAcc={false}
                />
              )}
            </>
          )}
        </div>
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

  const res1 = await axios.get(`${BE_URL}/user/${id}`);
  const res2 = await axios.get(`${BE_URL}/blog/user-liked/${id}`);
  console.log(res2.data)
  return {
    props: { userDetail: res1.data, userLikedBlogs: res2.data },
  };
};

export default Profile;
