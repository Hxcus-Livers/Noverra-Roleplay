// app/music/page.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";

export default function MusicPage() {
  const [musicList, setMusicList] = useState<
    { id: number; name: string; url: string }[]
  >([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [durations, setDurations] = useState<{ [key: number]: number }>({});
  const [currentTimes, setCurrentTimes] = useState<{ [key: number]: number }>({});
  const itemsPerPage = 10;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/saved-music");
        const data = await res.json();
        setMusicList(data.data);

        // preload durasi
        data.data.forEach((music: { id: number; url: string }) => {
          const audioEl = new Audio(music.url);
          audioEl.addEventListener("loadedmetadata", () => {
            setDurations((prev) => ({
              ...prev,
              [music.id]: audioEl.duration,
            }));
          });
        });
      } catch (error) {
        console.error("Error fetching music:", error);
      }
    };
    fetchMusic();
  }, []);

  const handlePlay = (music: { id: number; url: string }) => {
    if (currentPlayingId === music.id) {
      audio?.pause();
      setCurrentPlayingId(null);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(music.url);
    newAudio.play();
    setAudio(newAudio);
    setCurrentPlayingId(music.id);

    // track waktu berjalan
    intervalRef.current = setInterval(() => {
      setCurrentTimes((prev) => ({
        ...prev,
        [music.id]: newAudio.currentTime,
      }));
    }, 500);

    newAudio.addEventListener("ended", () => {
      setCurrentPlayingId(null);
      if (intervalRef.current) clearInterval(intervalRef.current);
    });
  };

  const handleSeek = (musicId: number, value: number) => {
    if (audio && currentPlayingId === musicId) {
      audio.currentTime = value;
      setCurrentTimes((prev) => ({ ...prev, [musicId]: value }));
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("✅ Link copied to clipboard!");
  };

  const formatDuration = (seconds: number | undefined) => {
    if (!seconds) return "--:--";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min} min, ${sec} sec`;
  };

  const filteredMusic = musicList.filter((music) =>
    music.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMusic.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMusic = filteredMusic.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/bg-polos.png")' }}
    >
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-6 pt-28 mb-20 text-white">
          <h1 className="text-3xl font-bold mb-6 text-center text-[var(--keppel)]">
            🎵 Music List
          </h1>

          {/* Search */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search music title..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full max-w-md px-4 py-2 rounded-lg bg-[var(--bunker)] border border-[var(--gable-green)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--keppel)]"
            />
          </div>

          {/* Music Cards */}
          <div className="flex flex-col gap-4">
            {paginatedMusic.map((music) => (
              <div
                key={music.id}
                className="flex items-center justify-between bg-[var(--spectra)]/60 backdrop-blur-md p-4 rounded-2xl shadow-lg"
              >
                {/* Left: Title + duration */}
                <div>
                  <h2 className="font-semibold text-lg">{music.name}</h2>
                  <p className="text-sm text-gray-300">
                    {formatDuration(durations[music.id])}
                  </p>
                </div>

                {/* Middle: Controls */}
                <div className="flex items-center gap-3 flex-1 px-6">
                  <button
                    onClick={() => handlePlay(music)}
                    className="text-xl bg-[var(--bunker)] px-3 py-2 rounded-full hover:scale-110 transition"
                  >
                    {currentPlayingId === music.id ? "⏸" : "▶️"}
                  </button>

                  {currentPlayingId === music.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-sm">
                        {formatDuration(currentTimes[music.id])}
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={durations[music.id] || 0}
                        value={currentTimes[music.id] || 0}
                        onChange={(e) =>
                          handleSeek(music.id, Number(e.target.value))
                        }
                        className="flex-1"
                      />
                      <span className="text-sm">
                        {formatDuration(durations[music.id])}
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Right: Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(music.url)}
                    className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            ))}

            {paginatedMusic.length === 0 && (
              <p className="text-center text-gray-400">❌ No music found.</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6 text-white">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-[var(--spectra)] disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-[var(--spectra)] disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
