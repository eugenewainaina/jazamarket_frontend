// Package level priority mapping - higher number = higher priority
export const PACKAGE_PRIORITIES: Record<string, number> = {
  'Infinity Suite': 10,
  'Maximizer Pro': 9,
  'Maximizer Gold': 8,
  'Pinnacle Elite': 7,
  'Pinnacle Silver': 6,
  'Pro Launch': 5,
  'Accelerate': 4,
  'Momentum': 3,
  'Starter': 2,
  'Explorer': 1,
};

/**
 * Gets the priority value for a package level
 * @param packageLevel - The package level string
 * @returns The priority number (higher = more priority)
 */
export const getPackagePriority = (packageLevel: string): number => {
  return PACKAGE_PRIORITIES[packageLevel] || 0; // Default to 0 for unknown packages
};

/**
 * Sorts ads based on package priority (highest priority first)
 * Ads with the same priority are randomly shuffled for fair distribution
 * @param ads - Array of ads to sort
 * @param getAdPackageLevel - Function to extract package level from an ad
 * @returns Sorted array of ads
 */
export const sortAdsByPackagePriority = <T>(
  ads: T[],
  getAdPackageLevel: (ad: T) => string
): T[] => {
  // First, group ads by package priority
  const adGroups = new Map<number, T[]>();
  
  ads.forEach(ad => {
    const priority = getPackagePriority(getAdPackageLevel(ad));
    if (!adGroups.has(priority)) {
      adGroups.set(priority, []);
    }
    adGroups.get(priority)!.push(ad);
  });
  
  // Sort groups by priority (highest first) and shuffle within each group
  const sortedGroups = Array.from(adGroups.entries())
    .sort(([priorityA], [priorityB]) => priorityB - priorityA)
    .map(([_, groupAds]) => shuffleArray(groupAds));
  
  // Flatten the groups back into a single array
  return sortedGroups.flat();
};

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param array - Array to shuffle
 * @returns New shuffled array
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
