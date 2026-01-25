declare module 'pannellum-react' {
  import { ComponentType } from 'react';

  export interface PannellumProps {
    width?: string;
    height?: string;
    image: string;
    pitch?: number;
    yaw?: number;
    hfov?: number;
    autoLoad?: boolean;
    showZoomCtrl?: boolean;
    mouseZoom?: boolean;
    showFullscreenCtrl?: boolean;
    children?: React.ReactNode;
  }

  export interface HotspotProps {
    type: 'info' | 'custom';
    pitch: number;
    yaw: number;
    text?: string;
    handleClick?: (evt: MouseEvent, name: string) => void;
  }

  export const Pannellum: ComponentType<PannellumProps> & {
    Hotspot: ComponentType<HotspotProps>;
  };

  export const PannellumVideo: ComponentType<any>;
}
