import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="p-5 mb-4 bg-light rounded-3 text-center">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">AI-Powered Moderator Assistant</h1>
          <p className="fs-4">
            Help us build a safer online community. Submit reports of harmful content,
            and our AI will assist moderators in analyzing and responding effectively.
          </p>
          <Link className="btn btn-primary btn-lg mt-3" to="/report">
            Submit a Confidential Report
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;