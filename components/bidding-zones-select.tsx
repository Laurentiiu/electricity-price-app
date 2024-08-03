import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BIDDING_ZONES } from '@/constants/bidding-zones';

/**
 * BiddingZonesSelect Component
 *
 * This component renders a dropdown select menu for bidding zones.
 * It allows users to select a bidding zone from a predefined list.
 *
 * Props:
 * - `value` (string | undefined): The currently selected value.
 * - `onValueChange` (function): Callback function to handle value changes.
 * - `disabled` (boolean, optional): If true, the select menu is disabled.
 *
 * Example usage:
 *
 * ```tsx
 * import { BiddingZonesSelect } from './path-to-component';
 *
 * const MyComponent = () => {
 *   const [selectedZone, setSelectedZone] = useState<string | undefined>(undefined);
 *
 *   return (
 *     <BiddingZonesSelect
 *       value={selectedZone}
 *       onValueChange={setSelectedZone}
 *       disabled={false}
 *     />
 *   );
 * };
 * ```
 */

interface BiddingZonesSelectProps {
  value: string | undefined;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export const BiddingZonesSelect = ({
  value,
  onValueChange,
  disabled,
}: BiddingZonesSelectProps) => {
  return (
    <Select disabled={disabled} value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Bidding zone" />
      </SelectTrigger>
      <SelectContent>
        {BIDDING_ZONES.map((zone) => (
          <SelectItem key={zone.value} value={zone.value}>
            {zone.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
