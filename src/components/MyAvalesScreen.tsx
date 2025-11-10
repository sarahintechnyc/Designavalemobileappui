import { Calendar, Clock, Plus, Edit, Trash2, Copy, MoreVertical, Repeat } from "lucide-react";
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

export function MyAvalesScreen({ onAddAvailability }: MyAvalesScreenProps) {
  const [swipedCardId, setSwipedCardId] = useState<string | null>(null);

  const handleDragEnd = (cardId: string, info: PanInfo) => {
    if (info.offset.x < -100) {
      setSwipedCardId(cardId);
    } else if (info.offset.x > 100) {
      setSwipedCardId(null);
    } else {
      setSwipedCardId(null);
    }
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
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onAddAvailability}
            className="p-4 rounded-2xl bg-[#141530] border border-[#E8B8FE]/20 hover:border-[#E8B8FE]/40 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8B8FE] to-[#CEFEB8] flex items-center justify-center mb-2">
              <Plus className="w-5 h-5 text-[#0a0b1e]" />
            </div>
            <p className="text-sm mb-1">Custom Avale</p>
            <p className="text-xs text-[#9899ac]">Set your own time</p>
          </button>
          <button className="p-4 rounded-2xl bg-[#141530] border border-[#E8B8FE]/20 hover:border-[#E8B8FE]/40 transition-all text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CEFEB8]/30 to-[#E8B8FE]/30 flex items-center justify-center mb-2">
              <Repeat className="w-5 h-5 text-[#CEFEB8]" />
            </div>
            <p className="text-sm mb-1">Recurring</p>
            <p className="text-xs text-[#9899ac]">Weekly availability</p>
          </button>
        </div>
      </div>

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
                className="relative p-4 rounded-2xl bg-[#141530] border border-[#E8B8FE]/10 cursor-grab active:cursor-grabbing"
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
                  <button className="p-2 -mr-2 rounded-full hover:bg-[#1a1b3a] transition-colors">
                    <MoreVertical className="w-5 h-5 text-[#9899ac]" />
                  </button>
                </div>

                {/* Quick Actions Bar */}
                <div className="flex gap-2 pt-3 border-t border-white/5">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-[#9899ac] hover:text-[#E8B8FE] hover:bg-[#E8B8FE]/10 h-9"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-[#9899ac] hover:text-[#CEFEB8] hover:bg-[#CEFEB8]/10 h-9"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate
                  </Button>
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
