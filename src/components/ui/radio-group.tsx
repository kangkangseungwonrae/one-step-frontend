import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { cn } from '@/lib/utils';

// Single Selection (Radio Group)
function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn('grid gap-3', className)} {...props} />;
}

function RadioGroupItem({ className, children, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'border-input data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        'hover:bg-accent/50 data-[state=checked]:hover:bg-primary/90',
        'flex items-center justify-center rounded-2xl border-2 px-6 py-4 text-base font-medium transition-all',
        'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
}

// Multiple Selection (Checkbox Group)
interface CheckboxGroupContextValue {
  value: string[];
  onValueChange: (value: string[]) => void;
}

const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | undefined>(undefined);

interface CheckboxGroupProps {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
  children: React.ReactNode;
}

function CheckboxGroup({
  value: controlledValue,
  defaultValue = [],
  onValueChange,
  className,
  children,
}: CheckboxGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);

  const value = controlledValue ?? internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string[]) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [controlledValue, onValueChange]
  );

  return (
    <CheckboxGroupContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div data-slot="checkbox-group" className={cn('grid gap-3', className)}>
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
}

interface CheckboxGroupItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

function CheckboxGroupItem({ value, className, children, disabled }: CheckboxGroupItemProps) {
  const context = React.useContext(CheckboxGroupContext);

  if (!context) {
    throw new Error('CheckboxGroupItem must be used within CheckboxGroup');
  }

  const { value: selectedValues, onValueChange } = context;
  const isChecked = selectedValues.includes(value);

  const handleClick = () => {
    if (disabled) return;

    const newValue = isChecked ? selectedValues.filter((v) => v !== value) : [...selectedValues, value];

    onValueChange(newValue);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={handleClick}
      data-slot="checkbox-group-item"
      data-state={isChecked ? 'checked' : 'unchecked'}
      className={cn(
        'border-input data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        'hover:bg-accent/50 data-[state=checked]:hover:bg-primary/90',
        'flex items-center justify-center rounded-2xl border-2 px-6 py-4 text-base font-medium transition-all',
        'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      {children}
    </button>
  );
}

export { RadioGroup, RadioGroupItem, CheckboxGroup, CheckboxGroupItem };
