import { coordinateData } from "./coordinate-data";

export const convertData = function (data: any) {
  //data是有name和value的，根据name拿到经纬度coordinateData，把经纬度和value拼一起成为最终的value，如[113.23,23.16,5555]
  const res = [];
  for (let i = 0; i < data.length; i++) {
    const geoCoord = coordinateData[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value),
      });
    }
  }
  return res;
};
