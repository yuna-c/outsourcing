const Article = ({ children, className = '', ...props }) => {
  return (
    <article
      className={`flex flex-col md:p-2 p-5 xl:w-1/2 max-w-full md:w-full sm:w-full rounded-lg ${className}`}
      {...props}
    >
      {children}
    </article>
  );
};

export default Article;
