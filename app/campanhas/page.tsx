'use client';

import PhoneFrame from '@/components/PhoneFrame';
import StatusBar from '@/components/StatusBar';
import BottomNav from '@/components/BottomNav';
import CampaignsCreator from '@/components/screens/CampaignsCreator';
import CampaignsBrand from '@/components/screens/CampaignsBrand';
import { C } from '@/lib/theme';
import { useRole } from '@/lib/role';

/** Criadora vê campanhas abertas; marca vê as próprias campanhas e candidatas. */
export default function CampanhasPage() {
  const role = useRole();

  if (role === null) {
    return (
      <PhoneFrame>
        <StatusBar background={C.cream} />
        <BottomNav />
      </PhoneFrame>
    );
  }

  return role === 'brand' ? <CampaignsBrand /> : <CampaignsCreator />;
}
