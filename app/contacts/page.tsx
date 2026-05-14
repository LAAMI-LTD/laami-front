"use client";

import Footer from "../components/footer";
import Map from "./Map";
import Contact from "./form";
import CCTA from "./contactheader";

export default function Contacts() {
  return (
    <main className="min-h-screen pt-20 bg-white dark:bg-[#000213] transition-colors duration-300">
      <CCTA />
      <Contact
        facebookUrl="https://www.facebook.com/share/1Zv7PtL4T3/"
        instagramUrl="https://www.instagram.com/laamilabs?igsh=ZndvbzF2bzc5NWtr"
      />
      <Map />
      <Footer />
    </main>
  );
}

