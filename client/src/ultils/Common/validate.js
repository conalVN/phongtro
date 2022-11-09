const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  let fields = Object.entries(payload);
  // check input # " "
  fields.forEach((item) => {
    if (item[1] === "") {
      setInvalidFields((prev) => [
        ...prev,
        {
          name: item[0],
          message: "Bạn không được để trống trường này!",
        },
      ]);
      invalids++;
    }
  });

  fields.forEach((item) => {
    switch (item[0]) {
      // err length password < 6 chart
      case "password":
        if (item[1].length < 6) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Mật khẩu phải tối thiểu 6 kí tự",
            },
          ]);
          invalids++;
        }
        break;
      // check type phone number
      case "phone":
        if (!+item[1]) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Số điện thoại không hợp lệ",
            },
          ]);
          invalids++;
        }
        break;
      case "priceNumber":
      case "areaNumber":
        if (+item[1] === 0) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Chưa đặt giá trị cho trường này",
            },
          ]);
          invalids++;
        }
        if (isNaN(+item[1])) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Trường này phải là số",
            },
          ]);
          invalids++;
        }
        break;
      default:
        break;
    }
  });
  return invalids;
};

export default validate;
