import React from 'react';

const VideoCard = ({ video }) => (
  <div className="relative flex flex-col items-start justify-start overflow-hidden border rounded-xl shadow-md youtube_item border-custom-gray">
    <strong className="py-6 text-[23px] font-extrabold text-center max-w-[400px] truncate px-8">
      {video.snippet ? video.snippet.title : '제목 없음'}
    </strong>

    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full border-none rounded-xl"
        src={`https://www.youtube.com/embed/${video.id ? video.id.videoId : ''}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>

    <div className="inline-block px-4 py-4 content-section">
      {video.snippet && video.snippet.description ? (
        video.snippet.description.trim() !== '' ? (
          video.snippet.description.split(',').map((word, idx) => (
            <span key={idx} className="mx-1 bg-[#C3EBFF] px-2 py-1 rounded-full font-bold text-sm my-4">
              {word.trim()}
            </span>
          ))
        ) : (
          <span className="mx-1 px-2 py-1 rounded-full font-bold text-sm my-4">{video.snippet.description}</span>
        )
      ) : (
        video.content &&
        video.content.split(',').map((word, idx) => (
          <span key={idx} className="mx-1 bg-[#C3EBFF] px-2 py-1 rounded-full font-bold text-sm my-4">
            {word.trim()}
          </span>
        ))
      )}
    </div>
  </div>
);

export default VideoCard;
