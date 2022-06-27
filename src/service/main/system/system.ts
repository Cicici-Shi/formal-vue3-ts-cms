import hyRequest from "../../index";

import { IDataType } from "../../types";

export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    //不用get，这里有很多查询条件，post方便把查询条件放到data里面
    url: url,
    data: queryInfo,
  });
}

// url: /users/id
export function deletePageData(url: string) {
  return hyRequest.delete<IDataType>({
    url: url,
  });
}

export function createPageData(url: string, newData: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: newData,
  });
}

export function editPageData(url: string, editData: any) {
  return hyRequest.patch<IDataType>({
    url: url,
    data: editData,
  });
}
