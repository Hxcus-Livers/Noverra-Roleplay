import Image from "next/image";
import LogoIndopride from "../../../public/bg-alaska.png";
import Navbar from "@/components/Navbar";

export default function InformationPage() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "var(--timber-green)" }}>
      <Navbar />

      <div className="flex items-center justify-center px-6 pt-62 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full items-center gap-10">
          {/* Kiri - Teks */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight">
              <span style={{ color: "var(--keppel)" }}>ALASKA</span> <br />
              COMMUNITY
            </h1>
            <p className="text-gray-300 text-sm">
              Merupakan Komunitas Game Online dari GTA 5 Modifikasi untuk bermain roleplay.
            </p>
            <p className="text-gray-300 text-sm">
              ROLEPLAY adalah permainan memerankan sebuah karakter seperti layaknya di dunia nyata dan bertemu dengan player lain dengan cerita kehidupan yang kita tentukan sendiri. Seperti di dunia nyata, kadang hidup kita membosankan, terkadang juga hidup kita penuh drama.
            </p>
            <p className="text-gray-300 text-sm">
              ROLEPLAY merupakan permainan fiktif dan tidak ada hubungannya antara cerita karakter didalam game dengan apa yang ada kehidupan nyata saat ini. Permainan ini adalah seni kreatifitas merangkai cerita.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://discord.gg/indopride"
                className="px-6 py-2 bg-white text-black font-semibold rounded shadow hover:bg-gray-200 transition"
              >
                DISCORD
              </a>
              <a
                href="#"
                className="px-6 py-2 font-semibold rounded shadow transition"
                style={{ backgroundColor: "var(--keppel)", color: "white" }}
              >
                Connect
              </a>
            </div>
          </div>

          {/* Kanan - Logo */}
          <div className="flex justify-center md:justify-end">
            <Image
              src={LogoIndopride}
              alt="Logo INDOPRIDE"
              width={400}
              height={400}
              className="w-[320px] md:w-[400px] h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
