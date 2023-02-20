import React, { useState } from "react";
import { IBlog } from "../utils/types";
import VideoCard from "./VideoCard";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import loadergif from  '../public/Fadingcircles.gif'
import Image from "next/image";

export const ListVideo = ({ videos }: { videos: IBlog[] }) => {
  const [data, setData] = useState<IBlog[]>(videos);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getMorePost = async () => {

    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await fetch(`${BE_URL}/blog/default`);
    const newPosts = await res.json();
    console.log(newPosts)
    setData([...data, ...newPosts]);
  };

  const loader = ( 
    <div className="flex justify-center items-center p-5">
      <Image src={loadergif} />
    </div>
  )


  return (
    <div id="scrollableDiv" style={{ height: '88vh', overflow: "auto" }}>
      <InfiniteScroll
        dataLength={data.length}
        next={getMorePost}
        scrollableTarget="scrollableDiv"
        scrollThreshold={1}
        hasMore={true}
        loader={loader}
        height={'88vh'}
      >
        {/* <div className="flex flex-col gap-10 "> */}
        <div>
          {data?.map((video: IBlog, idx: number) => (
            <VideoCard blog={video} key={idx} />
          ))}
        </div>
        {/* </div> */}
      </InfiniteScroll>
    </div>
  );    
};
