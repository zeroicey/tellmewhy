declare module "@/components/SplitText" {
  interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    ease?: string;
    splitType?: 'chars' | 'words' | 'lines';
    from?: Record<string, string | number | boolean>;
    to?: Record<string, string | number | boolean>;
    threshold?: number;
    rootMargin?: string;
    textAlign?: 'left' | 'center' | 'right';
    tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    onLetterAnimationComplete?: () => void;
  }

  const SplitText: React.FC<SplitTextProps>;
  export default SplitText;
}