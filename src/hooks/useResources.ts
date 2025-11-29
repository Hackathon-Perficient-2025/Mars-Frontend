import { useState, useEffect, useCallback } from 'react';
import type { Resource } from '@/types';
import { MOCK_RESOURCES } from '@/mocks';
import { REFRESH_INTERVAL } from '@/utils';

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const updatedResources = resources.map(resource => ({
        ...resource,
        currentLevel: Math.max(
          0,
          resource.currentLevel - (Math.random() * 10)
        ),
        lastUpdated: new Date(),
      }));

      setResources(updatedResources);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resources');
    } finally {
      setIsLoading(false);
    }
  }, [resources]);

  const refreshResources = useCallback(() => {
    fetchResources();
  }, [fetchResources]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchResources();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchResources]);

  return {
    resources,
    isLoading,
    error,
    refreshResources,
  };
};
