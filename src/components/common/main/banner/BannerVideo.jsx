import React from 'react';

const BannerVideo = () => {
  return (
    <div className="flex items-center justify-center w-full mb-8 xs:mb-16 video md:w-auto md:mb-0">
      <div className="lg:w-[350px] lg:h-[350px] md:w-[320px] md:h-[320px] sm:w-[310px] sm:h-[310px] xs:w-[260px] xs:h-[260px] w-[200px] h-[200px] overflow-hidden border rounded-full border-transparent ">
        <video
          src="/src/assets/images/video.mp4"
          alt="video"
          className="object-cover h-full"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </div>
  );
};

export default BannerVideo;
