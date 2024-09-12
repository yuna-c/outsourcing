import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404 - 페이지를 찾을 수 없습니다</h1>
      <p className="mt-4">죄송합니다. 찾을 수 없는 페이지입니다.</p>
      <Link to="/" className="mt-6 text-customTeal hover:underline">
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
