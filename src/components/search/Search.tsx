import React, { FC, useState, KeyboardEvent, ChangeEvent } from "react";
import "./Search.scss";
import Input from "../shared/Input";

const Search: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.charCode === 13) {
      window.location.href =
        "https://google.com/search?q=" + encodeURI(searchValue);
    }
  };

  const handleSearchValueChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchValue(event.target.value);
  };

  return (
    <section className="search-container">
      <Input
        handleKeyPress={onKeyPress}
        handleOnChange={handleSearchValueChange}
        value={searchValue}
        placeholder="Search on Google"
      />
    </section>
  );
};

export default Search;
