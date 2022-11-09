import icons from "./icons";
const {
  BsPencilSquare,
  VscNotebook,
  AiOutlineMoneyCollect,
  AiOutlineHistory,
  BiUserCircle,
  BsBookmark,
} = icons;

const manageAccount = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "he-thong/tao-bai-dang",
    icon: <BsPencilSquare />,
  },
  {
    id: 2,
    text: "Quản lí tin đăng",
    path: "he-thong/quan-li-tin-dang",
    icon: <VscNotebook />,
  },
  {
    id: 3,
    text: "Nạp tiền",
    path: "he-thong/nap-tien",
    icon: <AiOutlineMoneyCollect />,
  },
  {
    id: 4,
    text: "Lịch sử nạp tiền",
    path: "he-thong/lich-su-nap-tien",
    icon: <AiOutlineHistory />,
  },
  {
    id: 5,
    text: "Thông tin cá nhân",
    path: "he-thong/sua-thong-tin-ca-nhan",
    icon: <BiUserCircle />,
  },
  {
    id: 6,
    text: "Tin đã lưu",
    icon: <BsBookmark />,
  },
];

export default manageAccount;
