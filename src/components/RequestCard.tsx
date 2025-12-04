import { Calendar, Clock, ChevronRight } from "lucide-react";

interface Request {
  id: string;
  friendName: string;
  friendAvatar?: string;
  date: string;
  time: string;
  energyLevel: "High Energy" | "Low Energy" | "Virtual";
  message?: string;
}

interface RequestCardProps {
  request: Request;
  onClick: () => void;
}

export function RequestCard({ request, onClick }: RequestCardProps) {
  const getEnergyColor = (level: string) => {
    switch (level) {
      case "High Energy":
        return "bg-[#E8B8FE] text-[#0A1628]";
      case "Low Energy":
        return "bg-[#CEFEB8] text-[#0A1628]";
      case "Virtual":
        return "bg-blue-400 text-[#0A1628]";
      default:
        return "bg-white/20 text-white";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <button
      onClick={onClick}
      className="w-full bg-white/5 hover:bg-white/8 rounded-2xl p-4 border border-white/10 hover:border-[#E8B8FE]/30 transition-all text-left"
    >
      {/* Friend Info */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E8B8FE] to-[#CEFEB8] flex items-center justify-center flex-shrink-0">
          <span className="text-[#0A1628] font-semibold">
            {getInitials(request.friendName)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-medium">{request.friendName}</h3>
            <ChevronRight className="w-5 h-5 text-white/40" />
          </div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getEnergyColor(request.energyLevel)}`}>
            {request.energyLevel}
          </span>
        </div>
      </div>

      {/* Date & Time */}
      <div className="flex items-center gap-4 text-sm text-white/70 mb-2">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#E8B8FE]" />
          <span>{formatDate(request.date)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#CEFEB8]" />
          <span>{request.time}</span>
        </div>
      </div>

      {/* Message Preview */}
      {request.message && (
        <p className="text-white/60 text-sm line-clamp-1">
          "{request.message}"
        </p>
      )}
    </button>
  );
}
