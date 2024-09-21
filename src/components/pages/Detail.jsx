import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api, updateLikes } from '../../core/instance/axiosInstance';
import PharmacyDetail from '../common/detail/PharmacyDetail';
import CommentSection from '../common/detail/CommentSection';
import MapSection from '../common/detail/MapSection';
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
        <PharmacyDetail pharmacy={pharmacy} liked={liked} onLike={handleLike} onGoBack={handleGoBack} />
        <CommentSection
          comments={pharmacy.comments || []}
          newComment={newComment} // 상태 변수
          onNewCommentChange={(e) => setNewComment(e.target.value)} // 상태 업데이트 함수
          onAddComment={handleAddComment}
          userId={userId}
          onEditComment={handleEditComment}
          editingCommentId={editingCommentId}
          editingCommentContent={editingCommentContent}
          onEditCommentChange={(e) => setEditingCommentContent(e.target.value)} // 상태 업데이트 함수
          onUpdateComment={handleUpdateComment}
          onDeleteComment={handleDeleteComment}
        />
      </div>

      <div className="w-2/3 pl-8">
        <MapSection
          pharmacy={pharmacy}
          selectedPharmacy={selectedPharmacy}
          onSelectPharmacy={setSelectedPharmacy}
          onCloseOverlay={handleCloseOverlay}
        />
      </div>
    </div>
  );
};

export default Detail;
