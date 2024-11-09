import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

export function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  return (
    <div className='relative w-full md:w-auto'>
      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
      <Input
        type='text'
        placeholder='Search labs...'
        className='pl-10 bg-gray-800 border-gray-700 text-white w-full md:w-64'
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
