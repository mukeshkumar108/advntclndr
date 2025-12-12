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
  },
  {
    day: 9,
    type: "video",
    title: "Something Eternal 💫",
    note:
      "I believe God put you in my path for a reason. When something is meant to last forever, you treat it differently — you protect it, nurture it, and guard it from the storms.\n\n" +
      "That’s how I feel about us. I want to grow with you. I want to choose you — every day, in the ways that matter.\n\n" +
      "One day, I want us to walk into the Celestial Kingdom together… not as two people who tried, but as two people who became something eternal.\n\n" +
      "I’m not perfect. But I believe in God. I believe in you. And I believe in us. In this life and the next… I choose you.",
    src: "assets/day-09.mp4"
  },
  {
    day: 10,
    type: "spotify",
    title: "Our Playlist 🎧✨",
    note:
      "Once upon a time, we used to share music with each other. You’d fall asleep on the phone while I played songs for you… and it feels like a lifetime ago now, but it’s still one of my favourite memories of us.\n\n" +
      "We made a playlist together too. You added songs. I added songs. And I still listen to it — even now.\n\n" +
      "I added a few more lately… songs that remind me of you, of us, of moments I never want to forget. Maybe one day you’ll listen to them again and remember the nights you would call me, the prayers, the stories, the music that helped you fall asleep… or the guitar by the fire in Atitlán, or those early days when everything felt new and impossible and magical.\n\n" +
      "Every song is a little snapshot of us.\n\n" +
      "If you ever scroll through the playlist and find a song that speaks to you… tell me which one it was. I’d love to know.",
    embedUrl: "https://open.spotify.com/embed/playlist/5ZOpT14RIAoM7X3B93pBV4?utm_source=generator"
  },
  {
    day: 11,
    type: "video",
    title: "Hey There Delilah 🎧",
    note:
      "This song has been with me for a long time… but it only really came back into my life when I met you. " +
      "It’s about a long-distance love and a future together — so of course it made me think of us. " +
      "I remember playing it for you here in England, and I wanted it to live in our little advent story too.",
    src: "assets/day-10.mp4"
  },
  {
    day: 12,
    type: "audio",
    title: "Mucho Muchísimo Muchote 🎶",
    note:
      "Once upon a time, when I used to say *te amo*, you used to answer back the most ridiculous thing: 'mucho… muchísimoooo… muchote.' I still hear you saying it.\n\n" +
      "One day I turned that little inside joke into a song. I don’t know if you remember it… but hearing it again made me smile. I hope it makes you smile too.",
    src: "assets/day-12.mp3"
  },

  // Add days 7–24 in this same format ✨
];
