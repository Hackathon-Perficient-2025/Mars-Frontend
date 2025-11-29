import { useState, useCallback } from 'react';
import type { ResupplyRequest, CreateResupplyRequest } from '@/types';
import { MOCK_RESUPPLY_REQUESTS, createResupplyRequest } from '@/mocks';

export const useResupply = () => {
  const [requests, setRequests] = useState<ResupplyRequest[]>(MOCK_RESUPPLY_REQUESTS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRequest = useCallback(async (data: CreateResupplyRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newRequest = createResupplyRequest(
        data.resourceType,
        data.quantity,
        data.priority,
        data.requestedBy,
        data.notes
      );

      setRequests(prevRequests => [newRequest, ...prevRequests]);
      return newRequest;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create request');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateRequestStatus = useCallback((requestId: string, status: ResupplyRequest['status']) => {
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId
          ? { ...request, status }
          : request
      )
    );
  }, []);

  return {
    requests,
    isLoading,
    error,
    createRequest,
    updateRequestStatus,
  };
};
