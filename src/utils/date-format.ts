import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc); //dayjs默认不支持utc，先导入

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

export function formatUtcString(
  utcString: string, //传utc类型
  format: string = DATE_TIME_FORMAT //告诉格式化成什么样的字符串，上面有默认值
) {
  return dayjs.utc(utcString).utcOffset(8).format(format);
} //utcOffset(8)偏移+8小时

export function formatTimestamp(
  timestamp: number, //传时间戳
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.unix(timestamp).format(format);
}
