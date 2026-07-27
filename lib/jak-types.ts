/**
 * JAK (Jan Arogya Kendra) Data Types
 */

export interface JAKEntry {
  id: number;
  district: string;
  healthBlock: string;
  jakName: string;
  institutionName: string;
  jakCode: string;
  ninid: string;
  email: string;
  latitude: number | null;
  longitude: number | null;
  lsgiCode: string;
  constituency: string;
  phone?: string;
  landline?: string;
  locationUrl?: string;
}

/**
 * Get display name for a JAK entry
 */
export function getJAKDisplayName(jak: JAKEntry): string {
  return jak.jakName || jak.institutionName || `PHC ${jak.jakCode}`;
}

/**
 * Check if JAK has valid coordinates for map display
 */
export function hasValidCoordinates(jak: JAKEntry): boolean {
  return (
    jak.latitude !== null &&
    jak.longitude !== null &&
    !isNaN(jak.latitude) &&
    !isNaN(jak.longitude)
  );
}

/**
 * Generate Google Maps URL for a JAK location
 */
export function getGoogleMapsUrl(jak: JAKEntry): string | null {
  if (jak.locationUrl && jak.locationUrl.trim()) {
    return jak.locationUrl;
  }
  if (!hasValidCoordinates(jak)) return null;
  return `https://www.google.com/maps/search/?api=1&query=${jak.latitude},${jak.longitude}`;
}

/**
 * Filter JAK entries by district and search query
 */
export function filterJAKEntries(
  entries: JAKEntry[],
  district: string,
  searchQuery: string
): JAKEntry[] {
  let filtered = entries;

  // Filter by district
  if (district) {
    filtered = filtered.filter(
      (jak) => jak.district.toLowerCase() === district.toLowerCase()
    );
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (jak) =>
        jak.jakName.toLowerCase().includes(query) ||
        jak.institutionName.toLowerCase().includes(query) ||
        jak.jakCode.toLowerCase().includes(query) ||
        jak.healthBlock.toLowerCase().includes(query) ||
        jak.constituency.toLowerCase().includes(query)
    );
  }

  return filtered;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * JAK entry with calculated distance
 */
export interface JAKWithDistance extends JAKEntry {
  distance: number;
}

/**
 * Find JAKs near a given location, sorted by distance
 */
export function findNearbyJAKs(
  entries: JAKEntry[],
  userLat: number,
  userLon: number,
  maxDistanceKm: number = 50
): JAKWithDistance[] {
  const jaksWithDistance: JAKWithDistance[] = entries
    .filter(hasValidCoordinates)
    .map((jak) => ({
      ...jak,
      distance: calculateDistance(
        userLat,
        userLon,
        jak.latitude!,
        jak.longitude!
      ),
    }))
    .filter((jak) => jak.distance <= maxDistanceKm)
    .sort((a, b) => a.distance - b.distance);

  return jaksWithDistance;
}

/**
 * Format distance for display
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }
  return `${distanceKm.toFixed(1)}km`;
}
