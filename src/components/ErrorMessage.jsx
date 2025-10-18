import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-12 max-w-md text-center">
        <div className="mb-8 relative">
          <div className="inline-block p-5 bg-[#2a2a2a] rounded-full animate-pulse">
            <AlertCircle className="text-red-400" size={48} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-4 border-[#2a2a2a] rounded-full animate-ping"></div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-400 mb-10 text-sm">{message}</p>

        <button
          onClick={onRetry}
          className="btn-primary flex items-center gap-2 mx-auto"
        >
          <RefreshCw size={18} />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
