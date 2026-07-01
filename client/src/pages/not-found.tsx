import "styles/notfound.css";
import { Link } from "react-router";
import { Compass, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="content page-notfound">
      <div className="nf-card">
        <div className="nf-icon">
          <Compass size={30} />
        </div>
        <p className="nf-code">404</p>
        <h1 className="nf-title">Page not found</h1>
        <p className="nf-text">
          The page you're looking for doesn't exist or was moved.
        </p>
        <Link to="/backlog" className="nf-btn">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
