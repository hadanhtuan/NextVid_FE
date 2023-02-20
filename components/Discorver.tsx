import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { topics } from "../utils/constants";
import { HiHashtag, HiOutlineHashtag } from "react-icons/hi";
const Discover: NextPage = () => {
  const router = useRouter();
  const { topic } = router.query;

  const topicStyle =
    "flex items-center flex-wrap justify-center gap-1 border-[1px] xl:border-gray-400 rounded-full px-[10px]   text-[13px] cursor-pointer";

  return (
    <div className="xl:border-b-2 border-gray-200 xl:pb-4">
      <p className="text-violet-500 font-semibold text-sm mt-[10px] ml-[5px] mb-[10px]">
        Discover
      </p>
      <div className="flex flex-wrap gap-3">
        {topics.map((item) => (
          <Link href={`/tag/${item.name}`} key={item.name}>
            <div className={topicStyle}>
              <HiOutlineHashtag className="text-[18px]" />
              <span className="hidden xl:block">{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
