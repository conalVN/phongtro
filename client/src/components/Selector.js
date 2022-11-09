import { memo } from "react";

function Selector({
  type,
  label,
  name,
  options,
  value,
  setValue,
  invalidFields,
  setInvalidFields,
}) {
  const handleErrorText = () => {
    let nameInvalid = invalidFields?.find((item) => item.name === name);
    let addressInvalid = invalidFields?.find((item) => item.name === "address");

    return (
      `${nameInvalid ? nameInvalid.message : ""}` ||
      `${addressInvalid ? addressInvalid.message : ""}`
    );
  };
  return (
    <div className="flex-1 rounded-md flex flex-col gap-2">
      <label htmlFor="select-address" className="font-semibold cursor-pointer">
        {label}
      </label>
      <select
        id="select-address"
        value={!value ? "" : value}
        className="w-full flex flex-col items-center border-none outline-none rounded-md bg-gray-100 p-2 cursor-pointer"
        onChange={(e) =>
          !name
            ? setValue(e.target.value)
            : setValue((prev) => ({ ...prev, [name]: e.target.value }))
        }
        onFocus={() => setInvalidFields([])}
      >
        <option value="">--Chọn {label}--</option>
        {options?.map((item) => {
          return (
            <option
              key={
                type === "province"
                  ? item?.province_id
                  : type === "district"
                  ? item?.district_id
                  : type === "ward"
                  ? item?.ward_id
                  : item?.id
              }
              value={
                type === "province"
                  ? item?.province_id
                  : type === "district"
                  ? item?.district_id
                  : type === "ward"
                  ? item?.ward_id
                  : item?.code ?? item?.id
              }
            >
              {type === "province"
                ? item?.province_name
                : type === "district"
                ? item?.district_name
                : type === "ward"
                ? item?.ward_name
                : item?.value}
            </option>
          );
        })}
      </select>
      {invalidFields && (
        <small className="text-red-400">{handleErrorText()}</small>
      )}
    </div>
  );
}

export default memo(Selector);
