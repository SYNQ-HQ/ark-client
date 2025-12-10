export default function DexScreenerUrlProvider({ children }) {
  const DEXSCREENER_URL = import.meta.env.VITE_DEXSCREENER_URL;

  return (
    <a href={DEXSCREENER_URL} target="_blank" referrerPolicy="no-referrer">
      {children}
    </a>
  );
}
