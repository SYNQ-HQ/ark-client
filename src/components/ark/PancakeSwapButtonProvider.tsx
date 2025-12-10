export default function PancakeSwapButtonProvider({ children }) {
  const PANCAKESWAP_URL = import.meta.env.VITE_PANCAKESWAP_URL;

  return (
    <a href={PANCAKESWAP_URL} target="_blank" referrerPolicy="no-referrer">
      {children}
    </a>
  );
}
