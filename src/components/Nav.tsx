function Nav() {
  return (
    <div
      className={
        'fixed z-10 flex w-screen border-b-1 border-b-white/50 px-4 py-2 align-middle md:px-6 lg:px-8'
      }
    >
      <a href="#" className="item-center flex">
        <img src="/favicon.png" alt="Pomodoro Logo" className={'h-12 w-auto'} />
        <h1 className="font-primary flex items-center text-2xl font-[600] text-white/70">
          MOTOKI
        </h1>
      </a>
    </div>
  );
}

export default Nav;
