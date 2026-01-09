import { useEffect, useState } from "react";
import api from "../api/axios";

const CandidateDetailsModal = ({ candidate, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    name: candidate.name,
    email: candidate.email,
    phone: candidate.phone,
    jobTitle: candidate.jobTitle,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Update candidate
  const handleUpdate = async () => {
    try {
      setLoading(true);
      await api.put(`/api/candidates/${candidate._id}`, formData);
      onUpdated();
      onClose();
    } catch (err) {
      setError("Failed to update candidate");
    } finally {
      setLoading(false);
    }
  };

  // Delete candidate
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this candidate?"))
      return;

    try {
      setLoading(true);
      await api.delete(`/api/candidates/${candidate._id}`);
      onUpdated();
      onClose();
    } catch (err) {
      setError("Failed to delete candidate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Candidate Details</h2>

        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              value={formData.email}
              disabled
              className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Job Title</label>
            <input
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Resume */}
          {candidate.resumeUrl && (
            <a
              href={candidate.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm underline inline-block mt-2"
            >
              View Resume (PDF)
            </a>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
            disabled={loading}
          >
            Delete
          </button>

          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={loading}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsModal;
