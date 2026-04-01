"use client";

// Numbers that count up when they enter viewport

import { useEffect, useState } from "react";

/**
 * Animates a number from 0 to target with eased deceleration.
 *
 * @param target - Final number to reach
 * @param duration - Animation duration in ms (default: 2000)
 * @param trigger - Starts animation when true
 * @returns Current animated number
 *
 * @example
 * const count = useAnimatedCounter(1000, 2000, inView);
 * return <span>{count.toLocaleString()}+</span>
 */
export function useAnimatedCounter(
  target: number,
  duration = 2000,
  trigger = false
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic: starts fast, decelerates
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [trigger, target, duration]);

  return count;
}