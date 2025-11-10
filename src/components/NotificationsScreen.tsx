import { Check, X, Clock, Calendar, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const hangoutRequests = [
  {
    id: "1",
    type: "request",
    friend: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    message: "wants to hang out",
    time: "Sunday, 10:00 AM - 12:00 PM",
    activity: "Coffee & Brunch",
    location: "Central Park Café",
    timestamp: "2 hours ago",
    priority: "high",
  },
  {
    id: "2",
    type: "update",
    friend: {
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    message: "updated their availability",
    time: "Saturday, 6:00 PM - 10:00 PM",
    activity: "Dinner & Games",
    timestamp: "5 hours ago",
    priority: "normal",
  },
  {
    id: "3",
    type: "suggestion",
    friend: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    },
    message: "suggested another time",
    time: "Friday, 9:00 PM - 11:00 PM",
    activity: "Movie Night",
    timestamp: "1 day ago",
    priority: "normal",
  },
];

const activityUpdates = [
  {
    id: "4",
    type: "confirmed",
    friend: {
      name: "Alex Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    },
    message: "confirmed your hangout",
    time: "Tomorrow, 3:00 PM",
    activity: "Gaming Session",
    timestamp: "30 min ago",
  },
  {
    id: "5",
    type: "reminder",
    message: "You have a hangout coming up",
    time: "Today, 7:00 PM",
    activity: "Dinner with Sarah & Marcus",
    timestamp: "1 hour ago",
  },
];

export function NotificationsScreen() {
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("requests");

  const handleDismiss = (id: string) => {
    setDismissedIds([...dismissedIds, id]);
  };

  const activeRequests = hangoutRequests.filter(r => !dismissedIds.includes(r.id));
  const activeUpdates = activityUpdates.filter(r => !dismissedIds.includes(r.id));

  return (
    <div className="h-full overflow-auto pb-28">
      <div className="px-5 pt-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-1">Activity</h1>
          <p className="text-[#9899ac]">Stay in the loop with your friends</p>
        </div>

        {/* Stats Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#E8B8FE]/20 to-[#CEFEB8]/10 border border-[#E8B8FE]/20 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#CEFEB8]/20 rounded-full blur-2xl" />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#E8B8FE]/30 flex items-center justify-center">
                  <span className="text-base">🔔</span>
                </div>
                <div>
                  <p className="text-sm text-[#9899ac]">New Activity</p>
                  <h3>{activeRequests.length + activeUpdates.length} updates</h3>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <p className="text-2xl mb-0.5 text-[#E8B8FE]">{activeRequests.length}</p>
                <p className="text-xs text-[#9899ac]">Requests</p>
              </div>
              <div className="text-center">
                <p className="text-2xl mb-0.5 text-[#CEFEB8]">{activeUpdates.length}</p>
                <p className="text-xs text-[#9899ac]">Updates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#141530] p-1">
            <TabsTrigger value="requests" className="data-[state=active]:bg-[#E8B8FE] data-[state=active]:text-[#0a0b1e]">
              Requests
              {activeRequests.length > 0 && (
                <Badge className="ml-2 bg-[#CEFEB8] text-[#0a0b1e] text-xs px-1.5 py-0">
                  {activeRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-[#E8B8FE] data-[state=active]:text-[#0a0b1e]">
              Activity
              {activeUpdates.length > 0 && (
                <Badge className="ml-2 bg-[#CEFEB8] text-[#0a0b1e] text-xs px-1.5 py-0">
                  {activeUpdates.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-3 mt-0">
            <AnimatePresence mode="popLayout">
              {activeRequests.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-[#141530] flex items-center justify-center mb-4">
                    <span className="text-4xl">✅</span>
                  </div>
                  <h3 className="mb-2 text-[#9899ac]">All caught up!</h3>
                  <p className="text-[#9899ac] text-sm text-center">
                    You have no pending requests
                  </p>
                </motion.div>
              ) : (
                activeRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-2xl bg-[#141530] border border-[#E8B8FE]/10 relative overflow-hidden"
                  >
                    {/* Priority Indicator */}
                    {request.priority === "high" && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#E8B8FE] to-[#CEFEB8]" />
                    )}

                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="w-12 h-12 ring-2 ring-[#E8B8FE]/20">
                        <AvatarImage src={request.friend.avatar} alt={request.friend.name} />
                        <AvatarFallback>
                          {request.friend.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="mb-1">
                          <span className="text-[#f5f5f7]">{request.friend.name}</span>{" "}
                          <span className="text-[#9899ac]">{request.message}</span>
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-sm text-[#9899ac] flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {request.time}
                          </p>
                          {request.priority === "high" && (
                            <Badge className="bg-[#E8B8FE]/20 text-[#E8B8FE] text-xs px-2 py-0">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Soon
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="inline-block px-3 py-1 rounded-lg bg-[#CEFEB8]/10 text-[#CEFEB8] text-sm">
                            {request.activity}
                          </span>
                          {request.location && (
                            <span className="inline-block px-3 py-1 rounded-lg bg-[#9899ac]/10 text-[#9899ac] text-sm">
                              📍 {request.location}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#9899ac]">{request.timestamp}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {request.type === "request" && (
                      <div className="flex gap-2 pt-3 border-t border-white/5">
                        <Button
                          onClick={() => handleDismiss(request.id)}
                          variant="ghost"
                          size="sm"
                          className="flex-1 text-[#9899ac] hover:text-red-400 hover:bg-red-500/10 h-9"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Decline
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-[#CEFEB8] text-[#0a0b1e] hover:bg-[#CEFEB8]/90 h-9"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-[#E8B8FE]/30 text-[#E8B8FE] hover:bg-[#E8B8FE]/10 h-9"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Suggest
                        </Button>
                      </div>
                    )}

                    {request.type === "suggestion" && (
                      <div className="flex gap-2 pt-3 border-t border-white/5">
                        <Button
                          onClick={() => handleDismiss(request.id)}
                          variant="ghost"
                          size="sm"
                          className="flex-1 text-[#9899ac] hover:bg-[#1a1b3a] h-9"
                        >
                          Dismiss
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-[#E8B8FE] text-[#0a0b1e] hover:bg-[#E8B8FE]/90 h-9"
                        >
                          View Suggestion
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-3 mt-0">
            <AnimatePresence mode="popLayout">
              {activeUpdates.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-[#141530] flex items-center justify-center mb-4">
                    <span className="text-4xl">📭</span>
                  </div>
                  <h3 className="mb-2 text-[#9899ac]">No recent activity</h3>
                  <p className="text-[#9899ac] text-sm text-center">
                    Updates will appear here
                  </p>
                </motion.div>
              ) : (
                activeUpdates.map((update, index) => (
                  <motion.div
                    key={update.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-2xl bg-[#141530] border border-[#E8B8FE]/10"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {update.type === "reminder" ? (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E8B8FE] to-[#CEFEB8] flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-[#0a0b1e]" />
                        </div>
                      ) : (
                        <Avatar className="w-12 h-12 ring-2 ring-[#E8B8FE]/20">
                          <AvatarImage src={update.friend?.avatar} alt={update.friend?.name} />
                          <AvatarFallback>
                            {update.friend?.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="mb-1">
                          {update.friend && (
                            <>
                              <span className="text-[#f5f5f7]">{update.friend.name}</span>{" "}
                            </>
                          )}
                          <span className="text-[#9899ac]">{update.message}</span>
                        </p>
                        <p className="text-sm text-[#9899ac] flex items-center gap-1 mb-2">
                          <Clock className="w-3.5 h-3.5" />
                          {update.time}
                        </p>
                        <span className="inline-block px-3 py-1 rounded-lg bg-[#CEFEB8]/10 text-[#CEFEB8] text-sm mb-2">
                          {update.activity}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#9899ac]">{update.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {update.type === "confirmed" && (
                      <div className="flex gap-2 pt-3 border-t border-white/5">
                        <Button
                          onClick={() => handleDismiss(update.id)}
                          variant="ghost"
                          size="sm"
                          className="flex-1 text-[#9899ac] hover:bg-[#1a1b3a] h-9"
                        >
                          Dismiss
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-[#E8B8FE]/30 text-[#E8B8FE] hover:bg-[#E8B8FE]/10 h-9"
                        >
                          View Details
                        </Button>
                      </div>
                    )}

                    {update.type === "reminder" && (
                      <div className="pt-3 border-t border-white/5">
                        <Button
                          size="sm"
                          className="w-full bg-gradient-to-r from-[#E8B8FE] to-[#CEFEB8] text-[#0a0b1e] hover:opacity-90 h-9"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Get Ready
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
