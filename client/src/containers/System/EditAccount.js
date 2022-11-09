import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { InputInfo, Button } from "../../components";
import noAvatar from "../../assets/no-avatar.png";
import { apiUpdateUser } from "../../services";
import { fileToBase64, blobToBase64 } from "../../ultils/Common/toBase64";
import { getCurrent } from "../../store/actions";

function EditAccount() {
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  const [payload, setPayload] = useState({
    name: currentData?.name || "",
    avatar: blobToBase64(currentData?.avatar) || "",
    zalo: currentData?.zalo || "",
    fbUrl: currentData?.fbUrl || "",
  });

  const handleUpdateInfo = async () => {
    console.log(payload);
    const res = await apiUpdateUser(payload);
    if (res?.data.err === 0) {
      Swal.fire(
        "Thanh cong",
        "Chinh sua thong tin ca nhan thanh cong",
        "success"
      ).then(() => {
        dispatch(getCurrent());
      });
    } else {
      Swal.fire("Oops!", "Co loi xay ra", "error");
    }
  };

  const handleUploadAvatar = async (e) => {
    const imageBase64 = await fileToBase64(e.target.files[0]);
    setPayload((prev) => ({
      ...prev,
      avatar: imageBase64,
    }));
  };
  return (
    <div className="">
      <h2 className="text-2xl font-semibold pb-4 border-b border-gray-200">
        Chỉnh sửa thông tin cá nhân
      </h2>
      <div className="flex flex-col gap-6 justify-center mx-auto my-5 w-[60%]">
        <InputInfo
          label="Mã thành viên"
          value={`#${currentData?.id?.slice(0, 6)}` || ""}
          readOnly
        />
        <InputInfo
          label="Số điện thoại"
          subtile="Đổi số điện thoại"
          value={currentData?.phone}
          readOnly
        />
        <InputInfo
          name="name"
          label="Tên hiển thị"
          value={payload?.name}
          setValue={setPayload}
        />

        <InputInfo
          name="zalo"
          label="Zalo"
          value={payload?.zalo}
          setValue={setPayload}
        />
        <InputInfo
          name="fbUrl"
          label="Facebook"
          value={payload?.fbUrl}
          setValue={setPayload}
        />
        <div className="flex items-center w-full">
          <label className="w-[200px]">Mật khẩu</label>
          <div className="flex flex-col flex-1">
            <span>Đổi mật khẩu</span>
          </div>
        </div>
        <div className="flex items-center w-full">
          <label className="w-[200px]" htmlFor="avatar">
            Ảnh đại diện
          </label>
          <div className="flex flex-col flex-1">
            <img
              src={payload.avatar || noAvatar}
              alt="avatar"
              className="w-[150px] h-[150px] object-cover rounded-full"
            />
            <input
              type="file"
              name=""
              id="avatar"
              onChange={handleUploadAvatar}
            />
          </div>
        </div>
        <Button
          text="Cập nhật"
          bgColor="bg-blue-500"
          textColor="text-white"
          onClick={handleUpdateInfo}
        />
      </div>
    </div>
  );
}

export default EditAccount;
