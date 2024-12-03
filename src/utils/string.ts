export function truncateAddress(address: string, length: number = 4): string {
  if (!address) return "";
  if (address.length <= length * 2) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}

export function formatUrl(url: string): string {
  // Remove any existing protocol
  let cleanUrl = url.trim().toLowerCase();
  cleanUrl = cleanUrl.replace(/^(https?:\/\/)?(www\.)?/, "");

  // Remove any trailing slashes
  cleanUrl = cleanUrl.replace(/\/+$/, "");

  // Add https:// if not present
  return `https://${cleanUrl}`;
}
