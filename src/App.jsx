import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Trophy, RefreshCcw, Pause, Play, Home, Flame, Clock, Volume2, VolumeX } from 'lucide-react';
import { playPop, playBuzzer, playTap, playPowerUp } from './sound';
import { playBackgroundMusic, stopBackgroundMusic } from './music';

const TRASH_DICTIONARY = [
  // ♻️ RECYCLE (27 items)
  { id: 'news', emoji: '📰', name: 'Newspaper', type: 'recycle' },
  { id: 'bottle', emoji: '🥤', name: 'Plastic Cup', type: 'recycle' },
  { id: 'can', emoji: '🥫', name: 'Tin Can', type: 'recycle' },
  { id: 'box', emoji: '📦', name: 'Cardboard Box', type: 'recycle' },
  { id: 'mail', emoji: '✉️', name: 'Junk Mail', type: 'recycle' },
  { id: 'shampoo', emoji: '🧴', name: 'Shampoo Bottle', type: 'recycle' },
  { id: 'mag', emoji: '📖', name: 'Magazine', type: 'recycle' },
  { id: 'notebook', emoji: '📓', name: 'Notebook', type: 'recycle' },
  { id: 'milk_jug', emoji: '🥛', name: 'Plastic Milk Jug', type: 'recycle' },
  { id: 'cereal', emoji: '🥣', name: 'Cereal Box', type: 'recycle' },
  { id: 'envelope', emoji: '💌', name: 'Envelope', type: 'recycle' },
  { id: 'catalog', emoji: '📚', name: 'Catalog', type: 'recycle' },
  { id: 'water_bottle', emoji: '🧊', name: 'Water Bottle', type: 'recycle' },
  { id: 'yogurt', emoji: '🍦', name: 'Yogurt Tub', type: 'recycle' },
  { id: 'flyer', emoji: '📄', name: 'Flyer', type: 'recycle' },
  { id: 'receipt', emoji: '🧾', name: 'Receipt', type: 'recycle' },
  { id: 'egg_carton', emoji: '🥚', name: 'Paper Egg Carton', type: 'recycle' },
  { id: 'tube', emoji: '📜', name: 'Cardboard Tube', type: 'recycle' },
  { id: 'foil', emoji: '🥈', name: 'Clean Aluminum Foil', type: 'recycle' },
  { id: 'phonebook', emoji: '📕', name: 'Phone Book', type: 'recycle' },
  { id: 'jar', emoji: '🫙', name: 'Glass Jar', type: 'recycle' },
  { id: 'soda', emoji: '🥤', name: 'Soda Can', type: 'recycle' },
  { id: 'calendar', emoji: '📅', name: 'Old Calendar', type: 'recycle' },
  { id: 'folder', emoji: '📁', name: 'Paper Folder', type: 'recycle' },
  
  // 🍎 COMPOST (27 items)
  { id: 'apple', emoji: '🍏', name: 'Apple Core', type: 'compost' },
  { id: 'banana', emoji: '🍌', name: 'Banana Peel', type: 'compost' },
  { id: 'egg', emoji: '🥚', name: 'Egg Shells', type: 'compost' },
  { id: 'bone', emoji: '🦴', name: 'Chicken Bone', type: 'compost' },
  { id: 'watermelon', emoji: '🍉', name: 'Watermelon Rind', type: 'compost' },
  { id: 'teabag', emoji: '🍵', name: 'Tea Bag', type: 'compost' },
  { id: 'coffee_gr', emoji: '☕', name: 'Coffee Grounds', type: 'compost' },
  { id: 'orange', emoji: '🍊', name: 'Orange Peel', type: 'compost' },
  { id: 'lemon', emoji: '🍋', name: 'Lemon Slice', type: 'compost' },
  { id: 'onion', emoji: '🧅', name: 'Onion Skin', type: 'compost' },
  { id: 'carrot', emoji: '🥕', name: 'Carrot Top', type: 'compost' },
  { id: 'potato', emoji: '🥔', name: 'Potato Peels', type: 'compost' },
  { id: 'avocado', emoji: '🥑', name: 'Avocado Pit', type: 'compost' },
  { id: 'bread', emoji: '🍞', name: 'Bread Crust', type: 'compost' },
  { id: 'peanut', emoji: '🥜', name: 'Peanut Shells', type: 'compost' },
  { id: 'leaves', emoji: '🍂', name: 'Dead Leaves', type: 'compost' },
  { id: 'grass', emoji: '🌿', name: 'Grass Clippings', type: 'compost' },
  { id: 'tomato', emoji: '🍅', name: 'Tomato Top', type: 'compost' },
  { id: 'strawberry', emoji: '🍓', name: 'Strawberry Tops', type: 'compost' },
  { id: 'peach', emoji: '🍑', name: 'Peach Pit', type: 'compost' },
  { id: 'lettuce', emoji: '🥬', name: 'Lettuce Leaves', type: 'compost' },
  { id: 'broccoli', emoji: '🥦', name: 'Broccoli Stalk', type: 'compost' },
  { id: 'corn', emoji: '🌽', name: 'Corn Cob', type: 'compost' },
  { id: 'mushroom', emoji: '🍄', name: 'Mushroom Stem', type: 'compost' },
  { id: 'pineapple', emoji: '🍍', name: 'Pineapple Crown', type: 'compost' },
  { id: 'napkin', emoji: '🍽️', name: 'Used Paper Napkin', type: 'compost' },
  { id: 'pizza_crust', emoji: '🍕', name: 'Pizza Crust', type: 'compost' },

  // 🗑️ LANDFILL (27 items)
  { id: 'candy', emoji: '🍬', name: 'Wrapper', type: 'landfill' },
  { id: 'tissue', emoji: '🧻', name: 'Used Tissue', type: 'landfill' },
  { id: 'bag', emoji: '🛍️', name: 'Soft Plastic Bag', type: 'landfill' },
  { id: 'jeans', emoji: '👖', name: 'Old Torn Jeans', type: 'landfill' },
  { id: 'styrofoam', emoji: '☕', name: 'Styrofoam Cup', type: 'landfill' },
  { id: 'bubble', emoji: '🫧', name: 'Bubble Wrap', type: 'landfill' },
  { id: 'chip_bag', emoji: '🍟', name: 'Chip Bag', type: 'landfill' },
  { id: 'mug', emoji: '☕', name: 'Broken Ceramic Mug', type: 'landfill' },
  { id: 'diaper', emoji: '🍽️', name: 'Broken Plate', type: 'landfill' },
  { id: 'bandaid', emoji: '🩹', name: 'Used Band-Aid', type: 'landfill' },
  { id: 'toothpaste', emoji: '🪥', name: 'Toothpaste Tube', type: 'landfill' },
  { id: 'rubber', emoji: '➰', name: 'Rubber Band', type: 'landfill' },
  { id: 'mirror', emoji: '🪞', name: 'Broken Mirror', type: 'landfill' },
  { id: 'umbrella', emoji: '☔', name: 'Broken Umbrella', type: 'landfill' },
  { id: 'gum', emoji: '🍬', name: 'Chewing Gum', type: 'landfill' },
  { id: 'sponge', emoji: '🧽', name: 'Used Sponge', type: 'landfill' },
  { id: 'toothbrush', emoji: '🪥', name: 'Old Toothbrush', type: 'landfill' },
  { id: 'tape', emoji: '📼', name: 'Adhesive Tape', type: 'landfill' },
  { id: 'cd', emoji: '💿', name: 'Broken CD/DVD', type: 'landfill' },
  { id: 'cotton_pad', emoji: '⚪', name: 'Used Cotton Pad', type: 'landfill' },
  { id: 'shoes', emoji: '👟', name: 'Old Shoes', type: 'landfill' },
  { id: 'pen', emoji: '🖊️', name: 'Dried Pen/Marker', type: 'landfill' },
  { id: 'paint', emoji: '🎨', name: 'Empty Paint Tube', type: 'landfill' },
  { id: 'laminated', emoji: '📄', name: 'Laminated Paper', type: 'landfill' },
  { id: 'ziploc', emoji: '🥪', name: 'Sandwich Bag', type: 'landfill' },
  { id: 'gloves', emoji: '🧤', name: 'Rubber Gloves', type: 'landfill' },

  // 🔋 E-WASTE (18 items)
  { id: 'battery', emoji: '🔋', name: 'Old Battery', type: 'ewaste' },
  { id: 'phone', emoji: '📱', name: 'Broken Phone', type: 'ewaste' },
  { id: 'cable', emoji: '🔌', name: 'Power Cable', type: 'ewaste' },
  { id: 'laptop', emoji: '💻', name: 'Broken Laptop', type: 'ewaste' },
  { id: 'tv', emoji: '📺', name: 'Old TV', type: 'ewaste' },
  { id: 'desktop', emoji: '🖥️', name: 'Desktop PC', type: 'ewaste' },
  { id: 'mouse', emoji: '🖱️', name: 'Computer Mouse', type: 'ewaste' },
  { id: 'keyboard', emoji: '⌨️', name: 'Keyboard', type: 'ewaste' },
  { id: 'headphones', emoji: '🎧', name: 'Broken Headphones', type: 'ewaste' },
  { id: 'watch', emoji: '⌚', name: 'Broken Smartwatch', type: 'ewaste' },
  { id: 'camera', emoji: '📷', name: 'Broken Camera', type: 'ewaste' },
  { id: 'printer', emoji: '🖨️', name: 'Old Printer', type: 'ewaste' },
  { id: 'controller', emoji: '🎮', name: 'Game Controller', type: 'ewaste' },
  { id: 'usb', emoji: '💽', name: 'USB Drive', type: 'ewaste' },
  { id: 'radio', emoji: '📻', name: 'Old Radio', type: 'ewaste' },
  { id: 'pager', emoji: '📟', name: 'Retro Pager', type: 'ewaste' },
  { id: 'vhs', emoji: '📼', name: 'VHS Player', type: 'ewaste' },
  { id: 'bulb', emoji: '💡', name: 'Burnt Lightbulb', type: 'ewaste' },
  
  // ⚡ SMART COMPOUND ITEMS (6 items)
  { 
    id: 'coffee_cup', 
    emoji: '☕', 
    name: 'Coffee Cup', 
    type: 'compound',
    hint: 'Tap to separate!',
    parts: [
      { id: 'coffee_lid', emoji: '⚪', name: 'Plastic Lid', type: 'recycle' },
      { id: 'coffee_sleeve', emoji: '🟤', name: 'Cardboard Sleeve', type: 'recycle' },
      { id: 'coffee_base', emoji: '🥤', name: 'Paper Cup', type: 'landfill' } 
    ]
  },
  { 
    id: 'pizza_box', 
    emoji: '🍕', 
    name: 'Greasy Pizza Box', 
    type: 'compound',
    hint: 'Tap to tear!',
    parts: [
      { id: 'pizza_clean', emoji: '📦', name: 'Clean Top', type: 'recycle' },
      { id: 'pizza_greasy', emoji: '🧀', name: 'Greasy Bottom', type: 'compost' }
    ]
  },
  { 
    id: 'juice_box', 
    emoji: '🧃', 
    name: 'Juice Box', 
    type: 'compound',
    hint: 'Tap to remove straw!',
    parts: [
      { id: 'juice_carton', emoji: '🧃', name: 'Carton', type: 'recycle' },
      { id: 'juice_straw', emoji: '🥤', name: 'Plastic Straw', type: 'landfill' }
    ]
  },
  {
    id: 'flashlight',
    emoji: '🔦',
    name: 'Broken Flashlight',
    type: 'compound',
    hint: 'Tap to remove battery!',
    parts: [
      { id: 'flash_shell', emoji: '🔦', name: 'Plastic Shell', type: 'landfill' },
      { id: 'flash_batt', emoji: '🔋', name: 'Battery', type: 'ewaste' }
    ]
  },
  {
    id: 'robot',
    emoji: '🤖',
    name: 'Broken Toy Robot',
    type: 'compound',
    hint: 'Tap to remove battery!',
    parts: [
      { id: 'robot_body', emoji: '🤖', name: 'Plastic Body', type: 'landfill' },
      { id: 'robot_batt', emoji: '🔋', name: 'Battery', type: 'ewaste' }
    ]
  },
  {
    id: 'spray',
    emoji: '💨',
    name: 'Aerosol Can',
    type: 'compound',
    hint: 'Tap to remove cap!',
    parts: [
      { id: 'spray_can', emoji: '💨', name: 'Metal Can', type: 'recycle' },
      { id: 'spray_cap', emoji: '🔴', name: 'Plastic Cap', type: 'landfill' }
    ]
  }
];

const BINS = [
  { id: 'recycle', nameKey: 'recycle', icon: '♻️' },
  { id: 'compost', nameKey: 'compost', icon: '🍎' },
  { id: 'landfill', nameKey: 'landfill', icon: '🗑️' },
  { id: 'ewaste', nameKey: 'ewaste', icon: '🔋' }
];


const T = {
  en: {
    heroMode: "HERO MODE ACTIVATED!",
    oops: "Oops!",
    belongsIn: "belongs in",
    oopsTime: "Oops! -5s",
    bonus: "BONUS!",
    tap: "TAP!",
    recycle: 'Recycle', compost: 'Compost', landfill: 'Landfill', ewaste: 'E-Waste',
    startTitle: 'Eco-Sorter',
    startSubtitle: 'Sort trash, build combos, and save the planet!',
    namePlaceholder: 'Enter your name...',
    playNow: 'Play Now',
    aboutBtn: '📖 About / Learn',
    missionTitle: '🌱 Our Mission',
    missionP1: 'Eco Sorter is a fun, educational game designed to teach kids and families how to properly manage waste.',
    missionP2: 'By learning the difference between Recycling, Composting, Landfill, and E-Waste, you are taking the first real step to becoming an Earth-Saving Hero!',
    missionAuthor: 'Created with love to protect our planet by The Eco Sorter Team! 🌍',
    backBtn: 'Back to Menu',
    paused: 'Paused',
    resume: 'Resume',
    restart: 'Restart',
    gameOver: 'Game Over',
    score: 'Score:',
    best: 'Best:',
    newHigh: '🎉 New High Score! 🎉',
    playAgain: 'Play Again',
    lvl: 'Lvl',
    combo: 'Combo'
  },
  fr: {
    heroMode: "MODE HÉROS ACTIVÉ !",
    oops: "Oups !",
    belongsIn: "va dans",
    oopsTime: "Oups ! -5s",
    bonus: "BONUS !",
    tap: "TAPE !",
    recycle: 'Recyclage', compost: 'Compost', landfill: 'Déchets', ewaste: 'Électronique',
    startTitle: 'Eco-Trieur',
    startSubtitle: 'Trie les déchets, fais des combos et sauve la planète !',
    namePlaceholder: 'Entre ton nom...',
    playNow: 'Jouer',
    aboutBtn: '📖 À propos / Apprendre',
    missionTitle: '🌱 Notre Mission',
    missionP1: 'Eco-Trieur est un jeu éducatif amusant conçu pour apprendre aux enfants et aux familles à bien gérer les déchets.',
    missionP2: 'En apprenant la différence entre Recyclage, Compost, Déchets et Électronique, tu deviens un vrai Héros de la Terre !',
    missionAuthor: "Créé avec amour pour protéger notre planète par L'équipe Eco-Trieur ! 🌍",
    backBtn: 'Retour au menu',
    paused: 'En pause',
    resume: 'Reprendre',
    restart: 'Recommencer',
    gameOver: 'Fin de partie',
    score: 'Score :',
    best: 'Record :',
    newHigh: '🎉 Nouveau Record ! 🎉',
    playAgain: 'Rejouer',
    lvl: 'Niv',
    combo: 'Combo'
  }
};

const ECO_FACTS = {
  en: {
    recycle: "Items like paper, clean plastic, and glass can be melted down and turned into brand new things!",
    compost: "Food scraps and yard waste break down into nutrient-rich soil that helps new plants grow!",
    landfill: "Landfill items take hundreds of years to break down. We should always try to reduce and reuse first!",
    ewaste: "Electronics contain toxic metals that can pollute the earth if they aren't properly recycled!",
    compound: "Some items are made of different materials and must be taken apart before sorting!"
  },
  fr: {
    recycle: "Le papier, le plastique propre et le verre peuvent être fondus et transformés en nouveaux objets !",
    compost: "Les restes de nourriture deviennent du terreau riche qui aide les nouvelles plantes à pousser !",
    landfill: "Ces déchets mettent des centaines d'années à disparaître. Il faut essayer de moins en produire !",
    ewaste: "Les appareils électroniques contiennent des métaux toxiques qui polluent la terre s'ils ne sont pas recyclés !",
    compound: "Certains objets sont faits de plusieurs matériaux et doivent être séparés avant d'être triés !"
  }
};
/*
  recycle: "Items like paper, clean plastic, and glass can be melted down and turned into brand new things!",
  compost: "Food scraps and yard waste break down into nutrient-rich soil that helps new plants grow!",
  landfill: "Landfill items take hundreds of years to break down. We should always try to reduce and reuse first!",
  ewaste: "Electronics contain toxic metals that can pollute the earth if they aren't properly recycled!",
  compound: "Some items are made of different materials and must be taken apart before sorting!"
*/

const interpolateColor = (color1, color2, factor) => {
  const result = color1.slice(1).match(/.{2}/g).map((hex, i) => {
    const val1 = parseInt(hex, 16);
    const val2 = parseInt(color2.slice(1).match(/.{2}/g)[i], 16);
    const val = Math.round(val1 + factor * (val2 - val1));
    return val.toString(16).padStart(2, '0');
  });
  return `#${result.join('')}`;
};

function App() {
  const [gameState, setGameState] = useState('start'); 
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('ecoSorterHighScore')) || 0;
  });
  const [highScoreName, setHighScoreName] = useState(() => {
    return localStorage.getItem('ecoSorterHighScoreName') || 'Hero';
  });
  const [playerName, setPlayerName] = useState(() => {
    return localStorage.getItem('ecoSorterPlayerName') || '';
  });
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [activeItems, setActiveItems] = useState([]);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHeroMode, setIsHeroMode] = useState(false);
  const [ecoFact, setEcoFact] = useState(null);
  const [difficulty, setDifficulty] = useState('Normal');
  const [lang, setLang] = useState('en');
  
  const currentLevel = Math.floor(score / 200) + 1;

  const binRefs = {
    recycle: useRef(null),
    compost: useRef(null),
    landfill: useRef(null),
    ewaste: useRef(null)
  };

  const playAreaRef = useRef(null);

  const cleanlinessFactor = Math.min(score / 500, 1); 
  const bg1 = interpolateColor('#94a3b8', '#a8edea', cleanlinessFactor);
  const bg2 = interpolateColor('#cbd5e1', '#fed6e3', cleanlinessFactor);
  
  useEffect(() => {
    document.body.style.background = `linear-gradient(135deg, ${bg1} 0%, ${bg2} 100%)`;
  }, [bg1, bg2]);

  useEffect(() => {
    if (isMuted || gameState === 'gameover') {
      stopBackgroundMusic();
    } else if (gameState === 'playing' || gameState === 'start') {
      playBackgroundMusic();
    }
  }, [isMuted, gameState]);

  useEffect(() => {
    if (gameState === 'playing' && score > highScore && highScore > 0 && !isHeroMode) {
      setIsHeroMode(true);
      if (!isMuted) playPowerUp();
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#4ade80', '#fbbf24', '#38bdf8']
      });
      addFloatingText(T[lang].heroMode, "#fbbf24", window.innerWidth / 2, window.innerHeight / 2);
    }
  }, [score, highScore, gameState, isHeroMode, isMuted]);

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleGameOver();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  useEffect(() => {
    let interval;
    if (gameState === 'playing') {
      const diffMultiplier = difficulty === 'Easy' ? 1.5 : difficulty === 'Hard' ? 0.7 : 1;
      const minSpawn = difficulty === 'Hard' ? 300 : 500;
      const spawnRate = Math.max(minSpawn, (3000 - (score * 20)) * diffMultiplier);
      
      if (activeItems.length === 0) {
        spawnRandomItem();
      }

      interval = setInterval(() => {
        if (activeItems.length < 5) { 
          spawnRandomItem();
        }
      }, spawnRate);
    }
    return () => clearInterval(interval);
  }, [gameState, activeItems.length, score]);

  const spawnRandomItem = () => {
    const template = TRASH_DICTIONARY[Math.floor(Math.random() * TRASH_DICTIONARY.length)];
    const isGolden = template.type !== 'compound' && Math.random() < 0.05;
    spawnItem(template, null, null, isGolden);
  };

  const spawnItem = (template, xPos = null, yPos = null, isGolden = false) => {
    let randomX = 10;
    if (playAreaRef.current) {
      const w = playAreaRef.current.clientWidth;
      randomX = Math.max(0, Math.random() * (w - 100));
    }
    
    const newItem = {
      ...template,
      instanceId: Math.random().toString(36).substr(2, 9),
      startX: xPos !== null ? xPos : randomX,
      startY: yPos !== null ? yPos : -150,
      isGolden
    };
    setActiveItems(prev => [...prev, newItem]);
  };

  const addFloatingText = (text, color, x, y) => {
    const id = Math.random().toString();
    setFloatingTexts(prev => [...prev, { id, text, color, x, y }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(ft => ft.id !== id));
    }, 1000);
  };

  const startGame = () => {
    if (!playerName.trim()) return;
    localStorage.setItem('ecoSorterPlayerName', playerName.trim());
    setScore(0);
    setLives(3);
    setStreak(0);
    let startingTime = 60;
    if (difficulty === 'Easy') startingTime = 90;
    if (difficulty === 'Hard') startingTime = 40;
    setTimeLeft(startingTime);
    setActiveItems([]);
    setIsHeroMode(false);
    setGameState('playing');
  };

  const pauseGame = () => setGameState('paused');
  const resumeGame = () => setGameState('playing');
  const quitToMenu = () => setGameState('start');

  const handleGameOver = () => {
    setGameState('gameover');
    setIsHeroMode(false);
    if (score > highScore) {
      setHighScore(score);
      setHighScoreName(playerName.trim());
      localStorage.setItem('ecoSorterHighScore', score.toString());
      localStorage.setItem('ecoSorterHighScoreName', playerName.trim());
      confetti({ particleCount: 200, spread: 120, origin: { y: 0.4 } });
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  };

  const checkDrop = (info) => {
    const dropPoint = { x: info.point.x, y: info.point.y };
    let droppedInBin = null;

    Object.keys(binRefs).forEach(key => {
      const binElement = binRefs[key].current;
      if (binElement) {
        const rect = binElement.getBoundingClientRect();
        if (
          dropPoint.x >= rect.left && dropPoint.x <= rect.right &&
          dropPoint.y >= rect.top && dropPoint.y <= rect.bottom
        ) {
          droppedInBin = key;
        }
      }
    });
    return droppedInBin;
  };

  const handleDragEnd = (item, event, info) => {
    const droppedBinId = checkDrop(info);

    if (droppedBinId) {
      const rect = binRefs[droppedBinId].current.getBoundingClientRect();
      const dropX = rect.left + rect.width / 2;
      const dropY = rect.top;

      if (item.type === 'compound') {
        handleWrongDrop(item, dropX, dropY);
      } else if (droppedBinId === item.type) {
        handleCorrectDrop(item, dropX, dropY);
      } else {
        handleWrongDrop(item, dropX, dropY);
      }
    }
  };

  const handleCorrectDrop = (item, dropX, dropY) => {
    if (item.isGolden) {
      if (!isMuted) playPowerUp();
      setScore(s => s + 50);
      setTimeLeft(t => t + 10);
      addFloatingText('+50 & +10s!', '#eab308', dropX, dropY - 20);
      confetti({ particleCount: 80, spread: 100, origin: { x: dropX/window.innerWidth, y: dropY/window.innerHeight }, colors: ['#fef08a', '#eab308'] });
    } else {
      if (!isMuted) playPop();
      const newStreak = streak + 1;
      const multiplier = Math.min(Math.floor(newStreak / 3) + 1, 5);
      
      setStreak(newStreak);
      setScore(s => s + (10 * multiplier));
      setTimeLeft(t => t + 2);
      
      addFloatingText(`+${10*multiplier} & +2s`, '#22c55e', dropX, dropY - 20);
      
      confetti({
        particleCount: 20 * multiplier,
        spread: 60,
        origin: { x: dropX/window.innerWidth, y: dropY/window.innerHeight },
        colors: ['#22c55e', '#3b82f6', '#f59e0b']
      });
    }

    setActiveItems(prev => prev.filter(i => i.instanceId !== item.instanceId));
  };

  const handleWrongDrop = (item, dropX, dropY) => {
    if (!isMuted) playBuzzer();
    triggerShake();
    
    setStreak(0);
    const newLives = lives - 1;
    setLives(newLives);
    setTimeLeft(t => Math.max(0, t - 5)); 
    
    addFloatingText(T[lang].oopsTime, '#ef4444', dropX, dropY - 20);
    
    // Show Educational Fact
    const correctBinName = BINS.find(b => b.id === item.type)?.nameKey || 'recycle';
    setEcoFact(`${T[lang].oops} ${item.name} ${T[lang].belongsIn} ${T[lang][correctBinName]}. ${ECO_FACTS[lang][item.type]}`);
    setTimeout(() => setEcoFact(null), 5000);

    if (navigator.vibrate) navigator.vibrate(200);

    setActiveItems(prev => prev.filter(i => i.instanceId !== item.instanceId));

    if (newLives <= 0) {
      handleGameOver();
    }
  };

  const handleItemTap = (item, event) => {
    if (gameState !== 'playing') return;
    
    if (item.type === 'compound') {
      if (!isMuted) playTap();
      const rect = event.target.getBoundingClientRect();
      const playAreaRect = playAreaRef.current.getBoundingClientRect();
      
      const centerX = (rect.left - playAreaRect.left) + rect.width / 2;
      const centerY = (rect.top - playAreaRect.top) + rect.height / 2;

      setActiveItems(prev => prev.filter(i => i.instanceId !== item.instanceId));
      
      item.parts.forEach((part, index) => {
        const offset = (index - 1) * 60;
        spawnItem(part, centerX + offset - (playAreaRect.width/2), centerY - (playAreaRect.height/2));
      });
      
      confetti({
        particleCount: 15,
        spread: 40,
        origin: { x: (rect.left + rect.width/2)/window.innerWidth, y: (rect.top + rect.height/2)/window.innerHeight },
        colors: ['#f59e0b', '#fbbf24']
      });
    }
  };

  return (
    <div className={`game-container glass ${isShaking ? 'shake' : ''} ${isHeroMode ? 'is-hero-mode' : ''}`} style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
      <div className="super-earth">🌍</div>

      {/* Floating Texts */}
      <AnimatePresence>
        {floatingTexts.map(ft => (
          <motion.div
            key={ft.id}
            className="floating-text"
            initial={{ opacity: 1, y: ft.y, x: ft.x, scale: 1 }}
            animate={{ opacity: 0, y: ft.y - 100, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ color: ft.color }}
          >
            {ft.text}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="floating-bg-elements">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="leaf"
            initial={{ y: -50, x: Math.random() * window.innerWidth, rotate: 0 }}
            animate={{ y: window.innerHeight + 50, rotate: 360, x: Math.random() * window.innerWidth }}
            transition={{ duration: (isHeroMode ? 5 : 10) + Math.random() * 10, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
            style={{ fontSize: isHeroMode ? '30px' : '20px', opacity: isHeroMode ? 0.8 : 0.4 }}
          >
            {isHeroMode ? (Math.random() > 0.5 ? '✨' : '⭐') : '🍃'}
          </motion.div>
        ))}
      </div>

      <div className="top-nav">
        <button className="icon-btn" onClick={quitToMenu} title="Main Menu"><Home size={20} color="#475569"/></button>
        <button className="icon-btn" onClick={() => setIsMuted(!isMuted)} title={isMuted ? "Unmute" : "Mute"}>
          {isMuted ? <VolumeX size={20} color="#ef4444"/> : <Volume2 size={20} color="#475569"/>}
        </button>
        {gameState === 'playing' && (
          <button className="icon-btn" onClick={pauseGame} title="Pause"><Pause size={20} color="#475569"/></button>
        )}
        {gameState === 'paused' && (
          <button className="icon-btn" onClick={resumeGame} title="Resume"><Play size={20} color="#475569"/></button>
        )}
      </div>

      <div className="header glass">
        <div className="score-area">
          <div className="score">
            <Trophy size={24} color="#f59e0b" />
            <span>{score}</span>
          </div>
          <div className="top-score">{T[lang].best} {highScore} ({highScoreName}) • {T[lang].lvl} {currentLevel}</div>
          {streak > 2 && (
            <div className="streak">
              <Flame size={16} /> {Math.min(Math.floor(streak / 3) + 1, 5)}x Combo
            </div>
          )}
        </div>

        <div className={`timer-area ${timeLeft <= 10 ? 'low-time' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={24} color={timeLeft <= 10 ? "#ef4444" : "#1e293b"} />
            {timeLeft}s
          </div>
        </div>

        <div className="lives-area">
          <div className="lives">
            {[...Array(3)].map((_, i) => (
              <Heart key={i} size={24} color={i < lives ? "#ef4444" : "#cbd5e1"} fill={i < lives ? "#ef4444" : "none"} />
            ))}
          </div>
        </div>
      </div>

      <div className="play-area" ref={playAreaRef}>
        <AnimatePresence>
          {(gameState === 'playing' || gameState === 'paused') && activeItems.map((item) => (
            <motion.div
              key={item.instanceId}
              className={`trash-item ${item.type === 'compound' ? 'compound-item' : ''} ${item.isGolden ? 'golden-item' : ''}`}
              drag={gameState === 'playing'}
              dragConstraints={playAreaRef}
              dragElastic={0.5}
              dragMomentum={false}
              initial={{ x: item.startX, y: item.startY, scale: 0, opacity: 0, rotate: 0 }}
              animate={{ 
                x: item.startX, 
                y: item.startY > -50 ? item.startY : 0, 
                scale: 1, 
                opacity: 1,
                rotate: 360 // Tumble as they drop!
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                rotate: { repeat: Infinity, duration: 8, ease: "linear" },
                y: { type: 'spring', bounce: 0.5 }
              }}
              whileHover={{ scale: gameState === 'playing' ? 1.1 : 1 }}
              whileDrag={{ scale: 1.2, zIndex: 100, boxShadow: item.isGolden ? "0 20px 50px rgba(234, 179, 8, 0.8)" : "0 20px 40px rgba(0,0,0,0.2)" }}
              onDragEnd={(e, info) => handleDragEnd(item, e, info)}
              onPointerDown={(e) => handleItemTap(item, e)}
            >
              <span className="trash-emoji" style={{ pointerEvents: 'none' }}>{item.emoji}</span>
              {item.type === 'compound' && <span className="trash-hint" style={{ pointerEvents: 'none' }}>{T[lang].tap}</span>}
              {item.isGolden && <span className="trash-hint" style={{ pointerEvents: 'none', color:'#eab308', background:'#fef08a' }}>{T[lang].bonus}</span>}
            </motion.div>
          ))}
        </AnimatePresence>

        {gameState === 'start' && (
          <div className="overlay-screen">
            <h1>{T[lang].startTitle}</h1>
            <p>{T[lang].startSubtitle}</p>
            <input 
              type="text" 
              className="name-input"
              placeholder={T[lang].namePlaceholder} 
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={15}
            />
            <div style={{display: 'flex', gap: '10px', width: '100%'}}>
              <button className={`btn-primary ${lang === 'en' ? '' : 'btn-secondary'}`} style={{flex: 1, padding: '5px'}} onClick={() => setLang('en')}>🇺🇸 EN</button>
              <button className={`btn-primary ${lang === 'fr' ? '' : 'btn-secondary'}`} style={{flex: 1, padding: '5px'}} onClick={() => setLang('fr')}>🇫🇷 FR</button>
            </div>
            <div style={{display: 'flex', gap: '10px', margin: '15px 0', width: '100%'}}>
              {['Easy', 'Normal', 'Hard'].map(level => (
                <button 
                  key={level}
                  className={`btn-primary ${difficulty === level ? '' : 'btn-secondary'}`}
                  style={{padding: '8px 10px', fontSize: '0.9rem', flex: 1, minWidth: 0}}
                  onClick={() => setDifficulty(level)}
                >
                  {T[lang][level.toLowerCase()] || level}
                </button>
              ))}
            </div>
            <button className="btn-primary" onClick={startGame} disabled={!playerName.trim()}>
              <Play size={24}/> {T[lang].playNow}
            </button>
            <button className="btn-primary btn-secondary" style={{marginTop: '1rem', background: '#3b82f6', borderBottomColor: '#2563eb'}} onClick={() => setGameState('about')}>
              {T[lang].aboutBtn}
            </button>
          </div>
        )}

        {gameState === 'about' && (
          <div className="overlay-screen" style={{maxWidth: '600px'}}>
            <h1 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>{T[lang].missionTitle}</h1>
            <p style={{textAlign: 'left', lineHeight: '1.5', marginBottom: '1rem', fontSize: '1.2rem', color: '#1e293b'}}>
              {T[lang].missionP1}
            </p>
            <p style={{textAlign: 'left', lineHeight: '1.5', marginBottom: '1rem', fontSize: '1.2rem', color: '#1e293b'}}>
              By learning the difference between Recycling, Composting, Landfill, and E-Waste, you are taking the first real step to becoming an Earth-Saving Hero!
            </p>
            <p style={{textAlign: 'center', fontWeight: 'bold', color: '#ea580c', margin: '2rem 0', fontSize: '1.3rem'}}>
              Created with love to protect our planet by The Eco Sorter Team! 🌍
            </p>
            <button className="btn-primary" onClick={() => setGameState('start')}>
              <Home size={24}/> Back to Menu
            </button>
          </div>
        )}

        {gameState === 'paused' && (
          <div className="overlay-screen">
            <h1>{T[lang].paused}</h1>
            <div className="btn-row">
              <button className="btn-primary" onClick={resumeGame}><Play size={24}/> {T[lang].resume}</button>
              <button className="btn-primary btn-secondary" onClick={startGame}><RefreshCcw size={24}/> {T[lang].restart}</button>
            </div>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="overlay-screen">
            <h1>{T[lang].gameOver}</h1>
            
            <div className="game-over-stats">
              <div className="stat-row">
                <span>{T[lang].score}</span>
                <strong>{score}</strong>
              </div>
              <div className="stat-row">
                <span>{T[lang].best}</span>
                <strong>{highScore}</strong>
              </div>
              {score >= highScore && score > 0 && (
                <div style={{ color: '#f59e0b', fontSize: '1.2rem', marginTop: '0.5rem', textAlign: 'center', fontWeight: 'bold' }}>
                  🎉 New High Score! 🎉
                </div>
              )}
            </div>

            <button className="btn-primary" onClick={startGame}><RefreshCcw size={24}/> {T[lang].playAgain}</button>
          </div>
        )}
      </div>

      <div className="bins-container">
        {BINS.map(bin => (
          <motion.div 
            key={bin.id} 
            className={`bin ${bin.id}`} 
            ref={binRefs[bin.id]}
            whileHover={{ y: -5 }}
          >
            <span className="icon">{bin.icon}</span>
            <span>{T[lang][bin.nameKey]}</span>
          </motion.div>
        ))}
      </div>

      {/* Educational Eco Fact Popup */}
      <AnimatePresence>
        {ecoFact && (
          <motion.div 
            className="eco-fact-popup glass"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            <div className="fact-icon">💡</div>
            <div className="fact-text">{ecoFact}</div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
