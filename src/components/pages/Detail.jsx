import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../core/instance/axiosInstance';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { updateLikes } from '../../core/instance/axiosInstance';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import supabase from '../../core/api/supabase'; // Supabase 클라이언트 임포트

const fetchData = async (id) => {
  try {
    const response = await api.get(`/pharmacies/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('데이터를 불러오지 못했습니다.');
  }
};

const fetchComment = async (postId) => {
  const { data, error } = await supabase.from('comment').select('*').eq('post_id', postId);
  if (error) throw new Error('댓글을 불러오지 못했습니다.');
  return data;
};

const addComment = async (postId, userId, content, nickname) => {
  const { error } = await supabase.from('comment').insert([{ post_id: postId, user_id: userId, content, nickname }]);
  if (error) throw new Error('댓글 추가 실패');
};

const Detail = () => {
  const { id } = useParams();
  const [pharmacy, setPharmacy] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [nickname, setNickname] = useState(''); // 닉네임 설정
  const navigate = useNavigate();

  useEffect(() => {
    const likedPharmacies = JSON.parse(localStorage.getItem('likedPharmacies')) || [];
    setLiked(likedPharmacies.includes(id));
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLike = async () => {
    const newLikeCount = pharmacy.likes + (liked ? -1 : 1);

    // Optimistic Update
    setPharmacy((prev) => ({
      ...prev,
      likes: newLikeCount
    }));

    try {
      await updateLikes(id, newLikeCount);

      const likedPharmacies = JSON.parse(localStorage.getItem('likedPharmacies')) || [];
      if (liked) {
        const updatedLikes = likedPharmacies.filter((pharmacyId) => pharmacyId !== id);
        localStorage.setItem('likedPharmacies', JSON.stringify(updatedLikes));
      } else {
        likedPharmacies.push(id);
        localStorage.setItem('likedPharmacies', JSON.stringify(likedPharmacies));
      }
    } catch (error) {
      console.error('좋아요 업데이트 실패:', error);
    } finally {
      setLiked(!liked);
    }
  };

  useEffect(() => {
    const getPharmacyData = async () => {
      try {
        setLoading(true);
        const data = await fetchData(id);
        setPharmacy(data);
        const commentData = await fetchComment(id); // 댓글 가져오기
        setComment(commentData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getPharmacyData();
  }, [id]);

  const handleAddComment = async () => {
    try {
      await addComment(id, 'user_id_placeholder', newComment, nickname); // 실제 user_id 사용
      setNewComment('');
      setNickname('');
      const updatedComment = await fetchComment(id); // 새로운 댓글을 가져옴
      setComment(updatedComment);
    } catch (error) {
      console.error('댓글 추가 실패:', error);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  const handleCloseOverlay = () => {
    setSelectedPharmacy(null);
  };

  return (
    <div className="flex flex-col lg:flex-row p-8 min-h-screen">
      <div className="bg-[#E9EFEC] shadow-lg rounded-lg p-6 lg:w-1/3 mb-8 lg:mb-0 lg:mr-8 flex flex-col">
        <h2 className="flex justify-between items-center mb-4 text-3xl font-bold">
          {pharmacy.name}
          <button onClick={handleLike}>
            {liked ? <AiFillHeart size={30} color="red" /> : <AiOutlineHeart size={30} color="gray" />}
          </button>
        </h2>
        <div className="text-lg font-semibold leading-8 mb-4">
          <p>주소: {pharmacy.address}</p>
          <p>전화번호: {pharmacy.phone}</p>
          <p>영업시간: {pharmacy.time}</p>
        </div>
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
        <div className="flex-1 overflow-y-auto">
          <ul>
            {comment.map((comment) => (
              <li key={comment.id} className="border-b border-gray-300 py-2">
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
                    <h3 className="text-lg font-semibold text-gray-800">{selectedPharmacy.name}</h3>
                    <button className="close cursor-pointer" onClick={handleCloseOverlay} title="닫기">
                      X
                    </button>
                  </div>
                  <div className="text-gray-600">
                    <p className="mb-1 text-sm break-words">{selectedPharmacy.address}</p>
                    <span className="text-sm">{selectedPharmacy.phone}</span>
                  </div>
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
