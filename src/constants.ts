enum HealthStyle {
  FULL_BODY_WORKOUT, // 무분할
  SPLIT_3_DAY_WORKOUT, // 3분할
  SPLIT_5_DAY_WORKOUT, // 5분할
}

enum HealthPart {
  LOWER, // 하체
  BACK, // 등
  CHEST, // 가슴
  SHOULDER, // 어깨
  BICEPS, // 이두
  TRICEPS, // 삼두
  ARM, // 팔 운동 (이두 + 삼두)
}

enum FeedbackDifficulty {
  EASY,
  NORMAL,
  HARD,
}

enum Gender {
  MALE,
  FEMALE,
}

export {
  HealthStyle,
  HealthPart,
  FeedbackDifficulty,
  Gender,
};
