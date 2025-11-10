import { Calendar, Clock, Send, MessageCircle, User } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "plans", label: "Plans", icon: Calendar },
    { id: "my-avales", label: "My Avales", icon: Clock },
    { id: "requests", label: "Requests", icon: Send },
    { id: "chat", label: "Chat", icon: MessageCircle },
    { id: "you", label: "You", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0b1e] border-t border-white/5">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1 px-2 py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 transition-all"
            >
              <div
                className={`p-2 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#E8B8FE]/20 text-[#E8B8FE]"
                    : "text-[#9899ac] hover:text-[#f5f5f7]"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs ${isActive ? "text-[#E8B8FE]" : "text-[#9899ac]"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
