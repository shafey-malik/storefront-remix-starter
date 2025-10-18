import { useState } from "react";
import { Gem } from "lucide-react";
import diamondCuts from "@/assets/diamond-cuts.jpg";

const diamondTypes = [
  {
    id: "round",
    name: "Round",
    img: "Round.png",
    centralImg: "Round.png",
    position: { top: "20%", left: "50%" },
  },
  {
    id: "princess",
    name: "Princess",
    img: "Princess.png",
    centralImg: "Princess.png",
    position: { top: "35%", left: "75%" },
  },
  {
    id: "emerald",
    name: "Emerald",
    img: "Emerald.png",
    centralImg: "Emerald.png",
    position: { top: "65%", left: "75%" },
  },
  {
    id: "oval",
    name: "Oval",
    img: "Oval.png",
    centralImg: "Oval.png",
    position: { top: "80%", left: "50%" },
  },
  {
    id: "cushion",
    name: "Cushion",
    img: "Cushion.png",
    centralImg: "Cushion.png",
    position: { top: "65%", left: "25%" },
  },
  {
    id: "pear",
    name: "Pear",
    img: "Pear.png",
    centralImg: "Pear.png",
    position: { top: "35%", left: "25%" },
  },
];

const DiamondSelector = () => {
  const [selectedDiamond, setSelectedDiamond] = useState("round");
  const [hoveredDiamond, setHoveredDiamond] = useState<string | null>(null);
  const currentCentralImg = diamondTypes.find((d) =>
    hoveredDiamond ? d.id === hoveredDiamond : d.id === selectedDiamond
  )?.centralImg;

  return (
    <section className="py-20 bg-[hsl(var(--surface-luxury))]">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-luxury-serif text-4xl lg:text-5xl font-bold text-[hsl(var(--primary))]">
            Select Your Diamond Cut
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] font-luxury-sans text-lg max-w-2xl mx-auto">
            Each diamond cut reflects light differently, creating its own unique
            sparkle and character. Hover over each cut to discover your perfect
            match.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* Circular Diamond Selector */}
          <div className="relative w-96 h-96">
            {/* Central Ring Image */}
            {/* Only change this part - Replace diamondCuts with dynamic image */}
            <div className="absolute inset-16 bg-[hsl(var(--card))] rounded-full shadow-[var(--shadow-elegant)] flex items-center justify-center">
              <img
                src={currentCentralImg} // Changed from diamondCuts to currentCentralImg
                alt="Selected Diamond"
                className="w-32 h-32 object-cover rounded-full transition-opacity duration-300"
              />
            </div>

            {/* Diamond Cut Buttons */}
            {diamondTypes.map((diamond) => (
              <button
                key={diamond.id}
                onClick={() => setSelectedDiamond(diamond.id)}
                onMouseEnter={() => setHoveredDiamond(diamond.id)}
                onMouseLeave={() => setHoveredDiamond(null)}
                className={`absolute w-16 h-16 rounded-full transition-all duration-300 flex items-center justify-center group ${
                  selectedDiamond === diamond.id ||
                  hoveredDiamond === diamond.id
                    ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] scale-110 shadow-[var(--shadow-luxury)]"
                    : "bg-[hsl(var(--card))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--surface-champagne))] shadow-[var(--shadow-card)]"
                }`}
                style={{
                  top: diamond.position.top,
                  left: diamond.position.left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* <Gem className="w-6 h-6" /> */}
                <img
                  src={"/public/" + diamond.img}
                  alt={diamond.name}
                  className="w-13 h-13 object-contain"
                />
                {/* Tooltip */}
                <div
                  className={`absolute bottom-full mb-2 px-3 py-1 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-luxury-sans rounded-lg transition-opacity duration-200 whitespace-nowrap ${
                    hoveredDiamond === diamond.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {diamond.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[hsl(var(--primary))]"></div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Diamond Info */}
          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <h3 className="font-luxury-serif text-3xl font-bold text-[hsl(var(--primary))] capitalize">
                {diamondTypes.find((d) => d.id === selectedDiamond)?.name} Cut
              </h3>
              <div className="h-1 w-16 bg-[hsl(var(--secondary))]"></div>
            </div>

            <div className="space-y-4 text-[hsl(var(--muted-foreground))] font-luxury-sans">
              {selectedDiamond === "round" && (
                <>
                  <p>
                    The most popular diamond cut, known for its exceptional
                    brilliance and fire. The round brilliant cut maximizes light
                    return through its 58 facets.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Maximum brilliance and sparkle</li>
                    <li>• Timeless and classic appeal</li>
                    <li>• Excellent for all ring styles</li>
                  </ul>
                </>
              )}

              {selectedDiamond === "princess" && (
                <>
                  <p>
                    A modern square cut that combines the brilliance of a round
                    with a contemporary geometric shape. Perfect for those who
                    love clean lines.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Modern and sophisticated</li>
                    <li>• Brilliant sparkle</li>
                    <li>• Great value proposition</li>
                  </ul>
                </>
              )}

              {selectedDiamond === "emerald" && (
                <>
                  <p>
                    A step-cut diamond featuring long, lean lines that create a
                    hall-of-mirrors effect. Emphasizes clarity and showcases the
                    diamond's natural beauty.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Elegant hall-of-mirrors effect</li>
                    <li>• Vintage-inspired glamour</li>
                    <li>• Emphasizes diamond clarity</li>
                  </ul>
                </>
              )}

              {selectedDiamond === "oval" && (
                <>
                  <p>
                    An elongated version of the round brilliant cut that offers
                    similar sparkle while creating the illusion of greater size
                    and elegant finger coverage.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Elongated elegant appearance</li>
                    <li>• Creates illusion of larger size</li>
                    <li>• Flattering on all hand types</li>
                  </ul>
                </>
              )}

              {selectedDiamond === "cushion" && (
                <>
                  <p>
                    A romantic cut with rounded corners and larger facets that
                    create a soft, romantic glow. Perfect blend of old-world
                    charm and modern brilliance.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Romantic vintage appeal</li>
                    <li>• Soft, pillow-like appearance</li>
                    <li>• Excellent fire and brilliance</li>
                  </ul>
                </>
              )}

              {selectedDiamond === "pear" && (
                <>
                  <p>
                    A unique combination of round and marquise cuts, creating an
                    elegant teardrop shape that's both classic and distinctive.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Unique teardrop silhouette</li>
                    <li>• Elongates the finger</li>
                    <li>• Distinctive and eye-catching</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiamondSelector;
