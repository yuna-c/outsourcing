import BannerTitle from './BannerTitle';
import BannerSearch from './BannerSearch';
import BannerVideo from './BannerVideo';
import BannerImg from './BannerImg';

const Banner = () => {
  return (
    <div className="!h-screen md:pt-10 pt-[5rem] !mt-2 bg-left-top bg-cover md:!h-[800px] saturate-50 bg-custom-deepblue bg-custom-main-gradient opacity-95 custom-main-gradient relative overflow-hidden bg-no-repeat flex flex-col justify-center items-center">
      <BannerImg />
      <div className="flex flex-wrap-reverse md:flex-nowrap w-full justify-between 2xl:w-[60%] xl:w-[80%] lg:w-[95%] gap-2 mt-0 md:px-8 md:py-16 px-5 py:0 md:mt-0 border-transparent xl:border-[1.5px] lg:border-b-custom-gray">
        <div className="flex flex-col xs:w-full">
          <BannerTitle />
          <BannerSearch />
        </div>
        <BannerVideo />
      </div>
    </div>
  );
};

export default Banner;
