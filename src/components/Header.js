const Header = () => {
  return (
    <div className="bg-[#0C141A] w-full lg:max-w-md rounded-t-lg px-5 py-2.5 fixed z-50">
      <div className="flex text-white gap-[14px] items-center">
        <img src="./assets/obito.jpg" className="rounded-full w-11" />
        <div>
          <h1 className="text-base">Ada yang bisa dibantu?</h1>
          <div className="flex items-center gap-1">
            <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="5.60121" r="4.5" fill="#81C784" stroke="white"/>
            </svg>
            <span className="text-xs">online</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;