import { name } from "@/constants/name";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate("/")} className="cursor-pointer">
      <span className="font-bold text-2xl text-[#189AF8]">{name}</span>
    </div>
  );
}
