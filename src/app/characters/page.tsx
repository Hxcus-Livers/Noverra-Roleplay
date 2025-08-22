"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

interface CharacterData {
  Character: string;
  Level: number;
  PlayingHours: number;
  Skin: number;
  Birthdate?: string;
  Faction: number;
  FactionRank: number;
  Gender?: number;
  Money: number;
  BankAccount: BankData [];
  Cars: VehicleData[];
}

interface BankData {
  AccNumber: number;
  AccName: string;
  Balance: number;
}

interface VehicleData {
  carModel: number;
  carPlate: string;
  carPlate_Time1: string;
}

// Vehicle names array
const g_arrVehicleNames = [
  "Landstalker", "Bravura", "Buffalo", "Linerunner", "Perrenial", "Sentinel", "Dumper", "Firetruck", "Trashmaster",
  "Stretch", "Manana", "Infernus", "Voodoo", "Pony", "Mule", "Cheetah", "Ambulance", "Leviathan", "Moonbeam",
  "Esperanto", "Taxi", "Washington", "Bobcat", "Whoopee", "BF Injection", "Hunter", "Premier", "Enforcer",
  "Securicar", "Banshee", "Predator", "Bus", "Rhino", "Barracks", "Hotknife", "Trailer", "Previon", "Coach",
  "Cabbie", "Stallion", "Rumpo", "RC Bandit", "Romero", "Packer", "Monster", "Admiral", "Squalo", "Seasparrow",
  "Pizzaboy", "Tram", "Trailer", "Turismo", "Speeder", "Reefer", "Tropic", "Flatbed", "Yankee", "Caddy", "Solair",
  "Berkley's RC Van", "Skimmer", "PCJ-600", "Faggio", "Freeway", "RC Baron", "RC Raider", "Glendale", "Oceanic",
  "Sanchez", "Sparrow", "Patriot", "Quad", "Coastguard", "Dinghy", "Hermes", "Sabre", "Rustler", "ZR-350", "Walton",
  "Regina", "Comet", "BMX", "Burrito", "Camper", "Marquis", "Baggage", "Dozer", "Maverick", "News Chopper", "Rancher",
  "FBI Rancher", "Virgo", "Greenwood", "Jetmax", "Hotring", "Sandking", "Blista Compact", "Police Maverick",
  "Boxville", "Benson", "Mesa", "RC Goblin", "Hotring Racer A", "Hotring Racer B", "Bloodring Banger", "Rancher",
  "Super GT", "Elegant", "Journey", "Bike", "Mountain Bike", "Beagle", "Cropduster", "Stunt", "Tanker", "Roadtrain",
  "Nebula", "Majestic", "Buccaneer", "Shamal", "Hydra", "FCR-900", "NRG-500", "HPV1000", "Cement Truck", "Tow Truck",
  "Fortune", "Cadrona", "SWAT Truck", "Willard", "Forklift", "Tractor", "Combine", "Feltzer", "Remington", "Slamvan",
  "Blade", "Streak", "Freight", "Vortex", "Vincent", "Bullet", "Clover", "Sadler", "Firetruck", "Hustler", "Intruder",
  "Primo", "Cargobob", "Tampa", "Sunrise", "Merit", "Utility", "Nevada", "Yosemite", "Windsor", "Monster", "Monster",
  "Uranus", "Jester", "Sultan", "Stratum", "Elegy", "Raindance", "RC Tiger", "Flash", "Tahoma", "Savanna", "Bandito",
  "Freight Flat", "Streak Carriage", "Kart", "Mower", "Dune", "Sweeper", "Broadway", "Tornado", "AT-400", "DFT-30",
  "Huntley", "Stafford", "BF-400", "News Van", "Tug", "Trailer", "Emperor", "Wayfarer", "Euros", "Hotdog", "Club",
  "Freight Box", "Trailer", "Andromada", "Dodo", "RC Cam", "Launch", "LSPD Car", "SFPD Car", "LVPD Car",
  "Police Rancher", "Picador", "S.W.A.T", "Alpha", "Phoenix", "Glendale", "Sadler", "Luggage", "Luggage", "Stairs",
  "Boxville", "Tiller", "Utility Trailer"
];

// Function to return vehicle name based on model
function returnVehicleModelName(model: number): string {
  if (model < 400 || model > 611) {
    return "None";
  }
  return g_arrVehicleNames[model - 400];
}

export default function CharactersPage() {
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChar, setSelectedChar] = useState<CharacterData | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const username = localStorage.getItem("userName");
        const token = localStorage.getItem("token");

        if (!username) {
          console.warn("No username found in localStorage");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/api/characters/${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = response.data.data;
        setCharacters(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Error fetching characters:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleCardClick = (char: CharacterData) => {
    setSelectedChar(char);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center relative text-white"
      style={{ backgroundImage: 'url("/bg-polos.png")' }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      <Navbar />

      <div className="relative z-10 flex flex-1 justify-center items-center px-4 py-10">
        <div className="bg-[var(--timber-green)] rounded-2xl p-8 shadow-2xl w-full max-w-6xl relative">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--keppel)] drop-shadow-lg border-b-2 border-[var(--keppel)] inline-block pb-2">
            {selectedChar ? selectedChar.Character : "My Characters"}
          </h1>

          {/* Tombol close detail */}
          <AnimatePresence>
            {selectedChar && (
              <motion.button
                key="close-button"
                onClick={() => setSelectedChar(null)}
                className="absolute top-4 right-4 text-[var(--keppel)] text-2xl font-bold hover:text-[var(--lochinvar)] transition"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                ×
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.p
                className="text-center text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Loading characters...
              </motion.p>
            ) : characters.length === 0 ? (
              <motion.p
                className="text-center text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No characters found.
              </motion.p>
            ) : selectedChar ? (
              <motion.div
                key="stats-view"
                className="flex flex-col md:flex-row gap-6 mt-6 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Stats */}
                <div className="flex-1 bg-[var(--timber-green)] p-6 rounded-2xl border border-[var(--keppel)] shadow-lg">
                  <h2 className="text-2xl font-bold text-[var(--keppel)] mb-4">Stats</h2>
                  <div className="space-y-2 text-left text-gray-200">
                    <p>Level: {selectedChar.Level}</p>
                    <p>Playing Time: {selectedChar.PlayingHours} hours</p>
                    <p>Skin ID: {selectedChar.Skin}</p>
                    <p>Faction: {selectedChar.Faction}</p>
                    <p>Faction Rank: {selectedChar.FactionRank}</p>
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--keppel)] mt-5 mb-4">Assets</h2>
                  <div className="space-y-3 text-left text-gray-200">
                    {/* Money */}
                    <div>
                      <p className="font-semibold text-[var(--keppel)]">Money</p>
                      <p>${selectedChar.Money.toLocaleString()}</p>
                    </div>

                    {/* Bank Accounts */}
                    <div>
                      <p className="font-semibold text-[var(--keppel)]">Bank Accounts</p>
                      {selectedChar.BankAccount.length === 0 ? (
                        <p className="text-gray-400">No bank accounts</p>
                      ) : (
                        <ul className="list-disc list-inside space-y-1">
                          {selectedChar.BankAccount.map((acc, idx) => (
                            <li key={idx}>
                              {acc.AccName} : ${acc.Balance.toLocaleString()}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Vehicles */}
                <div className="flex-[1.5] bg-[var(--timber-green)] p-6 rounded-2xl border border-[var(--keppel)] shadow-lg">
                  <h2 className="text-2xl font-bold text-[var(--keppel)] mb-4">Vehicles</h2>
                  {selectedChar.Cars.length === 0 ? (
                    <p className="text-gray-300">No vehicles found.</p>
                  ) : (
                    <div className="overflow-y-auto max-h-[400px] pr-2">
                      <div className="space-y-6 text-left text-gray-200">
                        {selectedChar.Cars.map((v, idx) => {
                          const vehicleName = returnVehicleModelName(v.carModel);
                          const vehicleImageUrl = `https://assets.open.mp/assets/images/vehiclePictures/Vehicle_${v.carModel}.jpg`;
                          return (
                            <div
                              key={idx}
                              className="flex items-center border-b border-gray-700 pb-4"
                            >
                              <img
                                src={vehicleImageUrl}
                                alt={vehicleName}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "https://via.placeholder.com/200x200?text=No+Image";
                                }}
                                className="w-28 h-28 object-contain mr-6 rounded-lg"
                              />
                              <div className="space-y-1 text-lg">
                                <p><span className="font-semibold">Name:</span> {vehicleName}</p>
                                <p><span className="font-semibold">Plate:</span> {v.carPlate || "No Plate"}</p>
                                <p><span className="font-semibold">Expired:</span> {v.carPlate_Time1 || "EXPIRED"}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              // Character Grid
              <motion.div
                key="grid-view"
                className={`grid 
                  ${characters.length === 1 ? "grid-cols-1 justify-items-center" : ""} 
                  ${characters.length === 2 ? "grid-cols-1 md:grid-cols-2 justify-items-center" : ""} 
                  ${characters.length >= 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : ""} 
                  gap-6`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {characters.map((char, idx) => (
                  <motion.div
                    key={idx}
                    onClick={() => handleCardClick(char)}
                    className="cursor-pointer bg-[var(--timber-green)] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-xs border border-[var(--keppel)] flex flex-col items-center transform hover:-translate-y-2"
                    whileHover={{ scale: 1.03 }}
                  >
                    <h2 className="text-xl font-semibold mb-3 text-[var(--keppel)] drop-shadow-md text-center">
                      {char.Character}
                    </h2>
                    <img
                      src={`https://assets.open.mp/assets/images/skins/${char.Skin}.png`}
                      alt={`Skin ${char.Skin}`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/128x128?text=No+Skin";
                      }}
                      className="w-32 h-32 md:w-40 md:h-40 object-contain mb-4 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tombol Bind Account muncul hanya setelah karakter dipilih */}
          {selectedChar && (
            <div className="mt-8 flex justify-center">
              <button className="bg-[var(--keppel)] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-[var(--lochinvar)] transition">
                Bind Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}