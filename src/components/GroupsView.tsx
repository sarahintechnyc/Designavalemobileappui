import { Users, Plus, Calendar, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const groups = [
  {
    id: "1",
    name: "Weekend Crew",
    members: [
      {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        available: true,
      },
      {
        name: "Marcus Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        available: true,
      },
      {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        available: true,
      },
      {
        name: "Alex Kim",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        available: false,
      },
      {
        name: "Olivia Martinez",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        available: false,
      },
    ],
    availableCount: 3,
    totalMembers: 5,
    nextMeetup: "Saturday, 7:00 PM",
  },
  {
    id: "2",
    name: "Yoga Friends",
    members: [
      {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        available: true,
      },
      {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        available: true,
      },
      {
        name: "Olivia Martinez",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        available: false,
      },
    ],
    availableCount: 2,
    totalMembers: 3,
    nextMeetup: "Sunday, 9:00 AM",
  },
  {
    id: "3",
    name: "Game Night",
    members: [
      {
        name: "Marcus Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        available: false,
      },
      {
        name: "Alex Kim",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        available: true,
      },
    ],
    availableCount: 1,
    totalMembers: 2,
    nextMeetup: null,
  },
];

export function GroupsView() {
  return (
    <div className="h-full overflow-auto pb-28 px-5 pt-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-1">Groups</h1>
        <p className="text-[#9899ac]">Coordinate hangouts with your crews</p>
      </div>

      {/* Create Group Button */}
      <Button
        className="w-full mb-6 bg-gradient-to-r from-[#E8B8FE] to-[#CEFEB8] text-[#0a0b1e] hover:opacity-90 h-12"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create New Group
      </Button>

      {/* Groups List */}
      <div className="space-y-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="p-5 rounded-2xl bg-[#141530] border border-[#E8B8FE]/10 hover:border-[#E8B8FE]/30 transition-all"
          >
            {/* Group Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="mb-1">{group.name}</h3>
                <p className="text-sm text-[#9899ac]">
                  {group.totalMembers} members
                </p>
              </div>
              <button className="p-2 rounded-full hover:bg-[#1a1b3a] transition-colors">
                <MessageCircle className="w-5 h-5 text-[#9899ac]" />
              </button>
            </div>

            {/* Member Avatars */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                {group.members.slice(0, 4).map((member, idx) => (
                  <Avatar
                    key={idx}
                    className="w-10 h-10 ring-2 ring-[#141530] border-2 border-[#E8B8FE]/20"
                  >
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {group.members.length > 4 && (
                  <div className="w-10 h-10 rounded-full bg-[#1a1b3a] border-2 border-[#E8B8FE]/20 ring-2 ring-[#141530] flex items-center justify-center text-xs text-[#9899ac]">
                    +{group.members.length - 4}
                  </div>
                )}
              </div>
            </div>

            {/* Availability Summary */}
            <div className="p-3 rounded-xl bg-[#CEFEB8]/10 border border-[#CEFEB8]/20 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#CEFEB8]/30 flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#CEFEB8]" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="text-[#CEFEB8]">{group.availableCount}</span> of{" "}
                      {group.totalMembers} available
                    </p>
                    {group.nextMeetup && (
                      <p className="text-xs text-[#9899ac]">{group.nextMeetup}</p>
                    )}
                  </div>
                </div>
                {group.nextMeetup && (
                  <Calendar className="w-5 h-5 text-[#CEFEB8]" />
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-[#E8B8FE]/30 text-[#E8B8FE] hover:bg-[#E8B8FE]/10"
              >
                View Details
              </Button>
              {group.availableCount >= 2 && (
                <Button
                  size="sm"
                  className="flex-1 bg-[#CEFEB8] text-[#0a0b1e] hover:bg-[#CEFEB8]/90"
                >
                  Plan Hangout
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (show when no groups) */}
      {groups.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 rounded-full bg-[#141530] flex items-center justify-center mb-4">
            <Users className="w-10 h-10 text-[#9899ac]" />
          </div>
          <h3 className="mb-2 text-[#9899ac]">No groups yet</h3>
          <p className="text-[#9899ac] text-sm text-center mb-6">
            Create a group to coordinate hangouts<br />with multiple friends
          </p>
          <Button className="bg-gradient-to-r from-[#E8B8FE] to-[#CEFEB8] text-[#0a0b1e] hover:opacity-90">
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Group
          </Button>
        </div>
      )}
    </div>
  );
}
