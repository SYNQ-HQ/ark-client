import { useState, useEffect, useCallback } from "react";

const CACHE_KEY = "moralis_holder_count";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export default function useHolderCount(contractAddress: string) {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // extract the actual fetch logic so it can be re-used
  const fetchHolderCount = useCallback(async () => {
    const controller = new AbortController();

    // 1. Check cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { value, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          setCount(value);
          setLoading(false);
          return value;
        }
      } catch {
        /* ignore corrupt cache */
      }
    }

    // 2. Fetch
    try {
      setLoading(true);
      setError(null);

      const url = `https://deep-index.moralis.io/api/v2.2/erc20/${contractAddress}/owners?chain=bsc&order=DESC`;
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          "X-API-Key":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjU2YWI3MTQ3LWM3NTItNDRlNi1hYzExLWUyMDc5YWZkNzhkNSIsIm9yZ0lkIjoiNDg0NDY2IiwidXNlcklkIjoiNDk4NDI4IiwidHlwZUlkIjoiZjMxMDRjNTUtODQwMS00ZTNhLThmMGQtYTE4YTZkZGNhMmM5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NjQ4MDAzOTIsImV4cCI6NDkyMDU2MDM5Mn0.6MIKgb_yigB4ljlVSBS3CWe-b58Tuy-1gM6rsqmBglM",
          accept: "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch holder count");

      const data = await res.json();
      const value = data.result ? data.result.length : 0;

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ value, timestamp: Date.now() }),
      );

      setCount(value);
      return value;
    } catch (e: any) {
      if (!controller.signal.aborted) {
        setError(e.message || "Unknown error");
      }
      throw e;
    } finally {
      setLoading(false);
    }
  }, [contractAddress]);

  // initial fetch
  useEffect(() => {
    fetchHolderCount();
  }, [fetchHolderCount]);

  // expose the fetcher as "refetch"
  return { count, loading, error, refetch: fetchHolderCount };
}
