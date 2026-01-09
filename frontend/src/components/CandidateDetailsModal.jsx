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
        className="bg-white w-full max-w-lg rounded-lg p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Candidate Details</h2>

        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              value={formData.email}
              disabled
              className="w-full border border-gray-300 px-3 py-2 rounded mt-1 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* --- UPDATED RESUME UI START --- */}
          {candidate.resumeUrl && (
            <div className="pt-2">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Resume
              </label>
              <a
                href={candidate.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-blue-50 hover:border-blue-200 transition-all group"
              >
                {/* PDF Icon */}
                <div className="p-2 bg-red-100 rounded-lg mr-3">
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">
                    Open Resume.pdf
                  </p>
                  <p className="text-xs text-gray-500">
                    Click to view document
                  </p>
                </div>

                {/* External Link Icon */}
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}
          {/* --- UPDATED RESUME UI END --- */}
        </div>

        <div className="flex justify-between mt-8 pt-4 border-t">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded transition-colors"
            disabled={loading}
          >
            Delete
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium shadow-sm disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsModal;
