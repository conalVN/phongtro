/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { Selector, InputReadOnly } from "../components";
import {
  apiGetPublicProvinces,
  apiGetPublicDistricts,
  apiGetPublicWards,
} from "../services";

function Address({ setPayload, invalidFields, setInvalidFields }) {
  const { dataEdit } = useSelector((state) => state.post);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();

  useEffect(() => {
    if (dataEdit) {
      let addressArr = dataEdit?.address?.split(",");
      let foundProvince =
        provinces?.length > 0 &&
        provinces?.find(
          (item) =>
            item.province_name === addressArr[addressArr?.length - 1]?.trim()
        );
      setProvince(foundProvince ? foundProvince.province_id : "");
    }
  }, [provinces, dataEdit]);
  useEffect(() => {
    if (dataEdit) {
      let addressArr = dataEdit?.address?.split(",");
      let foundDistrict =
        districts?.length > 0 &&
        districts?.find(
          (item) =>
            item.district_name === addressArr[addressArr?.length - 2]?.trim()
        );
      setDistrict(foundDistrict ? foundDistrict.district_id : "");
    }
  }, [districts, dataEdit]);
  useEffect(() => {
    if (dataEdit) {
      let addressArr = dataEdit?.address?.split(",");
      let foundWard =
        wards.length > 0 &&
        wards?.find(
          (item) =>
            item.ward_name === addressArr[addressArr?.length - 3]?.trim()
        );
      setWard(foundWard ? foundWard.ward_id : "");
    }
  }, [wards, dataEdit]);

  //   call api province
  useEffect(() => {
    const fetchProvince = async () => {
      const res = await apiGetPublicProvinces();
      if (res.status === 200) setProvinces(res.data?.results);
    };
    fetchProvince();
  }, []);

  //   call api district: province change => district reset
  useEffect(() => {
    setDistrict("");
    const fetchDistrict = async () => {
      const res = await apiGetPublicDistricts(province);
      if (res.status === 200) setDistricts(res.data?.results);
    };
    province && fetchDistrict();
    !province && setDistricts([]) && setProvinces([]);
  }, [province]);

  //   call api ward: province || district change => ward reset
  useEffect(() => {
    setWard("");
    const fetchWard = async () => {
      const res = await apiGetPublicWards(district);
      if (res.status === 200) setWards(res.data?.results);
    };
    district && fetchWard();
    !district && setWards([]);
  }, [district]);

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      province: province
        ? provinces.find((item) => item.province_id === province)?.province_name
        : " ",
      address: `${
        ward
          ? wards.find((item) => item.ward_id === ward)?.ward_name + ", "
          : ""
      }${
        district
          ? districts.find((item) => item.district_id === district)
              ?.district_name + ", "
          : ""
      }${
        province
          ? provinces.find((item) => item.province_id === province)
              ?.province_name
          : ""
      }`,
    }));
  }, [province, district, ward]);

  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-semibold text-xl ">Địa chỉ cho thuê</h2>
      <div className="flex flex-wrap justify-start gap-4 mt-8">
        <Selector
          type="province"
          label="Thành phố"
          options={provinces}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          value={province}
          setValue={setProvince}
        />
        <Selector
          type="district"
          label="Quận/Huyện"
          options={districts}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          value={district}
          setValue={setDistrict}
        />
        <Selector
          type="ward"
          label="Phường/Xã"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          options={wards}
          value={ward}
          setValue={setWard}
        />
      </div>
      <InputReadOnly
        label="Địa chỉ chính xác"
        value={`${
          ward
            ? `${wards?.find((item) => item.ward_id === ward)?.ward_name},`
            : ""
        } ${
          district
            ? `${
                districts?.find((item) => item.district_id === district)
                  ?.district_name
              },`
            : ""
        } ${
          province
            ? provinces?.find((item) => item.province_id === province)
                ?.province_name
            : ""
        }`}
      />
    </div>
  );
}

export default memo(Address);
