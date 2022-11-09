function InputInfo({ label, name, subtile, value, setValue, readOnly }) {
  const yes =
    "bg-gray-100 border border-gray-300 outline-none rounded-md p-2 flex-1";
  const no = "outline-none bg-[#e8f0fe] p-2 rounded-md flex-1";

  return (
    <div className="flex items-center w-full">
      <label htmlFor="title" className="w-[200px] text-start">
        {label}
      </label>
      <div className="flex flex-col flex-1">
        <input
          id="title"
          className={readOnly ? yes : no}
          type="text"
          value={value || ""}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, [name]: e.target.value }))
          }
          readOnly={readOnly ? true : false}
        />
        {subtile && <small className="">{subtile}</small>}
      </div>
    </div>
  );
}

export default InputInfo;
