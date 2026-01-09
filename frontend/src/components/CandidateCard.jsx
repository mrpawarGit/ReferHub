const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Reviewed: "bg-blue-100 text-blue-700",
  Hired: "bg-green-100 text-green-700",
};

const CandidateCard = ({ candidate }) => {
  return (
    <div className="bg-white p-4 rounded shadow flex items-center justify-between">
      {/* Info */}
      <div>
        <h2 className="font-semibold text-lg">{candidate.name}</h2>
        <p className="text-sm text-gray-600">{candidate.jobTitle}</p>
      </div>

      {/* Status */}
      <span
        className={`px-3 py-1 rounded text-sm font-medium ${
          statusColors[candidate.status]
        }`}
      >
        {candidate.status}
      </span>
    </div>
  );
};

export default CandidateCard;
