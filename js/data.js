// Advent config
// December is month index 11 (0 = Jan ... 11 = Dec)
const ADVENT_YEAR = new Date().getFullYear();
const ADVENT_MONTH = 11;

/**
 * Each door:
 *  - day: 1–24
 *  - type: "youtube" | "spotify" | "image" | "audio" | "link" | "text"
 *  - title: short label
 *  - note: instructions / little message
 *
 * Type-specific:
 *  - youtube: { embedUrl }
 *  - spotify: { embedUrl }
 *  - image: { src, alt }
 *  - audio: { src }
 *  - link: { href, label }
 *  - text: { text }
 */

const DOORS = [
  {
    day: 1,
    type: "link",
    title: "I made this for you 🎮",
    note:
      "I made this tiny game just to make you smile and to help you escape life for a minute. " +
      "Follow the link, play a round, and then tell me your high score, okay? 😏",
    href: "https://glistening-haupia-ad8986.netlify.app/",
    label: "Play the little game →"
  },

  // DAY 2 – “A Whole New World” (your song)
  {
    day: 2,
    type: "youtube",
    title: "A Whole New World 🌙✨",
    note:
      "Our song. Put your headphones on, press play, and think about us in our future kitchen, " +
      "singing this way too dramatically while making dinner.",
    embedUrl: "https://www.youtube.com/embed/EXTLJmYsaUQ"
  },
  {
  day: 3,
    type: "video",
    title: "A tiny piece of us 🎬",
    note:
      "I want a whole lifetime of adventure with you… and a million more moments like these. " +
      "Press play — I hope it makes you smile, even for a second.",
    src: "assets/day-3.mp4"
  },
  {
    day: 4,
    type: "audio",
    title: "Voice note from the future",
    note: "Record something cute, upload it somewhere, and paste the file URL here.",
    src: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav"
  },
  {
    day: 5,
    type: "link",
    title: "Play a silly game together",
    note: "Open this at the same time and keep a running score.",
    href: "https://garticphone.com/",
    label: "Launch the game →"
  },
  {
    day: 6,
    type: "text",
    title: "Tiny love letter",
    note: "Read this, then send me your version with 3 reasons you like us.",
    text: "i. today i miss your laugh.\nii. i am irrationally obsessed with your face.\niii. one day: same sofa, same mug, zero long distance."
  }

  // Add days 7–24 in this same format ✨
];
