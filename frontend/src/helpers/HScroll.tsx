import { useRef, useEffect } from "react";

export default function useHorizontalScroll() {
    const elRef = useRef() as any;
    useEffect(() => {
        const el = elRef.current;
        if (el) {
            const onWheel = (e: any) => {
                e.preventDefault();
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY * 0.27,
                });
            };
            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, [elRef]);
    return elRef;
}
