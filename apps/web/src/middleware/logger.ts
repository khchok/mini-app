import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

// Define the middleware
const logger: Middleware<{}, RootState> = (storeAPI) => (next) => (action) => {
  // @ts-expect-error do not typed
  console.group(action.type);
  console.log('Previous State:', storeAPI.getState());
  console.log('Action:', action);
  const result = next(action);
  console.log('Next State:', storeAPI.getState());
  console.groupEnd();
  return result;
};

export default logger;
