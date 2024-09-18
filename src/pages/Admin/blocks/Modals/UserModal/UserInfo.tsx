import { Dispatch, FC, SetStateAction } from "react";
import { IUser } from "@interfaces";
import { useAppSelector } from "@hooks";
import { selectTheme } from "@store/reducers/themeSlice";

type UserInfoProps = {
  roles: any[];
  handleUpdateUser: () => void;
  handleDeleteUser: () => void;
  isDisabled: boolean;
  user_info: any;
  setUserInfo: Dispatch<SetStateAction<IUser | null>>;
  type: number;
};

const css = {
  label: `
    text-lg font-semibold
  `,
  input:`
    px-2 py-1 min-w-[50vh]
    outline-none hover:bg-blue-100 border
    border-slate-300 rounded-md
  `,
  button: `
    ml-auto border border-slate-300
    rounded-lg p-2 hover:bg-blue-100 mt-3
  `
};

const UserInfo: FC<UserInfoProps> = (props) => {
  const {
    roles, handleUpdateUser,
    handleDeleteUser, isDisabled,
    user_info, setUserInfo, type
  } = props;

  const theme = useAppSelector(selectTheme);

  return (
    <div className='flex flex-col gap-2'>
      <p
        className={`${css.label} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
      >
        #ID:
      </p>
      <input
        type="text"
        className={`${css.input} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
        value={user_info?.id}
        onChange={(e) => setUserInfo({ ...user_info, id: e.target.value })}
        disabled={true}
      />
      <p
        className={`${css.label} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
      >
        Name:
      </p>
      <input
        type="text"
        className={`${css.input} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
        value={user_info?.name}
        onChange={(e) => setUserInfo({ ...user_info, name: e.target.value })}
        disabled={isDisabled}
      />
      <p
        className={`${css.label} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
      >
        PASSWORD:
      </p>
      <input
        type="text"
        className={`${css.input} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
        value={user_info?.password}
        onChange={(e) => setUserInfo({ ...user_info, password: e.target.value })}
        disabled={true}
      />
      <p
        className={`${css.label} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
      >
        Role:
      </p>
      <select
        className={`${css.input} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
        onChange={(e) => {
          setUserInfo({ ...user_info, role: e.target.value })
        }}
        disabled={isDisabled}
      >
        {roles.map((option) => (
          <option
            key={option.role}
            value={option.role}
          >
            {option.label}
          </option>
        ))}
      </select>
      {type === 2 && (
        <button
          onClick={() => handleUpdateUser()}
          className={`${css.button} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
        >
          Сохранить
        </button>
      )}
      {type === 3 && (
        <button
          onClick={() => handleDeleteUser()}
          className={`${css.button} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
        >
          Удалить
        </button>
      )}
    </div>
  )
};

export default UserInfo;
