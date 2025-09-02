import { useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
export const useFetch = <T,>() => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = async (url: string) => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data: T = await response.json();
      setState({ data: data, loading: false, error: null });
    } catch (err) {
      if (err instanceof Error) {
        setState({ data: null, loading: false, error: err.message });
      } else {
        setState({
          data: null,
          loading: false,
          error: "An unknown error occurred",
        });
      }
    }

  };
    return { ...state, fetchData };

};
