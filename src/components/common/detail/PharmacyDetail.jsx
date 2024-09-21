import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdArrowBackIos } from 'react-icons/md';

const PharmacyDetail = ({ pharmacy, liked, onLike, onGoBack }) => {
  return (
    <div className="p-5 mt-0 mb-4 border rounded-lg shadow-md lg:mt-12">
      {/* p-4 mb-6 bg-white rounded-lg shadow-md */}
      <div className="flex items-center justify-start my-2 text-4xl font-bold">
        {/* 뒤로가기 */}
        <button onClick={onGoBack}>
          <MdArrowBackIos className="mr-2 text-2xl text-custom-deepblue" />
        </button>
        {/* 약국이름 */}
        <span className="mr-auto text-[23px] font-extrabold">{pharmacy.name}</span>
        {/* 좋아요 */}
        <button onClick={onLike}>
          {liked ? (
            <AiFillHeart className="text-3xl text-red-700" />
          ) : (
            <AiOutlineHeart size={30} className="text-3xl text-custom-gray" />
          )}
        </button>
      </div>
      <div className="text-[15px] font-bold leading-5 block px-3">
        <p>주소 : {pharmacy.address}</p>
        <p>전화번호 : {pharmacy.phone}</p>
        <p>영업시간 : {pharmacy.time}</p>

        <div className="flex mt-5">
          <a
            className="w-auto px-3 py-2 ml-auto overflow-hidden font-normal transition-none bg-white border rounded-full border-custom-deepblue text-custom-deepblue hover:bg-custom-deepblue hover:text-white"
            href={`tel:${pharmacy.phone}`}
          >
            전화걸기
          </a>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDetail;
