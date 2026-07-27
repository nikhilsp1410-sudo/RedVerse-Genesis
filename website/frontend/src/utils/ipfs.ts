/**
 * Resolves an IPFS URI (ipfs://...) to an HTTP gateway URL.
 * Falls back to returning the original string if it's not an IPFS URI.
 */
export const resolveIPFS = (uri: string | null | undefined): string => {
  if (!uri) return '';
  
  if (uri.startsWith('ipfs://')) {
    const cidAndPath = uri.replace('ipfs://', '');
    // Using ipfs.io as the default gateway. Can be configured via env var if needed.
    const gateway = import.meta.env.VITE_IPFS_GATEWAY || 'https://ipfs.io/ipfs/';
    return `${gateway}${cidAndPath}`;
  }
  
  return uri;
};
