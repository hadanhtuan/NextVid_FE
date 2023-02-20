import {useState, useEffect} from 'react'

export function useIsVisible(ref: any) {

  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
  }, [ref]);

  return isIntersecting;
}
