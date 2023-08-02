import { Link, useLocation } from "react-router-dom";

const ArticlePage = () => {
  const location = useLocation();

  return <Link to={location.state.from}>Back to products</Link>;
};

export default ArticlePage;
