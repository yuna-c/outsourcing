import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api, updateLikes } from '../../core/instance/axiosInstance';
import PharmacyDetail from '../common/detail/PharmacyDetail'; //약국정보 section
import CommentSection from '../common/detail/CommentSection'; //댓글 section
import MapSection from '../common/detail/MapSection'; //지도 section
import useAuthStore from '../../core/stores/useAuthStore'; //zustand 회원정보;

import { IoMdSearch } from 'react-icons/io';

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
  const [liked, setLiked] = useState(false); //좋아요
  const [selectedPharmacy, setSelectedPharmacy] = useState(null); //약국정보저장
  const [newComment, setNewComment] = useState(''); //새로운 리뷰
  const [editingCommentId, setEditingCommentId] = useState(null); //수정중인 리뷰 id
  const [editingCommentContent, setEditingCommentContent] = useState(''); //수정중인 리뷰 내용
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.userId); //zustand에서 가져온 사용자정보
  const nickname = useAuthStore((state) => state.nickname); //zustand에서 가져온 닉네임
  const [pharmacy, setPharmacy] = useState({ comments: [] }); //약국의 상세정보,
  const [isSearchVisible, setIsSearchVisible] = useState(false); // 모바일에서 검색영역 토글

  //사용자의 좋아요 상태 업데이트
  useEffect(() => {
    if (userId) {
      const likedPharmacies = JSON.parse(localStorage.getItem(`likedPharmacies_${userId}`)) || [];
      setLiked(likedPharmacies.includes(id));
    }
  }, [id, userId]);

  //약국 데이터 가져오기
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

  //이전 페이지로 돌아가기
  const handleGoBack = () => {
    navigate(-1);
  };

  //좋아요
  const handleLike = async () => {
    const newLikeCount = pharmacy.likes + (liked ? -1 : 1);
    setPharmacy((prev) => ({ ...prev, likes: newLikeCount })); //setPharmacy를 사용해 즉시 업데이트(optimistic update)

    try {
      await updateLikes(id, newLikeCount); //서버에 좋아요 업데이트
      const likedPharmacies = JSON.parse(localStorage.getItem(`likedPharmacies_${userId}`)) || [];
      if (liked) {
        const updatedLikes = likedPharmacies.filter((pharmacyId) => pharmacyId !== id);
        localStorage.setItem(`likedPharmacies_${userId}`, JSON.stringify(updatedLikes)); //좋아요를 이미 한 경우
      } else {
        likedPharmacies.push(id);
        localStorage.setItem(`likedPharmacies_${userId}`, JSON.stringify(likedPharmacies)); //좋아요를 하지 않은 경우
      }
    } catch (error) {
      console.error('좋아요 업데이트 실패:', error);
    } finally {
      setLiked(!liked);
    } //좋아요 상태 반전
  };

  //지도에서 약국 정보 닫기
  const handleCloseOverlay = () => {
    setSelectedPharmacy(null);
  };

  // 리뷰 추가(db.json에 리뷰가 없는 경우, 새로 생성도함)
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

  //리뷰 삭제
  const handleDeleteComment = async (commentId) => {
    const updatedComments = pharmacy.comments.filter((comment) => comment.id !== commentId);

    try {
      await api.patch(`/pharmacies/${id}`, { comments: updatedComments });
      setPharmacy((prev) => ({ ...prev, comments: updatedComments }));
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  //수정할 리뷰 id, 내용 저장
  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentContent(comment.content);
  };

  //리뷰 수정
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
      console.error('리뷰 수정 실패:', error);
    }
  };

  return (
    <article className="relative flex flex-row justify-center h-full m-auto overflow-hidden">
      {/* 모바일에서 검색영역 토글 버튼 */}
      <button
        className="absolute z-40 block w-10 h-10 p-2 mb-4 bg-white border rounded-full border-custom-deepblue bottom-1 right-3 lg:hidden"
        onClick={() => setIsSearchVisible(!isSearchVisible)}
      >
        {isSearchVisible ? (
          <IoMdSearch className="w-6 h-6 text-custom-deepblue" />
        ) : (
          <IoMdSearch className="w-6 h-6 text-custom-skyblue" />
        )}
      </button>
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 z-30 bg-white p-5 h-full ${
          isSearchVisible ? 'block' : 'hidden'
        } lg:relative lg:block lg:w-1/3 xl:w-1/4 lg:h-[calc(100vh-10rem)] `}
      >
        <PharmacyDetail pharmacy={pharmacy} liked={liked} onLike={handleLike} onGoBack={handleGoBack} />
        <CommentSection
          comments={pharmacy.comments || []}
          newComment={newComment}
          onNewCommentChange={(e) => setNewComment(e.target.value)} // 리뷰입력
          onAddComment={handleAddComment}
          userId={userId}
          onEditComment={handleEditComment}
          editingCommentId={editingCommentId}
          editingCommentContent={editingCommentContent}
          onEditCommentChange={(e) => setEditingCommentContent(e.target.value)} // 수정 리뷰 입력
          onUpdateComment={handleUpdateComment}
          onDeleteComment={handleDeleteComment}
        />
      </div>

      <div className="w-full h-full lg:w-9/12">
        <MapSection
          pharmacy={pharmacy}
          selectedPharmacy={selectedPharmacy}
          onSelectPharmacy={setSelectedPharmacy}
          onCloseOverlay={handleCloseOverlay}
        />
      </div>
    </article>
  );
};

export default Detail;
