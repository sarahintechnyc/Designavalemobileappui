import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { Button } from "./ui/button";
import { Lock, Sparkles } from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
  onLogin: () => void;
}

export function OnboardingFlow({ onComplete, onLogin }: OnboardingFlowProps) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const totalScreens = 7;

  const nextScreen = () => {
    if (currentScreen < totalScreens - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const prevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const skipToSignup = () => {
    setCurrentScreen(5); // Jump to account setup screen
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && currentScreen < totalScreens - 1) {
      nextScreen();
    } else if (info.offset.x > swipeThreshold && currentScreen > 0) {
      prevScreen();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b1e] text-[#f5f5f7] overflow-hidden">
      <div className="max-w-md mx-auto relative min-h-screen">
        {/* Skip button for feature screens */}
        {currentScreen >= 1 && currentScreen <= 4 && (
          <button
            onClick={skipToSignup}
            className="absolute top-6 right-6 z-10 text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip
          </button>
        )}

        <AnimatePresence mode="wait" custom={currentScreen}>
          <motion.div
            key={currentScreen}
            custom={currentScreen}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            drag={currentScreen > 0 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-24"
          >
            {currentScreen === 0 && <WelcomeScreen onNext={nextScreen} onLogin={onLogin} />}
            {currentScreen === 1 && <HowItWorksScreen onNext={nextScreen} />}
            {currentScreen === 2 && <EnergyMatchingScreen onNext={nextScreen} />}
            {currentScreen === 3 && <ActivityTagsScreen onNext={nextScreen} />}
            {currentScreen === 4 && <PrivacyScreen onNext={nextScreen} />}
            {currentScreen === 5 && <AccountSetupScreen onLogin={onLogin} />}
            {currentScreen === 6 && <FinalStepScreen onComplete={onComplete} />}
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        {currentScreen > 0 && currentScreen < 6 && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentScreen - 1
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-muted"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Screen 1: Welcome / Hero
function WelcomeScreen({ onNext, onLogin }: { onNext: () => void; onLogin: () => void }) {
  return (
    <div className="text-center space-y-8 w-full">
      {/* Abstract glowing shapes */}
      <div className="relative h-64 mb-8">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #E8B8FE 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #CEFEB8 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Sparkles className="w-16 h-16 text-primary" />
        </motion.div>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl">See your friends more</h1>
        <p className="text-muted-foreground text-lg max-w-sm mx-auto">
          Avale shows when your friends are free — so plans finally <em>happen.</em>
        </p>
      </div>

      <div className="space-y-3 pt-8">
        <Button
          onClick={onNext}
          className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90 transition-opacity"
        >
          Show me how
        </Button>
        <button
          onClick={onLogin}
          className="w-full text-muted-foreground hover:text-foreground transition-colors"
        >
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
}

// Screen 2: How Avale Works
function HowItWorksScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center space-y-8 w-full">
      {/* Floating friend cards */}
      <div className="relative h-64 mb-8">
        <motion.div
          animate={{
            y: [-8, 8, -8],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-8 left-8 bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-4 w-40 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
            <span className="text-sm">Sarah</span>
          </div>
          <div className="inline-block px-2 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-xs">
            Free today
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [8, -8, 8],
            rotate: [2, -2, 2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-16 right-8 bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-4 w-40 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary" />
            <span className="text-sm">Alex</span>
          </div>
          <div className="inline-block px-2 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs">
            Free today
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [-5, 5, -5],
            rotate: [1, -1, 1],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-4 w-40 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary via-secondary to-primary" />
            <span className="text-sm">Jordan</span>
          </div>
          <div className="inline-block px-2 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-xs">
            Free today
          </div>
        </motion.div>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl">See who's free — instantly</h1>
        <p className="text-muted-foreground text-lg max-w-sm mx-auto">
          No more guessing, no more group chat chaos. Just real-time availability so you can actually meet up.
        </p>
      </div>

      <div className="pt-8">
        <Button
          onClick={onNext}
          className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90 transition-opacity"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// Screen 3: Energy Matching
function EnergyMatchingScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center space-y-8 w-full">
      {/* Floating energy bubbles */}
      <div className="relative h-64 mb-8 flex items-center justify-center gap-8">
        <motion.div
          animate={{
            y: [-10, 10, -10],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center border-2 border-secondary"
            style={{
              background: "radial-gradient(circle, rgba(206, 254, 184, 0.3) 0%, rgba(206, 254, 184, 0.05) 100%)",
            }}
          >
            <span className="text-secondary">High Energy</span>
          </div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full border-2 border-secondary"
          />
        </motion.div>

        <motion.div
          animate={{
            y: [10, -10, 10],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="relative"
        >
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center border-2 border-primary"
            style={{
              background: "radial-gradient(circle, rgba(232, 184, 254, 0.3) 0%, rgba(232, 184, 254, 0.05) 100%)",
            }}
          >
            <span className="text-primary text-center">Low-Key<br/>Chill</span>
          </div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute inset-0 rounded-full border-2 border-primary"
          />
        </motion.div>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl">Match the vibe</h1>
        <p className="text-muted-foreground text-lg max-w-sm mx-auto">
          From "let's go dancing" to "soft pants only"… Avale helps you link with friends on your wavelength.
        </p>
      </div>

      <div className="pt-8">
        <Button
          onClick={onNext}
          className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90 transition-opacity"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// Screen 4: Activity Tags
function ActivityTagsScreen({ onNext }: { onNext: () => void }) {
  const activities = [
    { label: "Coffee", color: "primary" },
    { label: "Walks", color: "secondary" },
    { label: "Dinner", color: "primary" },
    { label: "Workout", color: "secondary" },
    { label: "Movies", color: "primary" },
    { label: "Games", color: "secondary" },
  ];

  return (
    <div className="text-center space-y-8 w-full">
      {/* Floating activity tags */}
      <div className="relative h-64 mb-8 flex items-center justify-center">
        <div className="flex flex-wrap gap-3 justify-center max-w-xs mx-auto">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <div
                className={`px-4 py-2 rounded-full border-2 whitespace-nowrap ${
                  activity.color === "primary"
                    ? "bg-primary/10 border-primary/40 text-primary"
                    : "bg-secondary/10 border-secondary/40 text-secondary"
                }`}
              >
                {activity.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center glow - more subtle */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, #E8B8FE 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl">Pick what you're down for</h1>
        <p className="text-muted-foreground text-lg max-w-sm mx-auto">
          Coffee? Walks? Dinner? Workout class? Share what activities you're down for and let friends know what's on your radar.
        </p>
      </div>

      <div className="pt-8">
        <Button
          onClick={onNext}
          className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90 transition-opacity"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// Screen 5: Privacy Reassurance
function PrivacyScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center space-y-8 w-full">
      {/* Lock icon with radial glow */}
      <div className="relative h-64 mb-8 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-48 h-48 rounded-full"
          style={{
            background: "radial-gradient(circle, #E8B8FE 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, #CEFEB8 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Lock className="w-20 h-20 text-primary" />
        </motion.div>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl">You're in control</h1>
        <p className="text-muted-foreground text-lg max-w-sm mx-auto">
          Choose who can see your availability, and when. You decide what's shared.
        </p>
      </div>

      <div className="pt-8">
        <Button
          onClick={onNext}
          className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90 transition-opacity"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// Screen 6: Account Setup Options
function AccountSetupScreen({ onLogin }: { onLogin: () => void }) {
  const handlePhoneSignup = () => {
    // Mock auth flow - in production this would trigger phone auth
    alert("Phone number authentication would be triggered here");
  };

  const handleEmailSignin = () => {
    // Mock auth flow - in production this would trigger email auth
    alert("Email authentication would be triggered here");
  };

  return (
    <div className="text-center space-y-8 w-full">
      <div className="space-y-2">
        <h1 className="text-3xl">Create your account</h1>
        <p className="text-muted-foreground">
          It's social without the media. Plans with follow through.
        </p>
      </div>

      <div className="space-y-3 pt-8">
        <Button
          onClick={handlePhoneSignup}
          className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90 transition-opacity"
        >
          Sign up with Phone Number
        </Button>
        <Button
          onClick={handleEmailSignin}
          variant="outline"
          className="w-full h-12 rounded-full border-2 border-primary/40 hover:bg-primary/10"
        >
          Sign in with Email
        </Button>
        <button
          onClick={onLogin}
          className="w-full text-muted-foreground hover:text-foreground transition-colors pt-4"
        >
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
}

// Screen 7: Final Step
function FinalStepScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="text-center space-y-8 w-full">
      {/* Animated celebration */}
      <div className="relative h-64 mb-8 flex items-center justify-center">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-48 h-48 rounded-full opacity-20"
          style={{
            background: "conic-gradient(from 0deg, #E8B8FE, #CEFEB8, #E8B8FE)",
          }}
        />
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-20 h-20 text-primary" />
        </motion.div>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl">Let's make your first Avale</h1>
        <p className="text-muted-foreground text-lg max-w-sm mx-auto">
          Set when you're free so friends know when to reach out.
        </p>
      </div>

      <div className="pt-8">
        <Button
          onClick={onComplete}
          className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90 transition-opacity"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}