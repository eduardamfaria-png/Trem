'use client';

import { useEffect, useState } from 'react';

export type Role = 'creator' | 'brand';

const KEY = 'matchy.role';

export function readRole(): Role {
  if (typeof window === 'undefined') return 'creator';
  return window.localStorage.getItem(KEY) === 'brand' ? 'brand' : 'creator';
}

export function writeRole(role: Role) {
  window.localStorage.setItem(KEY, role);
}

/**
 * Papel escolhido no onboarding. Decide qual variante das telas de
 * Campanhas e Explorar é exibida — as duas variantes existem no design
 * e a nav inferior de cada uma indica em qual aba elas vivem.
 *
 * Retorna `null` até o primeiro efeito rodar, para não divergir do SSR.
 */
export function useRole(): Role | null {
  const [role, setRole] = useState<Role | null>(null);
  useEffect(() => setRole(readRole()), []);
  return role;
}
