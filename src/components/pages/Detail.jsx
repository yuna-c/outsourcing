import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../core/instance/axiosInstance';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { updateLikes } from '../../core/instance/axiosInstance';
<<<<<<< HEAD
<<<<<<< HEAD
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import supabase from '../../core/instance/supabase'; // Supabase 클라이언트 임포트
=======
=======
>>>>>>> ee5abbfcc4d382c942e16f6edb9e1cf6e3b82c77
import { AiFillHeart, AiOutlineHeart, AiFillEdit } from 'react-icons/ai';
import { SlArrowLeft } from 'react-icons/sl';
import useAuthStore from '../../core/stores/useAuthStore';
import { MdDelete } from 'react-icons/md';
<<<<<<< HEAD
>>>>>>> 32de0e33973d3ae5bc17672c20f9ade30560baf9
=======
>>>>>>> ee5abbfcc4d382c942e16f6edb9e1cf6e3b82c77

const fetchData = async (id) => {
  try {
    const response = await api.get(`/pharmacies/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('데이터를 불러오지 못했습니다.');
  }
};

const Detail = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.userId);
  const nickname = useAuthStore((state) => state.nickname);
  const [pharmacy, setPharmacy] = useState({ comments: [] });

  useEffect(() => {
    if (userId) {
      const likedPharmacies = JSON.parse(localStorage.getItem(`likedPharmacies_${userId}`)) || [];
      setLiked(likedPharmacies.includes(id));
    }
  }, [id, userId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLike = async () => {
    const newLikeCount = pharmacy.likes + (liked ? -1 : 1);
    setPharmacy((prev) => ({ ...prev, likes: newLikeCount }));

    try {
      await updateLikes(id, newLikeCount);
      const likedPharmacies = JSON.parse(localStorage.getItem(`likedPharmacies_${userId}`)) || [];
      if (liked) {
        const updatedLikes = likedPharmacies.filter((pharmacyId) => pharmacyId !== id);
        localStorage.setItem(`likedPharmacies_${userId}`, JSON.stringify(updatedLikes));
      } else {
        likedPharmacies.push(id);
        localStorage.setItem(`likedPharmacies_${userId}`, JSON.stringify(likedPharmacies));
      }
    } catch (error) {
      console.error('좋아요 업데이트 실패:', error);
    } finally {
      setLiked(!liked);
    }
  };

  const handleCloseOverlay = () => {
    setSelectedPharmacy(null);
  };

  useEffect(() => {
    const getPharmacyData = async () => {
      try {
        setLoading(true);
        const data = await fetchData(id);
        setPharmacy(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getPharmacyData();
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert('댓글 내용을 입력하세요.');
      return;
    }

    const comment = {
      id: Date.now(),
      userId,
      nickname,
      content: newComment,
      createdAt: new Date().toISOString()
    };

    try {
      const updatedComments = pharmacy.comments ? [...pharmacy.comments, comment] : [comment];
      await api.patch(`/pharmacies/${id}`, { comments: updatedComments });
      setPharmacy((prev) => ({ ...prev, comments: updatedComments }));
      setNewComment('');
    } catch (error) {
      console.error('댓글 추가 실패:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const updatedComments = pharmacy.comments.filter((comment) => comment.id !== commentId);

    try {
      await api.patch(`/pharmacies/${id}`, { comments: updatedComments });
      setPharmacy((prev) => ({ ...prev, comments: updatedComments }));
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentContent(comment.content);
  };

  const handleUpdateComment = async (commentId) => {
    const updatedComments = pharmacy.comments.map((comment) =>
      comment.id === commentId ? { ...comment, content: editingCommentContent } : comment
    );

    try {
      await api.patch(`/pharmacies/${id}`, { comments: updatedComments });
      setPharmacy((prev) => ({ ...prev, comments: updatedComments }));
      setEditingCommentId(null);
      setEditingCommentContent('');
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="flex flex-col min-h-screen p-8 lg:flex-row">
      <div className="bg-[#E9EFEC] shadow-lg rounded-lg p-6 lg:w-1/3 mb-8 lg:mb-0 lg:mr-8 flex flex-col">
        <h2 className="flex items-center justify-between mb-4 text-3xl font-bold">
          {pharmacy.name}
          <button onClick={handleLike}>
            {liked ? <AiFillHeart size={30} color="red" /> : <AiOutlineHeart size={30} color="gray" />}
          </button>
        </h2>
        <div className="mb-4 text-lg font-semibold leading-8">
          <p>주소: {pharmacy.address}</p>
          <p>전화번호: {pharmacy.phone}</p>
          <p>영업시간: {pharmacy.time}</p>
        </div>
        <h3 className="mb-4 text-lg font-semibold leading-8">리뷰</h3>
        <div className="mb-4">
          <textarea
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
            rows="4"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="리뷰를 입력하세요"
          />
          <button
            className="w-full bg-[#9BDBA6] text-gray-800 font-semibold py-2 px-4 rounded shadow-md hover:bg-[#478485] focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={handleAddComment}
          >
            리뷰 추가
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ul>
            {comment.map((comment) => (
              <li key={comment.id} className="py-2 border-b border-gray-300">
                <p className="font-semibold">{comment.nickname}</p>
                <p>{comment.content}</p>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="bg-[#9BDBA6] text-gray-800 font-semibold py-2 px-4 rounded shadow-md hover:bg-[#478485] focus:outline-none focus:ring-2 focus:ring-gray-300 mt-4"
          onClick={handleGoBack}
        >
          돌아가기
        </button>
      </div>
      <div className="lg:w-2/3">
        <div className="flex items-center justify-center w-full rounded-lg h-96">
=======
    <div className="flex justify-center items-start p-8 min-h-screen">
=======
    <div className="flex items-start justify-center min-h-screen p-8">
>>>>>>> ee5abbfcc4d382c942e16f6edb9e1cf6e3b82c77
      <div>
        <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
          <h2 className="flex items-center justify-start mb-4 text-4xl font-bold">
            <button onClick={handleGoBack}>
              <SlArrowLeft size={30} className="mr-4" />
            </button>
            <span className="mr-auto">{pharmacy.name}</span>
            <button onClick={handleLike}>
              {liked ? <AiFillHeart size={30} color="red" /> : <AiOutlineHeart size={30} color="gray" />}
            </button>
          </h2>
          <div className="text-lg font-semibold leading-10">
            <p>주소 : {pharmacy.address}</p>
            <p>전화번호 : {pharmacy.phone}</p>
            <p>영업시간 : {pharmacy.time}</p>
          </div>
        </div>
        <div className="p-4 mt-6 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-lg font-semibold leading-8">리뷰</h3>
          <div className="mb-4">
            <textarea
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
              rows="4"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="리뷰를 입력하세요"
            />
            <button
              className="flex justify-end px-4 py-2 ml-auto overflow-hidden text-white transition-none border border-transparent rounded-full bg-custom-deepblue hover:bg-custom-skyblue"
              onClick={handleAddComment}
            >
              리뷰 추가
            </button>
          </div>

          {pharmacy.comments?.length > 0 ? (
            pharmacy.comments.map((comment) => (
              <div key={comment.id} className="p-4 mb-4 bg-gray-100 rounded-lg">
                {editingCommentId === comment.id ? (
                  <div>
                    <textarea
                      className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                      rows="2"
                      value={editingCommentContent}
                      onChange={(e) => setEditingCommentContent(e.target.value)}
                    />
                    <button className="text-sm text-blue-500" onClick={() => handleUpdateComment(comment.id)}>
                      <AiFillEdit />
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="font-bold">{comment.nickname}</p>
                    <p>{comment.content}</p>
                    {comment.userId === userId && (
                      <div className="flex justify-end space-x-2">
                        <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                        <button className="text-sm text-blue-500 " onClick={() => handleEditComment(comment)}>
                          <AiFillEdit />
                        </button>
                        <button className="text-sm text-red-500" onClick={() => handleDeleteComment(comment.id)}>
                          <MdDelete />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>리뷰가 없습니다. 첫 번째 리뷰를 작성해주세요.</p>
          )}
        </div>
      </div>

      <div className="w-2/3 pl-8">
<<<<<<< HEAD
        <div className="w-full h-96 rounded-lg flex justify-center items-center">
>>>>>>> 32de0e33973d3ae5bc17672c20f9ade30560baf9
=======
        <div className="flex items-center justify-center w-full rounded-lg h-96">
>>>>>>> ee5abbfcc4d382c942e16f6edb9e1cf6e3b82c77
          <Map
            center={{ lat: pharmacy.latitude, lng: pharmacy.longitude }}
            style={{ width: '100%', height: '100%' }}
            level={3}
          >
            <MapMarker
              position={{ lat: pharmacy.latitude, lng: pharmacy.longitude }}
              onClick={() => setSelectedPharmacy(pharmacy)}
            />
            {selectedPharmacy && (
<<<<<<< HEAD
<<<<<<< HEAD
              <CustomOverlayMap
                position={{ lat: selectedPharmacy.latitude, lng: selectedPharmacy.longitude }}
                yAnchor={1.3}
                xAnchor={0.5}
              >
                <div className="w-64 p-3 bg-white rounded-lg shadow-lg text-pretty">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{selectedPharmacy.name}</h3>
                    <button className="cursor-pointer close" onClick={handleCloseOverlay} title="닫기">
                      X
                    </button>
                  </div>
                  <div className="text-gray-600">
                    <p className="mb-1 text-sm break-words">{selectedPharmacy.address}</p>
                    <span className="text-sm">{selectedPharmacy.phone}</span>
                  </div>
=======
=======
>>>>>>> ee5abbfcc4d382c942e16f6edb9e1cf6e3b82c77
              <CustomOverlayMap position={{ lat: pharmacy.latitude, lng: pharmacy.longitude }}>
                <div className="relative p-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <button
                    className="absolute text-gray-500 top-1 right-1 hover:text-black"
                    onClick={handleCloseOverlay}
                  >
                    &times;
                  </button>
                  <div className="font-bold">{selectedPharmacy.name}</div>
                  <div>{selectedPharmacy.address}</div>
                  <div>{selectedPharmacy.phone}</div>
<<<<<<< HEAD
>>>>>>> 32de0e33973d3ae5bc17672c20f9ade30560baf9
=======
>>>>>>> ee5abbfcc4d382c942e16f6edb9e1cf6e3b82c77
                </div>
              </CustomOverlayMap>
            )}
          </Map>
        </div>
      </div>
    </div>
  );
};

export default Detail;
