"use client";
import React, { useState } from "react";
import { seniors } from "../../data/seniors";
import Particles from "../../components/Particles";

interface FarewellPageProps {
  params: { id: string };
}

const FarewellPage: React.FC<FarewellPageProps> = ({ params }) => {
  const { id } = params;
  const seniorData = seniors[id as keyof typeof seniors];

  const [showFarewell, setShowFarewell] = useState(false);
  const [showFunFacts, setShowFunFacts] = useState(false);

  if (!seniorData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-lime-200 text-white relative">
        <h1 className="text-2xl font-bold mb-4">Invalid ID</h1>
        <p className="text-lg">The ID you provided is not valid.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Particle background */}
      <Particles
        particleColors={["#5949A7", "#AA3143"]}
        particleCount={1000}
        particleSpread={10}
        speed={0.3}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        className="absolute inset-0 z-0"
      />

      {/* Main senior info — hidden when any popup is active */}
      { (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white p-4 text-center backdrop-blur-0">
          <img
            src={seniorData.imageUrl}
            alt={seniorData.name}
            className="rounded-full w-60 h-60 object-cover border-2 border-yellow-400 mb-4"
          />
          <h1 className="text-4xl font-bold mb-2">{seniorData.name} {seniorData.avatarSprite}</h1>
          <h2 className="text-xl mb-1">{seniorData.guildRank}</h2>
          <h3 className="text-lg italic mb-4">{seniorData.playerRole}</h3>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setShowFarewell(true)}
              className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition"
            >
              Show Farewell Message
            </button>
            <button
              onClick={() => setShowFunFacts(true)}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition"
            >
              Show Fun Facts
            </button>
          </div>
          <p className="italic text-sm mt-2">Final Boss: {seniorData.finalBoss}</p>
        </div>
      )}

      {/* overlay for farewell message */}
      {showFarewell && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-8 overflow-y-auto">
          <button
            onClick={() => setShowFarewell(false)}
            className="absolute top-4 right-4 text-4xl font-bold text-white hover:text-red-500"
          >
            &times;
          </button>
          <div className="bg-black bg-opacity-50 rounded-lg p-6 max-w-xl text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-white">Farewell Message</h2>
            <p className="max-w-2xl text-center text-white">{seniorData.farewellMessage}</p>
          </div>
        </div>
      )}

      {/* overlay for fun facts */}
      {showFunFacts && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-8 overflow-y-auto">
          <button
            onClick={() => setShowFunFacts(false)}
            className="absolute top-4 right-4 text-4xl font-bold text-white hover:text-red-500"
          >
            &times;
          </button>
          <div className="bg-black bg-opacity-50 rounded-lg p-6 max-w-xl text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-white">Fun Facts</h2>
            <ul className="list-disc list-inside text-left max-w-xl mx-auto text-white">
              {seniorData.funFacts.map((fact, index) => (
                <li key={index} className="mb-2">{fact}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarewellPage;
