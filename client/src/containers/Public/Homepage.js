import { text } from "../../ultils/constant";
import { ProvinceGroup } from "../../components";
import List from "./List";

function Homepage() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{text.HOME_TITLE}</h1>
        <p className="text-base text-gray-700">{text.HOME_DESCRIPTION}</p>
      </div>
      <ProvinceGroup />
      <div className="w-full flex gap-4">
        <section className="w-[70%]">
          <List />
        </section>
        <aside className="w-[30%]">Side bar</aside>
      </div>
    </div>
  );
}

export default Homepage;
