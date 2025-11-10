import { X, Calendar, Clock, MapPin, MessageCircle, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { EnergyBadge } from "./EnergyBadge";

interface ConfirmedPlansModalProps {
  onClose: () => void;
}

const confirmedPlans = [
  {
    id: "1",
    title: "Coffee & Brunch",
    day: "Sunday, Nov 9",
    time: "10:00 AM - 12:00 PM",
    friends: [
      {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      },
    ],
    location: "Central Park Café",
    energy: "high" as const,
    activities: ["Coffee", "Brunch"],
    status: "confirmed",
  },
  {
    id: "2",
    title: "Game Night",
    day: "Saturday, Nov 8",
    time: "7:00 PM - 10:00 PM",
    friends: [
      {
        name: "Marcus Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      },
      {
        name: "Alex Kim",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      },
    ],
    location: "Marcus's Place",
    energy: "high" as const,
    activities: ["Board Games", "Pizza"],
    status: "confirmed",
  },
  {
    id: "3",
    title: "Yoga Class",
    day: "Friday, Nov 7",
    time: "9:00 AM - 10:30 AM",
    friends: [
      {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      },
    ],
    location: "Sunrise Yoga Studio",
    energy: "low" as const,
    activities: ["Yoga", "Wellness"],
    status: "confirmed",
  },
];

export function ConfirmedPlansModal({ onClose }: ConfirmedPlansModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed inset-x-0 bottom-0 max-h-[85vh] rounded-t-3xl bg-[#0a0b1e] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-b from-[#0a0b1e] to-transparent sticky top-0 z-10 backdrop-blur-sm">
          <div>
            <h2>Confirmed Plans</h2>
            <p className="text-sm text-[#9899ac]">{confirmedPlans.length} upcoming hangouts</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#1a1b3a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {confirmedPlans.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 rounded-full bg-[#141530] flex items-center justify-center mb-4">
                <Calendar className="w-10 h-10 text-[#9899ac]" />
              </div>
              <h3 className="mb-2 text-[#9899ac]">No confirmed plans yet</h3>
              <p className="text-[#9899ac] text-sm text-center">
                Accept requests to see your<br />upcoming hangouts here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {confirmedPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-5 rounded-2xl bg-gradient-to-br from-[#141530] to-[#141530]/50 border border-[#E8B8FE]/20 hover:border-[#E8B8FE]/40 transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3>{plan.title}</h3>
                        <Badge className="bg-[#CEFEB8] text-[#0a0b1e] text-xs px-2 py-0">
                          Confirmed
                        </Badge>
                      </div>
                      <div className="flex flex-col gap-2 text-sm text-[#9899ac] mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{plan.day}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{plan.time}</span>
                        </div>
                        {plan.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{plan.location}</span>
                          </div>
                        )}
                      </div>
                      <EnergyBadge energy={plan.energy} size="sm" />
                    </div>
                  </div>

                  {/* Friends */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-[#9899ac]" />
                      <span className="text-sm text-[#9899ac]">
                        {plan.friends.length === 1 ? "With" : `With ${plan.friends.length} friends`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {plan.friends.map((friend, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Avatar className="w-8 h-8 ring-2 ring-[#E8B8FE]/20">
                            <AvatarImage src={friend.avatar} alt={friend.name} />
                            <AvatarFallback>
                              {friend.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{friend.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {plan.activities.map((activity, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-[#E8B8FE]/10 text-[#E8B8FE] text-sm"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-white/5">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#E8B8FE]/30 text-[#E8B8FE] hover:bg-[#E8B8FE]/10 h-9"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-[#E8B8FE] to-[#CEFEB8] text-[#0a0b1e] hover:opacity-90 h-9"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 bg-[#0a0b1e]">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full border-[#E8B8FE]/30 text-[#E8B8FE] hover:bg-[#E8B8FE]/10"
          >
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
