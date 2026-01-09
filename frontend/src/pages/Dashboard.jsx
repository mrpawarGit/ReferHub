import { useEffect, useState } from "react";
import api from "../api/axios";
import CandidateCard from "../components/CandidateCard";
import CandidateForm from "../components/CandidateForm";
import CandidateDetailsModal from "../components/CandidateDetailsModal";

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  //
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  const filteredCandidates = candidates.filter((candidate) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      candidate.jobTitle.toLowerCase().includes(searchText) ||
      candidate.name.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || candidate.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/2"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/4"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Hired">Hired</option>
        </select>
      </div>

      {/* Loading candidates */}
      {loading ? (
        <p className="text-gray-600">Loading candidates...</p>
      ) : filteredCandidates.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center text-gray-600">
          No matching candidates found.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredCandidates.map((candidate) => (
            <CandidateCard
              key={candidate._id}
              candidate={candidate}
              onClick={() => setSelectedCandidate(candidate)}
            />
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

      {selectedCandidate && (
        <CandidateDetailsModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onUpdated={fetchCandidates}
        />
      )}
    </div>
  );
};

export default Dashboard;
