import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const VideoCard = ({ video }) => (
  <div className="relative flex flex-col items-start justify-start overflow-hidden border rounded-lg shadow-md youtube_item border-custom-gray">
    <strong className="py-4 text-[23px] font-extrabold text-center max-w-[350px] truncate px-6">
      {video.snippet ? video.snippet.title : '제목 없음'}
    </strong>

    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full border-none"
        src={`https://www.youtube.com/embed/${video.id ? video.id.videoId : ''}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>

    <div className="inline-block px-2 py-2 content-section">
      {video.snippet
        ? video.snippet.description.split(',').map((word, idx) => (
            <span key={idx} className="mx-1 bg-[#C3EBFF] px-2 py-1 rounded-full font-bold text-sm my-4">
              {word.trim()}
            </span>
          ))
        : video.content.split(',').map((word, idx) => (
            <span key={idx} className="mx-1 bg-[#C3EBFF] px-2 py-1 rounded-full font-bold text-sm my-4">
              {word.trim()}
            </span>
          ))}
    </div>
  </div>
);

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

    // API 응답을 콘솔에 출력하여 확인
    console.log('YouTube API Response:', response.data);

    // items 배열이 존재하고, 최대 9개로 제한하여 반환
    return response.data.items && Array.isArray(response.data.items)
      ? response.data.items.slice(0, 9) // 9개로 제한
      : []; // 없을 경우 빈 배열 반환
  };
  // console.log('리렌더링 횟수 확인');
  const {
    data: videos = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['youtubeVideos'], // 배열 대신 queryKey를 객체로 전달
    queryFn: fetchYoutube,
    refetchInterval: 6 * 60 * 60 * 1000, // 6시간마다 자동으로 데이터 새로고침
    staleTime: 6 * 60 * 60 * 1000, // 6시간 동안 데이터가 신선하다고 간주
    retry: 3,
    select: (data) => {
      // 데이터가 유효한 경우만 반환
      if (data && Array.isArray(data)) {
        return data;
      }
      return []; // 유효하지 않은 경우 빈 배열 반환
    }
  });

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

  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시
  }

  if (isError) {
    return <div>오류 발생: 데이터를 가져오는 데 실패했습니다.</div>; // 오류 발생 시 표시
  }

  return (
    <div className="current_pharmacies m-auto md:max-w-7xl md:min-h-[800px] p-[30px] py-[60px] pb-52">
      <h3 className="text-[2rem] md:text-[2.3rem] font-extrabold text-center mb-10 md:mb-16 md:p-[40px] p-0 pharmacy_selector_title">
        약 정보 알아보기
      </h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {(videos.length > 0 ? videos : videoed).map((video, index) => (
          <VideoCard key={video.id ? video.id.videoId : index} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Youtube;
