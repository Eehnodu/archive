import React, { Suspense } from "react";

type LoadingVariant = "spinner" | "dots" | "text";
type LoadingProps = { variant?: LoadingVariant; message?: string };

const loaders = {
  spinner: () => import("./variants/spinner"),
  dots: () => import("./variants/dots"),
  text: () => import("./variants/text"),
} as const;

const Loading = ({
  variant = "spinner",
  message = "로딩 중...",
}: LoadingProps) => {
  const LazyVariant = React.lazy(loaders[variant]);

  return (
    <div
      className="absolute inset-0 bg-main/20 flex flex-col items-center justify-center"
      role="status"
      aria-label="로딩 중"
    >
      <Suspense
        fallback={
          <div className="w-10 h-10 rounded-full animate-pulse bg-main/40" />
        }
      >
        <LazyVariant
          {...(variant === "text" ? { message } : { message: "" })}
        />
      </Suspense>

      {variant !== "text" && (
        <p className="mt-4 text-sm font-medium text-main/80 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;
