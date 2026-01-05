const STORAGE_KEY = 'saved-baseball-cards';

/**
 * Get all saved player IDs from localStorage
 */
export function getSavedRecords(): Set<number> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return new Set();
    
    const ids = JSON.parse(saved) as number[];
    return new Set(ids);
  } catch (error) {
    console.error('Error loading saved records:', error);
    return new Set();
  }
}

/**
 * Save a player ID to localStorage
 */
export function saveRecord(playerId: number): void {
  try {
    const saved = getSavedRecords();
    saved.add(playerId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved]));
  } catch (error) {
    console.error('Error saving record:', error);
  }
}

/**
 * Remove a player ID from localStorage
 */
export function unsaveRecord(playerId: number): void {
  try {
    const saved = getSavedRecords();
    saved.delete(playerId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved]));
  } catch (error) {
    console.error('Error unsaving record:', error);
  }
}

/**
 * Check if a player ID is saved
 */
export function isRecordSaved(playerId: number): boolean {
  const saved = getSavedRecords();
  return saved.has(playerId);
}

/**
 * Clear all saved records
 */
export function clearAllSavedRecords(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing saved records:', error);
  }
}
