import axios from 'axios';
import { useContext, useRef, useState } from 'react'
import { Animate, Icon } from 'components/lib';
import { ViewContext } from 'contexts/view';
import { AuthContext } from 'contexts/auth';
import { useNavigate } from 'react-router-dom';

const UserSettings = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const auth = useContext(AuthContext);
  const context = useContext(ViewContext);

  const [avatar, setAvatar] = useState(null);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  // const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  // const handleFileChange = async(e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     setAvatar(selectedFile);
  //   }
  //   await handleUploadAvatar();
  // };

  // const handleUploadAvatar = async () => {
  //   if (avatar === null) {
  //     context.notification.show("Загрузите аватар", "error")
  //     return;
  //   }

  //   await axios({
  //     method: "POST",
  //     url: `/v1/upload_avatar`,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${auth.user.token}`
  //     },
  //     data: {
  //       avatar: avatar
  //     }
  //   })
  //     .then((res) => {

  //     })
  //     .catch((err) => {
  //       context.notification.show(err.response.data.detail, "error")
  //     })
  // };

  return (
    <>
      <div className="flex items-center gap-3 cursor-pointer ml-auto flex-shrink-0">
        <div onClick={() => context.colorMode.setTheme(context.colorMode.theme === 0 ? 1 : 0)} className="w-[22px] h-[22px] text-[var(--settings-icon-color)] flex-shrink-0 hover:text-gray-400">
          {context.colorMode.theme === 0 ? (
            <svg className="w-full fill-transparent transition-all duration-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          ) : (
            <svg className="w-full fill-transparent transition-all duration-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </div>
        <div
          onClick={() => {
            // setIsAvatarOpen(false);
            setIsSettingOpen(!isSettingOpen)
          }}
          className="text-[var(--settings-icon-color)] w-[22px] h-[22px] flex-shrink-0 hover:text-gray-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </div>
        <img
          // onClick={() => {
          //   setIsSettingOpen(false);
          //   setIsAvatarOpen(!isAvatarOpen);
          // }}
          className="w-[40px] h-[40px] rounded-full border border-slate-300"
          src="assets/avatar-default.svg" alt="account-profile"
        />
      </div>
      {isSettingOpen && (
        <div className='absolute top-16 right-5'>
          <Animate type="slidedown">
            {auth.user.role.id === "7" && (
              <div className='shadow-xl w-[200px] bg-white rounded-lg border border-slate-300'>
                <div
                  onClick={() => navigate('/admin')}
                  className='cursor-pointer flex items-center justify-between hover:bg-neutral-200 px-4 py-2'
                >
                  <p className='font-semibold text-[14px] '>Админка</p>
                  <Icon image="command" color="green"/>
                </div>
              </div>
            )}
            <div className='shadow-xl w-[200px] bg-white rounded-lg border border-slate-300'>
              <div
                onClick={() => auth.auth.signout()}
                className='cursor-pointer flex items-center justify-between hover:bg-gray-300 px-4 py-2'
              >
                <p className='font-semibold text-[14px] '>Выход</p>
                <Icon image="log-out" color="red"/>
              </div>
            </div>
          </Animate>
        </div>
      )}
      {/* {isAvatarOpen && (
        <div className='absolute top-16 right-5'>
          <Animate type="slidedown">
            {auth.user.role === 'admin' && (
              <div className='shadow-xl w-[200px] bg-white rounded-lg border border-slate-300'>
                <div
                  onClick={() => navigate('/admin')}
                  className='cursor-pointer flex items-center justify-between hover:bg-neutral-200 px-4 py-2'
                >
                  <p className='font-semibold text-[14px]'>Админка</p>
                  <Icon image="command" color="green"/>
                </div>
              </div>
            )}
            <div className='shadow-xl w-[200px] bg-white rounded-lg border border-slate-300'>
              <div
                onClick={() => fileInputRef.current.click()}
                className='cursor-pointer flex items-center justify-between hover:bg-gray-300 px-4 py-2'
              >
                <p className='font-semibold text-[14px]'>Аватар</p>
                <Icon image="image" color="black"/>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          </Animate>
        </div>
      )} */}
    </>
  )
}

export default UserSettings