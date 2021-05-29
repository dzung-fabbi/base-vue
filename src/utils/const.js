export const MESSAGES = {
  REQUIRED: "は必須です。",
  SAVE_SUCCESS: "保存しました。",
  SAVE_ERROR: "保存に失敗しました",
  DATE_ERROR: "は今より長くなければなりません",
  CONFIRM_CANCEL: "本当にキャンセルしてよろしいでしょうか。",
  INTERVAL_ERROR: "エラーが発生しました。",
  CONFIRM_BLOCK_USER: 'Are You Sure Block This User?',
  LOGIN_SUCCESS: 'You have successfully logged in',
  LOGIN_FAIL: 'Incorrect account or password',
  UPDATE_USER_SUCCESS: 'Update user success',
  UPDATE_USER_FAIL: 'Update user failed',
  BLOCK_USER_SUCCESS: 'Block user success',
  BLOCK_USER_FAIL: 'Block user failed',
};

export const RESERVATION_STATUS = {
  SCHEDULE: "予約予定",
  ALREADY: "予約済"
};

export const COMMON_DATA = {
  GOLF_AREAS: "golfAreas",
  PREFECTURES: "prefectures",
  RESIDENCES: "residences",
  OCCUPATIONS: "occupations",
  GOLF_EXPERIENCES: "golfExperiences",
  GOLF_FREQUENCIES: "golfFrequencies",
  CIGARETTES: "cigarettes",
  ALCOHOLS: "alcohols",
  ANNUAL_INCOMES: "annualIncomes",
  RELATIONSHIPS: "relationships",
  APPEARANCES: "appearances",
  FIGURES: "figures",
  PLANS: "plans",
  GOLF_COURSES: "golfCourses",
  FEMALE_GOLF_RANKS: "femaleGolfRanks",
  FEMALE_PREGO_RANKS: "femalePregoRanks",
  MALE_GOLF_RANKS: "maleGolfRanks",
  MALE_PREGO_RANKS: "malePregoRanks",
  ATTITUDES: "attitudes",
  PREFERRED_AGES: "preferredAges",
  OTHER_PREFERENCES: "otherPreferences"
};

export const PERPAGE_ORDER = 8;

export const MAX_NUMBER_OF_OPTION = 10;

export const STATUS_ORDER = {
  NOT_AVAILABLE: 0,
  AVAILABLE: 1,
  CANCELED: 2
};

export const STATUS_ORDER_TEXT = {
  [STATUS_ORDER.NOT_AVAILABLE]: "未返答",
  [STATUS_ORDER.AVAILABLE]: "承認済み",
  [STATUS_ORDER.CANCELED]: "キャンセル済み"
};

export const ADS_STATUS_VALUE = {
  OPEN: 0,
  CANCEL_BEFORE_CONFIRM: 1,
  AUTO_CANCEL: 2,
  CONFIRMED: 3,
  CANCEL_AFTER_CONFIRM: 4,
  CANCEL_DUE_REASON: 5,
  ASSEMBLED: 6,
  MANUAL_TERMINATION: 7,
  AUTO_TERMINATION: 8
};

export const ADS_STATUS_TEXT = {
  [ADS_STATUS_VALUE.OPEN]: "公開中",
  [ADS_STATUS_VALUE.CANCEL_BEFORE_CONFIRM]: "確定前キャンセル",
  [ADS_STATUS_VALUE.AUTO_CANCEL]: "自動キャンセル",
  [ADS_STATUS_VALUE.CONFIRMED]: "確定済み",
  [ADS_STATUS_VALUE.CANCEL_AFTER_CONFIRM]: "確定後キャンセル",
  [ADS_STATUS_VALUE.CANCEL_DUE_REASON]: "やむを得ない理由によるキャンセル",
  [ADS_STATUS_VALUE.ASSEMBLED]: "集合済み",
  [ADS_STATUS_VALUE.MANUAL_TERMINATION]: "手動終了",
  [ADS_STATUS_VALUE.AUTO_TERMINATION]: "自動終了"
};

export const MIN_WIDTH_PC = 1200;

export const RATIO_GOLF_RANK = 60 / 30;

export const MAX_LENGTH_INPUT = 255;

export const STATUS_GIFT_USER = {
  AVAILABLE: 0,
  USED: 1
};

export const GIFT_TYPE = {
  FREE: 1,
  NOT_FREE: 2
};

export const MESSAGES_TYPE = {
  TEXT: 1,
  GIFT: 8
};

export const MODAL = {
  MODAL_NOTICE: 'Notice',
  MODAL_TYPE_SUCCESS: 'success',
  MODAL_TYPE_DANGER: 'danger',
  CONFIRM_BLOCK_USER_TITLE: 'Please Confirm',
  LABEL_OK: 'OK',
  LABEL_CANCEL: 'Cancel',
};

export const USER_TYPE_OPTIONS = [
  {value: 1, text: "ユーザータイプ"},
  {value: 2, text: "視聴者"},
  {value: 3, text: "配信者"},
];

export const USER_STATUS_OPTIONS = [
  {value: 1, text: "ステータス"},
  {value: 2, text: "アクティブ"},
  {value: 3, text: "ブロック"},
];

export const USER_GENDER_OPTIONS = [
  {value: 1, text: "男性"},
  {value: 2, text: "女性"},
  {value: 3, text: "内緒"},
];
