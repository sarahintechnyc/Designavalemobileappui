import { Search, MessageCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const chats = [
  {
    id: "1",
    friend: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    lastMessage: "See you Sunday! ☕",
    timestamp: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    friend: {
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    lastMessage: "That sounds great! Let's do it",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    friend: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    },
    lastMessage: "You: What movie were you thinking?",
    timestamp: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: "4",
    friend: {
      name: "Alex Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    },
    lastMessage: "Game night tomorrow?",
    timestamp: "Tuesday",
    unread: 1,
    online: false,
  },
];

export function ChatScreen() {
  return (
    <div className="h-full overflow-auto pb-28">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 sticky top-0 bg-[#0a0b1e]/95 backdrop-blur-sm border-b border-white/5 z-10">
        <h1 className="mb-4">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9899ac]" />
          <Input
            placeholder="Search messages..."
            className="pl-10 bg-[#141530] border-[#E8B8FE]/10"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="px-5 py-4">
        <div className="space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              className="w-full p-4 rounded-2xl bg-[#141530] border border-[#E8B8FE]/10 hover:border-[#E8B8FE]/30 transition-all flex items-center gap-3 text-left"
            >
              <div className="relative">
                <Avatar className="w-14 h-14 ring-2 ring-[#E8B8FE]/20">
                  <AvatarImage src={chat.friend.avatar} alt={chat.friend.name} />
                  <AvatarFallback>
                    {chat.friend.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#CEFEB8] border-2 border-[#141530]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="truncate">{chat.friend.name}</h4>
                  <span className="text-xs text-[#9899ac]">{chat.timestamp}</span>
                </div>
                <p className="text-sm text-[#9899ac] truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <div className="w-6 h-6 rounded-full bg-[#E8B8FE] flex items-center justify-center text-[#0a0b1e] text-xs">
                  {chat.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State (show when no chats) */}
      {chats.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-5">
          <div className="w-20 h-20 rounded-full bg-[#141530] flex items-center justify-center mb-4">
            <MessageCircle className="w-10 h-10 text-[#9899ac]" />
          </div>
          <h3 className="mb-2 text-[#9899ac]">No messages yet</h3>
          <p className="text-[#9899ac] text-sm text-center">
            Start a conversation with your friends<br />about upcoming hangouts
          </p>
        </div>
      )}
    </div>
  );
}
