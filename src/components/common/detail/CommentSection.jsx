import React from 'react';
import { AiFillEdit } from 'react-icons/ai'; //아이콘 가져오기
import { MdDelete } from 'react-icons/md'; //아이콘 가져오기
import handleTimeCalculate from '../../../core/stores/changeTime';

const CommentSection = ({
  comments,
  newComment,
  onNewCommentChange,
  onAddComment,
  userId,
  onEditComment,
  editingCommentId,
  editingCommentContent,
  onEditCommentChange,
  onUpdateComment,
  onDeleteComment
}) => {
  return (
    <div className="p-4 mt-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-lg font-semibold leading-8">리뷰</h3>
      <div className="mb-4">
        <textarea
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
          rows="4"
          value={newComment}
          onChange={onNewCommentChange} // 직접 업데이트
          placeholder="리뷰를 입력하세요"
        />
        <button
          className="flex justify-end px-4 py-2 ml-auto overflow-hidden text-white transition-none border border-transparent rounded-full bg-custom-deepblue hover:bg-custom-skyblue"
          onClick={onAddComment}
        >
          리뷰 추가
        </button>
      </div>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="p-4 mb-4 bg-gray-100 rounded-lg">
            {editingCommentId === comment.id ? (
              <div>
                <textarea
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                  rows="2"
                  value={editingCommentContent}
                  onChange={onEditCommentChange} // 직접 업데이트
                />
                {/* 리뷰 수정완료버튼 */}
                <button className="text-sm text-blue-500" onClick={() => onUpdateComment(comment.id)}>
                  <AiFillEdit />
                </button>
              </div>
            ) : (
              <div>
                <p className="font-bold">{comment.nickname}</p>
                <p>{comment.content}</p>
                {/* 리뷰 작성 시간 */}
                <p className="text-sm text-gray-500">{handleTimeCalculate(comment.createdAt)}</p>
                {/* 유저가 일치할 경우 아래 수정, 삭제버튼 표시 */}
                {comment.userId === userId && (
                  <div className="flex justify-end space-x-2">
                    {/* 리뷰수정버튼 */}
                    <button className="text-sm text-blue-500" onClick={() => onEditComment(comment)}>
                      <AiFillEdit />
                    </button>
                    {/* 리뷰삭제버튼 */}
                    <button className="text-sm text-red-500" onClick={() => onDeleteComment(comment.id)}>
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
  );
};

export default CommentSection;
