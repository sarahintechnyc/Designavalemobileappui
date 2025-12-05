import { X, Calendar, MapPin, Users, Clock, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { EnergyBadge } from "./EnergyBadge";

interface ConfirmedPlansModalProps {
  onClose: () => void;
}

const confirmedPlans = [
  {
    id: "1",
    friend: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    date: "Sunday, Dec 8",
    time: "10:00 AM - 2:30 PM",
    startDateTime: "20241208T100000",
    endDateTime: "20241208T143000",
    activity: "Brunch",
    energy: "high" as const,
    location: "Downtown Cafe",
  },
  {
    id: "2",
    friend: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    },
    date: "Friday, Dec 6",
    time: "8:00 PM - 11:00 PM",
    startDateTime: "20241206T200000",
    endDateTime: "20241206T230000",
    activity: "Movie Night",
    energy: "low" as const,
    location: "Emma's Place",
  },
  {
    id: "3",
    friend: {
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    date: "Tuesday, Dec 10",
    time: "6:00 PM - 10:00 PM",
    startDateTime: "20241210T180000",
    endDateTime: "20241210T220000",
    activity: "Dinner & Games",
    energy: "high" as const,
    location: "The Game Bar",
  },
];

export function ConfirmedPlansModal({ onClose }: ConfirmedPlansModalProps) {
  const handleAddToCalendar = (plan: typeof confirmedPlans[0]) => {
    // Generate Google Calendar URL
    const title = encodeURIComponent(`${plan.activity} with ${plan.friend.name}`);
    const details = encodeURIComponent(`Hangout with ${plan.friend.name} - ${plan.activity}`);
    const location = encodeURIComponent(plan.location);
    const dates = `${plan.startDateTime}/${plan.endDateTime}`;
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    
    // Open in new tab
    window.open(calendarUrl, '_blank');
  };

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
                  {/* Main Content - Avatar on Right */}
                  <div className="flex gap-4 mb-4">
                    {/* Left: Plan Details */}
                    <div className="flex-1 min-w-0">
                      {/* Title & Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="truncate">{plan.activity}</h3>
                        <Badge className="bg-[#CEFEB8] text-[#0a0b1e] text-xs px-2 py-0 shrink-0">
                          Confirmed
                        </Badge>
                      </div>

                      {/* Date/Time/Location */}
                      <div className="flex flex-col gap-2 text-sm text-[#9899ac] mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 shrink-0" />
                          <span>{plan.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 shrink-0" />
                          <span>{plan.time}</span>
                        </div>
                        {plan.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span>{plan.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Energy Badge & Friend Name */}
                      <div className="flex items-center gap-3">
                        <EnergyBadge energy={plan.energy} size="sm" />
                        <span className="text-sm text-[#9899ac]">with {plan.friend.name}</span>
                      </div>
                    </div>

                    {/* Right: Friend Avatar */}
                    <div className="shrink-0">
                      <Avatar className="w-20 h-20 ring-2 ring-[#E8B8FE]/30">
                        <AvatarImage src={plan.friend.avatar} alt={plan.friend.name} />
                        <AvatarFallback>
                          {plan.friend.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-white/5">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#E8B8FE]/30 text-[#E8B8FE] hover:bg-[#E8B8FE]/10 h-9"
                      onClick={() => {
                        // TODO: Open message/chat with friend
                        console.log('Message', plan.friend.name);
                      }}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#E8B8FE]/30 text-[#E8B8FE] hover:bg-[#E8B8FE]/10 h-9"
                      onClick={() => handleAddToCalendar(plan)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Add to Calendar
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