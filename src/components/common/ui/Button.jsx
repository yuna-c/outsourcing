import { FaGithub } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';

const COMMON_BUTTON_STYLE =
  'text-white border px-3 py-1 text-base border-transparent rounded-full overflow-hidden bg-custom-deepblue hover:bg-custom-skyblue hover:border-custom-skyblue hover:text-white transition-none';

const Button = ({ children, className, variant, ...props }) => {
  if (variant === 'github') {
    return (
      <button className={`${COMMON_BUTTON_STYLE} ${className}`} {...props}>
        <span className="flex items-center justify-center">
          <FaGithub className="mr-2 -mt-[2px] text-lg" />
          {children}
        </span>
      </button>
    );
  }

  if (variant === 'kakao') {
    return (
      <button className={`${COMMON_BUTTON_STYLE} ${className}`} {...props}>
        <span className="flex items-center justify-center">
          <RiKakaoTalkFill className="mr-2 -mt-[2px] text-lg" />
          {children}
        </span>
      </button>
    );
  }

  return (
    <button className={`${COMMON_BUTTON_STYLE} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
