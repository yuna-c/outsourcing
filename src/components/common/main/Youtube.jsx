// import axios from 'axios';
// import { useEffect, useState } from 'react';

const Youtube = () => {
  // const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  // console.log('API Key:', API_KEY);
  // const apiUrl = 'https://www.googleapis.com/youtube/v3/search';
  // const search = '약국';
  // const channelId = 'UC5_8MDCy7gSLCgig10C8MoQ';
  // const url = `${apiUrl}?q=${encodeURIComponent(search)}&key=${API_KEY}&type=video&part=snippet&channelId=${channelId}`;

  // const [videos, setVideos] = useState([]);

  // const fetchYoutube = async () => {
  //   try {
  //     const response = await axios.get(url);
  //     setVideos(response.data.items);
  //   } catch (error) {
  //     console.error('Error fetching YouTube data:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchYoutube();
  // }, []);

  const videoed = [
    {
      title: '탕탕후루후루',
      videoId: 'DzZbAekBLes?si=lQ3rTiKTonroX_q7',
      content: '약 정보 , 약은 무엇인가, 약 알고싶어?'
    },
    {
      title: '대풍약국 어때요?',
      videoId: 'DzZbAekBLes?si=lQ3rTiKTonroX_q7',
      content: '올바른 약 정보 '
    },
    {
      title: '탕탕후루후루',
      videoId: 'DzZbAekBLes?si=lQ3rTiKTonroX_q7',
      content: '약 정보, 돗자리 깔고 맥주 먹을까?'
    },
    {
      title: '탕탕후루후루탕탕후루후루!',
      videoId: 'DzZbAekBLes?si=lQ3rTiKTonroX_q7',
      content: '약 정보'
    },
    {
      title: '검단아라태평양약국',
      videoId: 'DzZbAekBLes?si=lQ3rTiKTonroX_q7',
      content: '약 정보'
    },
    {
      title: '검단아라태평양약국',
      videoId: 'DzZbAekBLes?si=lQ3rTiKTonroX_q7',
      content: '약 정보'
    }
  ];

  return (
    <div className="current_pharmacies m-auto md:max-w-7xl md:min-h-[800px] p-[30px] py-[60px] pb-52">
      <h3 className="text-[2rem] md:text-[2.3rem] font-extrabold text-center mb-10 md:mb-16 md:p-[40px] p-0 pharmacy_selector_title">
        약 정보 알아보기
      </h3>
      {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 youtube_container">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="youtube_item border border-custom-gray shadow-md min-h-[350px] relative rounded-lg flex flex-col items-center justify-center"
          >
            <strong className="py-2 mb-10 text-sm font-bold text-center text-wrap font-custom">
              {video.snippet.title}
            </strong>
            <iframe
              width="100%"
              className=""
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div> */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3" /*lg:grid-cols-4 xl:grid-cols-5*/>
        {videoed.map((video, index) => (
          <div
            key={index}
            className="relative flex flex-col items-start justify-center overflow-hidden border rounded-lg shadow-md youtube_item border-custom-gray"
          >
            <strong className="py-4 text-[23px] font-extrabold text-center max-w-[350px] truncate px-6">
              {video.title}
            </strong>

            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {/* 16:9 Aspect Ratio */}
              <iframe
                className="absolute top-0 left-0 w-full h-full border-none"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <div className="px-2 content-section">
              {video.content.split(',').map((word, idx) => (
                <span key={idx} className="inline-flex mx-1 bg-[#C3EBFF] py-1 px-2 rounded-full font-bold text-sm my-4">
                  {word.trim()}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Youtube;
