import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

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
                <button className="text-sm text-blue-500" onClick={() => onUpdateComment(comment.id)}>
                  수정 완료
                </button>
              </div>
            ) : (
              <div>
                <p className="font-bold">{comment.nickname}</p>
                <p>{comment.content}</p>
                {comment.userId === userId && (
                  <div className="flex justify-end space-x-2">
                    <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                    <button className="text-sm text-blue-500" onClick={() => onEditComment(comment)}>
                      <AiFillEdit />
                    </button>
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
