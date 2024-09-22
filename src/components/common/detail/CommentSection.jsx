import React from 'react';
import { MdModeEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md'; //아이콘 가져오기
import Button from '../ui/Button';

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
    <div className="p-5 pb-4 mt-0 overflow-auto border rounded-lg shadow-md h-[50%] md:h-[70%] xl:h-[80%] md:mt-4">
      <div>
        <h3 className="mb-2 text-lg font-bold">리뷰</h3>

        <div className="flex flex-col mb-4 ">
          <textarea
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
            rows="4"
            value={newComment}
            onChange={onNewCommentChange} // 직접 업데이트
            placeholder="리뷰를 입력하세요"
          />

          <Button className="py-2" onClick={onAddComment}>
            리뷰 추가
          </Button>
        </div>
      </div>
      <div className="mb-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 mb-4 bg-gray-100 rounded-lg">
              {editingCommentId === comment.id ? (
                <div className="">
                  <textarea
                    className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                    rows="2"
                    value={editingCommentContent}
                    onChange={onEditCommentChange} // 직접 업데이트
                  />
                  {/* 리뷰 수정완료버튼 */}
                  <div className="flex justify-end space-x-1">
                    <button className="text-sm text-black" onClick={() => onUpdateComment(comment.id)}>
                      <MdModeEdit className="text-xl" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="font-bold">{comment.nickname}</p>
                  <p>{comment.content}</p>
                  {/* 리뷰 작성 시간 */}
                  <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                  {/* 유저가 일치할 경우 아래 수정, 삭제버튼 표시 */}
                  {comment.userId === userId && (
                    <div className="flex justify-end space-x-1">
                      {/* 리뷰수정버튼 */}
                      <button className="text-xl text-blue-400" onClick={() => onEditComment(comment)}>
                        <MdModeEdit />
                      </button>
                      {/* 리뷰삭제버튼 */}
                      <button className="text-xl text-red-400" onClick={() => onDeleteComment(comment.id)}>
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
  );
};

export default CommentSection;
