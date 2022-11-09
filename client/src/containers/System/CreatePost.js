import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SlCamera } from "react-icons/sl";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { Address, Overview, Loading, Button } from "../../components";
import {
  apiUploadImages,
  apiCreatePost,
  apiUpdatePost,
} from "../../services/post";
import { getCodesPrice, getCodesArea } from "../../ultils/Common/getCode";
import validate from "../../ultils/Common/validate";
import { resetData } from "../../store/actions";

function CreatePost({ isEdit }) {
  const { prices, areas, categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  const { dataEdit } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [payload, setPayload] = useState(() => {
    const initData = {
      categoryCode: dataEdit?.categoryCode || "",
      title: dataEdit?.title || "",
      priceNumber: dataEdit?.priceNumber * Math.pow(10, 6) || 0,
      areaNumber: dataEdit?.areaNumber || 0,
      images: dataEdit?.images?.image
        ? JSON.parse(dataEdit?.images?.image)
        : "",
      address: dataEdit?.address || "",
      priceCode: dataEdit?.priceCode || "",
      areaCode: dataEdit?.areaCode || "",
      description: dataEdit?.description
        ? JSON.parse(dataEdit?.description)
        : "",
      target: dataEdit?.overviews?.target || "",
      province: dataEdit?.province || "",
    };
    return initData;
  });
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);

  useEffect(() => {
    if (dataEdit) {
      let images = JSON.parse(dataEdit?.images?.image);
      images && setImagesPreview(images);
    }
  }, [dataEdit]);
  const handleFiles = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    let images = [];
    let files = e.target.files;
    let formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSET_NAME);
      let res = await apiUploadImages(formData);
      if (res.status === 200) images = [...images, res.data?.secure_url];
    }
    setIsLoading(false);
    setImagesPreview((prev) => [...prev, ...images]);
    setPayload((prev) => ({ ...prev, images: [...prev.images, ...images] }));
  };
  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
    setPayload((prev) => ({
      ...prev,
      images: prev.images?.filter((item) => item !== image),
    }));
  };
  const handleSubmit = async () => {
    let priceCodeArr = getCodesPrice(
      +payload.priceNumber / Math.pow(10, 6),
      prices,
      1,
      15
    );
    let priceCode = priceCodeArr[0]?.code;
    let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 0, 90);
    let areaCode = areaCodeArr[0]?.code;

    // let district = payload?.address?.split(",").length === 3 ? payload?.address?.split(",")[1] : payload?.address?.split(",")[0],
    let finalPayload = {
      ...payload,
      priceCode,
      areaCode,
      userId: currentData.id,
      priceNumber: +payload.priceNumber / Math.pow(10, 6),
      target: payload.target || "Tất cả",
      label: `${
        categories?.find((item) => item.code === payload?.categoryCode)?.value
      }${payload?.address?.split(",")[1]}`,
    };
    const result = validate(finalPayload, setInvalidFields);

    if (result === 0) {
      if (dataEdit && isEdit) {
        finalPayload.postId = dataEdit?.id;
        finalPayload.attributesId = dataEdit?.attributesId;
        finalPayload.imagesId = dataEdit?.imagesId;
        finalPayload.overviewId = dataEdit?.overviewId;

        const res = await apiUpdatePost(finalPayload);
        if (res?.data.err === 0) {
          Swal.fire(
            "Thành công",
            "Đã chỉnh sửa bài đăng thành công",
            "success"
          ).then(() => {
            resetPayload();
            dispatch(resetData());
          });
        } else {
          Swal("Oops", "Có lỗi gì đó", "error");
        }
      } else {
        const res = await apiCreatePost(finalPayload);
        if (res?.data.err === 0) {
          Swal.fire(
            "Thành công",
            "Đã chỉnh sửa bài đăng của bạn thành công!",
            "success"
          ).then(() => {
            resetPayload();
          });
        } else {
          Swal.fire(
            "Oops!",
            "Đã xảy ra lỗi vui lòng xem lại nội dung",
            "error"
          );
        }
      }
    }
  };
  const resetPayload = () => {
    setPayload({
      categoryCode: "",
      title: "",
      priceNumber: 0,
      areaNumber: 0,
      images: "",
      address: "",
      priceCode: "",
      areaCode: "",
      description: "",
      target: "",
      province: "",
    });
  };
  return (
    <div className={`${isEdit ? "p-4" : ""}`}>
      <h2 className="text-2xl font-semibold pb-4 border-b border-gray-200">
        {isEdit ? "Chỉnh sửa tin đăng" : "Đăng tin mới"}
      </h2>
      <div className="flex gap-3">
        <div className="py-4 flex-[65%] flex flex-col gap-8">
          <Address
            setPayload={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Overview
            invalidFields={invalidFields}
            payload={payload}
            setPayload={setPayload}
            setInvalidFields={setInvalidFields}
          />
          <div className="w-full">
            <h2 className="font-semibold text-xl">Hình ảnh</h2>
            <small>Cập nhật hình ảnh sẽ cho thuê nhanh hơn</small>
            <div className="">
              <label
                htmlFor="file"
                className="w-full h-[200px] m-2 border-2 border-dashed border-gray-400 rounded-md flex flex-col items-center justify-center "
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className="flex flex-col">
                    <SlCamera color="blue" size={50} />
                    Thêm ảnh
                  </div>
                )}
              </label>
              <input
                type="file"
                id="file"
                hidden
                multiple
                onChange={handleFiles}
              />
            </div>
            <div className="">
              <h3 className="">Ảnh đã chọn</h3>
              <div className="flex flex-wrap gap-4">
                {imagesPreview?.map((image) => {
                  return (
                    <div key={image} className="relative w-[30%]">
                      <img
                        src={image}
                        alt="preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                      <span
                        className="absolute top-0 right-0 p-2 cursor-pointer rounded-lg bg-gray-200 hover:bg-gray-400"
                        onClick={() => handleDeleteImage(image)}
                      >
                        <RiDeleteBinLine />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Button
            text={isEdit ? "Cập nhật" : "Tạo mới"}
            bgColor="bg-green-400"
            textColor="text-white"
            onClick={handleSubmit}
          />
        </div>
        <div className="flex-[35%]">Maps</div>
      </div>
    </div>
  );
}

export default memo(CreatePost);
