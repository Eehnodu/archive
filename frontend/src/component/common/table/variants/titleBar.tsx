import type { ReactNode } from "react";

type Props = {
  title?: string;
  total?: number;
  totalCount?: boolean;
  right?: ReactNode;
};

const TitleBar = ({ title, total, totalCount = true, right }: Props) => {
  if (!title && !right && !(typeof total === "number" && totalCount))
    return null;

  return (
    <div className="px-4 py-2 border-b border-main/10 bg-white flex items-center justify-between">
      <div className="flex items-center gap-2">
        {title && (
          <h3 className="pl-3 text-lg font-medium text-main">{title}</h3>
        )}
      </div>
      <div className="flex items-center gap-3 pr-3">
        {typeof total === "number" && totalCount && (
          <span className="text-sm text-main/80">
            총{" "}
            <span className="text-main font-bold">
              {total.toLocaleString()}
            </span>
            건
          </span>
        )}
        {right}
      </div>
    </div>
  );
};

export default TitleBar;
