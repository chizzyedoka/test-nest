import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Lab } from "./types"; // Adjust the path as necessary

interface LabCardProps {
  lab: Lab;
  onDetailsClick: () => void;
  isLogin: boolean;
  isDisabled: boolean; // New prop
}

export function LabCard({
  lab,
  onDetailsClick,
  isLogin,
  isDisabled,
}: LabCardProps) {
  return (
    <Card
      className={`transition-all duration-300 ${
        isDisabled ? "opacity-50 pointer-events-none" : ""
      }`}
      onClick={isDisabled ? undefined : onDetailsClick} // Prevent click if disabled
    >
      <CardHeader>
        <CardTitle>{lab.name}</CardTitle>
        <CardDescription>{lab.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <span>Participants: {lab.participants}</span>
          <span>Points: {lab.pointsReward}</span>
        </div>
      </CardContent>
      {isDisabled && (
        <div className='absolute inset-0 bg-gray-200 opacity-50 flex items-center justify-center'>
          <span className='text-gray-600'>Disabled</span>
        </div>
      )}
    </Card>
  );
}
