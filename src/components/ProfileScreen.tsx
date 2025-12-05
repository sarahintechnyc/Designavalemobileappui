import { Edit, Bell, LogOut, Trash2, User, ChevronRight, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Switch } from "./ui/switch";

interface ProfileScreenProps {
  onShowGroups: () => void;
  onShowNotifications: () => void;
}

export function ProfileScreen({ onShowGroups, onShowNotifications }: ProfileScreenProps) {
  return (
    <div className="h-full overflow-auto pb-28 px-5 pt-6">
      {/* Header */}
      <div className="mb-6">
        <h1>Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-[#E8B8FE]/20 to-[#CEFEB8]/10 border border-[#E8B8FE]/20">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Avatar className="w-20 h-20 ring-4 ring-[#E8B8FE]/30">
              <AvatarImage
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
                alt="Your profile"
              />
              <AvatarFallback>
                <User className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#E8B8FE] text-[#0a0b1e] flex items-center justify-center shadow-lg">
              <Edit className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h3 className="mb-1">Alex Kim</h3>
            <p className="text-sm text-[#CEFEB8] mb-2">Available</p>
            <button className="text-sm text-[#E8B8FE] flex items-center gap-1">
              Edit Profile
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-4 rounded-2xl bg-[#141530] border border-[#E8B8FE]/10 text-center">
          <p className="text-2xl mb-1 text-[#E8B8FE]">12</p>
          <p className="text-xs text-[#9899ac]">Friends</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#141530] border border-[#E8B8FE]/10 text-center">
          <p className="text-2xl mb-1 text-[#CEFEB8]">8</p>
          <p className="text-xs text-[#9899ac]">Hangouts</p>
        </div>
        <button 
          onClick={onShowGroups}
          className="p-4 rounded-2xl bg-[#141530] border border-[#E8B8FE]/10 text-center hover:bg-[#1a1b3a] transition-colors"
        >
          <p className="text-2xl mb-1 text-[#9899ac]">3</p>
          <p className="text-xs text-[#9899ac]">Groups</p>
        </button>
      </div>

      {/* Notification Preferences */}
      <div className="mb-6">
        <h3 className="mb-3">Notification Preferences</h3>
        <div className="p-4 rounded-2xl bg-[#141530] border border-[#E8B8FE]/10">
          <div className="space-y-4">
            <div className="flex items-center justify-between w-full">
              <button 
                onClick={onShowNotifications}
                className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity flex-1"
              >
                <Bell className="w-5 h-5 text-[#9899ac]" />
                <div>
                  <p>Hangout Requests</p>
                  <p className="text-sm text-[#9899ac]">Get notified of new requests</p>
                </div>
              </button>
              <Switch defaultChecked />
            </div>
            <div className="h-px bg-white/5" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#9899ac]" />
                <div>
                  <p>Friend Availability</p>
                  <p className="text-sm text-[#9899ac]">When friends update their avales</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="h-px bg-white/5" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#9899ac]" />
                <div>
                  <p>Reminders</p>
                  <p className="text-sm text-[#9899ac]">Before scheduled hangouts</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="mb-6">
        <h3 className="mb-3">Account</h3>
        <div className="space-y-3">
          <Button
            variant="ghost"
            className="w-full justify-start text-[#9899ac] hover:text-[#f5f5f7] hover:bg-[#1a1b3a] h-12"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 h-12"
          >
            <Trash2 className="w-5 h-5 mr-3" />
            Delete Account
          </Button>
        </div>
      </div>

      {/* App Info */}
      <div className="text-center text-sm text-[#9899ac] py-6">
        <p>Avale v1.0.0</p>
        <p>Made with 💜 for friends</p>
      </div>
    </div>
  );
}