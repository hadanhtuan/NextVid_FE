import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { footerList1, footerList2, footerList3 } from "../utils/constants";

const Footer: NextPage = () => {

  const List = ({ list, mt}: {list: string[], mt: boolean}) => (
    <div className={`flex flex-wrap gap-2 text-sm text-gray-500 ${mt && 'mt-[10px]'}`}>
      {list.map((item, idx) => (
        <p className="hover:underline cursor-pointer" key={idx}>{item}</p>
      ))}
    </div>  
  )
  
  return (
    <div className='mt-6 hidden xl:block'>
      <List list={footerList1} mt={false} />
      <List list={footerList2} mt />
      <List list={footerList3} mt />

      <p className='text-gray-400 text-sm mt-5'>© 2022 NextVid</p>
    </div>
  );
};

export default Footer;
