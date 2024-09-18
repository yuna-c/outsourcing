const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`text-white border border-transparent rounded-full overflow-hidden bg-black hover:bg-custom-teal transition-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
