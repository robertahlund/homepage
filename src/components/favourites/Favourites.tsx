import React, { FC } from "react";
import { IFavouriteItem, IBookmarkItem } from "../../types/types";
import "./Favourites.scss";
import FavouriteItem from "./FavouriteItem";

interface FavouritesProps {
  items: IFavouriteItem[] | IBookmarkItem[];
  isEditMode: boolean;
  isBookmark?: boolean;
  deleteItem: (id: string, isBookmark?: boolean) => void;
}

const Favourites: FC<FavouritesProps> = ({
  items,
  isEditMode,
  isBookmark,
  deleteItem,
}) => {
  if (items.length > 0) {
    return (
      <section className="favourites">
        <h3 className="favourites__title">
          {!isBookmark ? "Favourites" : "Bookmarks"}
        </h3>
        <div className="favourites-items">
          {items.map((item: IFavouriteItem | IBookmarkItem, index: number) => (
            <FavouriteItem
              item={item}
              isEditMode={isEditMode}
              key={index}
              isBookmark={isBookmark}
              deleteItem={deleteItem}
            />
          ))}
        </div>
      </section>
    );
  } else return null;
};

export default Favourites;
