declare module "@/components/ui/TrueFocus" {
  interface TrueFocusProps {
    sentence?: string;
    manualMode?: boolean;
    blurAmount?: number;
    borderColor?: string;
    glowColor?: string;
    animationDuration?: number;
    pauseBetweenAnimations?: number;
  }

  const TrueFocus: React.FC<TrueFocusProps>;
  export default TrueFocus;
}