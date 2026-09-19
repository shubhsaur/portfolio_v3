export interface MotivationalQuote {
  id: string;
  text: string;
  author?: string;
  category?: string;
}

export const motivationalQuotes: MotivationalQuote[] = [
  {
    id: "curse-of-discipline",
    text: "The Curse of Discipline is that every day looks the same and the curse of indiscipline is that every year looks the same",
    author: "Unknown",
    category: "Discipline",
  },
  {
    id: "systems-over-goals",
    text: "You do not rise to the level of your goals. You fall to the level of your systems.",
    author: "James Clear",
    category: "Consistency",
  },
  {
    id: "mastery-failure",
    text: "The master has failed more times than the beginner has even tried.",
    author: "Stephen McCranie",
    category: "Mastery",
  },
  {
    id: "habit-sustains",
    text: "First forget inspiration. Habit is more dependable. Habit will sustain you whether you're inspired or not.",
    author: "Octavia Butler",
    category: "Craft",
  },
  {
    id: "choice-of-discipline",
    text: "Discipline is choosing between what you want now and what you want most.",
    author: "Abraham Lincoln",
    category: "Discipline",
  },
  {
    id: "time-shortness",
    text: "It is not that we have a short time to live, but that we waste a lot of it.",
    author: "Seneca",
    category: "Focus",
  },
  {
    id: "daily-growth",
    text: "Small disciplines repeated with consistency every day lead to great achievements gained slowly over time.",
    author: "John C. Maxwell",
    category: "Growth",
  },
];
