import { type ReactNode } from "react";

const FooterNone = ({ children }: { children?: ReactNode }) => (
  <div className="px-6 py-4 border-t border-main/10 flex items-center justify-end gap-2 shrink-0">
    {children}
  </div>
);

export default FooterNone;
