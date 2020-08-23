import React, {
  FC,
  useState,
  ChangeEvent,
  SyntheticEvent,
  useEffect,
} from "react";
import Menu from "./components/menu/Menu";
import Search from "./components/search/Search";
import ModalPortal from "./components/shared/ModalPortal";
import Time from "./components/time/Time";
import { IFavouriteItem, SelectedModal, IBookmarkItem } from "./types/types";
import "./App.scss";
import Input from "./components/shared/Input";
import TextArea from "./components/shared/TextArea";
import Button from "./components/shared/Button";
import Favourites from "./components/favourites/Favourites";
import { v4 as uuidv4 } from "uuid";

const App: FC = () => {
  const [favouriteFormValues, setFavouriteFormValues] = useState<
    IFavouriteItem
  >({ id: "", name: "", url: "" });
  const [selectedModal, setSelectedModal] = useState<SelectedModal | null>(
    null
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<IFavouriteItem[]>([]);
  const [bookmarks, setBookmarks] = useState<IFavouriteItem[]>([]);
  const [importValue, setImportValue] = useState<string>("");

  const toggleModal = (event: SyntheticEvent): void => {
    if (event) {
      if (event.target === event.currentTarget) {
        setSelectedModal(null);
      }
    }
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFavouriteFormValues({
      ...favouriteFormValues,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    document.title = "New Tab";
    const storedFavourites: string | null = localStorage.getItem("favourites");
    const storedBookmarks: string | null = localStorage.getItem("bookmarks");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  const saveFavourite = (): void => {
    let newFavourite: IFavouriteItem = favouriteFormValues;
    newFavourite.id = uuidv4();
    setFavourites([...favourites, newFavourite]);
    localStorage.setItem(
      "favourites",
      JSON.stringify([...favourites, newFavourite])
    );
    setSelectedModal(null);
    setFavouriteFormValues({ id: "", name: "", url: "" });
  };

  const saveBookmark = (): void => {
    let newBookmark: IBookmarkItem = favouriteFormValues;
    newBookmark.id = uuidv4();
    setBookmarks([...bookmarks, newBookmark]);
    localStorage.setItem(
      "bookmarks",
      JSON.stringify([...bookmarks, newBookmark])
    );
    setSelectedModal(null);
    setFavouriteFormValues({ id: "", name: "", url: "" });
  };

  const deleteItem = (id: string, isBookmark?: boolean) => {
    if (isBookmark) {
      setBookmarks([
        ...bookmarks.filter((bookmark: IBookmarkItem) => bookmark.id !== id),
      ]);
      localStorage.setItem(
        "bookmarks",
        JSON.stringify([
          ...bookmarks.filter((bookmark: IBookmarkItem) => bookmark.id !== id),
        ])
      );
    } else {
      setFavourites([
        ...favourites.filter(
          (favourite: IFavouriteItem) => favourite.id !== id
        ),
      ]);
      localStorage.setItem(
        "favourites",
        JSON.stringify([
          ...favourites.filter(
            (favourite: IFavouriteItem) => favourite.id !== id
          ),
        ])
      );
    }
  };

  const importSettings = (): void => {
    const settings: string = window.atob(importValue);
    const parsedSettings: [IBookmarkItem[], IFavouriteItem[]] = JSON.parse(
      settings
    );
    const bookmarks: IBookmarkItem[] = parsedSettings[0];
    const favourites: IFavouriteItem[] = parsedSettings[1];
    localStorage.clear();
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    localStorage.setItem("favourites", JSON.stringify(favourites));
    setFavourites(favourites);
    setBookmarks(bookmarks);
    setSelectedModal(null);
  };

  return (
    <div className="app">
      <Time />
      <Search />
      <Favourites
        items={favourites}
        isEditMode={editMode}
        deleteItem={deleteItem}
      />
      <Favourites
        items={bookmarks}
        isEditMode={editMode}
        isBookmark={true}
        deleteItem={deleteItem}
      />
      <Menu
        addNewBookmark={() => setSelectedModal(SelectedModal.Bookmark)}
        addNewFavourite={() => setSelectedModal(SelectedModal.Favourite)}
        exportSettings={() => setSelectedModal(SelectedModal.Export)}
        importSettings={() => setSelectedModal(SelectedModal.Import)}
        toggleEditMode={() => setEditMode(!editMode)}
        isEditMode={editMode}
      />
      {(selectedModal === SelectedModal.Favourite ||
        selectedModal === SelectedModal.Bookmark) && (
        <ModalPortal
          toggleModal={(event: SyntheticEvent) => toggleModal(event)}
        >
          <h2 className="modal-header">
            Add new{" "}
            {selectedModal === SelectedModal.Favourite
              ? "favourite"
              : "bookmark"}
          </h2>
          <Input
            placeholder="Name"
            value={favouriteFormValues.name}
            name="name"
            handleOnChange={handleFormChange}
          />
          <Input
            placeholder="Url"
            value={favouriteFormValues.url}
            name="url"
            handleOnChange={handleFormChange}
          />
          <Button
            onSubmit={
              selectedModal === SelectedModal.Favourite
                ? saveFavourite
                : saveBookmark
            }
            text="Save"
            type="button"
          />
        </ModalPortal>
      )}
      {(selectedModal === SelectedModal.Import ||
        selectedModal === SelectedModal.Export) && (
        <ModalPortal
          toggleModal={(event: SyntheticEvent) => toggleModal(event)}
        >
          <h2 className="modal-header">
            {selectedModal === SelectedModal.Export
              ? "Export settings"
              : "Import settings"}
          </h2>
          <TextArea
            handleOnChange={
              selectedModal === SelectedModal.Export
                ? () => null
                : (event: ChangeEvent<HTMLTextAreaElement>) =>
                    setImportValue(event.target.value)
            }
            value={
              selectedModal === SelectedModal.Export
                ? window.btoa(JSON.stringify([[...bookmarks], [...favourites]]))
                : importValue
            }
          />
          {selectedModal === SelectedModal.Import && (
            <Button onSubmit={importSettings} text="Import" type="button" />
          )}
        </ModalPortal>
      )}
    </div>
  );
};

export default App;
