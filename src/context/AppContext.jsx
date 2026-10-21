import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import * as storage from '../services/storage';

export const AppContext = createContext(null);

/**
 * AppProvider wraps the application and supplies reactive access to the Mimi&Me state,
 * automatically synchronizing with localStorage via the storage service.
 */
export function AppProvider({ children }) {
  const [state, setState] = useState(() => storage.getState());

  // Keep state synchronized with storage events (cross-tab or external custom updates)
  useEffect(() => {
    const handleStorageUpdate = (event) => {
      if (event?.detail) {
        setState(event.detail);
      } else {
        setState(storage.getState());
      }
    };

    const handleWindowStorage = (e) => {
      if (e.key === storage.STORAGE_KEY) {
        setState(storage.getState());
      }
    };

    window.addEventListener('mimi_storage_update', handleStorageUpdate);
    window.addEventListener('storage', handleWindowStorage);

    return () => {
      window.removeEventListener('mimi_storage_update', handleStorageUpdate);
      window.removeEventListener('storage', handleWindowStorage);
    };
  }, []);

  // Mutation Handlers
  const handleUpdateProfile = useCallback((profileData) => {
    const updated = storage.updateProfile(profileData);
    setState(updated);
    return updated;
  }, []);

  const handleAddMealLog = useCallback((log) => {
    const updated = storage.addMealLog(log);
    setState(updated);
    return updated;
  }, []);

  const handleAddJournalEntry = useCallback((entry) => {
    const updated = storage.addJournalEntry(entry);
    setState(updated);
    return updated;
  }, []);

  const handleDeleteJournalEntry = useCallback((entryId) => {
    const updated = storage.deleteJournalEntry(entryId);
    setState(updated);
    return updated;
  }, []);

  const handleCompleteLearningModule = useCallback((moduleId) => {
    const updated = storage.completeLearningModule(moduleId);
    setState(updated);
    return updated;
  }, []);

  const handleToggleBookmarkModule = useCallback((moduleId) => {
    const updated = storage.toggleBookmarkModule(moduleId);
    setState(updated);
    return updated;
  }, []);

  const handleUpdateCompanion = useCallback((companionData) => {
    const updated = storage.updateCompanion(companionData);
    setState(updated);
    return updated;
  }, []);

  const handleToggleOutfit = useCallback((outfitId) => {
    const updated = storage.toggleOutfit(outfitId);
    setState(updated);
    return updated;
  }, []);

  const handleRecordActiveDay = useCallback((dateStr) => {
    const updated = storage.recordActiveDay(dateStr);
    setState(updated);
    return updated;
  }, []);

  const handleAddChatMessage = useCallback((message) => {
    const updated = storage.addChatMessage(message);
    setState(updated);
    return updated;
  }, []);

  const handleUpdateProgress = useCallback((progressData) => {
    const updated = storage.updateProgress(progressData);
    setState(updated);
    return updated;
  }, []);

  const handleResetToDefaultState = useCallback(() => {
    const reset = storage.resetState();
    setState(reset);
    return reset;
  }, []);

  const value = useMemo(() => ({
    // Global state slices
    state,
    userProfile: state.userProfile,
    companion: state.companion,
    mealLogs: state.mealLogs,
    journalEntries: state.journalEntries,
    learningProgress: state.learningProgress,
    community: state.community,
    progress: state.progress,
    chatHistory: state.chatHistory,

    // Mutation handlers
    updateProfile: handleUpdateProfile,
    addMealLog: handleAddMealLog,
    addJournalEntry: handleAddJournalEntry,
    deleteJournalEntry: handleDeleteJournalEntry,
    completeLearningModule: handleCompleteLearningModule,
    toggleBookmarkModule: handleToggleBookmarkModule,
    updateCompanion: handleUpdateCompanion,
    toggleOutfit: handleToggleOutfit,
    recordActiveDay: handleRecordActiveDay,
    addChatMessage: handleAddChatMessage,
    updateProgress: handleUpdateProgress,
    resetToDefaultState: handleResetToDefaultState,
  }), [
    state,
    handleUpdateProfile,
    handleAddMealLog,
    handleAddJournalEntry,
    handleDeleteJournalEntry,
    handleCompleteLearningModule,
    handleToggleBookmarkModule,
    handleUpdateCompanion,
    handleToggleOutfit,
    handleRecordActiveDay,
    handleAddChatMessage,
    handleUpdateProgress,
    handleResetToDefaultState
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Custom hook to consume AppContext
 * @returns {NonNullable<React.ContextType<typeof AppContext>>}
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

/**
 * Convenience alias for useApp
 */
export const useAppContext = useApp;
