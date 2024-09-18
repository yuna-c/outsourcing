const Article = ({ children, className = '', ...props }) => {
  return (
    <article
      className={`flex flex-col md:p-2 p-5 xl:w-full max-w-full md:w-full sm:w-full w-full rounded-lg mx-auto ${className}`}
      {...props}
    >
      {children}
    </article>
  );
};

export default Article;
