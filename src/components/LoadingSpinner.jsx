import { Sparkles } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Outer spinning ring */}
          <div className="inline-block animate-spin rounded-full h-20 w-20 border-4 border-[#2a2a2a] border-t-gray-400"></div>

          {/* Inner pulsing icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="text-gray-400 animate-pulse" size={28} />
          </div>
        </div>

        <p className="mt-8 text-gray-400 font-normal text-sm">
          Loading events...
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-[#2a2a2a] rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-[#2a2a2a] rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-[#2a2a2a] rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
