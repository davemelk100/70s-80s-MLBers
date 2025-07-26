import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PageSizeSelectorProps {
  currentSize: number;
  onSizeChange: (size: number) => void;
  options?: number[];
}

export function PageSizeSelector({
  currentSize,
  onSizeChange,
  options = [10, 15, 20, 25, 30],
}: PageSizeSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Show:</span>
      <Select
        value={currentSize.toString()}
        onValueChange={(value) => onSizeChange(Number(value))}
      >
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-sm text-gray-600">per page</span>
    </div>
  );
}
