import React, { useState } from 'react';

const PAPER_SIZES = {
  A0: 1.0,
  A1: 0.5,
  A2: 0.25,
  A3: 0.125,
  A4: 0.06237,
  A5: 0.03118,
};

const GSM_OPTIONS = [70, 80, 100, 120, 150, 200, 300];

const FUN_FACTS = [
  "Recycling one ton of paper saves 17 trees! 🌳",
  "You saved energy equal to running a fan all day! 🌬️",
  "Paper can be recycled up to 7 times! ♻️",
  "One tree makes 8,500 sheets of paper! 😮",
];

const BADGES = [
  { threshold: 1, name: 'Planet Protector', emoji: '🌍' },
  { threshold: 0.5, name: 'Carbon Hero', emoji: '🦸‍♀️' },
  { threshold: 0.2, name: 'Tree Hugger', emoji: '🌳' },
  { threshold: 0.1, name: 'Leaf Champion', emoji: '🍃' },
  { threshold: 0.05, name: 'Eco Helper', emoji: '🧤' },
  { threshold: 0.01, name: 'Starter Saver', emoji: '🟢' },
];

export default function CarbonFootprintTracker() {
  const [paperSize, setPaperSize] = useState('A4');
  const [gsm, setGsm] = useState(80);
  const [sheetCount, setSheetCount] = useState('');
  const [co2Saved, setCo2Saved] = useState(null);
  const [weightPerSheet, setWeightPerSheet] = useState(null);
  const [kidsMode, setKidsMode] = useState(true);
  const [earnedBadge, setEarnedBadge] = useState(null); // ✅ missing state added

  const handleCalculate = () => {
    const count = parseInt(sheetCount);
    if (!isNaN(count) && count > 0) {
      const area = PAPER_SIZES[paperSize];
      const weightSheet = area * gsm;
      const totalWeightKg = (weightSheet * count) / 1000;
      const co2 = totalWeightKg * 0.46;

      setWeightPerSheet(weightSheet.toFixed(2));
      setCo2Saved(co2.toFixed(4));
const earned = [...BADGES].reverse().find(b => co2 >= b.threshold);
setEarnedBadge(earned || null);

      if (kidsMode) {
        const audio = new Audio('/sound/reward.mp3');
        audio.volume = 0.5;
        audio.play();
      }
    } else {
      setCo2Saved(null);
      setWeightPerSheet(null);
    }
  };

  const interpretImpact = () => {
    const co2 = parseFloat(co2Saved);
    if (co2 < 0.05) return "🟡 Small start! You're helping Earth!";
    if (co2 < 0.2) return `🟢 Woohoo! That's like biking for ${(co2 * 3.3).toFixed(1)} km!`;
    return `🌳 Eco Hero! That’s like planting ${(co2 / 0.021).toFixed(1)} trees!`;
  };

  const getBadge = () => {
    const co2 = parseFloat(co2Saved);
    if (!co2 || co2 <= 0) return null;
    return BADGES.find(b => co2 >= b.threshold);
  };

  const randomFunFact = () =>
    FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];

  return (
    <div className={`${kidsMode ? 'bg-yellow-100' : 'bg-green-100'} min-h-screen flex items-center justify-center p-6`}>
      <div className={`bg-white shadow-xl rounded-3xl p-8 w-full max-w-md text-center ${kidsMode ? 'border-4 border-yellow-300' : ''}`}>

        {/* Toggle Switch */}
        <div className="flex items-center justify-end mb-4">
          <span className="mr-2 text-sm font-medium text-gray-600">Kids Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={kidsMode}
              onChange={(e) => setKidsMode(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-yellow-400 transition-all duration-300"></div>
            <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-300 transform peer-checked:translate-x-full"></div>
          </label>
        </div>

        {/* Header */}
        <h1 className={`text-3xl font-bold mb-4 ${kidsMode ? 'text-yellow-600' : 'text-green-700'}`}>
          {kidsMode ? 'Carbon Saver Fun Zone 🌿' : '♻️ Carbon Footprint Tracker'}
        </h1>

        {/* Paper Image */}
        {kidsMode && (
          <img
            src="https://cdn-icons-png.flaticon.com/512/7952/7952033.png"
            alt="paper stack"
            className="w-20 mx-auto mb-4 animate-bounce"
          />
        )}

        {/* Paper Size */}
        <div className="mb-3 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Paper Size</label>
          <select
            value={paperSize}
            onChange={(e) => setPaperSize(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          >
            {Object.keys(PAPER_SIZES).map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        {/* GSM */}
        <div className="mb-3 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Paper GSM</label>
          <select
            value={gsm}
            onChange={(e) => setGsm(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          >
            {GSM_OPTIONS.map((g) => (
              <option key={g} value={g}>{g} gsm</option>
            ))}
          </select>
        </div>

        {/* Sheet Count */}
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Sheets</label>
          <input
            type="number"
            value={sheetCount}
            onChange={(e) => setSheetCount(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className={`w-full ${kidsMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'} text-white py-2 rounded-lg font-semibold transition`}
        >
          {kidsMode ? '✨ Show Me My Magic ✨' : 'Calculate CO₂ Saved'}
        </button>

        {/* Results */}
        {co2Saved !== null && (
          <div className={`mt-6 p-4 ${kidsMode ? 'bg-yellow-50 border-yellow-300' : 'bg-green-50 border-green-200'} rounded-xl border`}>
            <p className={`${kidsMode ? 'text-yellow-800' : 'text-green-800'} text-lg font-medium`}>
              🌍 You saved <span className="font-bold">{co2Saved} kg</span> of CO₂!
            </p>
            <p className="text-sm text-gray-700 mt-1">
              📄 Each {paperSize} sheet of {gsm}gsm weighs <b>{weightPerSheet}g</b>
            </p>
            <p className="text-sm text-gray-700 mt-2">{interpretImpact()}</p>

          </div>
        )}
      </div>

      {/* Badge Overlay */}
{earnedBadge && (
      <div className="fixed inset-0 bg-gray-800/30 z-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm w-full mx-4 border-4 border-teal-400
             transform transition-all duration-500 ease-out scale-90 opacity-0 animate-[fadeIn_0.4s_forwards]">
          <h2 className={`text-3xl font-bold mb-2 ${kidsMode ? 'text-yellow-600' : 'text-green-600'}`}>
            🏅 Badge Unlocked!
          </h2>
          <p className="text-2xl font-semibold text-gray-800">
            {earnedBadge.emoji} {earnedBadge.name}
          </p>
          {kidsMode && (
            <p className="text-sm italic mt-4 text-gray-500">
              💡 {randomFunFact()}
            </p>
          )}
          <button
            onClick={() => setEarnedBadge(null)}
            className={`mt-6 px-4 py-2 ${kidsMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'} text-white font-bold rounded-full transition`}
          >
            Got it!
          </button>
        </div>
      </div>
    )}
    </div>
  );
}
