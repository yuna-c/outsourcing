import axios from 'axios';
import { useEffect, useState } from 'react';

const Youtube = () => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  console.log('API Key:', API_KEY);
  const apiUrl = 'https://www.googleapis.com/youtube/v3/search';
  const search = '약국';
  const channelId = 'UC5_8MDCy7gSLCgig10C8MoQ';
  const url = `${apiUrl}?q=${encodeURIComponent(search)}&key=${API_KEY}&type=video&part=snippet&channelId=${channelId}`;

  const [videos, setVideos] = useState([]);

  const fetchYoutube = async () => {
    try {
      const response = await axios.get(url);
      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
    }
  };

  useEffect(() => {
    fetchYoutube();
  }, []);

  return (
    <div className="current_pharmacies">
<<<<<<< HEAD:src/components/common/ui/main/Youtube.jsx
      <h1 className="pharmacy_selector_title text-2xl">약국 꿀팁 영상</h1>
=======
      <h1 className="text-2xl pharmacy_selector_title">YouTube Videos</h1>
>>>>>>> ee5abbfcc4d382c942e16f6edb9e1cf6e3b82c77:src/components/common/main/Youtube.jsx
      <div className="youtube_container">
        {videos.map((video) => (
          <div key={video.id.videoId} className="youtube_item">
            <h2>{video.snippet.title}</h2>
            <iframe
              width="300"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Youtube;
