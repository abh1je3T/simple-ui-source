import React from "react";

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ icon, className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={["sui-list-item", className].filter(Boolean).join(" ")}
        {...props}
      >
        <span className="sui-list-item__inner">
          {icon && <span className="sui-list-item__icon">{icon}</span>}
          <span className="sui-list-item__content">{children}</span>
        </span>
      </li>
    );
  },
);

ListItem.displayName = "List.Item";

export default ListItem;
