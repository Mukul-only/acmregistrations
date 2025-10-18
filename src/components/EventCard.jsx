import { useState } from "react";
import {
  Users,
  ChevronDown,
  ChevronUp,
  User,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  Crown,
  Eye,
  EyeOff,
} from "lucide-react";
import dataService from "../services/dataService";

const EventCard = ({ event }) => {
  const [showRegistrations, setShowRegistrations] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRegistrations = async () => {
    if (showRegistrations) {
      setShowRegistrations(false);
      return;
    }

    try {
      setLoading(true);
      const data = await dataService.getEventRegistrations(event.id);
      setRegistrations(data);
      setShowRegistrations(true);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      alert("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="glass-card overflow-hidden group">
      {/* Event Header */}
      <div className="relative h-40 bg-[#2a2a2a] flex items-center justify-center overflow-hidden border-b border-[#2a2a2a]">
        <div className="relative text-white text-center p-8 z-10">
          <Sparkles className="mx-auto mb-4" size={24} />
          <h3 className="text-xl font-semibold tracking-tight">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-8">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span
            className={`badge ${
              event.eventType === "technical"
                ? "badge-technical"
                : "badge-non-tech"
            }`}
          >
            {event.eventType}
          </span>
          <span
            className={`badge ${
              event.playerMode === "single player"
                ? "badge-single"
                : "badge-team"
            }`}
          >
            {event.playerMode}
          </span>
          {event.teamsize && (
            <span className="badge bg-[#1a1a1a] text-pink-400 border border-[#2a2a2a]">
              Team: {event.teamsize}
            </span>
          )}
          {event.subCategory && (
            <span className="badge bg-[#1a1a1a] text-indigo-400 border border-[#2a2a2a]">
              {event.subCategory}
            </span>
          )}
        </div>

        <p className="text-gray-400 text-xs mb-8 line-clamp-2">
          {event.description}
        </p>

        {/* Registration Stats */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between p-5 bg-[#1a1a1a] backdrop-blur-sm rounded-xl border border-[#2a2a2a] transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#2a2a2a] rounded-lg">
                <Users className="text-purple-400" size={18} />
              </div>
              <span className="text-xs font-normal text-gray-400">
                Registrations
              </span>
            </div>
            <span className="text-2xl font-bold text-white">
              {event.registrationCount}
            </span>
          </div>

          <div className="flex items-center justify-between p-5 bg-[#1a1a1a] backdrop-blur-sm rounded-xl border border-[#2a2a2a] transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#2a2a2a] rounded-lg">
                <User className="text-green-400" size={18} />
              </div>
              <span className="text-xs font-normal text-gray-400">
                Participants
              </span>
            </div>
            <span className="text-2xl font-bold text-white">
              {event.totalParticipants}
            </span>
          </div>
        </div>

        {/* View Registrations Button */}
        {event.registrationCount > 0 && (
          <button
            onClick={fetchRegistrations}
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              <>
                {showRegistrations ? (
                  <>
                    <EyeOff size={18} />
                    Hide Registrations
                    <ChevronUp size={18} />
                  </>
                ) : (
                  <>
                    <Eye size={18} />
                    View Registrations
                    <ChevronDown size={18} />
                  </>
                )}
              </>
            )}
          </button>
        )}

        {event.registrationCount === 0 && (
          <div className="text-center py-6 px-8 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
            <p className="text-gray-400 text-xs font-normal">
              No registrations yet
            </p>
          </div>
        )}
      </div>

      {/* Registrations List */}
      {showRegistrations && (
        <div className="border-t border-[#2a2a2a] bg-[#1a1a1a] backdrop-blur-sm p-8 max-h-96 overflow-y-auto">
          <h4 className="font-semibold text-sm text-white mb-6 flex items-center gap-3">
            <Users size={18} className="text-purple-400" />
            Registered Users
          </h4>
          <div className="space-y-4">
            {registrations.map((registration, index) => (
              <div
                key={registration._id}
                className="bg-[#1a1a1a] backdrop-blur-sm rounded-xl p-6 border border-[#2a2a2a] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-[#2a2a2a] text-white text-xs font-medium px-4 py-2 rounded-full">
                      #{index + 1}
                    </span>
                    {registration.type === "group" && (
                      <span className="bg-[#2a2a2a] text-orange-400 text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2">
                        <Users size={12} />
                        {registration.groupName}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar size={12} />
                    {formatDate(registration.registrationDate)}
                  </div>
                </div>

                {/* User Details */}
                <div className="space-y-4">
                  {registration.userDetails.map((user, userIndex) => (
                    <div
                      key={user._id}
                      className="pl-6 border-l-2 border-[#2a2a2a]"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-[#2a2a2a] rounded-lg">
                          <User size={12} className="text-purple-400" />
                        </div>
                        <span className="font-medium text-sm text-white">
                          {user.name ||
                            user.username ||
                            user.fullName ||
                            user.firstName ||
                            `User ${user._id?.toString().slice(-6)}`}
                        </span>
                        {registration.type === "group" && userIndex === 0 && (
                          <span className="flex items-center gap-1 text-xs bg-[#2a2a2a] text-yellow-400 px-3 py-1 rounded-full border border-[#2a2a2a]">
                            <Crown size={12} />
                            Leader
                          </span>
                        )}
                      </div>
                      {user.username && user.username !== user.name && (
                        <div className="flex items-center gap-2 text-xs text-gray-400 ml-9 mb-2">
                          <User size={12} />@{user.username}
                        </div>
                      )}
                      {user.email && (
                        <div className="flex items-center gap-2 text-xs text-gray-400 ml-9 mb-2">
                          <Mail size={12} />
                          {user.email}
                        </div>
                      )}
                      {user.phone && (
                        <div className="flex items-center gap-2 text-xs text-gray-400 ml-9">
                          <Phone size={12} />
                          {user.phone}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
