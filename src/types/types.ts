export interface IFavouriteItem {
  id: string;
  url: string;
  name: string;
}

export interface IBookmarkItem extends IFavouriteItem {}

export enum SelectedModal {
  Favourite = "Favourite",
  Bookmark = "Bookmark",
  Edit = "Edit",
  Export = "Export",
  Import = "Import",
}

export interface IconProps {
  height: string;
  width: string;
  onClickFunction?: () => void;
}
