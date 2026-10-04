import { C } from '@/lib/theme';

type Props = {
  /** Cor do relógio e dos indicadores. */
  color?: string;
  /** Fundo da barra — algumas telas rolam conteúdo por baixo dela. */
  background?: string;
  height?: number;
  zIndex?: number;
  /** Opacidade dos indicadores: .5 sobre creme, .6 sobre magenta. */
  iconOpacity?: number;
};

export default function StatusBar({
  color = C.plum,
  background = 'transparent',
  height = 50,
  zIndex = 9,
  iconOpacity = 0.5,
}: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        zIndex,
        fontSize: 13,
        fontWeight: 600,
        color,
        background,
      }}
    >
      <span>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{ width: 16, height: 9, borderRadius: 2, background: 'currentColor', opacity: iconOpacity }} />
        <div style={{ width: 11, height: 9, borderRadius: 2, background: 'currentColor', opacity: iconOpacity }} />
        <div
          style={{
            width: 22,
            height: 11,
            borderRadius: 3,
            border: '1.5px solid currentColor',
            opacity: iconOpacity,
          }}
        />
      </div>
    </div>
  );
}
