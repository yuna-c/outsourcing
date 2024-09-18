const Article = ({ children, className = '', ...props }) => {
  return (
    <article
      className={`flex flex-col xl:w-full py-5 md:py-5 max-w-full md:w-full sm:w-full w-full mx-auto ${className}`}
      {...props}
    >
      {children}
    </article>
  );
};

export default Article;
