export type IconName = 'briefing' | 'brainstorm' | 'meeting' | 'marketing' | 'social' | 'results' | 'default';

export interface SlidePoint {
  title: string;
  description: string;
  icon: IconName;
}

export type SlideStyle = 'original' | 'process' | 'sketch';