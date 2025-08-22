"use client";

import { FaDiscord, FaTiktok } from "react-icons/fa";
import { FaCar, FaBriefcase, FaHome, FaCoins, FaUsers, FaHeadset, FaArrowUp, FaArrowDown } from "react-icons/fa";
import Navbar from "../components/Navbar";
import logo from "../../public/logo.png";
import Image from "next/image";
import { useState, useEffect } from "react";


export default function Home() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToFeatures = () => {
    const section = document.getElementById("features");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen text-white bg-cover bg-center relative"
      style={{ backgroundImage: 'url("/bg-polos.png")' }}
    >
      {/* Overlay gelap */}
      <div className="absolute min-h-screen bg-black/50 z-0 w-full h-full" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="beranda" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 backdrop-sm">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto px-4 md:px-8 gap-8">
          {/* Kiri - Logo */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Image
              src={logo}
              alt="Logo"
              draggable="false"
              width={400}
              height={400}
              className="w-[300px] md:w-[400px] h-auto drop-shadow-2xl"
              priority
            />
          </div>

          {/* Kanan - Teks */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="lubrifont text-[var(--keppel)] text-4xl md:text-6xl drop-shadow-lg">
              Noverra Roleplay
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              Noverra Roleplay adalah komunitas Discord untuk pemain SAMP
              Roleplay dan gamer lainnya. Di sini, kami bermain bareng, ngobrol
              seru, dan bangun suasana yang solid, santai, dan ramah buat semua.
            </p>

            {/* Icons */}
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <a
                href="https://discord.gg/4chTxfXTYs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDiscord className="w-8 h-8 hover:text-[var(--keppel)]" />
              </a>
              <a
                href="https://www.tiktok.com/@noverracommunity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok className="w-7 h-7 hover:text-[var(--keppel)]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Unggulan */}
      <section id="fitur" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 backdrop-sm">
        <div className="w-full max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--keppel)] mb-3">
            Fitur Unggulan
          </h2>
          <p className="text-gray-300 mb-10">
            Nikmati berbagai fitur menarik yang membuat pengalaman roleplay kamu semakin seru
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/40 border border-[var(--keppel)] p-6 rounded-xl shadow-lg 
                 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,255,255,0.7)]
                 transition-all duration-300 ease-in-out text-left ">
              <FaCar className="text-[var(--keppel)] w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-2">Custom Vehicles</h3>
              <p className="text-gray-400">
                Ratusan kendaraan lore friendly dengan handling realistis dan sistem modifikasi lengkap
              </p>
            </div>
            <div className="bg-black/40 border border-[var(--keppel)] p-6 rounded-xl shadow-lg 
                 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,255,255,0.7)]
                 transition-all duration-300 ease-in-out text-left">
              <FaBriefcase className="text-[var(--keppel)] w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-2">Job System</h3>
              <p className="text-gray-400">
                Berbagai pekerjaan legal dan ilegal dengan sistem penghasilan yang balance
              </p>
            </div>
            <div className="bg-black/40 border border-[var(--keppel)] p-6 rounded-xl shadow-lg 
                 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,255,255,0.7)]
                 transition-all duration-300 ease-in-out text-left">
              <FaHome className="text-[var(--keppel)] w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-2">Housing System</h3>
              <p className="text-gray-400">Sistem properti lengkap dengan furniture</p>
            </div>
            <div className="bg-black/40 border border-[var(--keppel)] p-6 rounded-xl shadow-lg 
                 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,255,255,0.7)]
                 transition-all duration-300 ease-in-out text-left">
              <FaCoins className="text-[var(--keppel)] w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-2">Ekonomi Stabil</h3>
              <p className="text-gray-400">
                Sistem ekonomi seimbang dan stabil untuk pengalaman roleplay yang realistis
              </p>
            </div>
            <div className="bg-black/40 border border-[var(--keppel)] p-6 rounded-xl shadow-lg 
                 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,255,255,0.7)]
                 transition-all duration-300 ease-in-out text-left">
              <FaUsers className="text-[var(--keppel)] w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-2">Gang System</h3>
              <p className="text-gray-400">
                Sistem gang dengan warehouse dan war system yang seru
              </p>
            </div>
            <div className="bg-black/40 border border-[var(--keppel)] p-6 rounded-xl shadow-lg 
                 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,255,255,0.7)]
                 transition-all duration-300 ease-in-out text-left">
              <FaHeadset className="text-[var(--keppel)] w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-400">
                Tim admin aktif 24/7 siap membantu dan menjaga kualitas roleplay
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cara Bergabung Section */}
      <section id="bergabung" className="relative z-10 min-h-screen flex items-center justify-center px-4 backdrop-sm">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Siap untuk <span className="text-[var(--keppel)]">Berpetualang?</span>
          </h2>
          <p className="text-gray-300 mb-10">
            Gabung sekarang dan mulai cerita roleplay kamu di Noverra Roleplay
          </p>

          {/* Card Cara Bergabung */}
          <div className="bg-black/40 border border-[var(--keppel)] rounded-xl p-8 text-left shadow-lg
            hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,255,255,0.7)]
            transition-all duration-300 ease-in-out mb-10">
            <h3 className="text-xl font-bold text-[var(--keppel)] mb-6">Cara Bergabung</h3>
            <ol className="space-y-4 text-gray-300 list-decimal list-inside">
              <li>Download dan install SAMP dari gta-mp.net</li>
              <li>Join Discord server untuk whitelist</li>
              <li>
                Connect ke server:{" "}
                <span className="bg-[var(--keppel)]/20 px-2 py-1 rounded text-[var(--keppel)]">
                  samp.noverra-rp.my.id
                </span>
              </li>
              <li>Buat karakter dan mulai roleplay!</li>
            </ol>
          </div>

          {/* Tombol Join Discord */}
          <div className="flex justify-center">
            <a
              href="https://discord.gg/4chTxfXTYs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[var(--keppel)] text-black font-semibold rounded-xl shadow-lg hover:bg-teal-500 transition"
            >
              JOIN DISCORD
            </a>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="topup" className="relative z-10 min-h-screen flex items-center justify-center px-4 backdrop-sm">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-[var(--keppel)] text-center mb-8">
            Daftar Paket Topup
          </h2>

          {/* 3 paket preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/40 border border-[var(--keppel)] p-6 rounded-xl shadow-lg text-center
                 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,255,255,0.7)]
                 transition-all duration-300 ease-in-out">
              <h3 className="text-xl font-semibold mb-2">Bronze Packet</h3>
              <p className="text-gray-400 mb-3">VIP 3 Hari</p>
              <p className="text-green-400 font-bold">Rp. 50.000</p>
            </div>

            <div className="bg-black/40 border border-[var(--keppel)] p-6 rounded-xl shadow-lg text-center
                 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,255,255,0.7)]
                 transition-all duration-300 ease-in-out">
              <h3 className="text-xl font-semibold mb-2">Silver Packet</h3>
              <p className="text-gray-400 mb-3">VIP 7 Hari + 50.000$</p>
              <p className="text-green-400 font-bold">Rp. 100.000</p>
            </div>

            <div className="bg-black/40 border border-[var(--keppel)] p-6 rounded-xl shadow-lg text-center
                 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,255,255,0.7)]
                 transition-all duration-300 ease-in-out">
              <h3 className="text-xl font-semibold mb-2">Gold Packet</h3>
              <p className="text-gray-400 mb-3">VIP 15 Hari + 150.000$ + 1 Mobil</p>
              <p className="text-green-400 font-bold">Rp. 250.000</p>
            </div>
          </div>

          {/* Tombol */}
          <div className="text-center mt-10">
            <a
              href="/donation"
              className="inline-block px-6 py-3 bg-[var(--keppel)] text-black font-semibold rounded-xl shadow-lg hover:bg-teal-500 transition mb-24"
            >
              Lihat Semua Daftar →
            </a>
          </div>
        </div>
      </section>

      {/* Tombol Scroll To Top */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[var(--keppel)] text-black p-3 rounded-full shadow-lg hover:bg-teal-500 transition"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
