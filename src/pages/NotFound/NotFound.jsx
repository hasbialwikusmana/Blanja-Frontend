const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-700 mb-8">Page Not Found</p>
        <button onClick={() => window.history.back()} className="bg-primary text-white py-2 px-4 rounded-md shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
