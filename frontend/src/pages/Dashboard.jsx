import { useEffect, useState } from "react";
import api from "../api/axios";
import CandidateCard from "../components/CandidateCard";
import CandidateForm from "../components/CandidateForm";

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // fetch Candidates
  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/candidates");
      setCandidates(res.data);
    } catch (error) {
      console.error("Failed to fetch candidates", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on page load
  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Candidate Dashboard
        </h1>

        {/* Refer Candidate */}
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Refer Candidate
        </button>
      </div>

      {/* Loading candidates */}
      {loading ? (
        <p className="text-gray-600">Loading candidates...</p>
      ) : candidates.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center text-gray-600">
          No candidates referred yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate._id} candidate={candidate} />
          ))}
        </div>
      )}

      {/* CandidateForm */}
      {showForm && (
        <CandidateForm
          onClose={() => setShowForm(false)}
          onSuccess={fetchCandidates}
        />
      )}
    </div>
  );
};

export default Dashboard;
