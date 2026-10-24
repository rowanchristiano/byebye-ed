import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  ChevronLeft,
  Sparkles,
  User,
  Share2,
  X,
  ShieldCheck,
  Zap,
  Key,
  Send,
} from 'lucide-react';
import { useApp } from './context/AppContext';
import BottomNav from './components/BottomNav';
import OnboardingModal from './components/OnboardingModal';
import WelcomeNameModal from './components/WelcomeNameModal';
import AppTutorial from './components/AppTutorial';
import CompanionAvatar from './components/CompanionAvatar';
import HomeScreen from './screens/HomeScreen';
import MealLogScreen from './screens/MealLogScreen';
import JournalScreen from './screens/JournalScreen';
import LearnScreen from './screens/LearnScreen';
import ChatScreen from './screens/ChatScreen';
import ProgressScreen from './screens/ProgressScreen';
import CommunityScreen from './screens/CommunityScreen';
import {
  generateCompanionReply,
  getApiKey,
  setApiKey,
  hasApiKey,
} from './services/gemini';
import dogImg from './assets/dog.png';
import meadowBg from './assets/meadow_bg.jpg';

export function App() {
  const {
    userProfile,
    companion,
    journalEntries,
    progress,
    chatHistory,
    toggleOutfit,
    updateCompanion,
    updateProfile,
    addMealLog,
    addJournalEntry,
    addChatMessage,
  } = useApp();

  const [activeTab, setActiveTab] = useState('home');
  const [showWelcomeName, setShowWelcomeName] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => getApiKey());
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [apiKeySavedNotice, setApiKeySavedNotice] = useState(false);
  const chatMessagesEndRef = useRef(null);

  // Synchronize first-time onboarding and walkthrough triggers
  useEffect(() => {
    if (!userProfile?.isOnboarded) {
      if (!userProfile?.name) {
        setShowWelcomeName(true);
        setShowOnboarding(false);
      } else {
        setShowWelcomeName(false);
        setShowOnboarding(true);
      }
    } else if (!userProfile?.hasCompletedTutorial) {
      setShowWelcomeName(false);
      setShowOnboarding(false);
      setShowTutorial(true);
    }
  }, [userProfile?.isOnboarded, userProfile?.name, userProfile?.hasCompletedTutorial]);

  const handleWelcomeNameSubmit = (name) => {
    updateProfile({ name });
    setShowWelcomeName(false);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setShowTutorial(true);
  };

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (showChatModal) {
      chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isAiTyping, showChatModal]);

  // Interactive micro-animations
  const [dogHeartPop, setDogHeartPop] = useState(false);
  const [wardrobeMenuOpen, setWardrobeMenuOpen] = useState(false);

  // Screen-specific state
  const [logMode, setLogMode] = useState('photo');
  const [progressTab, setProgressTab] = useState('overview');
  const [communityTab, setCommunityTab] = useState('groups');
  const [likedPosts, setLikedPosts] = useState({});
  const [newThought, setNewThought] = useState('');
  const [selectedMood, setSelectedMood] = useState('Reflective');

  const handleDogClick = () => {
    setDogHeartPop(true);
    setTimeout(() => setDogHeartPop(false), 1200);
  };

  const handleSendChat = async (text) => {
    const userText = text || chatInput;
    if (!userText.trim() || isAiTyping) return;

    const trimmed = userText.trim();
    addChatMessage({ sender: 'user', text: trimmed });
    setChatInput('');
    setIsAiTyping(true);

    try {
      const response = await generateCompanionReply({
        userMessage: trimmed,
        history: chatHistory,
        companionName: companion?.name || 'Mimi',
        companionType: companion?.type || 'dog',
        userName: userProfile?.name || 'friend',
      });
      addChatMessage({ sender: 'mimi', text: response.text });
    } catch (err) {
      console.error('Gemini chat error:', err);
      addChatMessage({
        sender: 'mimi',
        text: "I'm right here beside you. You are doing so well, and whatever you're feeling right now, we can take it one gentle step at a time.",
      });
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleSaveApiKey = () => {
    setApiKey(apiKeyInput);
    setApiKeySavedNotice(true);
    setTimeout(() => {
      setApiKeySavedNotice(false);
      setShowKeyConfig(false);
    }, 1200);
  };

  const handleSaveJournal = (e) => {
    e.preventDefault();
    if (!newThought.trim()) return;
    addJournalEntry({
      mood: selectedMood,
      thoughtText: newThought.trim(),
      savedCopingStrategy: 'Self-compassion break & 5-4-3-2-1 Grounding',
    });
    setNewThought('');
  };

  return (
    <div className="min-h-screen bg-[#F0EBE1] flex items-center justify-center p-2 sm:p-6 font-sans select-none">
      {/* Phone Mockup Frame matching Image 2 */}
      <div className="relative w-full max-w-[390px] h-[780px] sm:h-[810px] bg-[#FFF6DB] rounded-[48px] p-2.5 sm:p-3 shadow-[0_20px_50px_rgba(70,55,40,0.22)] border-[8px] sm:border-[10px] border-[#FFF6DB] flex flex-col justify-between overflow-hidden">

        {/* Top Speaker / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#23201F] rounded-full z-40 flex items-center justify-center">
          <div className="w-8 h-1 bg-[#3A3532] rounded-full" />
        </div>

        {/* SCREEN CONTENT AREA */}
        <div className="relative w-full h-full rounded-[38px] overflow-hidden flex flex-col justify-between bg-stone-100">

          {/* TAB 1: HOME SCREEN (MY MIMI DASHBOARD) */}
          {activeTab === 'home' && (
            <HomeScreen
              onNavigate={setActiveTab}
              onOpenProfile={() => setShowOnboarding(true)}
              onOpenChat={() => setActiveTab('chat')}
            />
          )}

          {/* TAB: TALK TO MIMI AI CHAT */}
          {activeTab === 'chat' && (
            <ChatScreen onNavigate={setActiveTab} />
          )}

          {/* TAB 2: DIGITAL JOURNAL (MY FEELINGS) */}
          {activeTab === 'journal' && (
            <JournalScreen onNavigate={setActiveTab} />
          )}

          {/* TAB 3: LEARN & GROW LIBRARY */}
          {activeTab === 'learn' && (
            <LearnScreen onNavigate={setActiveTab} />
          )}

          {/* TAB: MEAL LOGGING SCREEN */}
          {activeTab === 'log-meal' && (
            <MealLogScreen onNavigate={setActiveTab} />
          )}

          {/* TAB 4: COMMUNITY (SAFE CIRCLE FORUM) */}
          {activeTab === 'community' && (
            <CommunityScreen onNavigate={setActiveTab} />
          )}

          {/* TAB 5: PROGRESS & WARDROBE */}
          {activeTab === 'progress' && (
            <ProgressScreen
              onNavigate={setActiveTab}
              onOpenProfile={() => setShowOnboarding(true)}
              onOpenTutorial={() => setShowTutorial(true)}
            />
          )}

        </div>

        {/* Mimi Chat Modal */}
        {showChatModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="relative w-full max-w-sm h-[78vh] rounded-[2rem] overflow-hidden shadow-2xl border border-amber-100 bg-[#FFFDF9]">
              <ChatScreen onClose={() => setShowChatModal(false)} />
            </div>
          </div>
        )}

        {/* Welcome Name Prompt Modal (First-time open) */}
        <WelcomeNameModal
          isOpen={showWelcomeName}
          onNameSubmit={handleWelcomeNameSubmit}
        />

        {/* Onboarding Modal (Personalisation page) */}
        <OnboardingModal
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onComplete={handleOnboardingComplete}
        />

        {/* App Walkthrough Tutorial */}
        <AppTutorial
          isOpen={showTutorial}
          onClose={() => setShowTutorial(false)}
          activeTab={activeTab}
          onNavigate={(tab) => setActiveTab(tab)}
        />
      </div>
    </div>
  );
}

export default App;
