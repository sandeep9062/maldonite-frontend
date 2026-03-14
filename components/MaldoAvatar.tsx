import Image from "next/image";

const MaldoAvatar = () => {
  return (
    <div className="w-32 h-32 mb-4 relative">
      <Image
        src="/maldo-hello.gif"
        alt="Maldo waving hello"
        fill
        className="object-contain"
        priority
      />
      <p className="text-center mt-2 text-xl font-medium">Hi! I&apos;m Maldo 👋</p>
    </div>
  );
};

export default MaldoAvatar;
