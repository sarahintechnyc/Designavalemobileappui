import { Calendar, Clock, Plus, Edit, Trash2, Copy, MoreVertical, Repeat, Send, X, User } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion, PanInfo } from "motion/react";
import { useState } from "react";
import { EnergyBadge } from "./EnergyBadge";

interface MyAvalesScreenProps {
  onAddAvailability: () => void;
}

const upcomingAvales = [
  {
    id: "1",
    day: "Sunday, Nov 9",
    time: "10:00 AM - 2:30 PM",
    energy: "high" as const,
    activities: ["Coffee", "Brunch"],
    sharedWith: 4,
    confirmed: 2,
    recurring: false,
  },
  {
    id: "2",
    day: "Friday, Nov 7",
    time: "8:00 PM - 11:00 PM",
    energy: "low" as const,
    activities: ["Movie Night", "Chill"],
    sharedWith: 3,
    confirmed: 0,
    recurring: false,
  },
  {
    id: "3",
    day: "Every Saturday",
    time: "9:00 AM - 11:00 AM",
    energy: "high" as const,
    activities: ["Yoga", "Workout"],
    sharedWith: 2,
    confirmed: 2,
    recurring: true,
  },
];

const pendingRequests = [
  {
    id: "pr1",
    friendName: "Kelly Martinez",
    date: "Sunday, Nov 9",
    time: "10:00 AM",
    energy: "high" as const,
    message: "Want to check out that new arcade bar?",
    sentTime: "2 hours ago",
  },
  {
    id: "pr2",
    friendName: "Alex Kim",
    date: "Friday, Nov 7",
    time: "8:00 PM",
    energy: "low" as const,
    message: "Movie night?",
    sentTime: "1 day ago",
  },
];

export function MyAvalesScreen({ onAddAvailability }: MyAvalesScreenProps) {
  const [swipedCardId, setSwipedCardId] = useState<string | null>(null);
  const [pendingRequestsList, setPendingRequestsList] = useState(pendingRequests);

  const handleDragEnd = (cardId: string, info: PanInfo) => {
    if (info.offset.x < -100) {
      setSwipedCardId(cardId);
    } else if (info.offset.x > 100) {
      setSwipedCardId(null);
    } else {
      setSwipedCardId(null);
    }
  };

  const handleCancelRequest = (requestId: string) => {
    setPendingRequestsList(pendingRequestsList.filter(req => req.id !== requestId));
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
    <div className="h-full overflow-auto pb-28 px-5 pt-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-1">My Avales</h1>
        <p className="text-[#9899ac]">Manage when you're free to hang</p>
      </div>

      {/* Quick Add Options */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm text-[#9899ac]">Quick Add</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          <button
            onClick={onAddAvailability}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#141530] border border-[#E8B8FE]/20 hover:border-[#E8B8FE]/40 transition-all whitespace-nowrap flex-shrink-0"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#E8B8FE] to-[#CEFEB8] flex items-center justify-center">
              <Plus className="w-3.5 h-3.5 text-[#0a0b1e]" />
            </div>
            <span className="text-sm">Custom Avale</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#141530] border border-[#E8B8FE]/20 hover:border-[#E8B8FE]/40 transition-all whitespace-nowrap flex-shrink-0">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#CEFEB8]/30 to-[#E8B8FE]/30 flex items-center justify-center">
              <Repeat className="w-3.5 h-3.5 text-[#CEFEB8]" />
            </div>
            <span className="text-sm">Recurring</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#141530] border border-[#E8B8FE]/20 hover:border-[#E8B8FE]/40 transition-all whitespace-nowrap flex-shrink-0">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#CEFEB8]/20 to-[#E8B8FE]/20 flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5 text-[#CEFEB8]" />
            </div>
            <span className="text-sm">Today</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#141530] border border-[#E8B8FE]/20 hover:border-[#E8B8FE]/40 transition-all whitespace-nowrap flex-shrink-0">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#E8B8FE]/20 to-[#CEFEB8]/20 flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5 text-[#E8B8FE]" />
            </div>
            <span className="text-sm">This Weekend</span>
          </button>
        </div>
      </div>

      {/* Pending Requests Section */}
      {pendingRequestsList.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3>Pending Requests</h3>
              <Badge className="bg-[#E8B8FE]/20 text-[#E8B8FE] text-xs px-2 py-0">
                {pendingRequestsList.length}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            {pendingRequestsList.map((request) => (
              <motion.div
                key={request.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="p-4 rounded-2xl bg-[#141530] border border-[#E8B8FE]/10"
              >
                {/* Friend Info */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E8B8FE] to-[#CEFEB8] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0a0b1e] text-xs">
                      {getInitials(request.friendName)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm">Sent to {request.friendName}</h4>
                      <span className="text-xs text-[#9899ac]">{request.sentTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#9899ac] mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>{request.date} at {request.time}</span>
                    </div>
                    <EnergyBadge energy={request.energy} size="sm" />
                  </div>
                </div>

                {/* Message */}
                {request.message && (
                  <div className="bg-[#0a0b1e]/50 rounded-xl p-3 mb-3">
                    <p className="text-sm text-[#f5f5f7]/90">{request.message}</p>
                  </div>
                )}

                {/* Status & Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                    <span className="text-xs text-[#9899ac]">Awaiting response</span>
                  </div>
                  <button
                    onClick={() => handleCancelRequest(request.id)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Cancel
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Availability with Swipe Actions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3>Upcoming Availability</h3>
          <button className="text-[#E8B8FE] text-sm flex items-center gap-1">
            View All
          </button>
        </div>

        <div className="space-y-3">
          {upcomingAvales.map((avale) => (
            <div key={avale.id} className="relative">
              {/* Swipe Action Buttons */}
              <div className="absolute inset-0 flex items-center justify-between px-4 rounded-2xl bg-gradient-to-r from-[#E8B8FE]/20 to-red-500/20">
                <div className="flex gap-2">
                  <div className="w-12 h-12 rounded-xl bg-[#E8B8FE]/30 flex items-center justify-center">
                    <Edit className="w-5 h-5 text-[#E8B8FE]" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#CEFEB8]/30 flex items-center justify-center">
                    <Copy className="w-5 h-5 text-[#CEFEB8]" />
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-500/30 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-400" />
                </div>
              </div>

              {/* Card with Swipe */}
              <motion.div
                drag="x"
                dragConstraints={{ left: -200, right: 200 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => handleDragEnd(avale.id, info)}
                onClick={() => {
                  // Open edit modal - you'll hook this up to your actual edit function
                  console.log('Edit avale:', avale.id);
                }}
                className="relative p-4 rounded-2xl bg-[#141530] border border-[#E8B8FE]/10 cursor-pointer active:cursor-grabbing"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{avale.day}</h4>
                      {avale.recurring && (
                        <Badge variant="outline" className="border-[#9899ac]/30 text-[#9899ac] text-xs px-1.5 py-0">
                          <Repeat className="w-3 h-3" />
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#9899ac] mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {avale.time}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <EnergyBadge energy={avale.energy} size="sm" />
                      {avale.activities.map((activity, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-[#E8B8FE]/10 text-[#E8B8FE] text-sm"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-[#9899ac]">
                        Shared with {avale.sharedWith} friends
                      </span>
                      {avale.confirmed > 0 && (
                        <Badge className="bg-[#CEFEB8]/20 text-[#CEFEB8] text-xs px-2 py-0">
                          {avale.confirmed} confirmed
                        </Badge>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Open more options menu
                    }}
                    className="p-2 -mr-2 rounded-full hover:bg-[#1a1b3a] transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-[#9899ac]" />
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Swipe Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-3 rounded-xl bg-[#141530]/50 border border-dashed border-[#E8B8FE]/10 text-center"
        >
          <p className="text-xs text-[#9899ac]">💡 Swipe cards left or right for quick actions</p>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        onClick={onAddAvailability}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed right-5 bottom-24"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E8B8FE] to-[#CEFEB8] text-[#0a0b1e] shadow-lg shadow-[#E8B8FE]/50 hover:shadow-xl hover:shadow-[#E8B8FE]/60 transition-all flex items-center justify-center">
          <Plus className="w-7 h-7" />
        </div>
      </motion.button>
    </div>
  );
}