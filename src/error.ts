export const Err = {
  USER: {
    EXISTING_USER: {
      code: 1,
      message: '이미 존재하는 사용자 입니다.',
    },
    GENDER_INVALID: {
      code: 3,
      message: '성별이 올바르지 않습니다.',
    },
    GOOGLE_EMAIL_NOT_VERIFIED: {
      code: 5,
      message: '인증된 구글 이메일이 아닙니다.',
    },
    ALREADY_EXIST: {
      code: 6,
      message: '이미 존재하는 사용자 입니다.',
    },
    NOT_FOUND: {
      code: 7,
      message: '사용자가 존재하지 않습니다.',
    },
    HEALTH_STYLE_INVALID: {
      code: 4,
      message: '분할이 올바르지 않습니다.',
    },
  },
  TOKEN: {
    INVALID: {
      code: 2,
      message: '유효하지 않은 토큰입니다.',
    },
  },
  SERVER: {
    UNEXPECTED_ERROR: {
      code: 8,
      message: '예기치 못한 못한 서버에러가 발생했습니다.',
    },
  },
};
