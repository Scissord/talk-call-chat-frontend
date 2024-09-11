import { FC } from "react";
import { Search } from '@ui';
import { useChats } from "@context";

const TopSection: FC = () => {
  const { search, setSearch, setPage } = useChats();

  const handleSearch = (text: string) => {
    setSearch(text)
    setPage(1);
  };

  return (
    <section className='h-[12vh] border-b border-slate-300 flex items-center justify-center'>
      <div className='w-[50%] overflow-hidden flex items-center'>
        <Search
          value={search}
          setValue={(text: string) => handleSearch(text)}
          placeholder='Поиск...'
          loading={false}
        />
      </div>
    </section>
  )
}

export default TopSection;
