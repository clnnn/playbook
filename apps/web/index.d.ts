/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '*.svg' {
  export const ReactComponent: any;
}

declare module '*.css' {
  const styles: { [key: string]: string };
  export default styles;
}

