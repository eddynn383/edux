import { useState, useEffect } from 'react';

export function useApi(endpoint: string) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(endpoint);
                const json = await response.json();
                setData(json);
                setLoading(false);
            } catch (error) {
                // setError(error);
                setLoading(false);
            }
        }

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
}


// Not needed