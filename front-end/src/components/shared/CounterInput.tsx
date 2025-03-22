import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ChangeEvent } from 'react';

interface CounterInputProps {
  value: number;
  onChange: (value: number) => void;
}

const CounterInput = ({ value, onChange }: CounterInputProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    onChange(newValue);
  };

  const increasedCount = () => {
    onChange(value + 1);
  };

  const decreasedCount = () => {
    onChange(value - 1);
  };

  return (
    <div className="inline-flex items-center max-w-[7rem]">
      <CountButton onClick={decreasedCount}>
        <MinusIcon className="w-4 h-4 text-primary" />
      </CountButton>
      <input
        type="number"
        className="bg-transparent text-gray-900 text-xl font-semibold text-center focus:outline-none block w-full"
        value={value}
        onChange={handleInputChange}
      />
      <CountButton onClick={increasedCount}>
        <PlusIcon className="w-4 h-4 text-primary" />
      </CountButton>
    </div>
  );
};

interface CountButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const CountButton = ({ onClick, children }: CountButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-shrink-0 inline-flex items-center justify-center h-8 w-8 bg-gray-50 hover:bg-primary-50 border border-gray-300 rounded-full focus:ring-gray-100 focus:ring-2 focus:outline-none"
    >
      {children}
    </button>
  );
};

export default CounterInput;
