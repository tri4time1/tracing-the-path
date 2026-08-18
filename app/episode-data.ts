export type StoryBeat = {
  time: number;
  end: number;
  historicalYear: number;
  range: [number, number];
  scale: "centuries" | "decades" | "years";
  year: string;
  kicker: string;
  title: string;
  description: string;
  takeaway: string;
  nodes: string[];
  route?: [string, string];
};

export type MapNode = {
  id: string;
  label: string;
  kind: "person" | "event" | "object" | "idea" | "place";
  image: string;
  x: number;
  y: number;
  firstSeen: number;
  historicalDate: string;
  description: string;
};

export type StoryConnection = {
  from: string;
  to: string;
  revealAt: number;
  label: string;
  explanation: string;
};

export const AUDIO_URL =
  "https://tracingthepath.podomatic.com/enclosure/2026-07-30T21_02_28-07_00.mp3?_=1785470552.17837128";
export const DURATION = 2502.38;

// Transcript-derived visual beat sheet. Boundaries follow Dan's pivots rather
// than forcing the history into equal-length chapters.
export const storyBeats: StoryBeat[] = [
  {
    time: 0, end: 58, historicalYear: 1959, range: [1944, 1991], scale: "decades", year: "1959",
    kicker: "The opening riddle", title: "What connects videotape, vodka, and Pepsi?",
    description: "Dan opens with Nixon and Khrushchev in the model kitchen, then asks us to look beyond the familiar Cold War scene.",
    takeaway: "Three histories are already visible—but their origins are still hidden.",
    nodes: ["pepsi", "ampex", "vodka", "nixon", "khrushchev"],
  },
  {
    time: 58, end: 166, historicalYear: 1763, range: [1763, 1863], scale: "centuries", year: "1763",
    kicker: "The first bridge", title: "Catherine the Great keeps trade open",
    description: "American merchants arrive in St. Petersburg carrying Caribbean and colonial goods. Catherine declines Britain’s request for Russian troops and leaves room for a new trading partner.",
    takeaway: "The relationship begins with cargo, calculation, and mutual advantage—not ideology.",
    nodes: ["empire", "catherine"], route: ["American ports", "St. Petersburg"],
  },
  {
    time: 166, end: 344, historicalYear: 1863, range: [1863, 1917], scale: "decades", year: "1863 → 1917",
    kicker: "Ships become storefronts", title: "A naval visit grows into a commercial corridor",
    description: "Russian ships arrive during the U.S. Civil War. Alaska changes hands, and Singer, Westinghouse, and other American firms build large Russian operations.",
    takeaway: "By 1912, a Singer is so familiar that Russians use the name for almost any sewing machine.",
    nodes: ["fleet1863", "singer", "empire"], route: ["New York & San Francisco", "Russian factories"],
  },
  {
    time: 344, end: 512, historicalYear: 1917, range: [1896, 1929], scale: "decades", year: "1917 → 1929",
    kicker: "The door closes", title: "Lenin turns private products into state industries",
    description: "The Bolsheviks nationalize foreign factories and rebuild alcohol production under state control. The vodka of the capital becomes Stolichnaya.",
    takeaway: "The commercial bridge closes, but one of the episode’s key products is born inside the new system.",
    nodes: ["singer", "lenin", "vodka"],
  },
  {
    time: 512, end: 660, historicalYear: 1919, range: [1910, 1952], scale: "decades", year: "1919 → 1952",
    kicker: "Who controls the picture?", title: "Newsreels become the century’s shared window",
    description: "Moving pictures bring distant events into theaters. In the Soviet Union, a state-run newsreel service decides which images reach the audience.",
    takeaway: "Recorded images can inform millions—but whoever owns the recording controls the frame.",
    nodes: ["newsreels", "lenin"], route: ["World events", "Soviet cinemas"],
  },
  {
    time: 660, end: 861, historicalYear: 1892, range: [1892, 1944], scale: "decades", year: "1892 → 1944",
    kicker: "The engineer’s journey", title: "Alexander Poniatoff travels from Russia to California",
    description: "The Russian-born pilot and electrical engineer moves through wartime Europe, China, and the United States before founding a company from his initials: AMP plus EX for excellence.",
    takeaway: "A life displaced by war creates the company that will preserve television.",
    nodes: ["poniatoff", "ampex"], route: ["Kazan, Russia", "California"],
  },
  {
    time: 861, end: 1043, historicalYear: 1935, range: [1935, 1956], scale: "years", year: "1935 → 1956",
    kicker: "Sound learns to wait", title: "The Magnetophon leads Ampex from recorded radio to videotape",
    description: "Poniatoff’s team improves German magnetic recording. Bing Crosby’s investment helps fund the VR-1000, the machine that makes recorded television practical.",
    takeaway: "The technology that displaces newsreels is now ready to capture the Kitchen Debate.",
    nodes: ["magnetophon", "poniatoff", "ampex", "newsreels"],
  },
  {
    time: 1043, end: 1357, historicalYear: 1893, range: [1893, 1956], scale: "decades", year: "1893 → 1956",
    kicker: "The product path", title: "A pharmacist’s drink survives by selling value",
    description: "Caleb Bradham creates Brad’s Drink, soon renamed Pepsi-Cola. Bankruptcy, a larger bottle, radio jingles, and wartime marketing turn it into a durable challenger.",
    takeaway: "When Donald Kendall arrives, Pepsi is built to seize an opening its larger rival ignores.",
    nodes: ["bradham", "pepsi", "kendall"], route: ["North Carolina", "Global bottling markets"],
  },
  {
    time: 1357, end: 1545, historicalYear: 1955, range: [1953, 1959], scale: "years", year: "1953 → 1959",
    kicker: "A cultural thaw", title: "Music, dance, medicine, and art reopen the border",
    description: "After Stalin, cultural exchanges carry Porgy and Bess, the Moiseyev dancers, doctors, vaccines, books, and paintings across the divide.",
    takeaway: "Culture creates the temporary doorway that business and politics will use.",
    nodes: ["exchange", "khrushchev"], route: ["United States", "Soviet Union"],
  },
  {
    time: 1545, end: 1646, historicalYear: 1959, range: [1958, 1960], scale: "years", year: "Summer 1959",
    kicker: "The gamble", title: "Donald Kendall bets his own money on Moscow",
    description: "Hundreds of American companies are invited to the exhibition. Coke declines; Kendall pushes Pepsi in, personally accepting the financial risk.",
    takeaway: "The product reaches Moscow because one executive treats a closed market as an opening.",
    nodes: ["kendall", "pepsi", "exhibition"], route: ["Pepsi headquarters", "Moscow exhibition"],
  },
  {
    time: 1646, end: 1759, historicalYear: 1959, range: [1958, 1960], scale: "years", year: "July 1959",
    kicker: "The taste test", title: "Kendall puts a cup of Pepsi in Khrushchev’s hand",
    description: "Kendall asks Vice President Nixon to steer Khrushchev to the booth, where the Soviet leader compares American-bottled and Moscow-bottled Pepsi.",
    takeaway: "A staged sip creates the photograph that opens Pepsi’s Soviet future.",
    nodes: ["kendall", "nixon", "khrushchev", "pepsi", "exhibition"],
  },
  {
    time: 1759, end: 1890, historicalYear: 1959, range: [1958, 1960], scale: "years", year: "July 24, 1959",
    kicker: "The convergence", title: "The Kitchen Debate travels on Ampex videotape",
    description: "Nixon and Khrushchev argue inside the model kitchen. Ampex records the encounter, letting television audiences watch the raw superpower exchange.",
    takeaway: "A Russian immigrant’s technology carries America’s message out of Moscow.",
    nodes: ["nixon", "khrushchev", "exhibition", "ampex", "poniatoff"],
  },
  {
    time: 1890, end: 2047, historicalYear: 1972, range: [1959, 1972], scale: "decades", year: "1959 → 1972",
    kicker: "The trade puzzle", title: "A blocked currency turns Pepsi into vodka",
    description: "Kendall keeps the political door open. Because Soviet rubles cannot be exchanged freely, Pepsi concentrate is traded for tomato paste and Stolichnaya vodka.",
    takeaway: "Barter turns two drinks into unlikely diplomatic currency.",
    nodes: ["kendall", "nixon", "pepsi", "vodka"], route: ["Soviet Union", "United States"],
  },
  {
    time: 2047, end: 2158, historicalYear: 1989, range: [1972, 1991], scale: "decades", year: "1989 → 1991",
    kicker: "The deal outgrows the joke", title: "Pepsi receives a fleet just before the Soviet map breaks apart",
    description: "A larger barter agreement includes submarines and warships. Two years later the Soviet collapse scatters factories and contracts across new borders.",
    takeaway: "The ‘Pepsi navy’ is memorable; the fragile system underneath it is the real story.",
    nodes: ["pepsi", "fleet", "collapse"], route: ["Soviet ports", "New national borders"],
  },
  {
    time: 2158, end: 2234, historicalYear: 1999, range: [1991, 2022], scale: "decades", year: "1991 → 2022",
    kicker: "The opening contracts", title: "Putin’s Russia narrows the commercial path again",
    description: "Factories, brands, and political power shift after the collapse. Later conflict pushes Stolichnaya’s Latvian producer to shorten the name to Stoli.",
    takeaway: "Products can cross borders, but the meaning of a brand changes when the border changes beneath it.",
    nodes: ["collapse", "putin", "vodka"],
  },
  {
    time: 2234, end: DURATION, historicalYear: 1996, range: [1944, 2022], scale: "decades", year: "The cutting-room floor",
    kicker: "Dan’s epilogue", title: "The path keeps branching after the main story ends",
    description: "Dan returns with Pepsi-can collecting, stranger barter deals, Ampex inventions, Elvis, the Emmys, and the Pepsi Points Harrier jet that was never meant to fly.",
    takeaway: "A finished path is an invitation to notice the next connection.",
    nodes: ["pepsi", "ampex", "fleet", "harrier"],
  },
];

export const nodes: MapNode[] = [
  { id: "empire", label: "U.S.–Russia trade", kind: "idea", image: "sketch-us-russia-trade.png", x: 12, y: 9, firstSeen: 95, historicalDate: "1763 onward", description: "Cargo moving through St. Petersburg begins a long commercial relationship before either country becomes the other’s ideological enemy." },
  { id: "catherine", label: "Catherine the Great", kind: "person", image: "sketch-catherine-the-great.jpg", x: 31, y: 9, firstSeen: 119, historicalDate: "1762–1796", description: "Russia’s empress declines Britain’s request for troops and recognizes the advantage of a new American trading partner." },
  { id: "fleet1863", label: "Russian fleet visit", kind: "event", image: "sketch-russian-fleet-1863.jpg", x: 50, y: 9, firstSeen: 195, historicalDate: "1863", description: "Russian naval ships arrive in New York and San Francisco during the American Civil War as goodwill and strategic warning." },
  { id: "singer", label: "Singer in Russia", kind: "object", image: "sketch-singer-machine.jpg", x: 69, y: 9, firstSeen: 229, historicalDate: "1890–1917", description: "Singer builds factories and hundreds of shops until the sewing machine becomes a household synonym in Russia." },
  { id: "lenin", label: "Vladimir Lenin", kind: "person", image: "sketch-vladimir-lenin.png", x: 88, y: 9, firstSeen: 317, historicalDate: "1917", description: "The Bolshevik revolution nationalizes industry, ends foreign ownership, and remakes Russia’s commercial relationship with the world." },

  { id: "vodka", label: "Stolichnaya", kind: "object", image: "sketch-stolichnaya.png", x: 12, y: 29, firstSeen: 18, historicalDate: "Soviet era", description: "The vodka of the capital emerges from state production and later becomes Pepsi’s barter payment." },
  { id: "newsreels", label: "Soviet newsreels", kind: "object", image: "sketch-newsreel-camera.png", x: 31, y: 29, firstSeen: 512, historicalDate: "1919–1952", description: "Moving images become a widely shared window on the world—and a state-controlled window in Soviet theaters." },
  { id: "poniatoff", label: "Alexander Poniatoff", kind: "person", image: "sketch-alexander-poniatoff.png", x: 50, y: 29, firstSeen: 660, historicalDate: "1892–1980", description: "The Russian-born electrical engineer and pilot crosses continents before founding Ampex in California." },
  { id: "magnetophon", label: "The Magnetophon", kind: "object", image: "sketch-magnetophon.jpg", x: 69, y: 29, firstSeen: 861, historicalDate: "1935 onward", description: "German magnetic tape recording gives Poniatoff’s team the technological starting point for recorded radio and television." },
  { id: "ampex", label: "Ampex videotape", kind: "object", image: "sketch-ampex-videotape.png", x: 88, y: 29, firstSeen: 898, historicalDate: "1944–1956", description: "Ampex turns magnetic recording into a practical broadcast system capable of carrying the Kitchen Debate to television." },

  { id: "bradham", label: "Caleb Bradham", kind: "person", image: "sketch-caleb-bradham.jpg", x: 12, y: 50, firstSeen: 1073, historicalDate: "1893", description: "The North Carolina pharmacist creates Brad’s Drink and soon renames it Pepsi-Cola." },
  { id: "pepsi", label: "Pepsi-Cola", kind: "object", image: "sketch-pepsi-cola.png", x: 31, y: 50, firstSeen: 28, historicalDate: "1893 onward", description: "A repeatedly reinvented soft drink becomes a consumer symbol, international wager, and barter currency." },
  { id: "kendall", label: "Donald Kendall", kind: "person", image: "sketch-donald-kendall.png", x: 50, y: 50, firstSeen: 1043, historicalDate: "1921–2020", description: "The Pepsi executive who sees Moscow as an opening, stakes his own money, and keeps the relationship alive for years." },
  { id: "exchange", label: "Cultural exchange", kind: "event", image: "sketch-cultural-exchange.jpg", x: 69, y: 50, firstSeen: 1429, historicalDate: "1955–1959", description: "Music, dance, medicine, books, art, and exhibitions create a temporary human corridor across the Cold War divide." },
  { id: "exhibition", label: "American Exhibition", kind: "event", image: "sketch-american-exhibition.png", x: 88, y: 50, firstSeen: 1469, historicalDate: "July 1959", description: "The Moscow showcase turns consumer products and a model kitchen into competing arguments about political systems." },

  { id: "nixon", label: "Richard Nixon", kind: "person", image: "sketch-richard-nixon.png", x: 12, y: 71, firstSeen: 11, historicalDate: "1959", description: "The U.S. vice president who guides Khrushchev to Pepsi and argues with him inside the model kitchen." },
  { id: "khrushchev", label: "Nikita Khrushchev", kind: "person", image: "sketch-nikita-khrushchev.png", x: 31, y: 71, firstSeen: 16, historicalDate: "1953–1964", description: "The Soviet leader who accepts the exhibition, samples Pepsi, and debates Nixon on camera." },
  { id: "fleet", label: "The Pepsi fleet", kind: "object", image: "sketch-pepsi-fleet.png", x: 50, y: 71, firstSeen: 2061, historicalDate: "1989", description: "Seventeen submarines, a cruiser, a frigate, and a destroyer are included in a much larger barter agreement." },
  { id: "collapse", label: "Soviet collapse", kind: "event", image: "sketch-soviet-collapse.jpg", x: 69, y: 71, firstSeen: 2109, historicalDate: "1991", description: "The Soviet Union breaks apart, leaving bottlers, factories, tankers, and contracts divided among new countries." },
  { id: "putin", label: "Vladimir Putin", kind: "person", image: "sketch-vladimir-putin.png", x: 88, y: 71, firstSeen: 2158, historicalDate: "1999 onward", description: "Dan’s final turn: renewed authoritarianism and conflict constrict the cross-border opening again." },

  { id: "harrier", label: "The Harrier jet", kind: "object", image: "sketch-harrier-jet.jpg", x: 50, y: 91, firstSeen: 2444, historicalDate: "1996", description: "A joke in a Pepsi Points commercial becomes a real lawsuit—and one last branch in Dan’s cutting-room-floor epilogue." },
];

export const connections: StoryConnection[] = [
  { from: "empire", to: "catherine", revealAt: 119, label: "trade reaches the empress", explanation: "American cargo gives Catherine a practical reason to leave room for the new republic." },
  { from: "catherine", to: "fleet1863", revealAt: 195, label: "strategic friendship returns", explanation: "A century later, shared tension with Britain helps bring Russian ships to American ports." },
  { from: "fleet1863", to: "singer", revealAt: 229, label: "goodwill becomes business", explanation: "The long period of workable relations lets American firms establish factories and stores across Russia." },
  { from: "singer", to: "lenin", revealAt: 344, label: "revolution seizes the factories", explanation: "Nationalization ends Singer’s ownership and the earlier era of open commercial exchange." },
  { from: "lenin", to: "vodka", revealAt: 407, label: "the state rebuilds alcohol", explanation: "The new government reopens alcohol production and creates the industrial system behind Stolichnaya." },
  { from: "lenin", to: "newsreels", revealAt: 615, label: "the state controls the picture", explanation: "Soviet newsreels shape which moving images citizens see and how those images are framed." },
  { from: "newsreels", to: "poniatoff", revealAt: 660, label: "another Russian image path", explanation: "Dan pivots from controlled film to a Russian engineer who will transform recorded media abroad." },
  { from: "poniatoff", to: "magnetophon", revealAt: 861, label: "finds magnetic recording", explanation: "The German tape machine gives Poniatoff and his team the foundation for a better recorder." },
  { from: "magnetophon", to: "ampex", revealAt: 898, label: "sound becomes television", explanation: "Ampex improves magnetic audio, then applies the same idea to moving pictures." },
  { from: "ampex", to: "newsreels", revealAt: 1021, label: "recorded TV replaces newsreels", explanation: "Once television can record and rebroadcast moving images, the theater newsreel loses its unique role." },
  { from: "bradham", to: "pepsi", revealAt: 1087, label: "Brad’s Drink becomes Pepsi", explanation: "Bradham renames and markets the fountain drink that will eventually travel to Moscow." },
  { from: "pepsi", to: "kendall", revealAt: 1043, label: "a marketer finds his vehicle", explanation: "Kendall inherits a challenger brand built through repeated reinvention and value marketing." },
  { from: "khrushchev", to: "exchange", revealAt: 1429, label: "a thaw becomes exchange", explanation: "The post-Stalin opening makes cultural visits and reciprocal exhibitions possible." },
  { from: "exchange", to: "exhibition", revealAt: 1469, label: "culture creates the stage", explanation: "The exchange agreement produces the 1959 national exhibitions where the story converges." },
  { from: "kendall", to: "exhibition", revealAt: 1580, label: "spots the opening Coke misses", explanation: "Kendall sees strategic value in the Moscow invitation and accepts the risk." },
  { from: "nixon", to: "kendall", revealAt: 1646, label: "political access", explanation: "Kendall asks Nixon to lead Khrushchev directly to the Pepsi booth." },
  { from: "exhibition", to: "pepsi", revealAt: 1646, label: "a product becomes an argument", explanation: "Pepsi is presented as a taste of American consumer life." },
  { from: "pepsi", to: "khrushchev", revealAt: 1724, label: "the taste test", explanation: "Khrushchev compares Pepsi bottled in America with Pepsi bottled in Moscow." },
  { from: "nixon", to: "exhibition", revealAt: 1759, label: "the Kitchen Debate", explanation: "The exhibition’s model kitchen becomes the stage for a political confrontation." },
  { from: "exhibition", to: "khrushchev", revealAt: 1759, label: "the Kitchen Debate", explanation: "Khrushchev answers Nixon’s claims about American abundance and choice." },
  { from: "exhibition", to: "ampex", revealAt: 1813, label: "captured on videotape", explanation: "Ampex recording lets the Moscow encounter travel to television audiences." },
  { from: "ampex", to: "poniatoff", revealAt: 1849, label: "the Russian-born founder", explanation: "The hidden connection lands: technology built by a Russian immigrant records the U.S.–Soviet propaganda clash." },
  { from: "kendall", to: "vodka", revealAt: 2011, label: "solves the ruble problem", explanation: "Kendall’s barter arrangement exchanges Pepsi concentrate for tomato paste and Stolichnaya." },
  { from: "pepsi", to: "vodka", revealAt: 2022, label: "syrup for vodka", explanation: "Two drinks travel in opposite directions because Soviet currency cannot freely cross the border." },
  { from: "pepsi", to: "fleet", revealAt: 2061, label: "barter becomes a fleet", explanation: "A later agreement includes decommissioned ships that can be sold for scrap." },
  { from: "fleet", to: "collapse", revealAt: 2109, label: "the deal loses its country", explanation: "The Soviet Union collapses before the ambitious agreement can fully take shape." },
  { from: "collapse", to: "putin", revealAt: 2158, label: "the opening contracts", explanation: "Post-Soviet fragmentation and Putin’s later rule reshape the commercial bridge." },
  { from: "vodka", to: "putin", revealAt: 2200, label: "Stolichnaya becomes Stoli", explanation: "The Latvian producer shortens the Russian name amid renewed conflict and distance from Putin’s Russia." },
  { from: "pepsi", to: "harrier", revealAt: 2444, label: "a joke becomes a lawsuit", explanation: "A Harrier jet listed in a Pepsi Points ad inspires one of the episode’s strangest final branches." },
];
