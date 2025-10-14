import Orb from "@/components/Orb";

export default function IndexPage() {
  return (
    <div style={{ 
      width: "100vw", 
      height: "100vh", 
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      background: "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)"
    }}>
      <Orb
        hoverIntensity={0.5}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
      />
      <div style={{
        position: "absolute",
        zIndex: 10,
        textAlign: "center",
        color: "white",
        fontSize: "3rem",
        fontWeight: "bold",
        textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
        pointerEvents: "none"
      }}>
        <h1 style={{ margin: 0, marginBottom: "1rem" }}>TellMeWhy</h1>
        <p style={{ 
          margin: 0, 
          fontSize: "1.2rem", 
          fontWeight: "normal",
          opacity: 0.8 
        }}>
          Explore the infinite possibilities of knowledge
        </p>
      </div>
    </div>
  );
}
