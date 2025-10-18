import { useState, useEffect } from "react";
import { Calendar, Cpu, Palette, Grid3x3 } from "lucide-react";
import dataService from "./services/dataService";
import EventCard from "./components/EventCard";
import StatsOverview from "./components/StatsOverview";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, technical, non-tech
  const [sortBy, setSortBy] = useState("registrations"); // registrations, name

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [eventsData, statsData] = await Promise.all([
        dataService.getEvents(),
        dataService.getStats(),
      ]);

      setEvents(eventsData);
      setStats(statsData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(
        "Failed to load data. Please make sure the JSON files are available."
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter events
  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true;
    return event.eventType === filter;
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "registrations") {
      return b.registrationCount - a.registrationCount;
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchData} />;
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-6 py-10">
        {/* Statistics Overview */}
        {stats && <StatsOverview stats={stats} />}

        {/* Filters and Sort */}
        <div className="mb-8 glass-card p-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setFilter("all")}
                className={`px-8 py-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  filter === "all"
                    ? "bg-[#2a2a2a] text-white border-2 border-[#3a3a3a] hover:bg-[#353535] hover:border-[#454545]"
                    : "bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a] border-2 border-[#2a2a2a] hover:border-[#3a3a3a]"
                }`}
              >
                <Grid3x3 size={16} />
                All Events
              </button>
              <button
                onClick={() => setFilter("technical")}
                className={`px-8 py-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  filter === "technical"
                    ? "bg-[#2a2a2a] text-blue-400 border-2 border-[#3a3a3a] hover:bg-[#353535] hover:border-[#454545]"
                    : "bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a] border-2 border-[#2a2a2a] hover:border-[#3a3a3a]"
                }`}
              >
                <Cpu size={16} />
                Technical
              </button>
              <button
                onClick={() => setFilter("non-tech")}
                className={`px-8 py-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  filter === "non-tech"
                    ? "bg-[#2a2a2a] text-green-400 border-2 border-[#3a3a3a] hover:bg-[#353535] hover:border-[#454545]"
                    : "bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a] border-2 border-[#2a2a2a] hover:border-[#3a3a3a]"
                }`}
              >
                <Palette size={16} />
                Non-Technical
              </button>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-xs font-normal text-gray-400">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-4 bg-[#2a2a2a] backdrop-blur-sm border-2 border-[#2a2a2a] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3a3a3a] focus:border-transparent"
              >
                <option value="registrations" className="bg-[#191919]">
                  Registrations
                </option>
                <option value="name" className="bg-[#191919]">
                  Name
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {sortedEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="glass-card p-16 max-w-md mx-auto">
              <p className="text-gray-400 text-sm">
                No events found matching your filters.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
