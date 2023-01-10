import clsx from "clsx";
import React, { forwardRef } from "react";
import { __DEV__ } from "../../utils/assertions";

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
  id: string;
  className?: string;
  isInvalid?: boolean;
  errorText?: string;
  required?: boolean;
  placeholder: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      name,
      id,
      isInvalid = false,
      errorText,
      placeholder,
      required = false,
      type = "text",
      ...otherProps
    },
    ref
  ) => {
    return (
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          className={clsx(
            "peer h-10 w-full rounded-full border-0 bg-slate-200 pl-4 text-gray-900 focus:ring-2",
            "focus:ring-indigo-400",
            "focus:ring-offset-2",
            "focus:ring-offset-indigo-50",
            isInvalid ? "border-red-600 focus:ring-red-600" : "",
            className
          )}
          placeholder={placeholder}
          ref={ref}
          {...otherProps}
        />
        {isInvalid && errorText && (
          <span
            className="mt-1 block pl-4 text-left text-sm text-red-600"
            id="error"
          >
            {errorText}
          </span>
        )}
      </div>
    );
  }
);

export default Input;

if (__DEV__) {
  Input.displayName = "Input";
}
