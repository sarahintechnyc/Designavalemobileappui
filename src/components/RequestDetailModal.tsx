import { Calendar, Clock, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface Request {
  id: string;
  friendName: string;
  friendAvatar?: string;
  date: string;
  time: string;
  energyLevel: "High Energy" | "Low Energy" | "Virtual";
  message?: string;
}

interface RequestDetailModalProps {
  request: Request;
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

export function RequestDetailModal({ 
  request, 
  isOpen, 
  onClose, 
  onAccept, 
  onDecline 
}: RequestDetailModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAccept = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onAccept();
      onClose();
    }, 300);
  };

  const handleDecline = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onDecline();
      onClose();
    }, 300);
  };

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
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
      });
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto"
          >
            <div className="bg-[#141530] rounded-3xl border border-[#E8B8FE]/20 overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="relative p-6 pb-4 bg-gradient-to-br from-[#E8B8FE]/10 to-[#CEFEB8]/10">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>

                {/* Friend Avatar & Name */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E8B8FE] to-[#CEFEB8] flex items-center justify-center mb-3">
                    <span className="text-[#0A1628] text-xl">
                      {getInitials(request.friendName)}
                    </span>
                  </div>
                  <h2 className="text-white mb-1">{request.friendName}</h2>
                  <p className="text-white/60 text-sm">wants to hang out</p>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                {/* Date & Time Card */}
                <div className="bg-[#0a0b1e]/50 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E8B8FE]/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#E8B8FE]" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">Date</p>
                      <p className="text-white">{formatDate(request.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#CEFEB8]/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#CEFEB8]" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">Time</p>
                      <p className="text-white">{request.time}</p>
                    </div>
                  </div>
                </div>

                {/* Energy Level */}
                <div>
                  <p className="text-white/60 text-xs mb-2">Vibe</p>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getEnergyColor(request.energyLevel)}`}>
                    {request.energyLevel}
                  </span>
                </div>

                {/* Message */}
                {request.message && (
                  <div>
                    <p className="text-white/60 text-xs mb-2">Message</p>
                    <div className="bg-[#0a0b1e]/50 rounded-2xl p-4">
                      <p className="text-white/90">{request.message}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 flex gap-3">
                <button
                  onClick={handleDecline}
                  disabled={isProcessing}
                  className="flex-1 bg-white/10 hover:bg-white/15 text-white rounded-2xl py-4 px-6 font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-br from-[#E8B8FE] to-[#CEFEB8] hover:opacity-90 text-[#0A1628] rounded-2xl py-4 px-6 font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[#E8B8FE]/30"
                >
                  <Check className="w-5 h-5" />
                  Accept
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
