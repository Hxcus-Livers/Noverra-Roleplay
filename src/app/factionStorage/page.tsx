"use client";

import React, { useEffect, useState } from "react";

// tipe faction sesuai JSON API
interface Faction {
  factionID: number;
  factionName: string;
}

// tipe item sesuai JSON API
interface StorageItem {
  ID: number;
  itemID: number;
  itemName: string;
  itemModel: number;
  itemQuantity: number;
  itemSlot: number;
}

export default function FactionStoragePage() {
  const [factions, setFactions] = useState<Faction[]>([]);
  const [selectedFaction, setSelectedFaction] = useState<number | null>(null);
  const [items, setItems] = useState<StorageItem[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:8000/api/factions")
      .then((res) => res.json())
      .then((data) => {
        setFactions(data.data);
        if (data.data.length > 0) {
          setSelectedFaction(data.data[0].factionID);
        }
      });
  }, []);

  useEffect(() => {
    if (selectedFaction !== null) {
      fetch(`http://localhost:8000/api/factions/${selectedFaction}/items`)
        .then((res) => res.json())
        .then((data) => setItems(data.data));
    }
  }, [selectedFaction]);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(items.length / itemsPerPage) || 1;

  // bikin array full 20 slot (isi dengan item atau null)
  const startIndex = (page - 1) * itemsPerPage;
  const pageItems: (StorageItem | null)[] = Array.from({ length: itemsPerPage }, (_, i) => {
    return items[startIndex + i] || null;
  });

  return (
    <div className="p-6 bg-[color:var(--background)] min-h-screen text-[color:var(--foreground)]">
      <h1 className="text-xl font-bold mb-4">Faction Storage</h1>

    {/* Dropdown pilih faction */}
    <div className="mb-4">
        <select
            className="px-3 py-2 rounded bg-[color:var(--paradiso)] text-white/90 hover:bg-[color:var(--lochinvar)] transition w-full md:w-auto"
            value={selectedFaction ?? ""}
            onChange={(e) => {
            setSelectedFaction(Number(e.target.value));
            setPage(1);
            }}
        >
            <option value="" disabled>
            Pilih Faction
            </option>
            {factions.map((faction) => (
            <option
                key={faction.factionID}
                value={faction.factionID}
            >
                {faction.factionName}
            </option>
            ))}
        </select>
    </div>


      {/* Storage grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        {pageItems.map((item, index) => (
          <div
            key={index}
            className="relative border border-[color:var(--blue-dianne)] rounded-xl 
                        bg-[color:var(--timber-green)] text-white shadow 
                        flex flex-col items-center justify-center w-28 h-28 aspect-square"
            >
            {item ? (
                <>
                {/* Item Name di atas */}
                <div className="absolute top-1 left-0 right-0 text-center text-xs font-bold">
                    {item.itemName}
                </div>
            
                {/* Gambar besar di tengah */}
                <img
                    src={`/item/${item.itemName}.png`}
                    alt={item.itemName}
                    className="w-18 h-18 object-contain"
                    onError={(e) => {
                    (e.target as HTMLImageElement).src = "/item/default.png";
                    }}
                />
            
                {/* Qty di kiri bawah */}
                <div className="absolute bottom-1 left-1 text-xs font-semibold bg-[color:var(--gable-green)] px-1 rounded">
                    x{item.itemQuantity}
                </div>
                </>
            ) : (
                <div className="text-xs text-gray-500">Empty Slot</div>
            )}
            </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-4 items-center">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 rounded bg-[color:var(--spectra)] text-white disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2">
            Page {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 rounded bg-[color:var(--spectra)] text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
