export type Question = {
  stepNumber: number;
  category: string;
  title: string;
  options: string[];
  multiple?: boolean;
};

export const ONBOARDING_NONE_OPTION_KEY = 'Onboarding.common.none';

export const ONBOARDING_QUESTIONS: Question[] = [
  {
    stepNumber: 0,
    category: 'pet',
    title: 'Onboarding.q0.title',
    options: [
      'Onboarding.q0.options.cat',
      'Onboarding.q0.options.dog',
      ONBOARDING_NONE_OPTION_KEY,
      'Onboarding.q0.options.etc',
    ],
    multiple: true,
  },
  {
    stepNumber: 1,
    category: 'exercise',
    title: 'Onboarding.q1.title',
    options: [
      'Onboarding.q1.options.yoga',
      'Onboarding.q1.options.bike',
      'Onboarding.q1.options.stretch',
      'Onboarding.q1.options.running',
      'Onboarding.q1.options.gym',
      ONBOARDING_NONE_OPTION_KEY,
    ],
    multiple: true,
  },
  {
    stepNumber: 2,
    category: 'plant',
    title: 'Onboarding.q2.title',
    options: ['Onboarding.q2.options.yes', ONBOARDING_NONE_OPTION_KEY],
    multiple: false,
  },
  {
    stepNumber: 3,
    category: 'resilience',
    title: 'Onboarding.q3.title',
    options: [
      'Onboarding.q3.options.walk',
      'Onboarding.q3.options.cook',
      'Onboarding.q3.options.lightExercise',
      'Onboarding.q3.options.warmShower',
      'Onboarding.q3.options.music',
    ],
    multiple: true,
  },
  {
    stepNumber: 4,
    category: 'music',
    title: 'Onboarding.q4.title',
    options: [
      'Onboarding.q4.options.pop',
      'Onboarding.q4.options.indie',
      'Onboarding.q4.options.hiphop',
      'Onboarding.q4.options.ballad',
      'Onboarding.q4.options.classic',
      'Onboarding.q4.options.lofi',
    ],
    multiple: true,
  },
  {
    stepNumber: 5,
    category: 'rest',
    title: 'Onboarding.q5.title',
    options: [
      'Onboarding.q5.options.music',
      'Onboarding.q5.options.video',
      'Onboarding.q5.options.lieDown',
      'Onboarding.q5.options.walk',
      'Onboarding.q5.options.read',
    ],
    multiple: true,
  },
  {
    stepNumber: 6,
    category: 'outdoor',
    title: 'Onboarding.q6.title',
    options: [
      'Onboarding.q6.options.convenienceStore',
      'Onboarding.q6.options.cafe',
      'Onboarding.q6.options.park',
      'Onboarding.q6.options.mart',
      ONBOARDING_NONE_OPTION_KEY,
    ],
    multiple: true,
  },
  {
    stepNumber: 7,
    category: 'space',
    title: 'Onboarding.q7.title',
    options: [
      'Onboarding.q7.options.bed',
      'Onboarding.q7.options.desk',
      'Onboarding.q7.options.sofa',
      'Onboarding.q7.options.kitchen',
      'Onboarding.q7.options.etc',
    ],
    multiple: true,
  },
];
