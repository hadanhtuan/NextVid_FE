import React, { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import useAuthStore from "../store/authStore";
import { IUser, IComment } from "../utils/types";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import { FaNotEqual } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmileFill, BsTrash } from "react-icons/bs";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import Modal from "./ModalAuth";
import { BiLogIn } from "react-icons/bi";

const Comment = ({
  canPostComment,
  comments,
  blogId,
  setBlog,
}: {
  canPostComment: boolean;
  comments: IComment[];
  blogId: any;
  setBlog: any;
}) => {
  const [msg, setMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listComment, setListComment] = useState<IComment[] | []>(comments)
  const [showModal, setShowModal] = React.useState(false);

  console.log(comments)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject: any, event: any) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
    setShowEmojiPicker(false);
    inputRef?.current?.focus();
  };

  let inputRef = useRef<HTMLInputElement>(null);

  const { userProfile } = useAuthStore();

  const handlPostComment = async () => {
    if (userProfile && msg) {
      const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

      const res = await axios.post(`${BE_URL}/comment/`, {
        content: msg,
        blogId: blogId
      }, {
        headers: {
          Authorization: `Bearer ${userProfile?.accessToken}`,
        },
      });
      setListComment([...listComment, {id: res.data, content: msg, display: true, userId: userProfile.id, blogId, user: userProfile}])
      setMsg('')

    }
  };

  const deleteComment = async (cmtId: number) => {
      console.log(1)
      const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      
      const res = await axios.post(`${BE_URL}/comment/delete`, {  //bug when use Delete method
        commentId: cmtId,
        blogId: blogId
      }, {
        headers: {
          Authorization: `Bearer ${userProfile?.accessToken}`,
        },
      });
      setListComment(listComment.filter(item=>item.id != cmtId)) 
      console.log(comments)
  };
 
  

  let arr;
  if (listComment?.length) arr = [...listComment].reverse();
  return (
    <div className="mt-[30px] relative h-[55%] border-t-[1px] border-t-border">
      <div className="h-[70%]  overflow-y-scroll bg-[#F8F8F8] px-[40px] py-[10px] border-b-[1px] border-t-border flex flex-col  gap-2">
        {arr?.map((comment: IComment) => (
          <div className="flex gap-3 mb-[10px]" key={comment.id}>
            <div className="">
              <Image
                src={comment.user.avatar}
                width={45}
                height={45}
                className="rounded-full"
              />
            </div>
            <div className="w-full">
              <p className="font-bold text-[14px]">@{comment.user.username}</p>
              <p className="text-[15px]">{comment.content}</p>
            </div>
            {userProfile && userProfile.id == comment.userId && <BsTrash className="text-xl mt-2 cursor-pointer" onClick={()=>{deleteComment(comment.id)}}/>}
          </div>
        ))}
      </div>
      {userProfile ? <div className="flex items-center gap-3  p-5 border-t-[1px] border-t-border bg-white">
        <input
          type="text"
          className="w-[80%] rounded-lg border-[2px] p-[10px] bg-[#F8F8F8] text-sm outline-none"
          placeholder="Add comment"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          ref={inputRef}
          onKeyPress={(e) => {
            if (e.key == "Enter") handlPostComment();
          }}
        />
        <HiOutlineEmojiHappy
          className={`text-4xl absolute left-[68%] rounded-[10px] p-1 cursor-pointer  ${
            showEmojiPicker && "bg-gray-300"
          }`}
          onClick={handleEmojiPickerhideShow}
        />
        {showEmojiPicker && (
          <div className="absolute bottom-[80%] right-[20%]">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <button
          className={`text-xl ${
            msg.length ? "text-primary font-semibold" : "text-gray-400"
          }`}
          disabled={!msg.length}
          onClick={handlPostComment}
        >
          Post
        </button>
      </div> : <div className="flex items-center  p-4 bg-white">
          <button className="flex gap-1 items-center text-primary font-semibold text-[25px] pl-4" onClick={()=>{setShowModal(true)}}>Login to comment <BiLogIn /></button>
          <Modal showModal={showModal} setShowModal={setShowModal} />
        </div>}

    </div>
  );
};

export default Comment;

// <div className="mt-[30px] border-t-[1px] border-t-border">
//   <div className="h-[300px] overflow-y-auto bg-[#F8F8F8] px-[40px] py-[10px] border-b-[1px] border-t-border flex flex-col justify-center items-center gap-2" >
//     {/* {arr?.map((comment: IComment) => (
//       <div className="flex gap-3 mb-[10px]">
//         <div className="">
//           <Image src={comment.} width={45} height={45} className="rounded-full"/>
//         </div>
//         <div className="w-full">
//           <p className="font-bold text-[14px]">@{comment.blogedBy.userName}</p>
//           <p className="text-[15px]">{comment.comment}</p>
//         </div>
//       </div>
//     ))} */}
//     <FaNotEqual className="text-3xl" />
//     <span className="text-xl">Comment feature are updating</span>
//   </div>
//   {/* <div className="mt-2 p-[10px] rounded-[5px] bg-[#F1F1F1] cursor-pointer" onClick={()=>login()}>
//       <button className="text-2xl font-bold text-primary">Login</button>
//     </div> */}
// </div>
