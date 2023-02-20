import React, { useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import VideoCard from "../components/VideoCard";
import { IBlog } from "../utils/types";
import Link from "next/link";
import { ListVideo } from "../components/ListVideo";

interface IProps {
  videos: IBlog[];
}

const Home = ({ videos }: { videos: IBlog[] }) => {
  return (
      <ListVideo videos={videos} />
  );
};

export default Home; 

export const getServerSideProps = async () => {
  const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  let response;
  response = await axios.get(`http://localhost:4000/blog/default`);
  return {
    props: { videos: response.data },
  };
};
