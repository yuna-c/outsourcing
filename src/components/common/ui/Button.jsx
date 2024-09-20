const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`text-white border border-transparent rounded-full overflow-hidden bg-custom-deepblue hover:bg-custom-skyblue transition-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
