require("dotenv").config();

const generateCode = (value) => {
  let output = "";
  value = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("");
  let marge = value + process.env.SECRET_GENERATE;
  let length = marge.length;

  for (let i = 0; i < 3; i++) {
    let index =
      i === 2
        ? Math.floor(marge.length / 2 + length / 2)
        : Math.floor(length / 2);
    output += marge.charAt(index);
    length = index;
  }

  for (let i = 0; i < length - 1; i++) {}
  return `${value.charAt(2)}${output}`.toUpperCase();
};

export default generateCode;
