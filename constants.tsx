
import { Task } from './types';

export const INITIAL_TASKS: Task[] = [
  { id: 't1', title: 'Follow on Twitter', description: 'Follow our official handle to earn coins.', reward: 50, link: 'https://twitter.com', type: 'task', category: 'Social Media' },
  { id: 't2', title: 'Join Telegram Channel', description: 'Get latest updates in our TG group.', reward: 30, link: 'https://telegram.org', type: 'task', category: 'Social Media' },
  { id: 't3', title: 'Share on Facebook', description: 'Post about Ads Predia on your wall.', reward: 40, link: 'https://facebook.com', type: 'task', category: 'Social Media' },
  { id: 't4', title: 'Write a Review', description: 'Write a 50-word review on Trustpilot.', reward: 120, link: '#', type: 'task', category: 'Reviews' },
];

export const INITIAL_SURVEYS: Task[] = [
  { id: 's1', title: 'Customer Feedback Survey', description: 'Help us improve our platform features.', reward: 150, link: '#', type: 'survey', category: 'Research' },
  { id: 's2', title: 'Marketing Research 2024', description: 'Answer 5 simple questions about ads.', reward: 200, link: '#', type: 'survey', category: 'Marketing' },
  { id: 's3', title: 'Quick Poll', description: 'Choose your favorite feature.', reward: 10, link: '#', type: 'survey', category: 'General' },
];

export const INITIAL_VIDEOS: Task[] = [
  { id: 'v1', title: 'Watch Promo Video', description: 'Watch the full video to earn rewards.', reward: 20, link: 'https://youtube.com', type: 'video', duration: 15, category: 'Entertainment' },
  { id: 'v2', title: 'Tech Review 2024', description: 'Watch the review of latest gadgets.', reward: 25, link: 'https://youtube.com', type: 'video', duration: 15, category: 'Technology' },
  { id: 'v3', title: 'Cooking Tutorial', description: 'Learn a new recipe in 30 seconds.', reward: 45, link: 'https://youtube.com', type: 'video', duration: 30, category: 'Education' },
];

export const INITIAL_WEBSITES: Task[] = [
  { id: 'w1', title: 'E-commerce Store', description: 'Visit and browse for 10 seconds.', reward: 10, link: 'https://example.com', type: 'website', duration: 10, category: 'Shopping' },
  { id: 'w2', title: 'Crypto News Portal', description: 'Read the latest headlines.', reward: 15, link: 'https://example.com', type: 'website', duration: 10, category: 'News' },
  { id: 'w3', title: 'Portfolio Showcase', description: 'View professional projects for 20 seconds.', reward: 30, link: 'https://example.com', type: 'website', duration: 20, category: 'General' },
];
