import { Button, Item } from "../../components";

function List() {
  return (
    <div className="w-full p-2 bg-white shadow-md rounded-md">
      <div className="flex items-center justify-between my-3">
        <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
        <span>Cập nhật: 26/10/2022</span>
      </div>
      <div className="flex items-center gap-2 my-2">
        <span>Sắp xếp</span>
        <Button text="Mặc định" bgColor="bg-gray-200" />
        <Button text="Mới nhất" bgColor="bg-gray-200" />
        <Button text="Có video" bgColor="bg-gray-200" />
      </div>
      <div className="items">
        <Item />
      </div>
    </div>
  );
}

export default List;
