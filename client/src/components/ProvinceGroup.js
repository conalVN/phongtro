import { location } from "../ultils/constant";
import { Province } from "../components";

function ProvinceGroup() {
  return (
    <div className="flex items-center gap-5 justify-center py-5">
      {location.map((item) => {
        return <Province key={item.id} image={item.image} name={item.name} />;
      })}
    </div>
  );
}

export default ProvinceGroup;
