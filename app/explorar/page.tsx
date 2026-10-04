'use client';

import PhoneFrame from '@/components/PhoneFrame';
import StatusBar from '@/components/StatusBar';
import BottomNav from '@/components/BottomNav';
import ExploreScreen from '@/components/screens/ExploreScreen';
import MatchScreen from '@/components/screens/MatchScreen';
import { C } from '@/lib/theme';
import { useRole } from '@/lib/role';

/**
 * A aba Explorar tem duas variantes no design, e a própria nav inferior
 * de cada uma diz onde ela vive: a grade de descoberta (criadora) e a
 * busca ativa por criadoras (marca). O papel vem do onboarding.
 */
export default function ExplorarPage() {
  const role = useRole();

  if (role === null) {
    return (
      <PhoneFrame>
        <StatusBar background={C.cream} zIndex={6} />
        <BottomNav />
      </PhoneFrame>
    );
  }

  return role === 'brand' ? <MatchScreen /> : <ExploreScreen />;
}
