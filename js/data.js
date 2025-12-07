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
    type: "link",
    title: "The first book I ever made for you 📖💙",
    note:
      "I made this for you a long time ago… when I was still figuring out how to put my feelings into words. " +
      "It was the first time I tried to create something just for you. " +
      "I wanted you to have it again today — a little piece of our beginning.",
    href: "assets/princesayelpinguino.pdf",
    label: "Open the book →"
  },
  {
    day: 7,
    type: "video",
    title: "In the beginning… 💌",
    note:
      "In the beginning, there was love. And there were words filled with it… little messages that shaped everything that came after. " +
      "These were some of the moments I never wanted to forget.\n\n" +
      "P.S. It cuts off early — the system only allowed 10 seconds today. Blame the chaos gremlin. 💙",
    src: "assets/day-7.mp4"
  },
  {
    day: 8,
    type: "image-link",
    title: "Ever After Garden 🌹✨",
    note:
      "When I saw this, I thought of your mum… and of my dad. And of how love never really disappears — it just becomes light.\n\n" +
      "I made a $20 donation on your behalf, and dedicated a rose for your mum in the Ever After Garden — a public exhibition in London. There she will be shining for all to see.\n\n" +
      "This one is for her. And for my dad. And for us, and everything that shaped who we are. (just click the image to see the garden if you can't visit it in person)",
    src: "assets/day-8.jpg",            // your screenshot image
    href: "https://www.instagram.com/reel/DRfXl7zjXd6/?igsh=bzY3dWt1ajBrbDJp",
    label: "See the garden →"
  }
  // Add days 7–24 in this same format ✨
];
