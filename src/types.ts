export type TabType = 'daily-routine' | 'timetable' | 'study-hub' | 'mindset';

export interface HabitItem {
  id: string;
  title: string;
  scheduleTime: string;
  category: 'Morning' | 'Discipline' | 'Courage' | 'Study' | 'Night';
  completed: boolean;
  streakDays?: number;
  subtitle?: string;
  active?: boolean;
}

export interface UniversityClass {
  id: string;
  code: string;
  title: string;
  time: string;
  day: string; // 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'
  location: string;
  instructor: string;
  attendancePercent: number;
  type: 'Lecture' | 'Lab' | 'Team Review';
  statusTag?: string;
  isNext?: boolean;
  reminderActive: boolean;
}

export interface DeadlineItem {
  id: string;
  title: string;
  course: string;
  time: string;
  dueLabel: string;
  isUrgent?: boolean;
  priority?: 'High Priority' | 'Medium' | 'Normal';
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topic: string;
}

export interface LetterEntry {
  id: string;
  date: string;
  title: string;
  content: string;
}
