import { useState } from "react";
import { BottomNav } from "./components/BottomNav";
import { HomeScreen } from "./components/HomeScreen";
import { AddAvailabilityModal } from "./components/AddAvailabilityModal";
import { FriendDetailView } from "./components/FriendDetailView";
import { MyAvalesScreen } from "./components/MyAvalesScreen";
import { NotificationsScreen } from "./components/NotificationsScreen";
import { GroupsView } from "./components/GroupsView";
import { ProfileScreen } from "./components/ProfileScreen";
import { ChatScreen } from "./components/ChatScreen";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [activeTab, setActiveTab] = useState("plans");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);

  const handleAddAvailability = () => {
    setShowAddModal(true);
  };

  const handleSaveAvailability = () => {
    setShowAddModal(false);
    toast.success("Availability added ✅", {
      description: "Your friends have been notified",
    });
  };

  const handleFriendClick = (friendId: string) => {
    setSelectedFriendId(friendId);
  };

  const handleBackFromFriend = () => {
    setSelectedFriendId(null);
  };

  const renderContent = () => {
    // Friend detail view takes priority
    if (selectedFriendId) {
      return (
        <FriendDetailView
          friendId={selectedFriendId}
          onBack={handleBackFromFriend}
        />
      );
    }

    // Otherwise render based on active tab
    switch (activeTab) {
      case "plans":
        return (
          <HomeScreen
            onAddAvailability={handleAddAvailability}
            onFriendClick={handleFriendClick}
          />
        );
      case "my-avales":
        return <MyAvalesScreen onAddAvailability={handleAddAvailability} />;
      case "requests":
        return <NotificationsScreen />;
      case "chat":
        return <ChatScreen />;
      case "you":
        return <ProfileScreen />;
      default:
        return (
          <HomeScreen
            onAddAvailability={handleAddAvailability}
            onFriendClick={handleFriendClick}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b1e] text-[#f5f5f7] flex items-center justify-center">
      {/* Mobile Container */}
      <div className="w-full max-w-md h-screen bg-[#0a0b1e] relative overflow-hidden shadow-2xl">
        {/* Content */}
        <div className="h-full">
          {renderContent()}
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Add Availability Modal */}
        {showAddModal && (
          <AddAvailabilityModal
            onClose={() => setShowAddModal(false)}
            onSave={handleSaveAvailability}
          />
        )}

        {/* Toast Notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#141530",
              color: "#f5f5f7",
              border: "1px solid rgba(232, 184, 254, 0.2)",
            },
          }}
        />
      </div>
    </div>
  );
}
