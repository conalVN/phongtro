import { getNumbersArea, getNumbersPrice } from "./getNumbers";

export const getCodePrice = (totals, min, max) => {
  return totals?.map((item) => {
    let arrMinMax = getNumbersPrice(item.value);
    return {
      ...item,
      min:
        arrMinMax.length === 2
          ? arrMinMax[0]
          : arrMinMax[0] === min
          ? 0
          : arrMinMax[0],
      max:
        arrMinMax.length === 2
          ? arrMinMax[1]
          : arrMinMax[0] === max
          ? Infinity
          : arrMinMax[0],
    };
  });
};

export const getCodeArea = (totals, min, max) => {
  return totals?.map((item) => {
    let arrMinMax = getNumbersArea(item.value);
    return {
      ...item,
      min:
        arrMinMax.length === 2
          ? arrMinMax[0]
          : arrMinMax[0] === min
          ? 0
          : arrMinMax[0],
      max:
        arrMinMax.length === 2
          ? arrMinMax[1]
          : arrMinMax[0] === max
          ? Infinity
          : arrMinMax[0],
    };
  });
};

export const getCodesPrice = (entry, prices, min, max) => {
  const rangeMinMax = getCodePrice(prices, min, max);
  return rangeMinMax.filter((item) => item.min <= entry && entry < item.max);
};

export const getCodesArea = (entry, areas, min, max) => {
  const rangeMinMax = getCodePrice(areas);
  return rangeMinMax.filter((item) => item.min <= entry && entry < item.max);
};

// Backup
// export const getCodePrice = (totals) => {
//   let arr = [];
//   return totals?.map((item) => {
//     let arrMinMax = getNumbersPrice(item.value);
//     if (arrMinMax.length === 1) arr.push(arrMinMax[0]);
//     let sortArr = arr.sort();
//     return {
//       ...item,
//       min: sortArr.indexOf(arrMinMax[0]) === 0 ? 0 : arrMinMax[0],
//       max:
//         sortArr.indexOf(arrMinMax[0]) === 0 ? arrMinMax[0] : sortArr.indexOf(arrMinMax[0]) === 1 ? 99999 : arrMinMax[1],
//     };
//   });
// };

// export const getCodeArea = (totals) => {
//   let arr = [];
//   return totals?.map((item) => {
//     let arrMinMax = getNumbersArea(item.value);
//     if (arrMinMax.length === 1) arr.push(arrMinMax[0]);
//     let sortArr = arr.sort();
//     return {
//       ...item,
//       min: sortArr.indexOf(arrMinMax[0]) === 0 ? 0 : arrMinMax[0],
//       max:
//         sortArr.indexOf(arrMinMax[0]) === 0 ? arrMinMax[0] : sortArr.indexOf(arrMinMax[0]) === 1 ? 99999 : arrMinMax[1],
//     };
//   });
// };

// export const getCodesPrice = (arrMinMax, prices) => {
//   const rangeMinMax = getCodePrice(prices);
//   return rangeMinMax.filter(
//     (item) =>
//       (item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) || (item.max >= arrMinMax[0] && item.max <= arrMinMax[1])
//   );
// };

// export const getCodesArea = (arrMinMax, areas) => {
//   const rangeMinMax = getCodePrice(areas);
//   return rangeMinMax.filter(
//     (item) =>
//       (item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) || (item.max >= arrMinMax[0] && item.max <= arrMinMax[1])
//   );
// };
