import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { topics } from "../utils/constants";
import useAuthStore from "../store/authStore";
import axios from "axios";
import uploadImg from '../utils/UploadImgToCloud'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import loadergif from  '../public/Fadingcircles.gif'
import { HiOutlineEmojiHappy } from "react-icons/hi";
import EmojiPicker from "emoji-picker-react";

export interface IFormData {
  caption: string;
  access_modifier: string;
  allow_comment: boolean;
  video: any;
}

const Upload = () => {
  const [formData, setFormData] = useState<IFormData>({ caption: "", access_modifier: "PUBLIC", video: null, allow_comment: true  });
  const [wrongType, setWrongType] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userProfile: any = useAuthStore((state) => state.userProfile);
  const [allowPost, setAllowPost] = useState<boolean>(formData.caption && formData.access_modifier && formData.video)

  const [showModal, setShowModal] = React.useState(false);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  let inputRef = useRef<HTMLInputElement>(null);
  const handleEmojiClick = (emojiObject: any, event: any) => {
    let caption = formData.caption;
    caption += emojiObject.emoji;
    setFormData({...formData, caption});
    setShowEmojiPicker(false);
    inputRef?.current?.focus();
  };


  useEffect(() => {
    if (!userProfile) router.push("/");
    
  }, [userProfile, router]);

  useEffect(()=>{
    setAllowPost(formData.caption && formData.access_modifier && formData.video) 
  })

  const handlePost = async (e: any) => {
    console.log(formData);
    if (allowPost) {
    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await axios.post(`${BE_URL}/blog/`, formData,  {
      headers: {
        Authorization: `Bearer ${userProfile?.accessToken}`,
      },
    });
      
      router.push(`/detail/${res.data.id}`)
      // const res = await axios.post(`${BASE_URL}/api/post`, doc);
      // console.log(res);
      router.push("/");
    }
  };

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      setWrongType(false); 
      setLoading(true);
      // client.assets
      //   .upload("file", selectedFile, {
      //     contentType: selectedFile.type,
      //     filename: selectedFile.name,
      //   })
      //   .then((data) => {
      //     console.log(data);
      //     setVideoAsset(data);
      //     setLoading(false);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      const video_url = await uploadImg(selectedFile)
      setFormData({...formData, video: video_url})
      setLoading(false)
      console.log(video_url)
    } else {
      setLoading(false);
      setWrongType(true);
    }
  };

  const handleClickTag = () => {
    setFormData({ ...formData, caption: formData.caption + "#" });
  };

  return (
    <div className="bg-[#F8F8F8] flex justify-center w-full h-full absolute left-0 top-[63px] pt-[40px]">
      <div className="w-[72vw] bg-white rounded-lg px-[60px]">
        <div className="mt-8 mb-5">
          <h1 className="font-bold text-[25px] pb-[10px]">Upload Video</h1>
          <p className="opacity-30 text-[15px]">Post a video to your account</p>
        </div>
        <div className="flex gap-5">
          <div>
            {loading ? (
              <div className=" w-[300px] h-[420px] border-dashed border-2 border-gray-200 p-10">
                <p className="text-2xl font-semibold text-center mb-6">Uploading ...</p>
                <div className="flex justify-center items-center">
                  <Image src={loadergif} />
                </div>
              </div>
            ) : (
              <div className="border-dashed border-2 border-gray-200 p-10 w-[300px] h-[420px]">
                {formData?.video ? (
                  <div className="flex flex-col align-center justify-between  gap-4 h-[95%]">
                    <div className="h-[90%] flex  justify-center">
                    <video
                      controls
                      loop
                      src={formData?.video}
                      className="rounded-xl"
                    />
                      </div>
                    <div className="flex flex-col align-center justify-center">
                      {/* <p className="mt-4 mb-6 text-center text-[25px] text-primary">
                        {videoAsset.originalFilename}
                      </p> */}
                      <button
                        className="hover:shadow-md rounded-full bg-gray-200 transition-all duration-500 ease-in-out"
                        onClick={() => {
                          setFormData({...formData, video: undefined});
                        }}
                      >
                        <MdDelete className="text-center inline-block text-[40px] text-red-500" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center ">
                    <FaCloudUploadAlt className="text-[50px] opacity-10" />
                    <span className="mb-[30px]">Upload Video</span>
                    <span className="opacity-30 text-[15px] mb-[15px]">
                      Mp4 or WebM or ogg
                    </span>
                    <span className="opacity-30 text-[15px] mb-[15px]">
                      720x1200 or higher
                    </span>
                    <span className="opacity-30 text-[15px] mb-[15px]">
                      Up to 3 minutes
                    </span>
                    <span className="opacity-30 text-[15px] mb-[15px]">
                      Less than 30mb
                    </span>
                    <input
                      className="bg-primary text-white mt-8 p-2 w-52 rounded cursor-pointer"
                      type="file"
                      name="upload-video"
                      onChange={uploadVideo}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="ml-10 w-full">
            <div className="relative flex flex-col justify-start mb-[30px]">
              <div className="flex justify-between items-center">
                <label className="font-semibold">Caption</label>
                <label className="text-sm text-gray-400">
                  {formData.caption.length}/150
                </label>
              </div>
              <input
                type="text"
                placeholder="caption"
                className="rounded border-2 border-gray-400 p-2 mt-[10px]"
                value={formData.caption}
                onChange={(e) => {
                  setFormData({ ...formData, caption: e.target.value });
                }}
                ref={inputRef}
              />
               <HiOutlineEmojiHappy
          className={`text-4xl absolute right-0 top-[49%] rounded-[10px] p-1 cursor-pointer  ${
            showEmojiPicker && "bg-gray-300"
          }`}
          onClick={handleEmojiPickerhideShow}
        />
        {showEmojiPicker && (
          <div className="absolute bottom-0 right-[20%]">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
              <button
                onClick={handleClickTag}
                className="absolute top-[48%] right-[7%] font-bold text-3xl"
              >
                #
              </button>
            </div>
            <div className="mt-[40px] flex flex-col">
              <label className="font-semibold">Who can watch this post?</label>
              <select
                className="rounded border-2 border-gray-400 p-2 mt-[10px] w-[20vw] bg-white cursor-pointer"
                onChange={(e) => {
                  setFormData({ ...formData, access_modifier: e.target.value });
                }}
              >
                <option
                  value="PUBLIC"
                  className="bg-white text-gray-700 cursor-pointer"
                >
                  Public
                </option>
                <option
                  value="FRIEND"
                  className="bg-white text-gray-700 cursor-pointer"
                >
                  Friend
                </option>
                <option
                  value="PRIVATE"
                  className="bg-white text-gray-700 cursor-pointer"
                >
                  Private
                </option>
              </select>
            </div>
              <p className="font-semibold mt-[30px]">Allows user to:</p>
            <div className="mt-2 flex w-[20vw] justify-between">
              <div className="text-[15px] font-sans form-check flex items-center">
                <label className="mr-2">Comment</label>
                <input type="checkbox" className=" appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-primary checked:border-primary focus:outlineappearance-none transition duration-200 mt-1 cursor-pointer" name="allow_comment" id="" value={0} />
              </div>
              <div className="text-[15px] font-sans form-check flex items-center">
                <label className="mr-2">Share</label>
                <input type="checkbox" className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 mt-1 cursor-pointer" name="allow_share" id="" value={0} />
              </div>
            </div>
            <div className="w-[20vw] mt-[50px] flex justify-between">
              <button className="flex items-center justify-center font-semibold w-28 p-[5px] rounded border-2 border-gray-400">
                Discard
              </button>
              {allowPost ? <button
                className="flex items-center justify-center font-semibold w-28 p-[5px] rounded text-white text-md bg-primary"
                onClick={handlePost}
              >
                Post
              </button> : 
              <button
              className="cursor-not-allowed flex items-center justify-center font-semibold w-28 p-[5px] rounded text-black opacity-60 text-md bg-gray-200"
              disabled
            >
              Post
            </button>}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
