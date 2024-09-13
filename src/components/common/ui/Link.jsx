import { NavLink as RouterNavLink } from 'react-router-dom';

const Link = ({ label, children, className = '', ...props }) => {
  return (
    <RouterNavLink
      className={({ isActive }) =>
        `inline-flex ${className} ${isActive ? 'active text-custom-teal font-bold' : 'text-black'}`
      }
      {...props}
    >
      {label || children}
    </RouterNavLink>
  );
};

export default Link;
