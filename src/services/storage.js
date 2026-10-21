/**
 * @file storage.js
 * LocalStorage Service for "Mimi&Me"
 * Manages persistent state with default seed data and non-punitive streak mechanics.
 */

export const STORAGE_KEY = 'mimi_app_state';

/**
 * @typedef {Object} NutritionBreakdown
 * @property {number} proteinGrams
 * @property {number} carbsGrams
 * @property {number} fibreGrams
 * @property {number} fatsGrams
 */

/**
 * @typedef {Object} MealLog
 * @property {string} id
 * @property {string} timestamp - ISO 8601 string
 * @property {string} mealType - e.g. "Breakfast", "Lunch", "Dinner", "Snack"
 * @property {string} photoData - SVG string or base64 data URI
 * @property {NutritionBreakdown} nutritionBreakdown
 * @property {string} postMealFeeling
 */

/**
 * @typedef {Object} JournalEntry
 * @property {string} id
 * @property {string} date - YYYY-MM-DD
 * @property {string} mood - e.g. "Overwhelmed", "Calm", "Hopeful"
 * @property {string} thoughtText
 * @property {string} savedCopingStrategy
 */

/**
 * @typedef {Object} UserProfile
 * @property {string} name
 * @property {string} email
 * @property {boolean} isOnboarded
 * @property {string[]} supportAreas
 * @property {boolean} mealRemindersEnabled
 * @property {Record<string, string>} preferredMealTimes
 */

/**
 * @typedef {Object} Companion
 * @property {'dog' | 'cat' | 'rabbit'} type
 * @property {string} name
 * @property {string} equippedOutfit
 * @property {string[]} unlockedOutfits
 */

/**
 * @typedef {Object} Progress
 * @property {number} totalMealsLogged
 * @property {number} healthyDays
 * @property {number} streakDays
 * @property {string[]} unlockedAchievements
 * @property {string} [lastActiveDate] - YYYY-MM-DD
 */

/**
 * @typedef {Object} ChatMessage
 * @property {'user' | 'mimi'} sender
 * @property {string} text
 * @property {string} [timestamp]
 */

/**
 * @typedef {Object} ForumPost
 * @property {string} id
 * @property {string} author
 * @property {string} text
 * @property {number} likes
 * @property {number} commentsCount
 * @property {boolean} isLikedByUser
 */

/**
 * @typedef {Object} AppState
 * @property {UserProfile} userProfile
 * @property {Companion} companion
 * @property {MealLog[]} mealLogs
 * @property {JournalEntry[]} journalEntries
 * @property {{ completedModuleIds: string[]; bookmarkedModuleIds: string[] }} learningProgress
 * @property {{ joinedGroups: string[]; forumPosts: ForumPost[] }} community
 * @property {Progress} progress
 * @property {ChatMessage[]} chatHistory
 */

export const INITIAL_STATE = {
  userProfile: {
    name: "Jane",
    email: "mimi@gmail.com",
    isOnboarded: true,
    supportAreas: [
      "Managing guilt around food",
      "Feeling more comfortable with my body",
      "Coping with difficult emotions"
    ],
    mealRemindersEnabled: true,
    preferredMealTimes: {
      breakfast: "07:30 AM",
      lunch: "12:30 PM",
      dinner: "06:30 PM",
      snack: "09:00 PM"
    }
  },
  companion: {
    type: "dog",
    name: "Mimi",
    equippedOutfit: "green_bandana",
    unlockedOutfits: ["default", "green_bandana", "flower_crown"]
  },
  mealLogs: [
    {
      id: "meal_101",
      timestamp: "2026-10-16T12:30:00Z",
      mealType: "Lunch",
      photoData: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23FFE4D6'/><path d='M30 50 Q50 30 70 50 Q50 70 30 50' fill='%2385E3B3'/><circle cx='50' cy='45' r='10' fill='%23FFB870'/></svg>",
      nutritionBreakdown: {
        proteinGrams: 35,
        carbsGrams: 60,
        fibreGrams: 16,
        fatsGrams: 18
      },
      postMealFeeling: "Slightly anxious, but felt supported after logging"
    }
  ],
  journalEntries: [
    {
      id: "journal_201",
      date: "2026-10-16",
      mood: "Overwhelmed",
      thoughtText: "I keep feeling guilty about eating large portions, but I used my breathing exercise.",
      savedCopingStrategy: "5-4-3-2-1 Grounding exercise & deep breathing"
    }
  ],
  learningProgress: {
    completedModuleIds: ["mod_understanding_ed", "mod_coping_comparisons"],
    bookmarkedModuleIds: ["mod_seeking_support"]
  },
  community: {
    joinedGroups: ["grp_anonymous_support", "grp_progress_buddies"],
    forumPosts: [
      {
        id: "post_1",
        author: "QuietRiver",
        text: "Today I tried a new recipe and it actually made me feel so good.",
        likes: 231,
        commentsCount: 14,
        isLikedByUser: false
      }
    ]
  },
  progress: {
    totalMealsLogged: 18,
    healthyDays: 15,
    streakDays: 4,
    unlockedAchievements: [
      "progress_star",
      "meal_explorer",
      "wardrobe_unlocked"
    ],
    lastActiveDate: "2026-10-16"
  },
  chatHistory: [
    {
      sender: "user",
      text: "I feel guilty after eating, what should I do?"
    },
    {
      sender: "mimi",
      text: "It's completely normal to feel that way, but please remember that food is fuel, not a punishment. Would you like to try a quick grounding exercise?"
    }
  ]
};

/**
 * Safe local storage retrieval with fallback to initial default data
 * @returns {AppState} Current application state
 */
export function getState() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return structuredClone(INITIAL_STATE);
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = structuredClone(INITIAL_STATE);
      saveState(initial);
      return initial;
    }

    const parsed = JSON.parse(raw);

    // Deep merge with initial state to guarantee all keys exist if schema evolves
    return {
      ...INITIAL_STATE,
      ...parsed,
      userProfile: {
        ...INITIAL_STATE.userProfile,
        ...(parsed.userProfile || {}),
        preferredMealTimes: {
          ...INITIAL_STATE.userProfile.preferredMealTimes,
          ...((parsed.userProfile && parsed.userProfile.preferredMealTimes) || {})
        }
      },
      companion: {
        ...INITIAL_STATE.companion,
        ...(parsed.companion || {})
      },
      learningProgress: {
        ...INITIAL_STATE.learningProgress,
        ...(parsed.learningProgress || {})
      },
      community: {
        ...INITIAL_STATE.community,
        ...(parsed.community || {})
      },
      progress: {
        ...INITIAL_STATE.progress,
        ...(parsed.progress || {})
      },
      mealLogs: Array.isArray(parsed.mealLogs) ? parsed.mealLogs : INITIAL_STATE.mealLogs,
      journalEntries: Array.isArray(parsed.journalEntries) ? parsed.journalEntries : INITIAL_STATE.journalEntries,
      chatHistory: Array.isArray(parsed.chatHistory) ? parsed.chatHistory : INITIAL_STATE.chatHistory
    };
  } catch (error) {
    console.warn('[storage] Error parsing state from localStorage; reseeding default state.', error);
    const initial = structuredClone(INITIAL_STATE);
    saveState(initial);
    return initial;
  }
}

/**
 * Persist application state to LocalStorage
 * @param {AppState} state
 * @returns {boolean} Success status
 */
export function saveState(state) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Dispatch custom event so listeners (same tab or cross-component) can react if desired
    window.dispatchEvent(new CustomEvent('mimi_storage_update', { detail: state }));
    return true;
  } catch (error) {
    console.error('[storage] Failed to save state to localStorage:', error);
    return false;
  }
}

/**
 * Update user profile attributes
 * @param {Partial<UserProfile>} data
 * @returns {AppState} Updated state
 */
export function updateProfile(data) {
  const current = getState();
  const updated = {
    ...current,
    userProfile: {
      ...current.userProfile,
      ...data,
      preferredMealTimes: {
        ...current.userProfile.preferredMealTimes,
        ...(data.preferredMealTimes || {})
      }
    }
  };
  saveState(updated);
  return updated;
}

/**
 * Non-punitive streak logic.
 * In eating disorder recovery, streaks NEVER reset to 0 upon missed days.
 * Every day the user takes an active step increments their healthy days and streak count.
 * Calling this multiple times on the same date will safely record without duplicate counting.
 *
 * @param {string} [dateStr] - Optional date string (YYYY-MM-DD); defaults to today.
 * @returns {AppState} Updated state with progress
 */
export function recordActiveDay(dateStr) {
  const current = getState();
  const today = dateStr || new Date().toISOString().split('T')[0];

  const currentProgress = current.progress || {
    totalMealsLogged: 0,
    healthyDays: 0,
    streakDays: 0,
    unlockedAchievements: []
  };

  // If already logged today, keep progress as is
  if (currentProgress.lastActiveDate === today) {
    return current;
  }

  // Non-punitive: always increment healthyDays and streakDays from their existing values!
  // No zeroing out on missed days.
  const newHealthyDays = (currentProgress.healthyDays || 0) + 1;
  const newStreakDays = (currentProgress.streakDays || 0) + 1;

  // Check achievements unlocks
  const achievements = new Set(currentProgress.unlockedAchievements || []);
  if (newStreakDays >= 1) achievements.add('progress_star');
  if (newStreakDays >= 3) achievements.add('streak_three_days');
  if (newStreakDays >= 7) achievements.add('gentle_consistency');
  if (newHealthyDays >= 14) achievements.add('two_weeks_strong');

  const updatedProgress = {
    ...currentProgress,
    healthyDays: newHealthyDays,
    streakDays: newStreakDays,
    lastActiveDate: today,
    unlockedAchievements: Array.from(achievements)
  };

  const updated = {
    ...current,
    progress: updatedProgress
  };

  saveState(updated);
  return updated;
}

/**
 * Add a new meal log and automatically update meal counts and active streak
 * @param {Omit<MealLog, 'id'> & { id?: string }} log
 * @returns {AppState} Updated state
 */
export function addMealLog(log) {
  const current = getState();

  const newLog = {
    id: log.id || `meal_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: log.timestamp || new Date().toISOString(),
    mealType: log.mealType || 'Meal',
    photoData: log.photoData || '',
    nutritionBreakdown: log.nutritionBreakdown || {
      proteinGrams: 0,
      carbsGrams: 0,
      fibreGrams: 0,
      fatsGrams: 0
    },
    postMealFeeling: log.postMealFeeling || ''
  };

  const updatedLogs = [newLog, ...(current.mealLogs || [])];
  const newTotalMeals = (current.progress?.totalMealsLogged || 0) + 1;

  const achievements = new Set(current.progress?.unlockedAchievements || []);
  if (newTotalMeals >= 1) achievements.add('meal_explorer');
  if (newTotalMeals >= 10) achievements.add('mindful_eater');
  if (newTotalMeals >= 25) achievements.add('nourishment_master');

  const updatedProgress = {
    ...(current.progress || {}),
    totalMealsLogged: newTotalMeals,
    unlockedAchievements: Array.from(achievements)
  };

  const updatedState = {
    ...current,
    mealLogs: updatedLogs,
    progress: updatedProgress
  };

  saveState(updatedState);
  // Auto-record active day (non-punitive)
  return recordActiveDay();
}

/**
 * Add a new journal entry and record an active day
 * @param {Omit<JournalEntry, 'id'> & { id?: string }} entry
 * @returns {AppState} Updated state
 */
export function addJournalEntry(entry) {
  const current = getState();

  const newEntry = {
    id: entry.id || `journal_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    date: entry.date || new Date().toISOString().split('T')[0],
    mood: entry.mood || 'Reflective',
    thoughtText: entry.thoughtText || '',
    savedCopingStrategy: entry.savedCopingStrategy || ''
  };

  const updatedEntries = [newEntry, ...(current.journalEntries || [])];

  const updatedState = {
    ...current,
    journalEntries: updatedEntries
  };

  saveState(updatedState);
  return recordActiveDay(newEntry.date);
}

/**
 * Update companion attributes (name, type, outfits)
 * @param {Partial<Companion>} companionData
 * @returns {AppState} Updated state
 */
export function updateCompanion(companionData) {
  const current = getState();
  const updated = {
    ...current,
    companion: {
      ...current.companion,
      ...companionData
    }
  };
  saveState(updated);
  return updated;
}

/**
 * Toggle an outfit for the companion.
 * If already equipped, switches back to "default" (unless outfitId itself is "default").
 * Ensures the outfit is part of unlocked outfits.
 *
 * @param {string} outfitId
 * @returns {AppState} Updated state
 */
export function toggleOutfit(outfitId) {
  const current = getState();
  const companion = current.companion || INITIAL_STATE.companion;

  const unlocked = Array.from(new Set([...(companion.unlockedOutfits || ['default']), outfitId]));
  const isCurrentlyEquipped = companion.equippedOutfit === outfitId;

  // Toggle off back to default if already worn, otherwise wear the new outfit
  const nextEquipped = isCurrentlyEquipped && outfitId !== 'default' ? 'default' : outfitId;

  return updateCompanion({
    equippedOutfit: nextEquipped,
    unlockedOutfits: unlocked
  });
}

/**
 * Add a chat message to the companion conversation
 * @param {ChatMessage} message
 * @returns {AppState} Updated state
 */
export function addChatMessage(message) {
  const current = getState();
  const newMsg = {
    sender: message.sender || 'user',
    text: message.text || '',
    timestamp: message.timestamp || new Date().toISOString()
  };

  const updatedState = {
    ...current,
    chatHistory: [...(current.chatHistory || []), newMsg]
  };
  saveState(updatedState);
  return updatedState;
}

/**
 * Update progress object manually
 * @param {Partial<Progress>} progressData
 * @returns {AppState} Updated state
 */
export function updateProgress(progressData) {
  const current = getState();
  const updated = {
    ...current,
    progress: {
      ...current.progress,
      ...progressData
    }
  };
  saveState(updated);
  return updated;
}

/**
 * Reset application state back to seed data
 * @returns {AppState} Fresh initial state
 */
export function resetState() {
  const initial = structuredClone(INITIAL_STATE);
  saveState(initial);
  return initial;
}
