import { ArrowLeft, Calendar, Clock, Flame, MessageCircle, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { EnergyBadge } from "./EnergyBadge";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FriendDetailViewProps {
  friendId: string;
  onBack: () => void;
}

const friendData: Record<string, any> = {
  "1": {
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    status: "Available this weekend",
    availability: [
      {
        day: "Sunday, Nov 9",
        time: "10:00 AM - 2:30 PM",
        energy: "high" as const,
        activities: ["Coffee", "Brunch", "Walk"],
      },
      {
        day: "Friday, Nov 7",
        time: "7:00 PM - 10:00 PM",
        energy: "low" as const,
        activities: ["Movie Night", "Dinner"],
      },
    ],
    mutualAvailability: {
      time: "Sunday, 10:00 AM - 12:00 PM",
      suggestion: "Coffee walk at Central Park?",
    },
    sharedInterests: ["Coffee", "Hiking", "Board Games"],
  },
};

export function FriendDetailView({ friendId, onBack }: FriendDetailViewProps) {
  const friend = friendData[friendId];
  const [requestSent, setRequestSent] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRequestHangout = () => {
    setRequestSent(true);
    setShowSuccess(true);

    // Auto-dismiss success message and go back after 2.5 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setTimeout(() => {
        onBack();
      }, 300);
    }, 2500);
  };

  if (!friend) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-[#9899ac]">Friend not found</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto pb-28">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0a0b1e]/95 backdrop-blur-sm border-b border-white/5 px-5 py-4">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-[#1a1b3a] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="px-5 py-6">
        <div className="flex flex-col items-center text-center mb-6">
          <Avatar className="w-24 h-24 ring-4 ring-[#E8B8FE]/30 mb-4">
            <AvatarImage src={friend.avatar} alt={friend.name} />
            <AvatarFallback>{friend.name.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <h2 className="mb-2">{friend.name}</h2>
          <p className="text-[#CEFEB8]">{friend.status}</p>
        </div>

        {/* Mutual Availability Card */}
        {friend.mutualAvailability && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#E8B8FE]/20 to-[#CEFEB8]/20 border border-[#E8B8FE]/30">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#CEFEB8]/30 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#CEFEB8]" />
              </div>
              <div>
                <h4 className="mb-1">You're both free!</h4>
                <p className="text-sm text-[#9899ac]">{friend.mutualAvailability.time}</p>
              </div>
            </div>
            <p className="text-sm mb-3">{friend.mutualAvailability.suggestion}</p>
            <Button 
              onClick={handleRequestHangout}
              disabled={requestSent}
              className="w-full bg-gradient-to-r from-[#E8B8FE] to-[#CEFEB8] text-[#0a0b1e] hover:opacity-90 disabled:opacity-50"
            >
              {requestSent ? 'Request Sent!' : 'Request to Hang'}
            </Button>
          </div>
        )}

        {/* Next Available Times */}
        <div className="mb-6">
          <h3 className="mb-3">Next Available Times</h3>
          <div className="space-y-3">
            {friend.availability.map((slot: any, index: number) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-[#141530] border border-[#E8B8FE]/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="mb-1">{slot.day}</h4>
                    <p className="text-sm text-[#9899ac] flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4" />
                      {slot.time}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <EnergyBadge energy={slot.energy} size="sm" />
                  {slot.activities.map((activity: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-[#E8B8FE]/10 text-[#E8B8FE] text-sm"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shared Interests */}
        <div className="mb-6">
          <h3 className="mb-3">Shared Interests</h3>
          <div className="flex flex-wrap gap-2">
            {friend.sharedInterests.map((interest: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 rounded-xl bg-[#CEFEB8]/10 text-[#CEFEB8] border border-[#CEFEB8]/20"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-[#E8B8FE]/30 text-[#E8B8FE] hover:bg-[#E8B8FE]/10"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </Button>
          <Button 
            onClick={handleRequestHangout}
            disabled={requestSent}
            className="flex-1 bg-[#E8B8FE] text-[#0a0b1e] hover:bg-[#E8B8FE]/90 disabled:opacity-50"
          >
            {requestSent ? 'Request Sent!' : 'Request Hangout'}
          </Button>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-32 left-5 right-5 z-50"
          >
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-gradient-to-r from-[#CEFEB8]/95 to-[#E8B8FE]/95 border border-[#CEFEB8] backdrop-blur-sm shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0a0b1e] flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-[#CEFEB8]" />
                </div>
                <div className="flex-1">
                  <p className="text-[#0a0b1e] mb-1">Request sent to {friend.name}!</p>
                  <p className="text-sm text-[#0a0b1e]/70">
                    View in My Avales tab →
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}