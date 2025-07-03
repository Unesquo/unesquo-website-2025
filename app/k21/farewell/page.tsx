"use client";
import React, { useRef } from "react";
import Lightning from "../components/Lightning";
import BounceCards from "../components/BounceCards";
import { seniors } from "../data/seniors";
import { useRouter } from "next/navigation";

const images = [
  "/images/_MG_9409.jpg",
  "/images/chhavi.jpeg",
  "/images/harsh.jpg",
  "/images/akash.jpeg",
];

const transformStyles = [
  "rotate(5deg) translate(-150px)",
  "rotate(0deg) translate(-70px)",
  "rotate(-5deg)",
  "rotate(5deg) translate(70px)",
  "rotate(-5deg) translate(150px)",
];

const FarewellPage: React.FC = () => {
  const router = useRouter();
  const buttonSectionRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (key: string) => {
    router.push(`/k21/farewell/${key}`);
  };

  const handleScroll = () => {
    buttonSectionRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* fixed Lightning as background */}
      <div className="fixed inset-0 -z-10">
        <Lightning hue={230} xOffset={0} speed={1} intensity={1} size={1} />
      </div>

      {/* scrollable content */}
      <div className="w-full h-full overflow-y-auto">
        {/* centered intro text + button */}
        <div className="flex flex-col items-center justify-center space-y-4 py-16">
          <div className="bg-black bg-opacity-50 rounded-lg p-6 max-w-xl text-center shadow-lg">
            <h3 className="text-white text-2xl font-extrabold mb-4 flex items-center justify-center gap-2">
              Welcome, Dear Seniors!{" "}
              <span role="img" aria-label="sparkles">
                🌟
              </span>
            </h3>
            <p className="text-white text-lg mb-2">
              Thank you for inspiring us with your journey.
              <br />
              Wishing you joy, success, and endless new adventures ahead!
            </p>
          </div>
          <button
            onClick={handleScroll}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            See More
          </button>

          <div className="mt-8">
            <BounceCards
              className="custom-bounceCards"
              images={images}
              containerWidth={500}
              containerHeight={250}
              animationDelay={1}
              animationStagger={0.08}
              easeType="elastic.out(1, 0.5)"
              transformStyles={transformStyles}
              enableHover={true}
            />
          </div>
        </div>

        {/* scrollable list of seniors below */}
        
        <div
        ref={buttonSectionRef}
        className="py-16 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 justify-items-center"
        >
        {Object.entries(seniors).map(([key, senior]) => (
        <button
            key={key}
            onClick={() => handleButtonClick(key)}
            className="group relative w-full rounded-xl bg-gradient-to-br from-indigo-600 via-purple-700 to-fuchsia-600 p-[2px] shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
        >
        <div className="flex flex-col items-center justify-center h-full w-full rounded-xl bg-slate-950 px-4 py-3 transition-colors duration-200 group-hover:bg-slate-900">
        
        <span className="text-base font-bold text-white mb-1 group-hover:hidden">
        {senior.avatarSprite || "🎓"} {senior.name}
        </span>

        <span className="text-xs text-fuchsia-200 font-mono tracking-wide mb-1 hidden group-hover:block transition-opacity duration-200">
            {senior.guildRank}
        </span>
        <span className="text-xs text-indigo-200 italic hidden group-hover:block transition-opacity duration-200">
            {senior.playerRole}
        </span>
        </div>
        <span className="pointer-events-none absolute -inset-1 rounded-xl border-2 border-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </button>
        ))}
        </div>

      </div>
    </div>
  );
};

export default FarewellPage;
