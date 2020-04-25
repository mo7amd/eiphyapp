import React, { useEffect, useState } from 'react';
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
        if (searchValue && searchValue.length > 1) {
          router.push(`/search/${searchValue}`);
        }
      }}
      >
        <input
          type="search"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <button
          type="submit"
        >
          <span className="fa fa-search" />
        </button>
      </form>
    </aside>
  );
};

export default SearchField;
