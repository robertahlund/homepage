import React, { FC } from "react";
import { IFavouriteItem, IBookmarkItem } from "../../types/types";
import CloseIcon from "../icons/CloseIcon";
import "./Favourites.scss";

interface FavouriteItemProps {
  item: IFavouriteItem | IBookmarkItem;
  isEditMode: boolean;
  isBookmark?: boolean;
  deleteItem: (id: string, isBookmark?: boolean) => void;
}

// eslint-disable-next-line no-useless-escape
const regex: RegExp = /^.+?[^\/:](?=[?\/]|$)/;

const FavouriteItem: FC<FavouriteItemProps> = ({
  item,
  isEditMode,
  isBookmark,
  deleteItem,
}) => (
  <div className="favourites-item">
    <img
      className="favourites-item__image"
      src={`https://www.google.com/s2/favicons?domain=${item.url
        .match(regex)![0]
        .replace("http://", "")
        .replace("https://", "")
        .replace("www.", "")}`}
      alt="favicon"
    />
    <a
      className="favourites-item__name"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {item.name.length > 30 ? item.name.substr(0, 27) + "..." : item.name}
    </a>
    {isEditMode && (
      <CloseIcon
        height="18px"
        width="18px"
        onClickFunction={() => deleteItem(item.id, isBookmark)}
      />
    )}
  </div>
);

export default FavouriteItem;
