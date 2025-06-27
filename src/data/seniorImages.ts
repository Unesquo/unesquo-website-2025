// Senior images mapping - Updated with all correct file extensions
export const seniorImages = {
  "chhavi-rani": "/image/seniors/chhavi-rani.png", // Updated to .png
  "harsh-ranjan": "/image/seniors/harsh-ranjan.jpeg",
  "akshay-tripathi": "/image/seniors/akshay-tripathi.png",
  "shaurya-singh": "/image/seniors/shaurya-singh.jpeg", // Now available!
  "shashank-shekhar": "/image/seniors/shashank-shekhar.jpeg",
  "ambuj-mishra": "/image/seniors/ambuj-mishra.jpeg",
  "arnav-roy": "/image/seniors/arnav-roy.jpeg",
  "amiya-jha": "/image/seniors/amiya-jha.png",
  "aditya-dubey": "/image/seniors/aditya-dubey.png",
  "priyanka-sinha": "/image/seniors/priyanka-sinha.png",
  "nikhil-verma": "/image/seniors/nikhil-verma.png",
  "mar-harshvardhan": "/image/seniors/mar-harshvardhan.jpeg",
  "sumeet-kumar": "/image/seniors/sumeet-kumar.png",
  "ayan-mitra": "/image/seniors/ayan-mitra.png",
  "khushi-mandal": "/image/seniors/khushi-mandal.jpeg",
  "arghya-mahanty": "/image/seniors/arghya-mahanty.png",
  "harsh-narayan": "/image/seniors/harsh-narayan.png",
  "kumar-shivam": "/image/seniors/kumar-shivam.png",
  "lily": "/image/seniors/lily.png",
  "anjali-jha": "/image/seniors/anjali-jha.png",
  "shreyansh-verma": "/image/seniors/shreyansh-verma.jpeg", // Now available!
  "gaurav-kumar": "/image/seniors/gaurav-kumar.jpeg",
  "manan-bansal": "/image/seniors/manan-bansal.jpeg",
  "aayushii-singh": "/image/seniors/aayushii-singh.jpeg",
  "shashank-raj": "/image/seniors/shashank-raj.png",
  "shashwat-jha": "/image/seniors/shashwat-jha.png",
  "shreya-suman": "/image/seniors/shreya-suman.png",
  "anurag-ghosh": "/image/seniors/anurag-ghosh.jpeg",
  "anushka-tirkey": "/image/seniors/anushka-tirkey.png",
  "akshat-raj-sharma": "/image/seniors/akshat-raj-sharma.jpeg",
  "abantika-dutta-gaur": "/image/seniors/abantika-dutta-gaur.png"
};

// Helper function to get senior image with smart fallback
export const getSeniorImage = (slug: string): string => {
  // First try the mapped local image
  const localImage = seniorImages[slug as keyof typeof seniorImages];
  if (localImage) {
    return localImage;
  }
  
  // Fallback to Pexels if no local image found
  return getPexelsFallback(slug);
};

// Pexels fallback mapping (as ultimate backup)
const pexelsFallbacks = {
  "chhavi-rani": "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
  "harsh-ranjan": "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
  "akshay-tripathi": "https://images.pexels.com/photos/1181463/pexels-photo-1463947.jpeg?auto=compress&cs=tinysrgb&w=400",
  "shaurya-singh": "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
  "shashank-shekhar": "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
  "ambuj-mishra": "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
  "arnav-roy": "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
  "amiya-jha": "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
  "aditya-dubey": "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
  "priyanka-sinha": "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
  "nikhil-verma": "https://images.pexels.com/photos/1181463/pexels-photo-1181463.jpeg?auto=compress&cs=tinysrgb&w=400",
  "mar-harshvardhan": "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
  "sumeet-kumar": "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
  "ayan-mitra": "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
  "khushi-mandal": "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
  "arghya-mahanty": "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
  "harsh-narayan": "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
  "kumar-shivam": "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
  "lily": "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
  "anjali-jha": "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
  "shreyansh-verma": "https://images.pexels.com/photos/1181463/pexels-photo-1181463.jpeg?auto=compress&cs=tinysrgb&w=400",
  "gaurav-kumar": "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
  "manan-bansal": "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
  "aayushii-singh": "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
  "shashank-raj": "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
  "shashwat-jha": "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
  "shreya-suman": "https://images.pexels.com/photos/1181463/pexels-photo-1181463.jpeg?auto=compress&cs=tinysrgb&w=400",
  "anurag-ghosh": "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
  "anushka-tirkey": "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
  "akshat-raj-sharma": "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
  "abantika-dutta-gaur": "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400"
};

// Get Pexels fallback for a senior
export const getPexelsFallback = (slug: string): string => {
  return pexelsFallbacks[slug as keyof typeof pexelsFallbacks] || "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400";
};