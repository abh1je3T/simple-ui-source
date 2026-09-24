import React from "react";

export interface ListViewProps<T> {
  data: T[];

  renderItem: (item: T, index: number) => React.ReactNode;

  keyExtractor?: (item: T, index: number) => string;

  loading?: boolean;
  loadingRows?: number;

  loadingComponent?: React.ReactNode;

  emptyState?: React.ReactNode;

  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  hasMore?: boolean;

  refreshing?: boolean;
  onRefresh?: () => Promise<void> | void;

  estimatedItemSize?: number;
  overscan?: number;

  className?: string;
  style?: React.CSSProperties;
}
