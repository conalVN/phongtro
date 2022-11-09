import icons from "./icons";

const { VscNotebook, BsFillJournalBookmarkFill, TfiPencilAlt, BsPen } = icons;

const menuSidebar = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "tao-bai-dang",
    icon: <BsPen />,
  },
  {
    id: 2,
    text: "Quản lí tin đăng",
    path: "quan-li-tin-dang",
    icon: <VscNotebook />,
  },
  {
    id: 3,
    text: "Sửa thông tin cá nhân",
    path: "sua-thong-tin-ca-nhan",
    icon: <TfiPencilAlt />,
  },
  {
    id: 4,
    text: "Bảng giá dịch vụ",
    path: "gia-dich-vu",
    icon: <BsFillJournalBookmarkFill />,
  },
];

export default menuSidebar;
