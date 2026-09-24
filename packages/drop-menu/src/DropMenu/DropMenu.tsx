import React from "react";
import { DropMenuProps } from "./types/DropMenu.types";
import { DropMenuContext } from "./context/DropMenuContext";
import { useDropMenu } from "./hooks/useDropMenu";
import { DropMenuTrigger } from "./components/DropMenuTrigger";
import { DropMenuContent } from "./components/DropMenuContent";
import { DropMenuItem } from "./components/DropMenuItem";
import { DropMenuSeparator } from "./components/DropMenuSeparator";

import "./styles/dropmenu.scss";

const DropMenuRoot: React.FC<DropMenuProps> = ({
  children,
  open,
  onOpenChange,
  contextMode,
}) => {
  const menu = useDropMenu({ open, onOpenChange, contextMode });

  return (
    <DropMenuContext.Provider value={menu}>
      <div className="sui-dropmenu">{children}</div>
    </DropMenuContext.Provider>
  );
};

// Compound Component Pattern
export const DropMenu = Object.assign(DropMenuRoot, {
  Trigger: DropMenuTrigger,
  Content: DropMenuContent,
  Item: DropMenuItem,
  Separator: DropMenuSeparator,
});

export default DropMenu;
export * from "./types/DropMenu.types";
