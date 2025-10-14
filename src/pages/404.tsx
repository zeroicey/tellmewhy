import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
            404
          </h1>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="text-8xl mb-4 animate-bounce">🤷‍♂️</div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Go Back Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-block w-full bg-white text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-md"
          >
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Need help?{" "}
            <Link
              to="/ask"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Ask a question
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
