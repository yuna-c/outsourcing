import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../core/instance/axiosInstance';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { updateLikes } from '../../core/instance/axiosInstance';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { SlArrowLeft } from 'react-icons/sl';
import useAuthStore from '../../core/stores/useAuthStore';

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
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.userId);
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
      content: newComment,
      createdAt: new Date().toISOString()
    };

    try {
      // 댓글이 없을 경우, 기존 댓글 배열 생성
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

  const handleUpdateComment = async (commentId, updatedContent) => {
    const updatedComments = pharmacy.comments.map((comment) =>
      comment.id === commentId ? { ...comment, content: updatedContent } : comment
    );

    try {
      await api.patch(`/pharmacies/${id}`, { comments: updatedComments });
      setPharmacy((prev) => ({ ...prev, comments: updatedComments }));
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };

  return (
    <div className="flex justify-center items-start p-8 min-h-screen">
      <div className="shadow-lg rounded-lg p-6 w-1/3">
        <h2 className="flex justify-start items-center mb-4 text-4xl font-bold">
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

        <div>
          <h3 className="text-lg font-semibold leading-8 mb-4">리뷰</h3>
          <div className="mb-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
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

          {pharmacy.comments?.length > 0 ? (
            pharmacy.comments.map((comment) => (
              <div key={comment.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <p>{comment.content}</p>
                {comment.userId === userId && (
                  <div className="flex justify-end space-x-2">
                    <button
                      className="text-sm text-blue-500"
                      onClick={() => handleUpdateComment(comment.id, '업데이트된 내용')}
                    >
                      수정
                    </button>
                    <button className="text-sm text-red-500" onClick={() => handleDeleteComment(comment.id)}>
                      삭제
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>댓글이 없습니다.</p>
          )}
        </div>
      </div>

      <div className="w-2/3 pl-8">
        <div className="w-full h-96 rounded-lg flex justify-center items-center">
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
              <CustomOverlayMap
                position={{ lat: selectedPharmacy.latitude, lng: selectedPharmacy.longitude }}
                yAnchor={1.3}
                xAnchor={0.5}
              >
                <div className="bg-white rounded-lg shadow-lg p-3 w-64 text-pretty">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{selectedPharmacy.name}</h3>
                    <button onClick={handleCloseOverlay}>
                      <SlArrowLeft size={24} className="cursor-pointer" />
                    </button>
                  </div>
                  <p>{selectedPharmacy.address}</p>
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
