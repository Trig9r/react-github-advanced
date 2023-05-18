import React from 'react';

import { useSearchUsersQuery, useLazyGetUserReposQuery } from '../store/github/github.api';
import { useDebounce } from '../utils/hooks';

export const HomePage = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [isVisibleDropdown, setIsVisibleDropdown] = React.useState(false);
  const debouncedValue = useDebounce(searchValue);

  const {
    isLoading,
    isError,
    data: users,
  } = useSearchUsersQuery(debouncedValue, {
    skip: debouncedValue.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery();

  React.useEffect(() => {
    const condition = debouncedValue.length > 3 && users?.length! > 0;
    setIsVisibleDropdown(condition);
  }, [debouncedValue, users]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
  };

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && <p className="text-center text-red-600">Something went wrong...</p>}

      <div className="relative w-[560px]">
        <input
          type="text"
          value={searchValue}
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search fro Github username..."
          onChange={(e) => {
            const value = e.target.value;
            setSearchValue(value);
          }}
        />

        {isVisibleDropdown && (
          <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {users?.map((user) => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer">
                {user.login}
              </li>
            ))}
          </ul>
        )}

        <div className="container">
          {areReposLoading && <p className="text-center">Repos are loading...</p>}
        </div>
      </div>
    </div>
  );
};
