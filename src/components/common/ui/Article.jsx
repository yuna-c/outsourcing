const Article = ({ children, className = '', ...props }) => {
  return (
    <article
<<<<<<< HEAD
      className={`flex flex-col xl:w-full py-5 md:py-5 max-w-full md:w-full sm:w-full w-full mx-auto ${className}`}
=======
      className={`flex flex-col p-5 xl:px-0 xl:w-full max-w-full md:w-full sm:w-full w-full rounded-lg mx-auto ${className}`}
>>>>>>> 32de0e33973d3ae5bc17672c20f9ade30560baf9
      {...props}
    >
      {children}
    </article>
  );
};

export default Article;
