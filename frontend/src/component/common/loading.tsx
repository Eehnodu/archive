type LoadingVariant = "spinner" | "dots" | "text";

type LoadingProps = {
  variant?: LoadingVariant;
  message?: string;
};

const Loading = ({
  variant = "spinner",
  message = "로딩 중...",
}: LoadingProps) => {
  return (
    <div
      className="absolute inset-0 bg-gray-500/50 flex flex-col items-center justify-center"
      role="status"
      aria-label="로딩 중"
    >
      {variant === "spinner" && (
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      )}

      {variant === "dots" && (
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      )}

      {variant === "text" && (
        <p className="mt-2 flex gap-1 text-lg font-semibold text-gray-800">
          {message.split("").map((char, i) => (
            <span
              key={i}
              className="animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {char}
            </span>
          ))}
        </p>
      )}

      {variant !== "text" && (
        <p className="mt-4 text-sm font-medium text-gray-700 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;
