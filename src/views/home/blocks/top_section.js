import { SearchInput } from 'components/lib';
import Logo from './top_section/logo';
import UserSettings from './top_section/user_settings';

const TopSection = ({ search, setSearch, setCurrentPage }) => {

  const handleSearch = (text) => {
    setCurrentPage(1);
    setSearch(text);
  }

  return (
    <section className='h-[12vh] border-b border-slate-300 flex sm:flex-row'>
      <div className={`w-[15%] sm:w-1/4 overflow-hidden flex items-center px-4 border-r`}>
        <Logo/>
      </div>
      <div className='w-[50%] sm:w-1/2 overflow-hidden flex items-center'>
        <SearchInput
          value={search}
          onChange={(text) => handleSearch(text)}
        />
      </div>
      <div className='w-[35%] sm:w-1/4 overflow-hidden flex items-center justify-end px-4 border-l'>
        <UserSettings/>
      </div>
    </section>
  )
}

export default TopSection