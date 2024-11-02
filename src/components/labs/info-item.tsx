import { Badge } from "@/components/ui/badge";
import { difficultyColors } from "./types";

interface InfoItemProps {
  label: string;
  value: string;
  isSpecial?: boolean;
}

export function InfoItem({ label, value, isSpecial = false }: InfoItemProps) {
  return (
    <div className='bg-gray-800 p-3 rounded-lg'>
      <p className='text-sm text-gray-400 mb-1'>{label}</p>
      {isSpecial ? (
        <Badge
          className={`${
            difficultyColors[value as keyof typeof difficultyColors]
          } text-white`}>
          {value}
        </Badge>
      ) : (
        <p className='text-lg font-semibold'>{value}</p>
      )}
    </div>
  );
}
