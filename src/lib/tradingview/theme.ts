// lib/tradingview/theme.ts
export type AppTheme = 'light' | 'dark';

export const getTradingViewTheme = (theme: AppTheme) => {
  const isDark = theme === 'dark';

  return {
    colorTheme: isDark ? 'dark' : 'light',
    isTransparent: false,
    backgroundColor: isDark ? '#0B0F14' : '#FFFFFF',

    gridLineColor: isDark
      ? 'rgba(255, 255, 255, 0.06)'
      : 'rgba(0, 0, 0, 0.06)',

    scaleFontColor: isDark ? '#A1A1AA' : '#4B5563',

    plotLineColorGrowing: '#0FEDBE',
    plotLineColorFalling: '#F6465D',

    belowLineFillColorGrowing: 'rgba(15, 237, 190, 0.15)',
    belowLineFillColorFalling: 'rgba(246, 70, 93, 0.15)',
    belowLineFillColorGrowingBottom: 'rgba(15, 237, 190, 0)',
    belowLineFillColorFallingBottom: 'rgba(246, 70, 93, 0)',

    symbolActiveColor: isDark
      ? 'rgba(15, 237, 190, 0.08)'
      : 'rgba(15, 237, 190, 0.12)',
  };
};
