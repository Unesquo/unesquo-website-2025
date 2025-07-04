"use client";
import React, { useState, useEffect } from "react";
import { seniors } from "../../data/seniors";
import Particles from "../../components/Particles";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import unesquoLogo from '../../../../public/logo.png';
import styles from '../../../Components/bitmun/loading/UnesquoLoading.module.css';

interface FarewellPageProps {
  params: { id: string };
}

const FarewellPage: React.FC<FarewellPageProps> = ({ params }) => {
  const { id } = params;
  const seniorData = seniors[id as keyof typeof seniors];
  const [activeSection, setActiveSection] = useState<'main' | 'farewell' | 'funfacts'>('main');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 4000);
  }, []);

  if (!seniorData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-black text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 backdrop-blur-lg bg-white/10 rounded-xl"
        >
          <h1 className="text-3xl font-bold mb-4">Senior Not Found</h1>
          <p className="text-lg text-gray-300">The ID you provided is not valid.</p>
          <a href="/k21/farewell" className="mt-6 inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all">
            Go Back
          </a>
        </motion.div>
      </div>
    );
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-press-start">
      <div className="fixed inset-0">
        <Particles
          particleColors={["#5949A7", "#AA3143"]}
          particleCount={1000}
          particleSpread={10}
          speed={0.3}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          className="w-full h-full"
        />
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.rippleTextContainer}>
              {[...Array(20)].map((_, i) => (
                <span
                  key={i}
                  className={styles.rippleText}
                  style={{
                    '--random-x': `${Math.random() * 100 - 50}vw`,
                    '--random-y': `${Math.random() * 100 - 50}vh`,
                  } as React.CSSProperties}
                >
                  UNESQUO
                </span>
              ))}
            </div>
            <div className={styles.finalLogoContainer}>
              <div className="flex justify-center items-center">
                <Image 
                  src={unesquoLogo} 
                  alt="UNESQUO Logo" 
                  width={150} 
                  height={150}
                  className={styles.finalLogo} 
                />
              </div>
              <p className={styles.finalText}>BIT MESRA</p>
            </div>
          </div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative min-h-screen"
          >
            {/* Navigation */}
            <nav className="fixed top-6 sm:top-4 right-2 sm:right-4 z-50 flex flex-row gap-2 sm:gap-2 p-2 sm:p-2 rounded-lg bg-black/20 backdrop-blur-sm text-xs">
              <button
                onClick={() => setActiveSection('main')}
                className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all font-press-start ${
                  activeSection === 'main' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                PROFILE
              </button>
              <button
                onClick={() => setActiveSection('farewell')}
                className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all font-press-start ${
                  activeSection === 'farewell' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                MESSAGE
              </button>
              <button
                onClick={() => setActiveSection('funfacts')}
                className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all font-press-start ${
                  activeSection === 'funfacts' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                FUN FACTS
              </button>
            </nav>

            <AnimatePresence mode="wait">
              {activeSection === 'main' && (
                <motion.div
                  {...fadeInUp}
                  key="main"
                  className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8"
                >
                  <div className="w-full max-w-7xl mx-auto">
                    {/* Gaming Header */}
                    <div className="text-center mb-6 sm:mb-8 lg:mb-12">
                      <div className="flex justify-center items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <div className="text-red-500 text-lg sm:text-xl lg:text-2xl">❤️❤️</div>
                        <div className="text-yellow-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-press-start">
                          HIGH SCORE
                        </div>
                      </div>
                      <div className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-press-start mb-2">
                        LEVEL UNESQUO: CLEARED
                      </div>
                    </div>

                    {/* Main Content Layout - Two Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start lg:items-center">
                      {/* Left Section - Profile Image and Name */}
                      <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-xl opacity-50" />
                          <img
                            src={seniorData.imageUrl}
                            alt={seniorData.name}
                            className="relative w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-72 lg:h-96 object-cover border-4 border-white/20 rounded-lg"
                          />
                        </div>
                        <motion.h1 
                          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-press-start text-center text-white"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                        >
                          {seniorData.name}
                        </motion.h1>
                      </div>

                      {/* Right Section - Character Details */}
                      <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-white">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                          className="space-y-3 sm:space-y-4 lg:space-y-6"
                        >
                          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-5 border border-white/20">
                            <div className="flex flex-wrap items-center gap-2 font-press-start text-xs sm:text-sm lg:text-base xl:text-lg">
                              <span className="text-yellow-400">GUILD RANK:</span>
                              <span className="text-white">{seniorData.guildRank}</span>
                            </div>
                          </div>
                          
                          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-5 border border-white/20">
                            <div className="flex flex-wrap items-center gap-2 font-press-start text-xs sm:text-sm lg:text-base xl:text-lg">
                              <span className="text-pink-400">PLAYER ROLE:</span>
                              <span className="text-white">{seniorData.playerRole}</span>
                            </div>
                          </div>
                          
                          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-5 border border-white/20">
                            <div className="flex flex-wrap items-center gap-2 font-press-start text-xs sm:text-sm lg:text-base xl:text-lg">
                              <span className="text-green-400">FAVOURITE WEAPON:</span>
                              <span className="text-white">{seniorData.favoriteWeapon}</span>
                            </div>
                          </div>
                          
                          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-5 border border-white/20">
                            <div className="flex flex-wrap items-center gap-2 font-press-start text-xs sm:text-sm lg:text-base xl:text-lg">
                              <span className="text-red-400">FINAL BOSS DEFEATED:</span>
                              <span className="text-white">{seniorData.finalBoss}</span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'farewell' && (
                <motion.div
                  {...fadeInUp}
                  key="farewell"
                  className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 backdrop-blur-lg bg-black/30 rounded-2xl mt-8 sm:mt-12 md:mt-8 lg:mt-12 min-h-[85vh] sm:min-h-[75vh] flex items-center"
                >
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-press-start mb-4 sm:mb-6 text-yellow-400 text-center">FAREWELL MESSAGE</h2>
                    <div className="bg-black/50 border border-white/20 rounded-lg p-4 sm:p-6 max-h-[70vh] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto">
                    <p className="text-[10px] sm:text-xs md:text-sm text-white/90 leading-relaxed font-press-start">
                      {seniorData.farewellMessage}
                    </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'funfacts' && (
                <motion.div
                  {...fadeInUp}
                  key="funfacts"
                  className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 rounded-2xl mt-8 sm:mt-12 md:mt-8 lg:mt-12 min-h-[85vh] sm:min-h-[75vh] flex items-center"
                >
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-press-start mb-4 sm:mb-6 text-green-400 text-center">FUN FACTS</h2>
                    <div className="border border-white/20 rounded-lg p-6 sm:p-8 min-h-[300px] sm:min-h-[340px]">
                      <ul className="space-y-6 sm:space-y-8">
                        {seniorData.funFacts.map((fact, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start text-white/90"
                          >
                            <span className="mr-3 sm:mr-4 text-purple-400 font-press-start">•</span>
                            <span className="text-xs sm:text-sm md:text-base font-press-start">{fact}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FarewellPage;
