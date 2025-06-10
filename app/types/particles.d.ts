declare module 'particles.js' {
  const particles: any;
  export default particles;
}

declare global {
  interface Window {
    particlesJS: (id: string, options: any) => void;
  }
}

export {}; 