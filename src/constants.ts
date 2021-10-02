enum HealthStyle {
  FULL_BODY_WORKOUT = 'FULL_BODY_WORKOUT', // 무분할
  SPLIT_3_DAY_WORKOUT = 'SPLIT_3_DAY_WORKOUT', // 3분할
  SPLIT_5_DAY_WORKOUT = 'SPLIT_5_DAY_WORKOUT', // 5분할
}

enum HealthPart {
  LOWER = 'LOWER', // 하체
  BACK = 'BACK', // 등
  CHEST= 'CHEST', // 가슴
  SHOULDER = 'SHOULDER', // 어깨
  BICEPS = 'BICEPS', // 이두
  TRICEPS = 'TRICEPS', // 삼두
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
  HealthStyle,
  HealthPart,
  FeedbackDifficulty,
  Gender,
};
