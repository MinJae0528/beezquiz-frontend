export default function FeatureBox({ context, images }) {
  return (
    <div className="border-2 shadow-xl border-black">
      <div className="flex flex-col items-center pt-[80px]">
        <img src={images} alt="" className="w-[120px]" />
        <p className="text-gray-600 pb-[80px] pt-[40px] text-xl font-bold">
          {context}
        </p>
      </div>
    </div>
  );
}
