import { useRef } from "react";
import clsx from "clsx";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Loader } from "@simple-ui/loader";

import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { usePullToRefresh } from "./hooks/usePullToRefresh";

import { ListViewProps } from "./types";

import "./list-view.scss";

function ListView<T>({
  data,
  renderItem,
  keyExtractor,

  loading = false,
  loadingRows = 5,
  loadingComponent,

  emptyState,

  onEndReached,
  onEndReachedThreshold = 0.8,
  hasMore = false,

  refreshing = false,
  onRefresh,

  estimatedItemSize = 72,
  overscan = 5,

  className,
  style,
}: ListViewProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useInfiniteScroll({
    containerRef,
    onEndReached,
    threshold: onEndReachedThreshold,
    enabled: hasMore,
  });

  const { pullDistance, isPulling } = usePullToRefresh({
    containerRef,
    onRefresh,
    enabled: !!onRefresh,
    refreshing,
  });

  // Virtualizer
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => estimatedItemSize,
    overscan,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  return (
    <div
      ref={containerRef}
      className={clsx("sui-list-view", className)}
      style={style}
      role="list"
    >
      {/* Refresh Indicator (Sticky at top) */}
      {onRefresh && (
        <div
          className={clsx("sui-list-view__refresh-indicator", {
            "is-refreshing": refreshing,
            "is-pulling": isPulling,
          })}
          style={{
            height: pullDistance,
            opacity: pullDistance > 0 ? 1 : 0,
          }}
        >
          <Loader variant="dots" size="md" tone="primary" />
        </div>
      )}

      <div
        className="sui-list-view__content"
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: isPulling
            ? "none"
            : "transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        {/* Pull Handle (Desktop/Touch visual cue) */}
        {onRefresh && (
          <div
            className={clsx("sui-list-view__pull-handle", {
              "is-pulling": isPulling,
            })}
            style={{
              opacity: refreshing ? 0 : 1,
              pointerEvents: refreshing ? "none" : "auto",
            }}
          />
        )}

        {/* Empty */}
        {!loading && data.length === 0 && (
          <div className="sui-list-view__empty">{emptyState}</div>
        )}

        {/* Virtualized List */}
        {data.length > 0 && (
          <div
            className="sui-list-view__inner"
            style={{
              height: rowVirtualizer.getTotalSize(),
            }}
          >
            {virtualItems.map((virtualRow) => {
              const item = data[virtualRow.index];

              return (
                <div
                  key={keyExtractor?.(item, virtualRow.index) ?? virtualRow.key}
                  className="sui-list-view__row"
                  role="listitem"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {renderItem(item, virtualRow.index)}
                </div>
              );
            })}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="sui-list-view__loading">
            {loadingComponent
              ? loadingComponent
              : Array.from({
                  length: loadingRows,
                }).map((_, index) => (
                  <div key={index} className="sui-list-view__row">
                    <Loader variant="spinner" size="md" tone="primary" />
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListView;
