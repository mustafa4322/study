import React, { useState, useEffect } from 'react';
import { TabType, HabitItem, UniversityClass, DeadlineItem } from './types';
import {
  INITIAL_MORNING_HABITS,
  INITIAL_DISCIPLINE_HABITS,
  INITIAL_COURAGE_HABITS,
  INITIAL_MINDSET_HABITS,
  INITIAL_CLASSES,
  INITIAL_DEADLINES,
} from './data/initialData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DailyRoutineScreen } from './components/screens/DailyRoutineScreen';
import { TimetableScreen } from './components/screens/TimetableScreen';
import { StudyHubScreen } from './components/screens/StudyHubScreen';
import { MindsetScreen } from './components/screens/MindsetScreen';
import { AddHabitModal } from './components/modals/AddHabitModal';
import { AddClassModal } from './components/modals/AddClassModal';
import { AddDeadlineModal } from './components/modals/AddDeadlineModal';
import { FeynmanSandboxModal } from './components/modals/FeynmanSandboxModal';
import { FlashcardsModal } from './components/modals/FlashcardsModal';
import { LetterToPastModal } from './components/modals/LetterToPastModal';
import { QuickAddModal } from './components/QuickAddModal';
import { NotificationModal } from './components/NotificationModal';
import { ProfileModal } from './components/ProfileModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    return (localStorage.getItem('ff_active_tab') as TabType) || 'daily-routine';
  });

  const [morningHabits, setMorningHabits] = useState<HabitItem[]>(() => {
    const saved = localStorage.getItem('ff_morning_habits');
    return saved ? JSON.parse(saved) : INITIAL_MORNING_HABITS;
  });

  const [disciplineHabits, setDisciplineHabits] = useState<HabitItem[]>(() => {
    const saved = localStorage.getItem('ff_discipline_habits');
    return saved ? JSON.parse(saved) : INITIAL_DISCIPLINE_HABITS;
  });

  const [courageHabits, setCourageHabits] = useState<HabitItem[]>(() => {
    const saved = localStorage.getItem('ff_courage_habits');
    return saved ? JSON.parse(saved) : INITIAL_COURAGE_HABITS;
  });

  const [mindsetHabits, setMindsetHabits] = useState<HabitItem[]>(() => {
    const saved = localStorage.getItem('ff_mindset_habits');
    return saved ? JSON.parse(saved) : INITIAL_MINDSET_HABITS;
  });

  const [classes, setClasses] = useState<UniversityClass[]>(() => {
    const saved = localStorage.getItem('ff_classes');
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [deadlines, setDeadlines] = useState<DeadlineItem[]>(() => {
    const saved = localStorage.getItem('ff_deadlines');
    return saved ? JSON.parse(saved) : INITIAL_DEADLINES;
  });

  const [waterCurrent, setWaterCurrent] = useState<number>(() => {
    const saved = localStorage.getItem('ff_water');
    return saved ? parseFloat(saved) : 2.5;
  });

  const [strangerCount, setStrangerCount] = useState<number>(() => {
    const saved = localStorage.getItem('ff_strangers');
    return saved ? parseInt(saved, 10) : 4;
  });

  // Modal States
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [isAddDeadlineOpen, setIsAddDeadlineOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFeynmanOpen, setIsFeynmanOpen] = useState(false);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false);
  const [isLetterToPastOpen, setIsLetterToPastOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ff_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('ff_morning_habits', JSON.stringify(morningHabits));
  }, [morningHabits]);

  useEffect(() => {
    localStorage.setItem('ff_discipline_habits', JSON.stringify(disciplineHabits));
  }, [disciplineHabits]);

  useEffect(() => {
    localStorage.setItem('ff_courage_habits', JSON.stringify(courageHabits));
  }, [courageHabits]);

  useEffect(() => {
    localStorage.setItem('ff_mindset_habits', JSON.stringify(mindsetHabits));
  }, [mindsetHabits]);

  useEffect(() => {
    localStorage.setItem('ff_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('ff_deadlines', JSON.stringify(deadlines));
  }, [deadlines]);

  useEffect(() => {
    localStorage.setItem('ff_water', waterCurrent.toString());
  }, [waterCurrent]);

  useEffect(() => {
    localStorage.setItem('ff_strangers', strangerCount.toString());
  }, [strangerCount]);

  // Habit Handlers
  const handleToggleHabit = (id: string) => {
    setMorningHabits((list) =>
      list.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
    setDisciplineHabits((list) =>
      list.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
    setCourageHabits((list) =>
      list.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  const handleDeleteHabit = (id: string) => {
    setMorningHabits((list) => list.filter((h) => h.id !== id));
    setDisciplineHabits((list) => list.filter((h) => h.id !== id));
    setCourageHabits((list) => list.filter((h) => h.id !== id));
  };

  const handleAddHabit = (newHabit: HabitItem) => {
    if (newHabit.category === 'Morning') {
      setMorningHabits((list) => [...list, newHabit]);
    } else if (newHabit.category === 'Discipline') {
      setDisciplineHabits((list) => [...list, newHabit]);
    } else if (newHabit.category === 'Courage') {
      setCourageHabits((list) => [...list, newHabit]);
    } else {
      setMorningHabits((list) => [...list, newHabit]);
    }
    // Also add to mindset habits if general
    setMindsetHabits((list) => [
      {
        id: newHabit.id,
        title: newHabit.title,
        scheduleTime: newHabit.scheduleTime,
        category: newHabit.category,
        completed: false,
        active: true,
      },
      ...list,
    ]);
  };

  const handleToggleMindsetHabit = (id: string) => {
    setMindsetHabits((list) =>
      list.map((h) => (h.id === id ? { ...h, active: !h.active } : h))
    );
  };

  const handleDeleteMindsetHabit = (id: string) => {
    setMindsetHabits((list) => list.filter((h) => h.id !== id));
  };

  // Water handler
  const handleAddWater = () => {
    if (waterCurrent < 4.0) {
      setWaterCurrent((prev) => Math.min(4.0, parseFloat((prev + 0.25).toFixed(2))));
    }
  };

  // Stranger challenge handlers
  const handleIncrementStranger = () => {
    if (strangerCount < 10) setStrangerCount((c) => c + 1);
  };

  const handleDecrementStranger = () => {
    if (strangerCount > 0) setStrangerCount((c) => c - 1);
  };

  // Classes handlers
  const handleToggleClassReminder = (id: string) => {
    setClasses((list) =>
      list.map((c) => (c.id === id ? { ...c, reminderActive: !c.reminderActive } : c))
    );
  };

  const handleDeleteClass = (id: string) => {
    setClasses((list) => list.filter((c) => c.id !== id));
  };

  const handleAddClass = (newClass: UniversityClass) => {
    setClasses((list) => [...list, newClass]);
  };

  // Deadlines handlers
  const handleAddDeadline = (newDeadline: DeadlineItem) => {
    setDeadlines((list) => [newDeadline, ...list]);
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] flex flex-col antialiased selection:bg-[#10b981] selection:text-[#00422b]">
      {/* Top App Bar */}
      <Header
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        streakDays={14}
      />

      {/* Main Screen Content Container (Centered for clean mobile & tablet/desktop presentation) */}
      <main className="flex-1 flex flex-col relative w-full pt-20 max-w-md mx-auto">
        {activeTab === 'daily-routine' && (
          <DailyRoutineScreen
            morningHabits={morningHabits}
            disciplineHabits={disciplineHabits}
            courageHabits={courageHabits}
            onToggleHabit={handleToggleHabit}
            onDeleteHabit={handleDeleteHabit}
            onOpenAddModal={() => setIsAddHabitOpen(true)}
            waterCurrent={waterCurrent}
            onAddWater={handleAddWater}
            strangerCount={strangerCount}
            onIncrementStranger={handleIncrementStranger}
            onDecrementStranger={handleDecrementStranger}
          />
        )}

        {activeTab === 'timetable' && (
          <TimetableScreen
            classes={classes}
            onToggleClassReminder={handleToggleClassReminder}
            onDeleteClass={handleDeleteClass}
            onOpenAddClass={() => setIsAddClassOpen(true)}
          />
        )}

        {activeTab === 'study-hub' && (
          <StudyHubScreen
            deadlines={deadlines}
            onOpenAddDeadline={() => setIsAddDeadlineOpen(true)}
            onOpenFeynmanSandbox={() => setIsFeynmanOpen(true)}
            onOpenFlashcards={() => setIsFlashcardsOpen(true)}
          />
        )}

        {activeTab === 'mindset' && (
          <MindsetScreen
            mindsetHabits={mindsetHabits}
            onToggleMindsetHabit={handleToggleMindsetHabit}
            onDeleteMindsetHabit={handleDeleteMindsetHabit}
            onOpenAddHabit={() => setIsAddHabitOpen(true)}
            onOpenLettersModal={() => setIsLetterToPastOpen(true)}
          />
        )}
      </main>

      {/* Persistent Bottom Bar with Floating Quick Add */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onQuickAdd={() => setIsQuickAddOpen(true)}
      />

      {/* Modals & Action Sheets */}
      <AddHabitModal
        isOpen={isAddHabitOpen}
        onClose={() => setIsAddHabitOpen(false)}
        onAddHabit={handleAddHabit}
      />

      <AddClassModal
        isOpen={isAddClassOpen}
        onClose={() => setIsAddClassOpen(false)}
        onAddClass={handleAddClass}
      />

      <AddDeadlineModal
        isOpen={isAddDeadlineOpen}
        onClose={() => setIsAddDeadlineOpen(false)}
        onAddDeadline={handleAddDeadline}
      />

      <FeynmanSandboxModal
        isOpen={isFeynmanOpen}
        onClose={() => setIsFeynmanOpen(false)}
      />

      <FlashcardsModal
        isOpen={isFlashcardsOpen}
        onClose={() => setIsFlashcardsOpen(false)}
      />

      <LetterToPastModal
        isOpen={isLetterToPastOpen}
        onClose={() => setIsLetterToPastOpen(false)}
      />

      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onOpenAddHabit={() => setIsAddHabitOpen(true)}
        onOpenAddClass={() => setIsAddClassOpen(true)}
        onOpenAddDeadline={() => setIsAddDeadlineOpen(true)}
        onQuickWater={handleAddWater}
      />

      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        streakDays={14}
      />
    </div>
  );
}
