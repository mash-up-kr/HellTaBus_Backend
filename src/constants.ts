enum AudioCoach {
  SCARY = 'SCARY',
  COMFORTABLE = 'COMFORTABLE',
  KID = 'KID',
}

enum HealthStyle {
  FULL_BODY_WORKOUT = 'FULL_BODY_WORKOUT', // 무분할
  SPLIT_3_DAY_WORKOUT = 'SPLIT_3_DAY_WORKOUT', // 3분할
  SPLIT_5_DAY_WORKOUT = 'SPLIT_5_DAY_WORKOUT', // 5분할
}

enum HealthPart {
  LOWER = 'LOWER', // 하체
  BACK = 'BACK', // 등
  CHEST = 'CHEST', // 가슴
  SHOULDER = 'SHOULDER', // 어깨
  BICEPS = 'BICEPS', // 이두
  TRICEPS = 'TRICEPS', // 삼두
  ARM = 'ARM', // 팔 (이두 + 삼두)
}

enum Split3DayWorkoutPart {
  LOWER_AND_SHOULDER = 'LOWER_AND_SHOULDER',
  CHEST_AND_BICEPS = 'CHEST_AND_BICEPS',
  BACK_AND_TRICEPS = 'BACK_AND_TRICEPS',
}

enum Speed { // 어떤 속도로 운동
  SLOW = 'SLOW', // 천천히
  NORMAL = 'NORMAL', // 보통
  FAST = 'FAST', // 빠르게
}

enum FeedbackDifficulty {
  EASY = 'EASY',
  NORMAL = 'NORMAL',
  HARD = 'HARD',
}

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export {
  AudioCoach,
  HealthStyle,
  HealthPart,
  Split3DayWorkoutPart,
  Speed,
  FeedbackDifficulty,
  Gender,
};
