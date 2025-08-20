import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reports');
      setReports(response.data);
    } catch (err) {
      setError('Failed to load reports.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async (reportId, content) => {
    setReports(reports.map(r => r.id === reportId ? { ...r, analyzing: true } : r));

    try {
      const response = await axios.post(`http://localhost:5000/api/reports/${reportId}/analyze`, { content });
      
      setReports(reports.map(r => 
        r.id === reportId 
        ? { ...r, ai_analysis: response.data.ai_analysis, analyzing: false } 
        : r
      ));

    } catch (err) {
      console.error("Analysis failed:", err);
      setReports(reports.map(r => r.id === reportId ? { ...r, analyzing: false } : r));
      alert("Failed to get AI analysis. Check the console for details.");
    }
  };

  if (loading) return <div className="container mt-5"><p>Loading reports...</p></div>;
  if (error) return <div className="container mt-5"><p className="text-danger">{error}</p></div>;

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <p>Viewing all submitted reports.</p>
      <div className="list-group">
        {reports.length > 0 ? (
          reports.map(report => (
            <div key={report.id} className="list-group-item mb-3 shadow-sm">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Report #{report.id}</h5>
                <small>Status: <span className="badge bg-primary">{report.status}</span></small>
              </div>
              <p className="mb-1"><strong>Content:</strong> {report.content}</p>
              <small className="text-muted">Reported on: {new Date(report.created_at).toLocaleString()}</small>
              
              <div className="mt-3 p-3 bg-light rounded border">
                {report.ai_analysis ? (
                  <div>
                    <h6>AI Analysis:</h6>
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '0.9rem' }}>{report.ai_analysis}</pre>
                  </div>
                ) : (
                  <button 
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleAnalyze(report.id, report.content)}
                    disabled={report.analyzing}
                  >
                    {report.analyzing ? 'Analyzing...' : 'Analyze with AI'}
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="list-group-item">No reports found.</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;