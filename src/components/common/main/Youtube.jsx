import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';

const Youtube = () => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const apiUrl = 'https://www.googleapis.com/youtube/v3/search';
  const search = '약국';
  const channelId = 'UC5_8MDCy7gSLCgig10C8MoQ';

  const fetchYoutube = async () => {
    const url = `${apiUrl}?q=${encodeURIComponent(
      search
    )}&key=${API_KEY}&type=video&part=snippet&channelId=${channelId}&maxResults=9`;
    const response = await axios.get(url);
    return response.data.items || []; // 빈 배열 반환
  };

  const {
    data: videos = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['youtubeVideos'],
    queryFn: fetchYoutube,
    refetchInterval: 6 * 60 * 60 * 1000,
    staleTime: 6 * 60 * 60 * 1000,
    retry: 3
  });

  const videoed = [
    {
      id: { videoId: 'DzZbAekBLes?si=lQ3rTiKTonroX_q7' },
      snippet: {
        title: '탕탕후루후루',
        description: '약 정보 , 약은 무엇인가, 약 알고싶어?'
      }
    },
    {
      id: { videoId: 'DzZbAekBLes?si=lQ3rTiKTonroX_q7' },
      snippet: {
        title: '대풍약국 어때요?',
        description: '올바른 약 정보 '
      }
    },
    {
      id: { videoId: 'DzZbAekBLes?si=lQ3rTiKTonroX_q7' },
      snippet: {
        title: '탕탕후루후루?',
        description: '약 정보, 돗자리 깔고 맥주 먹을까?'
      }
    },
    {
      id: { videoId: 'DzZbAekBLes?si=lQ3rTiKTonroX_q7' },
      snippet: {
        title: '탕탕후루후루탕탕후루후루?',
        description: '약 정보'
      }
    },
    {
      id: { videoId: 'DzZbAekBLes?si=lQ3rTiKTonroX_q7' },
      snippet: {
        title: '검단아라태평양약국?',
        description: '약 정보'
      }
    },
    {
      id: { videoId: 'DzZbAekBLes?si=lQ3rTiKTonroX_q7' },
      snippet: {
        title: '검단아라태평양약국?',
        description: '약 정보'
      }
    }
  ];

  const renderVideos = (videoList) => (
    <div className="grid grid-cols-1 gap-10 md:gap-8 lg:gap-14 sm:grid-cols-2 md:grid-cols-3">
      {videoList.map((video, index) => (
        <VideoCard key={video.videoId || index} video={video} />
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="current_pharmacies m-auto w-[90%] md:max-w-[90%] md:min-h-[800px] p-[30px] py-[60px] pb-52">
        <h3 className="text-[2rem] md:text-[2.3rem] font-extrabold text-center mb-10 md:mb-16 md:p-[40px] p-0 pharmacy_selector_title">
          약 정보 알아보기
        </h3>
        <p className="text-center pb-16 text-xl">데이터 로딩중...</p>
        {renderVideos(videoed)} {/* Loading 상태에서도 videoed 렌더링 */}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="current_pharmacies m-auto w-[90%] md:max-w-full md:min-h-[800px] p-[30px] py-[60px] pb-52">
        <h3 className="text-[2rem] md:text-[2.3rem] font-extrabold text-center mb-10 md:mb-16 md:p-[40px] p-0 pharmacy_selector_title">
          약 정보 알아보기
        </h3>
        <p className="text-center pb-16 text-xl">데이터 에러가 발생했습니다.</p>
        {renderVideos(videoed)} {/* Error 상태에서도 videoed 렌더링 */}
      </div>
    );
  }

  return (
    <div className="current_pharmacies m-auto w-[90%] md:max-w-[90%] md:min-h-[800px] p-[30px] py-[60px] pb-52">
      <h3 className="text-[2rem] md:text-[2.3rem] font-extrabold text-center mb-10 md:mb-16 md:p-[40px] p-0 pharmacy_selector_title">
        약 정보 알아보기
      </h3>
      {renderVideos(videos.length > 0 ? videos : videoed)} {/* 정상 데이터 출력 */}
    </div>
  );
};

export default Youtube;
