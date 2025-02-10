import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 transition-all duration-500 z-50">
      <div className="">
        <Image
          src="/bingo.gif"
          width={500}
          height={250}
          alt={"Jumping Bingo Cartoon"}
          className="text-lg font-semibold"
        />
      </div>
    </div>
  );
}
