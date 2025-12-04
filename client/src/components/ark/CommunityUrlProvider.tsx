export default function CommunityUrlProvider({ children }) {
  const COMMUNITY_URL = import.meta.env.VITE_COMMUNITY_URL;

  return (
    <a href={COMMUNITY_URL} target="_blank" referrerPolicy="no-referrer">
      {children}
    </a>
  );
}
