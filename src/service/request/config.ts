let BASE_URL = "";
const TIME_OUT = 10000;

//识别开发环境，区分不同环境变量
if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://coderwhy.org/prod";
} else {
  BASE_URL = "http://coderwhy.org/test";
}

export { BASE_URL, TIME_OUT };
