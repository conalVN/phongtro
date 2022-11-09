import { useSelector } from "react-redux";
import { Selector, InputReadOnly, InputForm2 } from "../components";
import { targets } from "../ultils/constant";

function Overview({ invalidFields, payload, setPayload, setInvalidFields }) {
  const { categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  // const { dataEdit } = useSelector((state) => state.post);

  return (
    <div className="">
      <h2 className="font-semibold text-xl">Thông tin mô tả</h2>
      <div className="flex flex-col gap-4 mt-4">
        <Selector
          label="Loại chuyên mục"
          options={categories}
          name="categoryCode"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          value={payload.categoryCode}
          setValue={setPayload}
        />
        <InputForm2
          name="title"
          label="Tiêu đề"
          value={payload.title}
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <label htmlFor="desc">
          Nội dung mô tả
          <textarea
            className="w-full p-2 outline-none border border-gray-300 rounded-md"
            cols="30"
            rows="10"
            id="desc"
            value={payload.description}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, description: e.target.value }))
            }
            onFocus={() => setInvalidFields([])}
          ></textarea>
          <small className="text-red-500 block w-full">
            {invalidFields?.some((item) => item.name === "description") &&
              invalidFields?.find((item) => item.name === "description")
                ?.message}
          </small>
        </label>
        <InputReadOnly
          label="Thông tin liên hệ"
          value={currentData?.name || currentData?.username}
          placeholder="information"
        />
        <InputReadOnly
          label="Điện thoại"
          value={currentData?.phone}
          placeholder="phone"
        />
        <InputForm2
          label="Giá cho thuê"
          unit="đồng"
          note="Nhập đầy đủ số, ví dụ 1 triệu thì nhập 1000000"
          name="priceNumber"
          value={payload.priceNumber}
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <InputForm2
          label="Diện tích"
          unit="m2"
          name="areaNumber"
          value={payload.areaNumber}
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <Selector
          label="Đối tượng cho thuê"
          name="target"
          value={payload.target}
          options={targets}
          invalidFields={invalidFields}
          setValue={setPayload}
          setInvalidFields={setInvalidFields}
        />
      </div>
    </div>
  );
}

export default Overview;
