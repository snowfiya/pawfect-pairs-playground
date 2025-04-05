
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // This allows the vanilla JS to work alongside React
    const loadExternalScripts = async () => {
      try {
        // These scripts are already being loaded from the index.html
        console.log("External game scripts initialized");
      } catch (error) {
        console.error("Failed to load game scripts:", error);
      }
    };

    loadExternalScripts();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: "url('/lovable-uploads/d30b001f-f333-414e-920e-1bfed7f63616.png')" }}>
      {/* The game is fully rendered through HTML/JS, this div is just a container */}
      <div id="game-container" className="w-full h-full">
        {/* Game content will be populated by the HTML/JS code */}
      </div>
    </div>
  );
};

export default Index;
