import { useState } from "react";
import { Button } from "../../components";
import Swal from "sweetalert2";

function Contact() {
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    content: "",
  });
  const handleSubmit = () => {
    if (payload) {
      Swal.fire(
        "Thành công",
        "Đã tiếp nhận thư của bạn. Chúng tôi sẽ phản hồi sớm !",
        "success"
      ).then(() => {
        setPayload({
          name: "",
          phone: "",
          content: "",
        });
      });
    }
  };
  return (
    <div className="">
      <h1 className="text-2xl font-semibold my-2">Liên hệ với chúng tôi</h1>
      <div className="flex gap-4">
        <div className="h-fit flex flex-col gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-3xl p-4 flex-1">
          <h4 className="font-semibold">Thông tin liên hệ</h4>
          <span>
            Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa
            chọn Phongtro.Conal
          </span>
          <p>
            <span className="font-semibold">Điện thoại</span>: 09192447xx
          </p>
          <p>
            <span className="font-semibold">Email</span>:
            cskh.phongtro.conal@gmail.com
          </p>
          <p>
            <span className="font-semibold">Zalo</span>: 09192447xx
          </p>
          <p>
            <span className="font-semibold">Facebook</span>:
            facebook.com/phongtroconal
          </p>
          <p>
            <span className="font-semibold">Địa chỉ</span>: D9, Tây Thạnh, Tân
            Phú, Hồ Chí Minh
          </p>
        </div>
        <div className="flex-1 bg-white p-4 rounded-md">
          <h3 className="font-bold mb-4">Liên hệ trực tuyến</h3>
          <form className="flex flex-col gap-3">
            <label htmlFor="name">
              HỌ TÊN CỦA BẠN
              <input
                type="text"
                id="name"
                className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
                value={payload.name}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </label>
            <label htmlFor="phone">
              SỐ ĐIỆN THOAI
              <input
                type="text"
                id="phone"
                className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
                value={payload.phone}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </label>
            <label htmlFor="content" className="flex flex-col">
              NỘI DUNG
              <textarea
                id="content"
                className="resize-none outline-none p-2 bg-[#e8f0fe] rounded-md"
                rows={5}
                value={payload.content}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, content: e.target.value }))
                }
              ></textarea>
            </label>
            <Button
              text="Gửi liên hệ"
              bgColor="bg-blue-600"
              textColor="text-white"
              px="w-full"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
