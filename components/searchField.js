import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const SearchField = () => {
  const router = useRouter();
  const { searchParam } = router.query;
  const [searchValue, setSearchValue] = useState(searchParam);

  useEffect(() => {
    setSearchValue(searchParam);
  }, [searchParam]);

  return (
    <aside className="search-tool">
      <form onSubmit={(e) => {
        e.preventDefault();
        router.push(`/search/${searchValue}`);
      }}
      >
        <input
          type="search"
          value={searchValue}
          placeholder="Search all the GIFs and memes"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <button
          type="submit"
        >
          <FontAwesomeIcon icon={faSearch} rotation={90} size="xl" color="white" swapOpacity/>
        </button>
      </form>
    </aside>
  );
};

export default SearchField;
