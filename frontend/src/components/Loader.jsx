const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>

        {/* App Name */}
        <h1 className="text-2xl font-bold text-blue-600">ReferHub</h1>

        {/* Message */}
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
