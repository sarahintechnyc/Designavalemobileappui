import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, Users, Sparkles, Filter, TrendingUp, RefreshCw, ChevronRight as ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ConfirmedPlansModal } from "./ConfirmedPlansModal";
import { EnergyBadge } from "./EnergyBadge";

interface HomeScreenProps {
  onAddAvailability: () => void;
  onFriendClick: (friendId: string) => void;
}

const mockFriends = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    availableTime: "Sunday, 10:00 AM - 2:30 PM",
    energy: "high" as const,
    activities: ["Coffee", "Brunch"],
    status: "Down for adventure!",
    mutualFree: true,
    new: true,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    availableTime: "Saturday, 6:00 PM - 10:00 PM",
    energy: "high" as const,
    activities: ["Dinner", "Games"],
    status: "Let's gooo",
    mutualFree: false,
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    availableTime: "Friday, 8:00 PM - 11:00 PM",
    energy: "low" as const,
    activities: ["Movie Night", "Chill"],
    status: "Cozy vibes only",
    mutualFree: true,
  },
  {
    id: "4",
    name: "Alex Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    availableTime: "Tomorrow, 3:00 PM - 5:00 PM",
    energy: "virtual" as const,
    activities: ["Gaming", "Video Call"],
    status: "Online and ready",
    mutualFree: false,
  },
];

const weekDays = [
  { day: "Wed", date: 5, isToday: true, hasAvailability: true, count: 2 },
  { day: "Thu", date: 6, hasAvailability: false, count: 0 },
  { day: "Fri", date: 7, hasAvailability: true, count: 1 },
  { day: "Sat", date: 8, hasAvailability: true, count: 3 },
  { day: "Sun", date: 9, hasAvailability: true, count: 4 },
  { day: "Mon", date: 10, hasAvailability: false, count: 0 },
  { day: "Tue", date: 11, hasAvailability: false, count: 0 },
];

export function HomeScreen({ onAddAvailability, onFriendClick }: HomeScreenProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "mutual" | "new">("all");
  const [showConfirmedPlans, setShowConfirmedPlans] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const filteredFriends = mockFriends.filter(friend => {
    if (activeFilter === "mutual") return friend.mutualFree;
    if (activeFilter === "new") return friend.new;
    return true;
  });

  return (
    <div className="h-full overflow-auto pb-28">
      {/* Pull to Refresh Indicator */}
      {isRefreshing && (
        <div className="absolute top-0 left-0 right-0 flex justify-center py-4 z-20 bg-gradient-to-b from-[#0a0b1e] to-transparent">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <RefreshCw className="w-5 h-5 text-[#E8B8FE]" />
          </motion.div>
        </div>
      )}

      <div className="px-5 pt-6">
        {/* Header with Status */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="mb-1">Hey there! 👋</h1>
              <p className="text-[#9899ac]">Here's what's happening</p>
            </div>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-xl hover:bg-[#1a1b3a] transition-colors"
            >
              <RefreshCw className={`w-5 h-5 text-[#9899ac] ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Your Plans Summary - Clickable */}
        <button
          onClick={() => setShowConfirmedPlans(true)}
          className="w-full mb-6 p-4 rounded-2xl bg-[#141530] border border-[#E8B8FE]/10 hover:border-[#E8B8FE]/30 transition-all text-left"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CEFEB8] to-[#E8B8FE] flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-[#0a0b1e]" />
            </div>
            <div className="flex-1">
              <p className="mb-1">This Week</p>
              <p className="text-sm text-[#9899ac]">
                3 confirmed plans • 4 friends available
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-[#E8B8FE]" />
          </div>
          <div className="text-sm text-[#9899ac]">
            Next: <span className="text-[#CEFEB8]">Sunday 10 AM with Sarah</span> ☕
          </div>
        </button>

        {/* Week View with Availability Dots */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[#9899ac] uppercase tracking-wide text-xs">NOV 5</span>
              <Badge variant="outline" className="border-[#CEFEB8]/30 text-[#CEFEB8] text-xs">
                7 friends free
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-[#f5f5f7] hover:bg-[#1a1b3a] h-8 text-xs">
                Today
              </Button>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-[#f5f5f7] hover:bg-[#1a1b3a]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-[#f5f5f7] hover:bg-[#1a1b3a]"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
            {weekDays.map((day, index) => (
              <button
                key={index}
                className={`relative flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl transition-all ${
                  day.isToday
                    ? "bg-gradient-to-br from-[#E8B8FE] to-[#CEFEB8] text-[#0a0b1e] shadow-lg shadow-[#E8B8FE]/30"
                    : day.hasAvailability
                    ? "bg-[#141530] text-[#f5f5f7] border border-[#E8B8FE]/20 hover:border-[#E8B8FE]/40"
                    : "bg-[#141530]/50 text-[#9899ac] border border-transparent"
                }`}
              >
                <span className="text-xs mb-1">{day.day}</span>
                <span className="text-lg mb-1">{day.date}</span>
                {day.hasAvailability && (
                  <div className="flex gap-0.5">
                    {Array.from({ length: Math.min(day.count, 3) }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full ${
                          day.isToday ? "bg-[#0a0b1e]" : "bg-[#CEFEB8]"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Friends' Availability with Filters */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2">
              Friends' Avales
              {filteredFriends.length !== mockFriends.length && (
                <Badge className="bg-[#E8B8FE]/20 text-[#E8B8FE]">
                  {filteredFriends.length}
                </Badge>
              )}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilter(!showFilter)}
              className="text-[#E8B8FE] hover:bg-[#E8B8FE]/10 h-8"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
          </div>

          {/* Filter Pills */}
          {showFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex gap-2 mb-4 overflow-x-auto pb-2"
            >
              {[
                { id: "all", label: "All Friends", icon: Users },
                { id: "mutual", label: "Mutual Free", icon: Sparkles },
                { id: "new", label: "New Updates", icon: TrendingUp },
              ].map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                      activeFilter === filter.id
                        ? "bg-[#E8B8FE] text-[#0a0b1e]"
                        : "bg-[#141530] text-[#9899ac] hover:bg-[#1a1b3a]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{filter.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}

          <div className="space-y-3">
            {filteredFriends.map((friend) => (
              <motion.button
                key={friend.id}
                layout
                onClick={() => onFriendClick(friend.id)}
                className="relative w-full p-4 rounded-2xl bg-[#141530] border border-[#E8B8FE]/10 hover:border-[#E8B8FE]/30 transition-all text-left overflow-hidden group"
              >
                {/* Mutual Free Indicator */}
                {friend.mutualFree && (
                  <div className="absolute top-3 right-3">
                    <div className="w-2 h-2 rounded-full bg-[#CEFEB8] animate-pulse" />
                  </div>
                )}

                {/* New Badge */}
                {friend.new && (
                  <Badge className="absolute top-3 right-3 bg-[#E8B8FE] text-[#0a0b1e] text-xs px-2 py-0">
                    NEW
                  </Badge>
                )}

                <div className="flex items-start gap-3">
                  <Avatar className="w-14 h-14 ring-2 ring-[#E8B8FE]/20 group-hover:ring-[#E8B8FE]/40 transition-all">
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback>{friend.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="truncate">{friend.name}</h4>
                    </div>
                    <p className="text-xs text-[#9899ac] mb-2 italic">"{friend.status}"</p>
                    <p className="text-sm text-[#9899ac] mb-2 flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" />
                      {friend.availableTime}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <EnergyBadge energy={friend.energy} size="sm" />
                      {friend.activities.map((activity, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-lg bg-[#E8B8FE]/10 text-[#E8B8FE] text-xs"
                        >
                          {activity}
                        </span>
                      ))}
                      {friend.mutualFree && (
                        <span className="px-2 py-1 rounded-lg bg-[#CEFEB8]/10 text-[#CEFEB8] text-xs flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Both Free
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button with Label */}
      <motion.button
        onClick={onAddAvailability}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed right-5 bottom-24 group"
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E8B8FE] to-[#CEFEB8] text-[#0a0b1e] shadow-lg shadow-[#E8B8FE]/50 hover:shadow-xl hover:shadow-[#E8B8FE]/60 transition-all flex items-center justify-center">
            <Plus className="w-7 h-7" />
          </div>
          <div className="absolute -top-10 right-0 bg-[#141530] border border-[#E8B8FE]/20 px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-sm">
            Add Avale
          </div>
        </div>
      </motion.button>

      {/* Confirmed Plans Modal */}
      <AnimatePresence>
        {showConfirmedPlans && (
          <ConfirmedPlansModal onClose={() => setShowConfirmedPlans(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
