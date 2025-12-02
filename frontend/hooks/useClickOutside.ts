import { useEffect } from "react";

export default function useClickOutside(
  ref: React.RefObject<HTMLLIElement | null>,
  callback: () => void,
) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof Node)) return;

      if (ref.current && !ref.current.contains(target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
}
