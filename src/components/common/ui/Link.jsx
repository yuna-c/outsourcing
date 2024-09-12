import { NavLink as RouterNavLink } from 'react-router-dom';
const Link = ({ label, className = '', ...props }) => {
  return (
    <RouterNavLink
      className={({ isActive }) =>
        `inline-flex ${className} ${isActive ? 'active text-custom-teal font-bold' : 'text-black'}`
      }
      {...props}
    >
      {label}
    </RouterNavLink>
  );
};

export default Link;
