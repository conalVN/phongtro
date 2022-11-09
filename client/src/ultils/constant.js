export const path = {
  HOME: "/*",
  HOME__PAGE: ":page",
  LOGIN: "login",
  CHO_THUE_CAN_HO: "cho-thue-can-ho",
  CHO_THUE_MAT_BANG: "cho-thue-mat-bang",
  CHO_THUE_PHONG_TRO: "cho-thue-phong-tro",
  NHA_CHO_THUE: "nha-cho-thue",
  DETAIL_POST__TITLE_POSTID: "chi-tiet/:title/:postId",
  DETAIL_ALL: "chi-tiet/*",
  DETAIL: "chi-tiet/",
  SEARCH: "tim-kiem",

  SYSTEM: "/he-thong/*",
  CREATE_POST: "tao-bai-dang",
  MANAGE_POST: "quan-li-tin-dang",
  EDIT_ACCOUNT: "sua-thong-tin-ca-nhan",
  CONTACT: "lien-he",
};

export const text = {
  HOME_TITLE: "Kênh thông tin Phòng Trọ số 1 Việt Nam",
  HOME_DESCRIPTION:
    "Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.",
};

export const location = [
  {
    id: "hcm",
    name: "Phòng trọ Hồ Chí Minh",
    image: "https://phongtro123.com/images/location_hcm.jpg",
    provinceCode: "CHIH",
  },
  {
    id: "hn",
    name: "Phòng trọ Hà Nội",
    image: "https://phongtro123.com/images/location_hn.jpg",
    provinceCode: "NHON",
  },
  {
    id: "dn",
    name: "Phòng trọ Đã Nẵng",
    image: "https://phongtro123.com/images/location_dn.jpg",
    provinceCode: "NHAO",
  },
];

export const targets = [
  { id: 0, code: "nữ", value: "Nữ" },
  { id: 1, code: "nam", value: "Nam" },
  { id: 2, code: "Tất cả", value: "Tất cả" },
];
