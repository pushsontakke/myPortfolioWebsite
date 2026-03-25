"use client"


// Intersection observer hook shared by every section. Key points:
// - Mark it `"use client"` at the top
// - Uses `IntersectionObserver` with a `threshold` parameter
// - Fires once — disconnects after first intersection (one-shot for scroll animations)
// - Returns `{ ref, inView }` — attach `ref` to the section element, use `inView` as animation trigger
// - Type the ref as `useRef<HTMLElement>(null)`

/**
 * Detects when an element enters the viewport.
 * Fires once — disconnects observer after first intersection.
 *
 * @param threshold - Fraction of element visible before triggering (0-1)
 * @returns { ref, inView } — attach ref to the section element
 *
 * @example
 * const { ref, inView } = useInView(0.15);
 * return <section ref={ref}>...</section>
 */


import { useState, useRef, useEffect } from "react";

const useInView = (threshold = 0.15) => {
    const ref = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(()=> {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            {threshold}
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, inView };
}

export default useInView;
