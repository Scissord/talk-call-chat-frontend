import { useState } from 'react';
import TopSection from './blocks/top_section';
import MiddleSection from './blocks/middle_section';

export default function MainPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className='flex flex-col w-full min-h-[100vh]'>
      <TopSection
        search={search}
        setSearch={setSearch}
        setCurrentPage={setCurrentPage}
      />
      <MiddleSection
        search={search}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
