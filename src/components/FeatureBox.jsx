import TypeIt from "typeit-react";

export default function FeatureBox({ context, images }) {
  return (
    <div className="border-2 shadow-xl border-gray-700 rounded-lg hover:scale-[102%] transition-transform  ">
      <div className="flex flex-col items-center pt-[80px] bg-white">
        <img src={images} alt="" className="w-[80px]" />
        <TypeIt
          as="p"
          options={{
            speed: 50,
            loop: false,
            waitUntilVisible: true,
            cursor: false,
          }}
          className="text-black pb-[80px] pt-[40px] text-xl font-semibold"
        >
          {context}
        </TypeIt>
      </div>
    </div>
  );
}
