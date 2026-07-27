import { useState, useEffect, useMemo, useCallback } from 'react';
import { metadataService } from '../services/metadataService';

export const useNFTs = (initialLimit = 12) => {
  const [allNFTs, setAllNFTs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCiv, setFilterCiv] = useState('All');
  const [page, setPage] = useState(1);
  const [limit] = useState(initialLimit);

  const loadNFTs = useCallback(async (pageNum, isAppend = false) => {
    if (isAppend) setIsFetchingMore(true);
    else setIsLoading(true);
    setError(null);
    
    try {
      const { data, totalCount: supply } = await metadataService.fetchMetadataPage(pageNum, limit);
      setTotalCount(supply);
      setAllNFTs(prev => isAppend ? [...prev, ...data] : data);
    } catch (err) {
      console.error("Failed to load NFTs", err);
      setError("Failed to fetch collection data. Please try again.");
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  }, [limit]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAllNFTs([]);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
    loadNFTs(1, false);
  }, [loadNFTs]);

  const filteredNFTs = useMemo(() => {
    return allNFTs.filter(nft => {
      const matchesSearch = 
        nft.tokenId.toString().includes(searchQuery) || 
        nft.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (filterCiv === 'All') return matchesSearch;
      
      const civTrait = nft.attributes.find(a => a.trait_type === 'Civilization');
      const matchesCiv = filterCiv === 'Unrevealed' 
        ? !civTrait 
        : (civTrait && civTrait.value === filterCiv);

      return matchesSearch && matchesCiv;
    });
  }, [allNFTs, searchQuery, filterCiv]);

  const hasMore = allNFTs.length < totalCount;

  const loadMore = useCallback(() => {
    if (hasMore && !isFetchingMore && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadNFTs(nextPage, true);
    }
  }, [hasMore, isFetchingMore, isLoading, page, loadNFTs]);

  const retry = useCallback(() => {
    loadNFTs(page, page > 1);
  }, [loadNFTs, page]);

  return {
    nfts: filteredNFTs,
    totalCount,
    isLoading,
    isFetchingMore,
    error,
    searchQuery,
    setSearchQuery,
    filterCiv,
    setFilterCiv,
    hasMore,
    loadMore,
    retry
  };
};
