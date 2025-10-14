import Orb from "@/components/Orb";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function IndexPage() {
  const navigate = useNavigate();
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
      <div style={{
        position: "absolute",
        zIndex: 20,
        top: "60%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto"
      }}>
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={() => navigate("/questions")}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
