import { useEffect, useState } from "react";
import axios from "axios";

export function useGet<T>(url: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!url) return;
        setIsLoading(true);
        setError(null);

        const response = await axios.get(`${url}`);
        if (!response.data) throw new Error("Data not found");
        setData(response.data?.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || error.message);
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An error occurred");
        }
        return;
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url]);
  return { data, isLoading, error };
}

export function usePost<P, T>(url: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function postData(payload?: P): Promise<T | undefined> {
    try {
      if (!url) return;
      setIsLoading(true);
      setError(null);

      const response = await axios.post(`${url}`, payload);
      return response.data.body;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred");
      }
      return;
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, error, postData };
}

export function usePut<P, T>(url: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function putData(payload: P): Promise<T | undefined> {
    try {
      if (!url || !payload) return;
      setIsLoading(true);
      setError(null);

      const response = await axios.put(`${url}`, payload);
      return response.data.body;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred");
      }
      return;
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, error, putData };
}
