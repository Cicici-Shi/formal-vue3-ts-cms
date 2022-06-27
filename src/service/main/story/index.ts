import hyRequest from "../../index";
import { IDataType } from "../../types";
interface IArticlesDataType {
  title: string;
  cotent: string;
}
export function publishArticlesData(articlesData: IArticlesDataType) {
  return hyRequest.post<IDataType>({
    url: "/story",
    data: articlesData,
  });
}
export function getArticlesData(payload: any) {
  return hyRequest.post<IDataType>({
    url: "/story/list",
    data: payload,
  });
}
