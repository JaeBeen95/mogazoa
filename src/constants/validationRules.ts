export const validationRules = {
  email: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    errorMessage: '올바른 이메일 주소를 입력해주세요',
  },
  nickname: {
    pattern: /^[a-zA-Z0-9가-힣]{2,10}$/,
    errorMessage: '닉네임은 2-10자의 영문, 숫자, 한글만 사용 가능합니다',
  },
  password: {
    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
    errorMessage:
      '비밀번호는 8-20자의 영문자, 숫자, 특수문자를 모두 포함해야 합니다',
  },
  confirmPassword: {
    pattern: /.*/,
    errorMessage: '비밀번호가 일치하지 않습니다',
  },
} as const
