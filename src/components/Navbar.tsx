// components/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [ucp, setUcp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    if (token && name) setUserName(name);

    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        ucp,
        password,
      });
      const data = response.data;
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.data.username);
        setUserName(data.data.username);
        alert("✅ Login sukses");
        setIsOpen(false);
        router.push("/characters");
      } else {
        alert("❌ Login gagal");
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || "Login gagal ❌";
      setMessage(errMsg);
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUserName(null);
    router.push("/");
  };

  // Smooth scroll + redirect kalau bukan home
  const scrollToSection = (id: string) => {
    const sectionId = id.replace("#", "");
    if (window.location.pathname !== "/") {
      router.push(`/#${sectionId}`);
    } else {
      const section = document.querySelector(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenu(false);
  };

  return (
    <div>
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-bunker/95 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <a href="/" className="flex items-center">
            <img
              src="/icon-nav.png" // pastikan file ada di folder /public
              alt="Noverra Roleplay"
              width={40} // bisa kamu sesuaikan
              height={40}
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop menu */}
          <nav className="hidden md:flex gap-6 text-sm">
            <button onClick={() => scrollToSection("#beranda")} className="hover:text-keppel">
              Beranda
            </button>
            <button onClick={() => scrollToSection("#fitur")} className="hover:text-keppel">
              Fitur
            </button>
            <button onClick={() => scrollToSection("#bergabung")} className="hover:text-keppel">
              Bergabung
            </button>
            <button onClick={() => scrollToSection("#topup")} className="hover:text-keppel">
              Topup
            </button>
            <button onClick={() => router.push("/music")} className="hover:text-keppel">
              Music List
            </button>
          </nav>

          {/* Desktop login/logout */}
          {userName ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="font-semibold">👋 {userName}</span>
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-500"
                title="Logout"
              >
                <FiLogOut size={22} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="hidden md:block text-white hover:text-keppel"
            >
              Login Account
            </button>
          )}

          {/* Hamburger menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="p-2 rounded-md hover:bg-gray-700 transition"
            >
              {mobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenu && (
        <div className="md:hidden fixed inset-0 bg-bunker text-white z-50 flex flex-col">
          {/* Header: logo + close */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
            <span className="font-bold text-lg">Noverra Roleplay</span>
            <button onClick={() => setMobileMenu(false)}>
              <FaTimes size={24} />
            </button>
          </div>

          {/* User info */}
          <div className="px-6 py-4 border-b border-gray-700">
            {userName ? (
              <div className="flex justify-between items-center">
                <span className="font-semibold">👋 {userName}</span>
                <button onClick={() => { handleLogout(); setMobileMenu(false); }} className="text-red-500 hover:text-red-600">
                  <FiLogOut size={22} />
                </button>
              </div>
            ) : (
              <button onClick={() => { setIsOpen(true); setMobileMenu(false); }} className="w-full text-left font-semibold py-2 hover:text-keppel">
                Sign In
              </button>
            )}
          </div>

          {/* Menu navigasi */}
          <nav className="flex flex-col gap-4 px-6 py-6">
            <button onClick={() => scrollToSection("#beranda")} className="text-lg w-full text-left py-2 hover:text-keppel">
              Beranda
            </button>
            <button onClick={() => scrollToSection("#fitur")} className="text-lg w-full text-left py-2 hover:text-keppel">
              Fitur
            </button>
            <button onClick={() => scrollToSection("#bergabung")} className="text-lg w-full text-left py-2 hover:text-keppel">
              Bergabung
            </button>
            <button onClick={() => scrollToSection("#topup")} className="text-lg w-full text-left py-2 hover:text-keppel">
              Topup
            </button>
            <button onClick={() => router.push("/music")} className="text-lg w-full text-left py-2 hover:text-keppel">
              Music List
            </button>
          </nav>
        </div>
      )}
      </header>

      {/* Modal Login */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-timber-green p-8 rounded-2xl shadow-lg w-[380px] relative">
          <h1 className="text-center text-2xl font-bold text-[var(--keppel)] mb-2">Welcome Back</h1>
          <p className="text-center text-gray-400 text-sm mb-6">Sign in to your UCP</p>
          <label className="text-gray-300 text-sm">UCP</label>
          <input
            type="text"
            placeholder="Enter your UCP username"
            onChange={(e) => setUcp(e.target.value)}
            className="w-full bg-[var(--spectra)] text-white p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--keppel)]"
          />
          <label className="text-gray-300 text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[var(--spectra)] text-white p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-[var(--keppel)]"
          />
          {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
          <button
            onClick={handleLogin}
            className="w-full text-[var(--keppel)] hover:bg-[var(--paradiso)] text-white font-semibold py-3 rounded-lg"
          >
            Sign In
          </button>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="px-2 text-gray-400 text-sm">or</span>
            <hr className="flex-grow border-gray-600" />
          </div>
          <a
            href="https://discord.com/channels/824365726419779655/1396418591686918264/1397104516670816287"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-[var(--blue-dianne)] hover:bg-[var(--lochinvar)] text-white font-semibold py-3 rounded-lg transition"
          >
            Sign Up via Discord
          </a>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
