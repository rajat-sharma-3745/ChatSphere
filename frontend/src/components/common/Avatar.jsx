import { FaHashtag } from "react-icons/fa";

const Avatar = ({
  src,
  name = "",
  type = "user",
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-14 h-14 text-xl",
    xl: "w-20 h-20 text-2xl",
  };

  const getFirstChar = () => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  const userColors = [
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-green-100 text-green-700",
    "bg-orange-100 text-orange-700",
    "bg-rose-100 text-rose-700",
  ];

  const channelColors = [
    "bg-gray-100 text-gray-700",
    "bg-slate-200 text-slate-700",
    "bg-zinc-200 text-zinc-700",
  ];

  const colorIndex =
    name.length > 0 ? name.charCodeAt(0) % userColors.length : 0;

  const bgColor =
    type === "user"
      ? userColors[colorIndex]
      : channelColors[colorIndex % channelColors.length];

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${className}
        ${src ? "" : bgColor}
        flex justify-center items-center 
        rounded-full overflow-hidden select-none
      `}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : type === "user" ? (
        <span className="font-semibold">{getFirstChar()}</span>
      ) : (
        <FaHashtag />
      )}
    </div>
  );
};

export default Avatar;
