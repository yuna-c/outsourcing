import { FaGithub } from 'react-icons/fa';
import { TeamInfo } from '../../core/hooks/teamInfo';

const Footer = () => {
  return (
    <footer className="px-6 py-5 md:px-3 md:py-5 bg-custom-deepblue Footer">
      <div className="flex items-center justify-center mx-auto text-xs text-white sm:text-sm md:px-2">
        <p>© Copyright 2024 Pharmacies. All rights reserved</p>
      </div>
      <div className="flex items-center justify-center mx-auto mt-6 text-xs text-white sm:text-sm md:px-2">
        {TeamInfo.map((info, index) => {
          return (
            <div key={index} className="flex items-center space-x-2 mx-4">
              <a
                href={info.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 no-underline hover:no-underline"
              >
                <FaGithub size={20} className="text-white" />
                <span className="font-bold">{info.name}</span>
              </a>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
