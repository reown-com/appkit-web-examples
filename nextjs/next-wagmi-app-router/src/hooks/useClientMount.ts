'use client'
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useClientMounted() {
  // false during SSR and hydration, true once running on the client
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
