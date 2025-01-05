import { ReactNode, CSSProperties } from 'react';

interface BoxProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export { BoxProps };