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
    type: "video",
    title: "Your tiny chaos gremlin 💙",
    note:
      "He was running around causing absolute chaos today… and he INSISTED on delivering this message himself. " +
      "I made it for you, booboo 😏💙",
    src: "assets/day-4.mp4"
  },
  {
    day: 5,
    type: "image",
    title: "Never forget the ducks 🦆✨",
    note:
      "Never forget the ducks… a sign when the heavens opened their doors to us. " +
      "I don’t think it was an accident. I think the universe was whispering something that day.",
    src: "assets/day-5.jpg"
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
