import { C } from '@/lib/theme';

/**
 * Equivalente ao <image-slot> do design: um espaço reservado em blush
 * com a descrição da foto que vai entrar ali.
 */
export default function ImageSlot({ placeholder }: { placeholder?: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: C.blush,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px',
        textAlign: 'center',
        fontSize: 11,
        lineHeight: 1.35,
        color: 'rgba(59,14,30,.5)',
      }}
    >
      {placeholder}
    </div>
  );
}
