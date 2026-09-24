import React, {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import "./textarea.scss";
import { measureHeight } from "./utils/helper";

export type TextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size" | "onChange" | "maxLength"
> & {
  size?: "sm" | "md" | "lg";
  tone?: "neutral" | "primary" | "success" | "warning" | "error";

  minRows?: number;
  maxRows?: number;

  maxLength?: number;
  showCharCount?: boolean;
  renderCharCount?: (args: {
    length: number;
    maxLength?: number;
  }) => React.ReactNode;

  onChange?: (value: string) => void;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = "md",
      tone = "neutral",
      minRows,
      maxRows,
      maxLength,
      showCharCount = false,
      renderCharCount,
      disabled,
      readOnly,
      className,
      onChange,
      onInput,
      style,
      value,
      defaultValue,
      ...rest
    },
    ref,
  ) => {
    const isControlled = value !== undefined;

    const [uncontrolledLength, setUncontrolledLength] = useState<number>(
      typeof defaultValue === "string" ? defaultValue.length : 0,
    );

    const currentLength = isControlled
      ? typeof value === "string"
        ? value.length
        : 0
      : uncontrolledLength;

    const isOverLimit = maxLength != null && currentLength > maxLength;

    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    const mergedRef = useCallback(
      (el: HTMLTextAreaElement | null) => {
        innerRef.current = el;

        if (typeof ref === "function") {
          ref(el);
        } else if (ref) {
          (ref as React.RefObject<HTMLTextAreaElement | null>).current = el;
        }
      },
      [ref],
    );

    const resize = useCallback(() => {
      const el = innerRef.current;
      if (!el) return;

      const { height, overflow } = measureHeight(el, minRows, maxRows);
      el.style.height = `${height}px`;
      el.style.overflow = overflow;
    }, [minRows, maxRows]);

    useLayoutEffect(() => {
      resize();
    }, [value, resize]);

    const counterMuted = disabled || readOnly;

    return (
      <div
        className={clsx(
          "sui-textarea",
          `sui-textarea--${size}`,
          `sui-textarea--${tone}`,
          {
            "sui-textarea--disabled": disabled,
            "sui-textarea--readonly": readOnly,
            "sui-textarea--over-limit": isOverLimit,
          },
          className,
        )}
      >
        <textarea
          {...rest}
          ref={mergedRef}
          disabled={disabled}
          readOnly={readOnly}
          rows={minRows ?? 1}
          maxLength={undefined}
          value={value}
          defaultValue={defaultValue}
          className="sui-textarea__control"
          style={{
            resize: "none",
            overflow: "hidden",
            ...style,
          }}
          onChange={(e) => {
            onChange?.(e.target.value);
          }}
          onInput={(e) => {
            // keep uncontrolled length in sync
            if (!isControlled) {
              setUncontrolledLength(
                (e.target as HTMLTextAreaElement).value.length,
              );
            }

            requestAnimationFrame(resize);

            onInput?.(e);
          }}
        />

        {(showCharCount || renderCharCount) && (
          <div
            className={clsx("sui-textarea__counter", {
              "is-overflow": isOverLimit,
              "is-muted": counterMuted,
            })}
          >
            {renderCharCount
              ? renderCharCount({ length: currentLength, maxLength })
              : maxLength != null
                ? `${currentLength}/${maxLength}`
                : `${currentLength}`}
          </div>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
