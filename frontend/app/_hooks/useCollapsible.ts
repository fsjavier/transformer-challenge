import { useState } from "react";

export function useCollapsible(initialState = false) {
  const [isCollapsed, setIsCollapsed] = useState(initialState);
  const toggle = () => setIsCollapsed(!isCollapsed);
  return { isCollapsed, toggle };
}
