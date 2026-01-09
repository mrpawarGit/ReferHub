import { useState } from "react";
import api from "../api/axios";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Reviewed: "bg-blue-100 text-blue-700",
  Hired: "bg-green-100 text-green-700",
};

const CandidateCard = ({ candidate, onClick }) => {
  const [status, setStatus] = useState(candidate.status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setLoading(true);

    try {
      await api.put(`/api/candidates/${candidate._id}/status`, {
        status: newStatus,
      });
      setStatus(newStatus);
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded shadow flex items-center justify-between cursor-pointer hover:bg-gray-50"
    >
      <div>
        <h2 className="font-semibold text-lg">{candidate.name}</h2>
        <p className="text-sm text-gray-600">{candidate.jobTitle}</p>
      </div>

      {/* Status Section */}
      <div className="flex items-center gap-3">
        <span
          className={`px-3 py-1 rounded text-sm font-medium ${statusColors[status]}`}
        >
          {status}
        </span>

        <select
          onClick={(e) => e.stopPropagation()}
          onChange={handleStatusChange}
          value={status}
          disabled={loading}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Hired">Hired</option>
        </select>
      </div>
    </div>
  );
};

export default CandidateCard;
