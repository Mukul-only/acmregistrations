import { Sparkles, TrendingUp } from "lucide-react";

const Header = () => {
  return (
    <header className="relative overflow-hidden bg-[#1a1a1a] border-b border-[#2a2a2a]">
      <div className="relative container mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-[#2a2a2a] rounded-2xl shadow-lg border border-[#2a2a2a]">
              <Sparkles size={28} className="text-white" />
            </div>
            <TrendingUp size={24} className="text-gray-400" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Event Registration</span>
            <br />
            <span className="text-white">Dashboard</span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-2xl">
            Real-time analytics and insights for your events
          </p>

          {/* Decorative line */}
          <div className="mt-8 w-32 h-px bg-[#2a2a2a] rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
