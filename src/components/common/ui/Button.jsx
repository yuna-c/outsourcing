const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`text-white rounded-md bg-black hover:bg-custom-teal
      focus:ring-2 focus:ring-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-custom-teal focus-visible:outline-custom-teal
      hover:outline hover:outline-2 hover:outline-custom-teal ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
