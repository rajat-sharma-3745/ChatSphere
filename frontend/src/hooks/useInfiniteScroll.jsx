import { useEffect, useRef, useState } from "react";

export function useInfiniteScrollTop(
  containerRef,
  totalPages,
  page,
  setPage,
  incomingMessages
) {
  const [data, setData] = useState([]);

  const prevScrollHeightRef = useRef(0);
  const prevScrollTopRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      if (container.scrollTop <= 10) {
        if (page < totalPages) {
          prevScrollHeightRef.current = container.scrollHeight;
          prevScrollTopRef.current = container.scrollTop;

          setPage((prev) => prev + 1);
        }
      }
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [page, totalPages]);

  useEffect(() => {
    if (!incomingMessages) return;

    setData((prev) => {
      const combined = [...incomingMessages, ...prev];

      // remove duplicates by _id
      const unique = Array.from(
        new Map(combined.map((m) => [m._id, m])).values()
      );

      return unique;
    });
  }, [incomingMessages]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const oldH = prevScrollHeightRef.current;
    const oldTop = prevScrollTopRef.current;

    if (!oldH) return;

    const newH = container.scrollHeight;
    const addedHeight = newH - oldH;

    container.scrollTop = oldTop + addedHeight;
  }, [data]);

  return { data, setData };
}
