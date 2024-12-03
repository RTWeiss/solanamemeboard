import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGridStore } from "../stores/useGridStore";

export const useUrlParams = () => {
  const [searchParams] = useSearchParams();
  const { setSelection } = useGridStore();

  useEffect(() => {
    const x = parseInt(searchParams.get("x") || "");
    const y = parseInt(searchParams.get("y") || "");

    if (!isNaN(x) && !isNaN(y)) {
      setSelection({
        startX: Math.max(0, Math.min(x, 999)),
        startY: Math.max(0, Math.min(y, 999)),
        endX: Math.max(0, Math.min(x, 999)),
        endY: Math.max(0, Math.min(y, 999)),
      });
    }
  }, [searchParams, setSelection]);
};
