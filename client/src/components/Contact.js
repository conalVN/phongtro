import { Button } from "../components";
import { text } from "../ultils/dataContact";
function Contact() {
  return (
    <div className="w-1100 flex flex-col justify-center items-center p-4 shadow-md bg-white rounded-md gap-6">
      <img src={text.image} alt="contact" className="w-full h-48 object-contain" />
      <p>{text.content}</p>
      <div className="flex justify-around w-full font-semibold">
        {text.contacts.map((item, index) => {
          return (
            <div className="flex flex-col items-center justify-center" key={index}>
              <span className="text-orange-500">{item.text}</span>
              <span className="text-blue-700 text-[24px]">{item.phone}</span>
              <span className="text-blue-700 text-[24px]">{item.zalo}</span>
            </div>
          );
        })}
      </div>
      <Button text="Gửi liên hệ" bgColor="bg-blue-600" textColor="text-white" px="px-6" />
    </div>
  );
}

export default Contact;
