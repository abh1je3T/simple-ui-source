import React from "react";
import "./list.scss";
import ListItem from "./ListItem";

export type ListType = "ul" | "ol";
export type ListStyle = "disc" | "circle" | "square" | "decimal" | "none";
export type ListGap = "sm" | "md" | "lg";
export type ListVariant = "default" | "divided";
export type MarkerColor =
  | "default"
  | "primary"
  | "secondary"
  | "muted"
  | "success"
  | "error";

export interface ListProps {
  as?: ListType;
  styleType?: ListStyle;
  gap?: ListGap;
  variant?: ListVariant;
  markerColor?: MarkerColor;
  className?: string;
  children: React.ReactNode;
}

const ListComponent: React.FC<ListProps> = ({
  as = "ul",
  styleType = "disc",
  gap = "md",
  variant = "default",
  markerColor = "default",
  className,
  children,
}) => {
  const Component = as;

  const classes = [
    "sui-list",
    `sui-list--${styleType}`,
    `sui-list--gap-${gap}`,
    `sui-list--marker-${markerColor}`,
    variant === "divided" && "sui-list--divided",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={classes}>{children}</Component>;
};

export const List = Object.assign(ListComponent, {
  Item: ListItem,
});

List.displayName = "List";
