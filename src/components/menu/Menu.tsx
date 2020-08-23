import React, { FC } from "react";
import "./Menu.scss";

interface MenuProps {
  addNewFavourite: () => void;
  addNewBookmark: () => void;
  toggleEditMode: () => void;
  exportSettings: () => void;
  importSettings: () => void;
  isEditMode: boolean;
}

const Menu: FC<MenuProps> = ({
  addNewBookmark,
  addNewFavourite,
  exportSettings,
  importSettings,
  toggleEditMode,
  isEditMode,
}) => {
  return (
    <nav className="menu">
      <ul className="menu-list">
        <li className="menu-list__item" onClick={addNewFavourite}>
          Add new favourite
        </li>
        <li className="menu-list__item" onClick={addNewBookmark}>
          Add new bookmark
        </li>
        <li className="menu-list__item" onClick={toggleEditMode}>
          {isEditMode ? "Stop editing" : "Edit mode"}
        </li>
        <li className="menu-list__item" onClick={exportSettings}>
          Export settings
        </li>
        <li className="menu-list__item" onClick={importSettings}>
          Import settings
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
