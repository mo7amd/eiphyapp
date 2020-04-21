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
    <div>
      <input
        type="search"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          router.push(`/search/${searchValue}`);
        }}
      >
        search
      </button>
    </div>
  );
};

export default SearchField;
