import { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { MyAvalesScreen } from "./components/MyAvalesScreen";
import { RequestsScreen } from "./components/RequestsScreen";
import { ChatScreen } from "./components/ChatScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { BottomNav } from "./components/BottomNav";
import { AddAvailabilityModal } from "./components/AddAvailabilityModal";
import { FriendDetailView } from "./components/FriendDetailView";
import { GroupsView } from "./components/GroupsView";
import { NotificationsScreen } from "./components/NotificationsScreen";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState("plans");
  const [showAddAvailability, setShowAddAvailability] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [showGroups, setShowGroups] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleFriendClick = (friendId: string) => {
    setSelectedFriend(friendId);
  };

  const handleBackFromFriend = () => {
    setSelectedFriend(null);
  };

  const handleShowGroups = () => {
    setShowGroups(true);
  };

  const handleBackFromGroups = () => {
    setShowGroups(false);
  };

  const handleShowNotifications = () => {
    setShowNotifications(true);
  };

  const handleBackFromNotifications = () => {
    setShowNotifications(false);
  };

  const handleCompleteOnboarding = () => {
    setHasCompletedOnboarding(true);
  };

  const handleLogin = () => {
    // Mock login - in production this would handle actual authentication
    setHasCompletedOnboarding(true);
  };

  // Show onboarding if not completed
  if (!hasCompletedOnboarding) {
    return <OnboardingFlow onComplete={handleCompleteOnboarding} onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    if (showNotifications) {
      return <NotificationsScreen onBack={handleBackFromNotifications} />;
    }

    if (showGroups) {
      return <GroupsView onBack={handleBackFromGroups} />;
    }

    if (selectedFriend) {
      return <FriendDetailView friendId={selectedFriend} onBack={handleBackFromFriend} />;
    }

    switch (activeTab) {
      case "plans":
        return <HomeScreen onAddAvailability={() => setShowAddAvailability(true)} onFriendClick={handleFriendClick} />;
      case "my-avales":
        return <MyAvalesScreen onAddAvailability={() => setShowAddAvailability(true)} />;
      case "requests":
        return <RequestsScreen />;
      case "chat":
        return <ChatScreen />;
      case "you":
        return <ProfileScreen onShowGroups={handleShowGroups} onShowNotifications={handleShowNotifications} />;
      default:
        return <HomeScreen onAddAvailability={() => setShowAddAvailability(true)} onFriendClick={handleFriendClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b1e] text-[#f5f5f7]">
      <div className="max-w-md mx-auto relative min-h-screen">
        {renderScreen()}
        
        {!showNotifications && !showGroups && !selectedFriend && (
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        )}

        <AnimatePresence>
          {showAddAvailability && (
            <AddAvailabilityModal onClose={() => setShowAddAvailability(false)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}