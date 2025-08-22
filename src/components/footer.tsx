// components/Footer.tsx
import Image from "next/image";
import { FaDiscord, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import logo from "../../public/logo.png"; // ambil logo sama seperti di Home

export default function Footer() {
  return (
    <footer
      className="relative text-gray-300 pt-12 pb-6 px-6 overflow-hidden"
      style={{ backgroundImage: 'url("/bg-polos.png")', backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8 relative z-10">
        
        {/* Kiri */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image 
              src={logo} 
              alt="Logo" 
              width={50} 
              height={50} 
              className="drop-shadow-lg"
            />
            <h2 className="text-xl font-bold text-[var(--keppel)]">
              Noverra Roleplay
            </h2>
          </div>
          <p className="max-w-sm mb-4">
            Server SAMP roleplay Indonesia dengan komunitas solid dan fitur lengkap.
          </p>
          <div className="flex gap-4 text-[var(--keppel)] text-2xl">
            <a href="https://discord.gg/4chTxfXTYs" target="_blank" rel="noopener noreferrer">
              <FaDiscord />
            </a>
            <a href="#" className="hover:text-teal-400"><FaInstagram /></a>
            <a href="#" className="hover:text-teal-400"><FaYoutube /></a>
            <a href="https://www.tiktok.com/@noverracommunity" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* Kanan */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Server Info</h3>
          <ul className="space-y-1 text-gray-300">
            <li>Main IP: <span className="text-white">104.234.180.114:7005</span></li>
            <li>Slots: <span className="text-white">100</span></li>
            <li>Version: <span className="text-white">Latest</span></li>
            <li>Location: <span className="text-white">Singapore</span></li>
          </ul>
        </div>
      </div>

      {/* Garis */}
      <div className="relative z-10 border-t border-[var(--keppel)] mt-8 pt-4 text-center text-sm text-gray-400">
        © 2025 Noverra Roleplay. All rights reserved. Made with <span className="text-red-500">❤</span> for the community.
      </div>
    </footer>
  );
}
