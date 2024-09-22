const Article = ({ children, className = '', ...props }) => {
  return (
    <article
      className={`flex flex-col xl:px-0 xl:w-full max-w-full md:w-full sm:w-full w-full mt-24 mx-auto ${className}`}
      {...props}
    >
      {children}
    </article>
  );
};

export default Article;
