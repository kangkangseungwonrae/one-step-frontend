import { createContext, useContext, type ReactNode } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';

import { cn } from '@/lib/utils';

interface CheckboxGroupContextValue {
  value: string[];
  onValueChange: (value: string[]) => void;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | undefined>(undefined);

interface CheckboxGroupProps {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
  children: ReactNode;
}

export function CheckboxGroup({
  value: controlledValue,
  defaultValue = [],
  onValueChange,
  className,
  children,
}: CheckboxGroupProps) {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const value = controlledValue ?? internalValue;

  const handleValueChange = useCallback(
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
      <div className={cn('grid gap-3', className)}>{children}</div>
    </CheckboxGroupContext.Provider>
  );
}

interface CheckboxGroupItemProps {
  value: string;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

export function CheckboxGroupItem({ value, className, children, disabled }: CheckboxGroupItemProps) {
  const context = useContext(CheckboxGroupContext);

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
