import moment from "moment";

export const MESSAGES = {
  NOTICE: "通知",
  REQUIRED: "は必須です。",
  SAVE_SUCCESS: "保存しました。",
  SAVE_ERROR: "保存に失敗しました",
  DATE_ERROR: "は今より長くなければなりません",
  CONFIRM_CANCEL: "本当にキャンセルしてよろしいでしょうか。",
  INTERVAL_ERROR: "エラーが発生しました。",
  CONFIRM_BLOCK_USER: 'Are You Sure Block This User?',
  LOGIN_SUCCESS: 'You have successfully logged in',
  LOGIN_FAIL: 'ログイン情報が正しくありません。',
  UPDATE_USER_SUCCESS: 'Update user success',
  UPDATE_USER_FAIL: 'Update user failed',
  BLOCK_USER_SUCCESS: 'Block user success',
  BLOCK_USER_FAIL: 'Block user failed',
  CONFIRM_DELETE_USER: 'Are You Sure Delete This User?',
  DELETE_USER_SUCCESS: 'Delete user success',
  DELETE_USER_FAIL: 'Delete user failed',
  CONFIRM_UNBLOCK_USER: 'Are You Sure Unblock This User?',
  UNBLOCK_USER_SUCCESS: 'Unblock user success',
  UNBLOCK_USER_FAIL: 'Unblock user fail',
  ERROR_PAYMENT_SETTING_1: 'RangerTo must be greater than RangerFrom',
  ERROR_PAYMENT_SETTING_2: 'RangerFrom of next setting must be greater than RangerTo of previous setting',
  LOGOUT_SUCCESS: 'You have successfully logout',
  CANNOT_GET_DATA: 'OOP! Something went wrong!',
};


export const MODAL = {
  MODAL_NOTICE: 'Notice',
  MODAL_TYPE_SUCCESS: 'success',
  MODAL_TYPE_DANGER: 'danger',
  CONFIRM_BLOCK_USER_TITLE: 'Please Confirm',
  LABEL_OK: 'OK',
  LABEL_CANCEL: 'Cancel',
  CONFIRM_DELETE_USER_TITLE: 'Please Confirm',
  CONFIRM_UNBLOCK_USER_TITLE: 'Please Confirm',
};

export const USER_TYPE_OPTIONS = [
  {value: 1, text: "ユーザータイプ"},
  {value: 'GUEST', text: "視聴者"},
  {value: 'DISTRIBUTE', text: "配信者"},
];

export const USER_STATUS_OPTIONS = [
  {value: 2, text: "ステータス"},
  {value: 0, text: "アクティブ"},
  {value: 1, text: "ブロック"},
];

export const USER_GENDER_OPTIONS = [
  {value: 0, text: "男性"},
  {value: 1, text: "女性"},
  {value: 2, text: "内緒"},
];

export const PER_PAGE_NUMBER = 10;

export const REPORT_STATUS_OPTIONS = [
  {value: 2, text: "ステータス"},
  {value: 'REPORT', text: "報告"},
  {value: 'BLOCK', text: "ブロック"},
];

export const SYSTEM_REVENUE_STATUS_OPTIONS = [
  {value: 2, text: "ステータス"},
  {value: 1, text: "成功"},
  {value: 0, text: "失敗"},
];

export const PAYMENT_MANAGEMENT_STATUS_OPTIONS = [
  {value: 3, text: "ステータス"},
  {value: 1, text: "成功"},
  {value: 2, text: "失敗"},
  {value: 0, text: "進行中"},
];

export const SETTING_DATE_RANGE_LOCALE = {
  direction: 'ltr',
  format: 'yyyy-mm-dd',
  separator: ' ~ ',
  applyLabel: '確定する',
  cancelLabel: 'キャンセル',
  weekLabel: 'W',
  customRangeLabel: 'Custom Range',
  daysOfWeek: ['日', '月', '火', '水', '木', '金', '土'],
  monthNames:  moment.localeData('ja').monthsShort(),
  firstDay: 0
};
