import type { CSSProperties, ReactNode } from 'react';
import { C, FONT } from '@/lib/theme';

type Props = {
  children: ReactNode;
  /** Legenda em caixa alta sob o aparelho, como nos arquivos de design. */
  caption?: string;
  /** Padding do palco em volta do aparelho. */
  padding?: string;
};

const stage: CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  fontFamily: FONT.body,
};

const phone: CSSProperties = {
  width: 390,
  height: 844,
  position: 'relative',
  background: C.cream,
  borderRadius: 46,
  boxShadow: '0 30px 70px rgba(59,14,30,.28)',
  overflow: 'hidden',
};

export default function PhoneFrame({ children, caption, padding = '44px 32px' }: Props) {
  return (
    <div className="stage" style={{ ...stage, padding }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <div className="phone" style={phone}>
          {children}
        </div>
        {caption ? (
          <div
            className="phone-caption"
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: C.caption,
            }}
          >
            {caption}
          </div>
        ) : null}
      </div>
    </div>
  );
}
