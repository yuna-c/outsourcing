import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { SlArrowLeft } from 'react-icons/sl';

const PharmacyDetail = ({ pharmacy, liked, onLike, onGoBack }) => {
  return (
    <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center justify-start mb-4 text-4xl font-bold">
        <button onClick={onGoBack}>
          <SlArrowLeft size={30} className="mr-4" />
        </button>
        <span className="mr-auto">{pharmacy.name}</span>
        <button onClick={onLike}>
          {liked ? <AiFillHeart size={30} color="red" /> : <AiOutlineHeart size={30} color="gray" />}
        </button>
      </h2>
      <div className="text-lg font-semibold leading-10">
        <p>주소 : {pharmacy.address}</p>
        <p>전화번호 : {pharmacy.phone}</p>
        <p>영업시간 : {pharmacy.time}</p>
      </div>
    </div>
  );
};

export default PharmacyDetail;
