"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Lightning from "../components/Lightning";
import BounceCards from "../components/BounceCards";
import { seniors } from "../data/seniors";
import { useRouter } from "next/navigation";
import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
});

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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSeniors = Object.entries(seniors).filter(([_, senior]) => 
    senior.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (senior.guildRank && senior.guildRank.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
      {/* CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }
        
        .grid-masonry {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 300px;
          grid-gap: 20px;
          width: 100%;
          padding: 0 20px;
        }
        
        .grid-item {
          position: relative;
          overflow: hidden;
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          background: linear-gradient(145deg, #2a2a2a, #181818);
          border: 2px solid #555;
        }
        
        .grid-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2));
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0% 100%);
          transition: opacity 0.4s ease;
          opacity: 0;
        }
        
        .grid-item:hover::before {
          opacity: 1;
        }
        
        .grid-item:nth-child(1) {
          grid-column: 1 / 3;
          grid-row: 1 / 3;
        }
        
        .grid-item:nth-child(2) {
          grid-column: 3 / 4;
          grid-row: 1 / 2;
        }
        
        .grid-item:nth-child(3) {
          grid-column: 4 / 5;
          grid-row: 1 / 2;
        }
        
        .grid-item:nth-child(4) {
          grid-column: 3 / 4;
          grid-row: 2 / 3;
        }
        
        .grid-item:nth-child(5) {
          grid-column: 4 / 5;
          grid-row: 2 / 3;
        }
        
        .grid-item:nth-child(6) {
          grid-column: 1 / 3;
          grid-row: 3 / 5;
        }
        
        .grid-item:nth-child(7) {
          grid-column: 3 / 4;
          grid-row: 3 / 4;
        }
        
        .grid-item:nth-child(8) {
          grid-column: 4 / 5;
          grid-row: 3 / 4;
        }
        
        .grid-item:nth-child(9) {
          grid-column: 3 / 4;
          grid-row: 4 / 5;
        }
        
        .grid-item:nth-child(10) {
          grid-column: 4 / 5;
          grid-row: 4 / 5;
        }
        
        .grid-item:nth-child(11) {
          grid-column: 1 / 3;
          grid-row: 5 / 7;
        }
        
        .grid-item:nth-child(12) {
          grid-column: 3 / 4;
          grid-row: 5 / 6;
        }
        
        .grid-item:nth-child(13) {
          grid-column: 4 / 5;
          grid-row: 5 / 6;
        }
        
        .grid-item:nth-child(14) {
          grid-column: 3 / 4;
          grid-row: 6 / 7;
        }
        
        .grid-item:nth-child(15) {
          grid-column: 4 / 5;
          grid-row: 6 / 7;
        }
        
        .grid-item:nth-child(16) {
          grid-column: 1 / 3;
          grid-row: 7 / 9;
        }
        
        .grid-item:nth-child(17) {
          grid-column: 3 / 4;
          grid-row: 7 / 8;
        }
        
        .grid-item:nth-child(18) {
          grid-column: 4 / 5;
          grid-row: 7 / 8;
        }
        
        .grid-item:nth-child(19) {
          grid-column: 3 / 4;
          grid-row: 8 / 9;
        }
        
        .grid-item:nth-child(20) {
          grid-column: 4 / 5;
          grid-row: 8 / 9;
        }
        
        .grid-item:nth-child(21) {
          grid-column: 1 / 3;
          grid-row: 9 / 11;
        }
        
        .grid-item:nth-child(22) {
          grid-column: 3 / 4;
          grid-row: 9 / 10;
        }
        
        .grid-item:nth-child(23) {
          grid-column: 4 / 5;
          grid-row: 9 / 10;
        }
        
        .grid-item:nth-child(24) {
          grid-column: 3 / 4;
          grid-row: 10 / 11;
        }
        
        .grid-item:nth-child(25) {
          grid-column: 4 / 5;
          grid-row: 10 / 11;
        }
        
        .grid-item:nth-child(26) {
          grid-column: 1 / 3;
          grid-row: 11 / 13;
        }
        
        .grid-item:nth-child(27) {
          grid-column: 3 / 4;
          grid-row: 11 / 12;
        }
        
        .grid-item:nth-child(28) {
          grid-column: 4 / 5;
          grid-row: 11 / 12;
        }
        
        .grid-item:nth-child(29) {
          grid-column: 3 / 4;
          grid-row: 12 / 13;
        }
        
        .grid-item:nth-child(30) {
          grid-column: 4 / 5;
          grid-row: 12 / 13;
        }
        
        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .grid-masonry {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .grid-item:nth-child(1) {
            grid-column: 1 / 3;
            grid-row: 1 / 3;
          }
          
          .grid-item:nth-child(2) {
            grid-column: 3 / 4;
            grid-row: 1 / 2;
          }
          
          .grid-item:nth-child(3) {
            grid-column: 3 / 4;
            grid-row: 2 / 3;
          }
          
          .grid-item:nth-child(4) {
            grid-column: 1 / 2;
            grid-row: 3 / 4;
          }
          
          .grid-item:nth-child(5) {
            grid-column: 2 / 4;
            grid-row: 3 / 5;
          }
          
          .grid-item:nth-child(6) {
            grid-column: 1 / 2;
            grid-row: 4 / 5;
          }
        }
        
        @media (max-width: 768px) {
          .grid-masonry {
            grid-template-columns: repeat(1, 1fr);
            grid-auto-rows: 400px;
            padding: 10px;
          }
          
          .grid-item {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
            height: 400px;
          }

          .grid-item .card-image {
            height: 400px;
            object-fit: cover;
          }

          .overlay-content .overlay-title {
            font-size: 1rem;
          }

          .overlay-content .overlay-subtitle {
            font-size: 0.6rem;
            margin-top: 10px;
          }
        }
        
        @keyframes shine {
          0% {
            background-position: -100% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .grid-item {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .grid-item:hover {
          transform: translateY(-10px) scale(1.05) rotateX(5deg) rotateY(5deg);
          box-shadow: 
            0 16px 32px rgba(139, 92, 246, 0.3),
            0 0 0 2px rgba(139, 92, 246, 0.2);
          cursor: pointer;
        }
        
        .grid-item:hover::after {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shine 1.5s ease-in-out infinite;
          pointer-events: none;
          border-radius: 15px;
        }
        
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 15px;
        }
        
        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.4s ease;
        }
        
        .grid-item:hover .card-overlay {
          opacity: 1;
        }
        
        .overlay-content {
          color: #fff;
          text-align: center;
          padding: 20px;
        }
        
        .overlay-title {
          font-size: 1.2rem;
          margin: 0;
          padding: 0;
          color: white;
          text-shadow: 
            0 0 10px rgba(139, 92, 246, 0.5),
            0 0 20px rgba(139, 92, 246, 0.3),
            0 0 30px rgba(139, 92, 246, 0.2);
          text-transform: uppercase;
        }
        
        .overlay-subtitle {
          font-size: 0.7rem;
          margin-top: 15px;
          color: #ec4899;
          text-shadow: 
            0 0 10px rgba(236, 72, 153, 0.5),
            0 0 20px rgba(236, 72, 153, 0.3);
          text-transform: uppercase;
        }
      `}</style>
      
      {/* fixed Lightning as background */}
      <div className="fixed inset-0 -z-10">
        <Lightning hue={230} xOffset={0} speed={1} intensity={1} size={1} />
      </div>

      {/* Back to Top Button */}
      <div 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-30 cursor-pointer transform transition-all duration-300 hover:scale-110"
      >
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-3 shadow-lg">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </div>
      </div>

      {/* scrollable content */}
      <div className="w-full h-full overflow-y-auto">
        {/* centered intro text + button */}
        <div className="flex flex-col items-center justify-center space-y-8 py-20 px-4">
          <div className="bg-gradient-to-br from-black/70 via-purple-900/30 to-black/70 backdrop-blur-sm rounded-2xl p-8 max-w-2xl text-center shadow-2xl border border-purple-500/20">
            <h3 className="text-white text-4xl font-extrabold mb-6 flex items-center justify-center gap-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome, Dear Seniors!{" "}
              <span role="img" aria-label="sparkles" className="text-4xl">
                🌟
              </span>
            </h3>
            <p className="text-gray-200 text-xl mb-4 leading-relaxed">
              Thank you for inspiring us with your journey.
              <br />
              Wishing you joy, success, and endless new adventures ahead!
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6"></div>
          </div>

          <button
            onClick={handleScroll}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            <span className="relative z-10">Explore Seniors</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <div className="mt-12">
            <BounceCards
              className="custom-bounceCards"
              images={images}
              containerWidth={600}
              containerHeight={300}
              animationDelay={1}
              animationStagger={0.08}
              easeType="elastic.out(1, 0.5)"
              transformStyles={transformStyles}
              enableHover={true}
            />
          </div>
        </div>

        {/* scrollable list of seniors below */}
        <div className="min-h-screen bg-gradient-to-b from-transparent via-black/20 to-black/40 py-20">
          <div className="container mx-auto px-4">
            {/* Search bar */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search seniors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md p-4 rounded-full bg-black/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
              />
            </div>

            <div
              ref={buttonSectionRef}
              className="grid-masonry max-w-7xl mx-auto"
            >
              {filteredSeniors.map(([key, senior], index) => (
                <div
                  key={key}
                  onClick={() => handleButtonClick(key)}
                  className="grid-item"
                  style={{
                    opacity: 0,
                    transform: 'translateY(20px)',
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`
                  }}
                >
                  {/* Card Image */}
                  <img 
                    src={senior.imageUrl} 
                    alt={senior.name}
                    className="card-image"
                  />
                  
                  {/* Hover overlay */}
                  <div className="card-overlay">
                    <div className={`overlay-content ${pressStart2P.className}`}>
                      <div className="overlay-title">
                        {senior.name}
                      </div>
                      <div className="overlay-subtitle">
                        GUILD RANK: {senior.guildRank || "MEMBER"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer section */}
        <div className="bg-gradient-to-t from-black/80 to-transparent py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Thank You for Everything! 💝
              </h3>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Your guidance, wisdom, and friendship have shaped our journey. 
                As you embark on new adventures, know that you'll always be a part of our story.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-2xl">
                <span className="animate-pulse">🌟</span>
                <span className="animate-pulse delay-200">🎓</span>
                <span className="animate-pulse delay-400">💙</span>
                <span className="animate-pulse delay-600">🚀</span>
                <span className="animate-pulse delay-800">✨</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FarewellPage;
