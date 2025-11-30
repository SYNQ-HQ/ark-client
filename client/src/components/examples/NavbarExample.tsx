import { useState } from "react";
import Navbar from "../ark/Navbar";

export default function NavbarExample() {
  const [language, setLanguage] = useState("EN");
  return <Navbar language={language} onLanguageChange={setLanguage} />;
}
