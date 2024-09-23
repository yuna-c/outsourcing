import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';
import { VIDEOED } from '../../../core/utils/video';

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

  const renderVideos = (videoList) => (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
      {videoList.map((video, index) => (
        <VideoCard key={video.id?.videoId || index} video={video} />
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="video_2pharmacies m-auto w-[100%] md:w-[100%] xl:w-[80%] 2xl:max-w-[70%] md:min-h-[800px] p-[30px] py-[60px] pb-36 xl:pb-52">
        <h3 className="text-[2rem] md:text-[2.3rem] font-extrabold text-center mb-10 md:mb-16 md:p-[40px] p-0 pharmacy_selector_title">
          약 정보 알아보기
        </h3>
        {/* <p className="pb-16 text-xl text-center">데이터 로딩중...</p> */}
        {renderVideos(VIDEOED)} {/* Loading 상태에서도 videoed 렌더링 */}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="video_2pharmacies m-auto w-[100%] md:w-[100%] xl:w-[80%] 2xl:max-w-[70%] md:min-h-[800px] p-[30px] py-[60px] pb-36 xl:pb-52">
        <h3 className="text-[2rem] md:text-[2.3rem] font-extrabold text-center mb-10 md:mb-16 md:p-[40px] p-0 pharmacy_selector_title">
          약 정보 알아보기
        </h3>
        {/* <p className="pb-16 text-xl text-center">데이터 에러가 발생했습니다.</p> */}
        {renderVideos(VIDEOED)} {/* Error 상태에서도 videoed 렌더링 */}
      </div>
    );
  }

  return (
    <div className="video_2pharmacies m-auto w-[100%] md:w-[100%] xl:w-[80%] 2xl:max-w-[70%] md:min-h-[800px] p-[30px] py-[60px] pb-36 xl:pb-52">
      <h3 className="text-[2rem] md:text-[2.3rem] font-extrabold text-center mb-10 md:mb-16 md:p-[40px] p-0 video_pharmacy_selector_title">
        약 정보 알아보기
      </h3>
      {renderVideos(videos.length > 0 ? videos : VIDEOED)}
      {/* 정상 데이터 출력 */}
      {/* {renderVideos(VIDEOED)} */}
    </div>
  );
};

export default Youtube;
