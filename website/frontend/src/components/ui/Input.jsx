import { forwardRef } from 'react';

const Input = forwardRef(({ className = '', label, error, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col space-y-2">
      {label && <label className="text-sm font-medium text-text-muted">{label}</label>}
      <input
        ref={ref}
        className={`
          w-full bg-surface-light border text-text-main rounded-xl px-4 py-3
          focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300
          placeholder:text-text-muted/50
          ${error ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary'}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
