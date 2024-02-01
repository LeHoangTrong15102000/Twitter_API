// Không được toàn là số phải có kí tự vào - Những kí tự được cho phép khi đặt username - độ dài cho phép của một username
export const REGEX_USERNAME = /^(?![0-9]+$)[A-Za-z0-9_]{4,15}$/
