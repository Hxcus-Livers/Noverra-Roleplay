"use client";
import Navbar from "@/components/Navbar";

type PacketDonate = { name: string; price: number; bonus: string };
type HouseDonate = {
  name: string;
  oldPrice: number;
  newPrice: number;
  stock: string;
  image: string;
};
type VehicleDonate = {
  id: number;
  name: string;
  stock: string; // "" = unlimited, "0/5" dll = limited
  oldPrice: number;
  newPrice: number;
};

// Discriminated union untuk Other Donate
type OtherDonate =
  | {
      kind: "discount";
      name: string;
      oldPrice: number;
      newPrice: number;
      desc: string;
      icon: string;
    }
  | {
      kind: "fixed";
      name: string;
      price: number;
      desc: string;
      icon: string;
    };

export default function DonationPage() {
  // Packet
  const packetDonate: PacketDonate[] = [
    { name: "Bronze Packet", price: 50000, bonus: "VIP 3 Hari" },
    { name: "Silver Packet", price: 100000, bonus: "VIP 7 Hari + 50.000$" },
    { name: "Gold Packet", price: 250000, bonus: "VIP 15 Hari + 150.000$ + 1 Mobil" },
  ];
  
  const houseDonate: HouseDonate[] = [
    {
      name: "Rumah Kecil 🛖",
      oldPrice: 35000,
      newPrice: 20000,
      stock: "Unlimited",
      image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=500&q=80",
    },
    {
      name: "Rumah Sedang 🏡",
      oldPrice: 50000,
      newPrice: 30000,
      stock: "Unlimited",
      image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=500&q=80",
    },
    {
      name: "Rumah Besar 🏠",
      oldPrice: 75000,
      newPrice: 55000,
      stock: "Unlimited",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&q=80",
    },
    {
      name: "Mansion Kecil 🏢",
      oldPrice: 100000,
      newPrice: 75000,
      stock: "Unlimited",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
    },
    {
      name: "Mansion Besar 🏛️",
      oldPrice: 150000,
      newPrice: 120000,
      stock: "Unlimited",
      image: "https://images.unsplash.com/photo-1600585154154-7c13c95f1d2d?w=500&q=80",
    },
  ];

  // Vehicles
  const vehiclesDonate: VehicleDonate[] = [
    { id: 522, name: "NRG-500", stock: "0/5", oldPrice: 90000, newPrice: 80000 },
    { id: 471, name: "Quad Bike", stock: "0/3", oldPrice: 90000, newPrice: 75000 },
    { id: 470, name: "Patriot", stock: "", oldPrice: 90000, newPrice: 70000 },
    { id: 411, name: "Infernus", stock: "0/5", oldPrice: 85000, newPrice: 65000 },
    { id: 541, name: "Bullet", stock: "0/5", oldPrice: 85000, newPrice: 65000 },
    { id: 494, name: "Hotring A", stock: "0/3", oldPrice: 85000, newPrice: 75000 },
    { id: 503, name: "Hotring B", stock: "0/3", oldPrice: 85000, newPrice: 75000 },
    { id: 502, name: "Hotring C", stock: "0/3", oldPrice: 85000, newPrice: 75000 },
    { id: 415, name: "Cheetah", stock: "", oldPrice: 80000, newPrice: 65000 },
    { id: 429, name: "Banshee", stock: "", oldPrice: 80000, newPrice: 60000 },
    { id: 571, name: "Kart", stock: "0/3", oldPrice: 80000, newPrice: 70000 },
    { id: 451, name: "Turismo", stock: "0/5", oldPrice: 75000, newPrice: 50000 },
    { id: 477, name: "ZR-350", stock: "0/5", oldPrice: 75000, newPrice: 50000 },
    { id: 402, name: "Buffalo", stock: "", oldPrice: 65000, newPrice: 65000 },
    { id: 424, name: "BF Injection", stock: "0/5", oldPrice: 60000, newPrice: 60000 },
    { id: 506, name: "Super GT", stock: "", oldPrice: 60000, newPrice: 50000 },
    { id: 500, name: "Mesa", stock: "", oldPrice: 50000, newPrice: 35000 },
    { id: 457, name: "Caddy", stock: "0/5", oldPrice: 40000, newPrice: 40000 },
  ];

  // Other (pakai union type di atas)
  const otherDonate: OtherDonate[] = [
    { kind: "discount", name: "Custom Plat Kendaraan", oldPrice: 30000, newPrice: 15000, desc: "Plat custom untuk kendaraan", icon: "🚘" },
    { kind: "discount", name: "Gate", oldPrice: 50000, newPrice: 30000, desc: "Pintu otomatis untuk rumah / markas", icon: "🚪" },
    { kind: "discount", name: "ATM", oldPrice: 40000, newPrice: 20000, desc: "ATM pribadi di rumah / bisnis", icon: "🏧" },
    { kind: "fixed", name: "Slot Rumah", price: 25000, desc: "Tambah slot rumah", icon: "🏠" },
    { kind: "fixed", name: "Slot Kendaraan", price: 20000, desc: "Tambah slot kendaraan", icon: "🚗" },
    { kind: "fixed", name: "Mapping (per object)", price: 500, desc: "Mapping sesuai permintaan", icon: "🗺️" },
    { kind: "fixed", name: "Custom Phone 4 Digit", price: 20000, desc: "Nomor unik 4 digit", icon: "📱" },
    { kind: "fixed", name: "Custom Phone 5 Digit", price: 10000, desc: "Nomor unik 5 digit", icon: "📱" },
    { kind: "fixed", name: "Custom Phone 6 Digit", price: 5000, desc: "Nomor unik 6 digit", icon: "📱" },
  ];

  const limitedVehicles = vehiclesDonate.filter((v) => v.stock !== "");
  const unlimitedVehicles = vehiclesDonate.filter((v) => v.stock === "");

  return (
    <div
      className="relative min-h-screen text-white bg-cover bg-center"
      style={{ backgroundImage: 'url("/bg-polos.png")' }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Navbar */}
      <Navbar />

      {/* Isi Donation */}
      <div className="relative z-10 pt-24 pb-16 backdrop-blur-sm">
        <div className="container mx-auto px-6 space-y-20">
          {/* === Packet Donate === */}
          <section>
            <h2 className="text-3xl font-bold text-[var(--keppel)] mb-6">Packet Donate</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packetDonate.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-black/40 border border-[var(--keppel)] p-6 rounded-xl shadow-lg
                 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,255,255,0.7)]
                 transition-all duration-300 ease-in-out flex flex-col items-center text-center"
                >
                  <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                  <p className="text-gray-400 mb-3">{p.bonus}</p>
                  <p className="text-green-400 font-bold">Rp. {p.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </section>

          {/* === House Donate === */}
          <section>
            <div className="bg-black/30 rounded-2xl border border-[var(--keppel)] p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-[var(--keppel)] mb-4">House Donate</h2>
              <p className="text-gray-300 mb-6">Donasi rumah untuk properti & tempat tinggal dalam game.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {houseDonate.map((h, idx) => (
                  <div
                    key={idx}
                    className="bg-black/40 border border-[var(--keppel)] p-6 rounded-xl shadow-lg
                 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,255,255,0.7)]
                 transition-all duration-300 ease-in-out flex flex-col items-center text-center"
                  >
                    <img
                      src={h.image}
                      alt={h.name}
                      draggable="false"
                      className="w-full h-36 object-cover rounded-md mb-3"
                    />
                    <h3 className="text-xl font-semibold">{h.name}</h3>
                    <p className="text-gray-400 text-sm">Stock: {h.stock}</p>
                    <p className="mt-2">
                      <s className="text-red-400">Rp. {h.oldPrice.toLocaleString()}</s>{" "}
                      <span className="text-green-400 font-bold">Rp. {h.newPrice.toLocaleString()}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* === Vehicle Donate === */}
          <section>
            <div className="bg-black/30 rounded-2xl border border-[var(--keppel)] p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-[var(--keppel)] mb-6">🚘 Vehicle Donate</h2>

              {/* Limited */}
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Limited Edition</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                {limitedVehicles.map((v) => {
                  const vehicleImageUrl = `https://assets.open.mp/assets/images/vehiclePictures/Vehicle_${v.id}.jpg`;
                  return (
                    <div
                      key={v.id}
                      className="bg-black/40 p-4 rounded-xl border border-yellow-400 
                                shadow-lg hover:scale-105 transition-all duration-300 ease-in-out
                                hover:shadow-[0_10px_25px_rgba(255,255,0,0.7)]"
                    >
                      <img
                        src={vehicleImageUrl}
                        alt={v.name}
                        draggable="false"
                        className="w-full h-32 object-cover rounded-md mb-3"
                        onError={(e) =>
                          ((e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/200x120?text=No+Image")
                        }
                      />
                      <h3 className="font-semibold">{v.name}</h3>
                      <p className="text-gray-400 text-sm">{v.stock}</p>
                      <p className="mt-1">
                        <s className="text-red-400">Rp. {v.oldPrice.toLocaleString()}</s>{" "}
                        <span className="text-green-400 font-bold">Rp. {v.newPrice.toLocaleString()}</span>
                      </p>
                    </div>
                  );
                })}
              </div>


              {/* Unlimited */}
              <h3 className="text-2xl font-semibold text-green-400 mb-4">Unlimited</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {unlimitedVehicles.map((v) => {
                  const vehicleImageUrl = `https://assets.open.mp/assets/images/vehiclePictures/Vehicle_${v.id}.jpg`;
                  return (
                    <div
                      key={v.id}
                      className="bg-black/40 p-4 rounded-xl border border-green-400 shadow-lg
                   hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,255,0,0.7)]
                   transition-all duration-300 ease-in-out"
                    >
                      <img
                        src={vehicleImageUrl}
                        alt={v.name}
                        draggable="false"
                        className="w-full h-32 object-cover rounded-md mb-3"
                        onError={(e) =>
                          ((e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/200x120?text=No+Image")
                        }
                      />
                      <h3 className="font-semibold">{v.name}</h3>
                      <p className="text-gray-400 text-sm">Unlimited</p>
                      <p className="mt-1">
                        <s className="text-red-400">Rp. {v.oldPrice.toLocaleString()}</s>{" "}
                        <span className="text-green-400 font-bold">Rp. {v.newPrice.toLocaleString()}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* === Other Donate === */}
          <section>
            <div className="bg-black/30 rounded-2xl border border-[var(--keppel)] p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-[var(--keppel)] mb-4">Other Donate</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherDonate.map((o, idx) => (
                  <div
                    key={idx}
                    className="bg-black/40 p-5 rounded-xl border border-[var(--keppel)] shadow-lg
                 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,255,255,0.7)]
                 transition-all duration-300 ease-in-out flex items-center gap-4"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--keppel)]/20 border border-[var(--keppel)] text-[var(--keppel)] text-2xl font-bold">
                      {o.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{o.name}</h3>
                      <p className="text-gray-400 text-sm">{o.desc}</p>

                      {o.kind === "discount" ? (
                        <p className="mt-1">
                          <s className="text-red-400">Rp. {o.oldPrice.toLocaleString()}</s>{" "}
                          <span className="text-green-400 font-bold">Rp. {o.newPrice.toLocaleString()}</span>
                        </p>
                      ) : (
                        <p className="mt-1 text-green-400 font-bold">
                          Rp. {o.price.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
