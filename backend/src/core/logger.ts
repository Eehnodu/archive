import pino from "pino";
import path from "path";

function getCallerInfo() {
  const err = new Error();
  const stack = err.stack?.split("\n") || [];
  const callerLine = stack[3] || "";
  const match = callerLine.match(/\((.*):(\d+):(\d+)\)/);
  if (!match) return { file: "unknown", line: "?" };

  const [, filePath, line] = match;
  return {
    file: path.relative(process.cwd(), filePath),
    line,
  };
}

// ANSI 컬러 유틸
const colors = {
  gray: (text: string) => `\x1b[90m${text}\x1b[0m`,
  blue: (text: string) => `\x1b[34m${text}\x1b[0m`,
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
};

const baseLogger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
      messageFormat: false,
    },
  },
});

function formatLog(level: string, msg: string, req?: any) {
  const ip = req?.ip || "N/A";
  const { file, line } = getCallerInfo();

  // 레벨별 색상 적용
  let levelColor = level.toUpperCase();
  if (level === "info") levelColor = colors.green(levelColor);
  if (level === "warn") levelColor = colors.yellow(levelColor);
  if (level === "error") levelColor = colors.red(levelColor);
  if (level === "debug") levelColor = colors.blue(levelColor);

  return `${colors.gray(ip)} | ${colors.blue(`${file}:${line}`)} | ${levelColor} | ${msg}`;
}

export const logger = {
  info: (msg: string, req?: any) =>
    baseLogger.info(formatLog("info", msg, req)),
  debug: (msg: string, req?: any) =>
    baseLogger.debug(formatLog("debug", msg, req)),
  warn: (msg: string, req?: any) =>
    baseLogger.warn(formatLog("warn", msg, req)),
  error: (msg: string, req?: any) =>
    baseLogger.error(formatLog("error", msg, req)),
};
