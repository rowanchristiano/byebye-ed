import React from 'react';
import { Home, Heart, BookOpen, Users, Settings } from 'lucide-react';

/**
 * BottomNav Component matching the home screen design:
 * 1. Home (House)
 * 2. Heart (Journal / Feelings)
 * 3. BookOpen (Digital Journal & Guides)
 * 4. Users (Community)
 * 5. Settings (Personalisation & Wardrobe)
 */
export function BottomNav({ activeTab = 'home', onTabChange, isHomeOverlay = false }) {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
    },
    {
      id: 'journal',
      label: 'Journal',
      icon: Heart,
    },
    {
      id: 'log-meal',
      label: 'Guides',
      icon: BookOpen,
    },
    {
      id: 'community',
      label: 'Community',
      icon: Users,
    },
    {
      id: 'progress',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <div className={`w-full flex items-center justify-around pt-2 pb-1 ${isHomeOverlay ? '' : 'px-3'}`}>
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange(item.id)}
            aria-label={item.label}
            className={`relative p-2 rounded-xl transition-all duration-200 cursor-pointer select-none focus:outline-none ${
              isActive
                ? 'text-[#201E22] scale-110 drop-shadow-xs'
                : 'text-[#697787] hover:text-[#3B4550] hover:scale-105'
            }`}
          >
            <IconComponent
              className="w-6 h-6 transition-transform"
              strokeWidth={isActive ? 2.6 : 2}
              fill={isActive && item.id === 'home' ? '#201E22' : 'none'}
            />
            {isActive && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#201E22]" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default BottomNav;
