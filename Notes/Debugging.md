# Bio Health Data Explorer — Debugging Notes

## Project Context
- Interactive app pulling nutritional data from USDA API
- Filtering nutrients by selected categories (e.g., vitamins, minerals)
- Displaying nutrient details for selected food items

---

## Debugging Steps and Fixes

### 1. Nutrient Data Structure Mismatch
- **Issue:** Initially, code expected `nutrient.nutrientName` or `nutrient.nutrient.name` but API returns flat structure with `nutrientName` at top level.
- **Fix:** 
  - Update `NutrientDetail` interface to use `nutrientName` directly, not nested under `nutrient`.
  - Adjust filtering logic accordingly.
  
### 2. Filtering Returning Empty Arrays
- **Issue:** Nutrients filtered by category returned empty despite data present.
- **Cause:** Mismatch in nutrient name keys, or incorrect property access.
- **Fix:**
  - Confirmed `nutrientName` used for filtering, matching keys in `nutrientNameMap`.
  - Added debug logs for keywords and nutrient names to validate matching.
  
### 3. TypeScript Errors with Nutrient Interfaces
- **Issue:** Conflicting `NutrientDetail` types between API and component.
- **Fix:**
  - Centralized `NutrientDetail` type in `usdaApi.ts` and imported it into components.
  - Used consistent interface throughout for clarity and no type errors.

### 4. React Warning: Unique `key` Prop
- **Issue:** React console warning for missing unique keys in list rendering.
- **Fix:**
  - Added `key` attribute using `nutrientName` or `nutrient.id` when mapping nutrients to JSX.

### 5. NutrientChart Component Unused / Errors
- **Issue:** Importing `CustomTooltip` caused errors; NutrientChart was commented out.
- **Fix:**
  - Removed `CustomTooltip` import and usage to eliminate errors.
  - Consider re-implementing custom tooltip later if needed.

---

## Useful Debug Logs Added

```ts
console.log('Full food detail response:', data);
console.log('foodNutrients sample:', data.foodNutrients?.slice(0,5));
console.log('All nutrient names:', nutrients.map(n => n.nutrientName));
console.log('Keywords to filter by:', keywords);
console.log('Filtered nutrients inside function:', filtered);
