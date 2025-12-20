export type Question = {
  stepNumber: number;
  category: { en: string; ko: string };
  title: string;
  options: string[];
  multiple?: boolean;
};

export const ONBOARDING_NONE_OPTION_KEY = 'Onboarding.common.none';

export const ONBOARDING_QUESTIONS: Question[] = [
  {
    stepNumber: 0,
    category: {
      en: 'Pets',
      ko: '반려동물',
    },
    title: 'Onboarding.q0.title',
    options: [
      'Onboarding.q0.options.Cat',
      'Onboarding.q0.options.Dog',
      ONBOARDING_NONE_OPTION_KEY,
      'Onboarding.q0.options.Etc',
    ],
    multiple: true,
  },
  {
    stepNumber: 1,
    category: {
      en: 'Exercise Experience',
      ko: '운동 경험',
    },
    title: 'Onboarding.q1.title',
    options: [
      'Onboarding.q1.options.Yoga',
      'Onboarding.q1.options.Cycling',
      'Onboarding.q1.options.Stretch',
      'Onboarding.q1.options.Running',
      'Onboarding.q1.options.Gym',
      ONBOARDING_NONE_OPTION_KEY,
    ],
    multiple: true,
  },
  {
    stepNumber: 2,
    category: {
      en: 'Plants/Nature',
      ko: '식물/자연',
    },
    title: 'Onboarding.q2.title',
    options: ['Onboarding.q2.options.Yes', ONBOARDING_NONE_OPTION_KEY],
    multiple: false,
  },
  {
    stepNumber: 3,
    category: {
      en: 'Resilience',
      ko: '회복탄력성',
    },
    title: 'Onboarding.q3.title',
    options: [
      'Onboarding.q3.options.Walk',
      'Onboarding.q3.options.Cook',
      'Onboarding.q3.options.LightExercise',
      'Onboarding.q3.options.WarmShower',
      'Onboarding.q3.options.Music',
    ],
    multiple: true,
  },
  {
    stepNumber: 4,
    category: {
      en: 'Music Taste  ',
      ko: '음악 취향',
    },
    title: 'Onboarding.q4.title',
    options: [
      'Onboarding.q4.options.Pop',
      'Onboarding.q4.options.Indie',
      'Onboarding.q4.options.Hiphop',
      'Onboarding.q4.options.Ballad',
      'Onboarding.q4.options.Classic',
      'Onboarding.q4.options.Lofi',
    ],
    multiple: true,
  },
  {
    stepNumber: 5,
    category: {
      en: 'Relaxation Style',
      ko: '휴식 방식',
    },
    title: 'Onboarding.q5.title',
    options: [
      'Onboarding.q5.options.Music',
      'Onboarding.q5.options.Video',
      'Onboarding.q5.options.LieDown',
      'Onboarding.q5.options.Walk',
      'Onboarding.q5.options.Read',
    ],
    multiple: true,
  },
  {
    stepNumber: 6,
    category: {
      en: 'Going Out Preference',
      ko: '외출 성향',
    },
    title: 'Onboarding.q6.title',
    options: [
      'Onboarding.q6.options.ConvenienceStore',
      'Onboarding.q6.options.Cafe',
      'Onboarding.q6.options.Park',
      'Onboarding.q6.options.Mart',
      ONBOARDING_NONE_OPTION_KEY,
    ],
    multiple: true,
  },
  {
    stepNumber: 7,
    category: {
      en: 'Space Preference',
      ko: '공간 선호',
    },
    title: 'Onboarding.q7.title',
    options: [
      'Onboarding.q7.options.Bed',
      'Onboarding.q7.options.Desk',
      'Onboarding.q7.options.Sofa',
      'Onboarding.q7.options.Kitchen',
      'Onboarding.q7.options.Etc',
    ],
    multiple: true,
  },
];
