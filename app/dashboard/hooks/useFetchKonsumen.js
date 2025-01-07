import { useState, useEffect } from "react";

export default function useFetchKonsumen() {
  const [konsumen, setKonsumen] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/konsumen");
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        setKonsumen(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { konsumen, isLoading, error, setKonsumen };
}
