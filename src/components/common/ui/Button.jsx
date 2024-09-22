const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`text-white border px-3 py-1 text-base border-transparent rounded-full overflow-hidden bg-custom-deepblue hover:bg-custom-skyblue hover:border-custom-skyblue hover:text-white transition-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
