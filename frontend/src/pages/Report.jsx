import React, { useState } from 'react';
import axios from 'axios';
import Alert from '../components/Alert';

const Report = () => {
  const [content, setContent] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (!content) {
      setAlert({ type: 'danger', message: 'Report content cannot be empty.' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/reports', {
        report: {
          content: content,
          status: 'new'
        }
      });

      if (response.status === 201) {
        setAlert({ type: 'success', message: 'Report submitted successfully!' });
        setContent('');
      }
    } catch (error) {
      setAlert({ type: 'danger', message: 'There was an error submitting the report.' });
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Submit a Confidential Report</h2>
      <p>Please provide details of the incident. Your report will be reviewed by an administrator.</p>

      {alert && <Alert type={alert.type} message={alert.message} />}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="reportContent" className="form-label">Report Details</label>
          <textarea
            className="form-control"
            id="reportContent"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe the incident, including any links or usernames if possible..."
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Report</button>
      </form>
    </div>
  );
};

export default Report;