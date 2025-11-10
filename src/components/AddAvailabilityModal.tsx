import { X, Calendar as CalendarIcon, Clock, Flame, Moon, Laptop, Plus, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AddAvailabilityModalProps {
  onClose: () => void;
  onSave: () => void;
}

const mockFriends = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    available: true,
    mutualTime: "10 AM - 12 PM",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    available: false,
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    available: true,
    mutualTime: "8 PM - 10 PM",
  },
  {
    id: "4",
    name: "Alex Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    available: false,
  },
];

const suggestedActivities = ["Coffee", "Brunch", "Dinner", "Movie", "Games", "Walk", "Gym", "Study"];

export function AddAvailabilityModal({ onClose, onSave }: AddAvailabilityModalProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEnergy, setSelectedEnergy] = useState<string>("high");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [customActivity, setCustomActivity] = useState("");
  const [vibeMessage, setVibeMessage] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);

  const energyLevels = [
    { id: "high", label: "High Energy", color: "#CEFEB8", description: "Let's get active!" },
    { id: "low", label: "Low Energy", color: "#E8B8FE", description: "Relaxed hangout" },
    { id: "virtual", label: "Virtual", color: "#7DD3FC", description: "Online hangout" },
  ];

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity]
    );
  };

  const toggleFriend = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId) ? prev.filter((f) => f !== friendId) : [...prev, friendId]
    );
  };

  const addCustomActivity = () => {
    if (customActivity.trim() && !selectedActivities.includes(customActivity.trim())) {
      setSelectedActivities([...selectedActivities, customActivity.trim()]);
      setCustomActivity("");
    }
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
        className="fixed inset-x-0 bottom-0 max-h-[90vh] rounded-t-3xl bg-[#0a0b1e] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-b from-[#0a0b1e] to-transparent sticky top-0 z-10 backdrop-blur-sm">
          <div>
            <h2>Add Availability</h2>
            <p className="text-sm text-[#9899ac]">Let friends know when you're free</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#1a1b3a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          {/* When Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#E8B8FE]" />
                When
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#9899ac]">Recurring</span>
                <Switch checked={isRecurring} onCheckedChange={setIsRecurring} />
              </div>
            </div>
            <div className="bg-[#141530] rounded-2xl p-4 border border-[#E8B8FE]/10">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
              />
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <label className="text-sm text-[#9899ac] mb-2 block">Start Time</label>
                  <Input
                    type="time"
                    defaultValue="10:00"
                    className="bg-[#1a1b3a] border-[#E8B8FE]/20 h-11"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#9899ac] mb-2 block">End Time</label>
                  <Input
                    type="time"
                    defaultValue="14:30"
                    className="bg-[#1a1b3a] border-[#E8B8FE]/20 h-11"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Vibe/Status Message */}
          <div>
            <h3 className="mb-3">Your Vibe</h3>
            <Textarea
              placeholder="e.g., 'Down for an adventure!' or 'Looking for chill vibes only'"
              value={vibeMessage}
              onChange={(e) => setVibeMessage(e.target.value)}
              className="bg-[#141530] border-[#E8B8FE]/10 resize-none"
              rows={2}
            />
            <p className="text-xs text-[#9899ac] mt-2">💡 Add a status to let friends know your mood</p>
          </div>

          {/* Energy Level Section - Improved */}
          <div>
            <h3 className="mb-3">Energy Level</h3>
            <div className="grid grid-cols-3 gap-3">
              {energyLevels.map((energy) => {
                const isSelected = selectedEnergy === energy.id;
                return (
                  <motion.button
                    key={energy.id}
                    onClick={() => setSelectedEnergy(energy.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      isSelected
                        ? `bg-[${energy.color}]/10 shadow-lg`
                        : "border-[#E8B8FE]/10 bg-[#141530] hover:border-[#E8B8FE]/30"
                    }`}
                    style={{
                      borderColor: isSelected ? energy.color : undefined,
                      boxShadow: isSelected ? `0 4px 20px ${energy.color}20` : undefined,
                    }}
                  >
                    <p className="mb-2" style={{ color: energy.color }}>{energy.label}</p>
                    <p className="text-xs text-[#9899ac]">{energy.description}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Activity Ideas Section */}
          <div>
            <h3 className="mb-3">Activity Ideas</h3>
            <div className="bg-[#141530] rounded-2xl p-4 border border-[#E8B8FE]/10">
              <div className="flex gap-2 mb-3">
                <Input
                  placeholder="Type your own activity..."
                  value={customActivity}
                  onChange={(e) => setCustomActivity(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCustomActivity()}
                  className="flex-1 bg-[#1a1b3a] border-[#E8B8FE]/20 h-11"
                />
                <Button
                  onClick={addCustomActivity}
                  size="icon"
                  className="bg-[#E8B8FE]/20 hover:bg-[#E8B8FE]/30 text-[#E8B8FE] h-11 w-11 flex-shrink-0"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedActivities.map((activity) => (
                  <motion.button
                    key={activity}
                    onClick={() => toggleActivity(activity)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      selectedActivities.includes(activity)
                        ? "bg-gradient-to-r from-[#CEFEB8] to-[#E8B8FE] text-[#0a0b1e]"
                        : "bg-[#1a1b3a] text-[#9899ac] hover:bg-[#2a2b4a]"
                    }`}
                  >
                    {activity}
                  </motion.button>
                ))}
                {customActivity && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {/* Placeholder for custom activities */}
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Share With Section - Enhanced */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3>Share With</h3>
              <button className="text-sm text-[#E8B8FE]">Select All</button>
            </div>
            <div className="bg-[#141530] rounded-2xl p-4 border border-[#E8B8FE]/10">
              <div className="space-y-2">
                {mockFriends.map((friend) => (
                  <motion.button
                    key={friend.id}
                    onClick={() => toggleFriend(friend.id)}
                    whileHover={{ scale: 1.01 }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      selectedFriends.includes(friend.id)
                        ? "bg-[#E8B8FE]/10 border-2 border-[#E8B8FE]/30"
                        : "bg-transparent hover:bg-[#1a1b3a] border-2 border-transparent"
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback>
                          {friend.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      {friend.available && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#CEFEB8] border-2 border-[#141530]" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="mb-0.5">{friend.name}</p>
                      {friend.available && friend.mutualTime ? (
                        <p className="text-xs text-[#CEFEB8] flex items-center gap-1">
                          ✨ Both free {friend.mutualTime}
                        </p>
                      ) : friend.available ? (
                        <p className="text-xs text-[#CEFEB8]">Available this week</p>
                      ) : (
                        <p className="text-xs text-[#9899ac]">Not available</p>
                      )}
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedFriends.includes(friend.id)
                          ? "border-[#E8B8FE] bg-[#E8B8FE]"
                          : "border-[#9899ac]"
                      }`}
                    >
                      {selectedFriends.includes(friend.id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 rounded-full bg-[#0a0b1e]"
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm text-[#E8B8FE] mb-3"
            >
              <span>{showAdvanced ? "Hide" : "Show"} Advanced Options</span>
              <motion.div
                animate={{ rotate: showAdvanced ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▼
              </motion.div>
            </button>
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  <div className="p-4 rounded-2xl bg-[#141530] border border-[#E8B8FE]/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#9899ac]" />
                        <span className="text-sm">Suggest Location</span>
                      </div>
                    </div>
                    <Input
                      placeholder="e.g., Central Park, Coffee Shop..."
                      className="bg-[#1a1b3a] border-[#E8B8FE]/20"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer with Progress Indicator */}
        <div className="p-5 border-t border-white/10 bg-[#0a0b1e] sticky bottom-0">
          <div className="flex gap-2 mb-3">
            <div className={`h-1 flex-1 rounded-full ${date ? 'bg-[#CEFEB8]' : 'bg-[#9899ac]/20'}`} />
            <div className={`h-1 flex-1 rounded-full ${selectedEnergy ? 'bg-[#CEFEB8]' : 'bg-[#9899ac]/20'}`} />
            <div className={`h-1 flex-1 rounded-full ${selectedActivities.length > 0 ? 'bg-[#CEFEB8]' : 'bg-[#9899ac]/20'}`} />
            <div className={`h-1 flex-1 rounded-full ${selectedFriends.length > 0 ? 'bg-[#CEFEB8]' : 'bg-[#9899ac]/20'}`} />
          </div>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 hover:bg-[#1a1b3a] h-12"
            >
              Cancel
            </Button>
            <Button
              onClick={onSave}
              disabled={!date || selectedFriends.length === 0}
              className="flex-1 bg-gradient-to-r from-[#E8B8FE] to-[#CEFEB8] text-[#0a0b1e] hover:opacity-90 disabled:opacity-50 h-12"
            >
              Add Availability
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
