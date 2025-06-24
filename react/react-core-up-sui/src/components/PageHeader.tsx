export function PageHeader() {
  return (
    <header className="w-full h-10 bg-[#202124] border-b border-black">
      <div className="max-w-[1200px] mx-auto h-full flex items-end">
        <div className="flex items-center space-x-1 px-2 h-full">
          {/* Active Tab: reown x sui */}
          <div className="bg-[#35363A] h-full flex items-center px-3 rounded-t-lg border-b-2 border-b-[#35363A]">
            <div className="flex items-center space-x-2">
              <img
                src="/reown-logo.png"
                alt="Reown"
                height={20}
                className="rounded-sm"
              />
              <img
                src="/x-icon.png"
                alt="x"
                height={16}
                className="opacity-60"
              />
              <img
                src="/sui-log.png"
                alt="SUI"
                height={20}
                className="rounded-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
