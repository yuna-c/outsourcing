import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../core/instance/axiosInstance';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { updateLikes } from '../../core/instance/axiosInstance';
import { AiFillHeart, AiOutlineHeart, AiFillEdit } from 'react-icons/ai';
import { SlArrowLeft } from 'react-icons/sl';
import useAuthStore from '../../core/stores/useAuthStore';
import { MdDelete } from 'react-icons/md';
import handleTimeCalculate from '../../core/stores/chageTime';

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
    <div className="flex items-start justify-center min-h-screen p-8">
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
                        <p className="text-sm text-gray-500">{handleTimeCalculate(comment.createdAt)}</p>
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
        <div className="flex items-center justify-center w-full rounded-lg h-96">
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
