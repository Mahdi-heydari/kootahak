import { Globe2, Link2, UserRound } from "lucide-react";

export default function KutahakGraph(): React.JSX.Element {
  return (
    <div className="kutahak-graphic relative mx-auto w-full max-w-85 md:max-w-107.5">
      <div className="relative w-full" style={{ aspectRatio: "340 / 620" }}>
        <svg
          data-kutahak-svg
          viewBox="0 0 340 620"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          {/* خطوط ثابت */}
          <g data-connection="branch1" data-branch="1">
            <path
              className="line"
              d="M140 54 L82 54 L82 148 L55 178 L28 178 L28 307 L107 307 L166 346 L166 380 L58 380 L58 448"
            />
          </g>
          <g data-connection="branch2" data-branch="2">
            <path className="line" d="M170 84 L170 448" />
          </g>
          <g data-connection="branch3" data-branch="3">
            <path
              className="line"
              d="M200 54 L258 54 L258 148 L285 178 L312 178 L312 307 L230 307 L174 346 L174 380 L282 380 L282 448"
            />
          </g>

          {/* پالس‌ها */}
          <g data-pulse="branch1" data-branch="1">
            <path
              className="pulse-path"
              pathLength="1"
              d="M140 54 L82 54 L82 148 L55 178 L28 178 L28 307 L107 307 L166 346 L166 380 L58 380 L58 448"
            />
          </g>
          <g data-pulse="branch2" data-branch="2">
            <path className="pulse-path" pathLength="1" d="M170 84 L170 448" />
          </g>
          <g data-pulse="branch3" data-branch="3">
            <path
              className="pulse-path"
              pathLength="1"
              d="M200 54 L258 54 L258 148 L285 178 L312 178 L312 307 L230 307 L174 346 L174 380 L282 380 L282 448"
            />
          </g>
        </svg>

        {/* کاربر */}
        <div
          data-node="user"
          className="absolute z-10 cursor-pointer"
          style={{
            left: `${(140 / 340) * 100}%`,
            top: `${(24 / 620) * 100}%`,
            width: `${(60 / 340) * 100}%`,
          }}
        >
          <div className="node-box flex aspect-square w-full items-center justify-center text-muted-foreground rounded-token-sm border border-border bg-card transition-colors duration-300">
            <UserRound size={30} />
          </div>
        </div>

        {/*  LINK 1  */}
        <div
          data-kutahak-node
          data-node="link1"
          className="absolute z-10 cursor-pointer"
          style={{
            left: `${(52 / 340) * 100}%`,
            top: `${(148 / 620) * 100}%`,
            width: `${(60 / 340) * 100}%`,
          }}
        >
          <div className="w-full">
            <div className="node-box flex aspect-square w-full items-center justify-center rounded-token-lg border border-border bg-card transition-colors duration-300">
              <Link2
                className="h-[40%] w-[40%] text-muted-foreground"
                strokeWidth={1.6}
              />
            </div>
            <span className="mt-2.5 block text-center text-token-base text-muted-foreground">
              kut.ac/x1
            </span>
          </div>
        </div>

        {/*  LINK 2  */}
        <div
          data-kutahak-node
          data-node="link2"
          className="absolute z-10 cursor-pointer"
          style={{
            left: `${(140 / 340) * 100}%`,
            top: `${(148 / 620) * 100}%`,
            width: `${(60 / 340) * 100}%`,
          }}
        >
          <div className="w-full">
            <div className="node-box flex aspect-square w-full items-center justify-center rounded-token-lg border border-border bg-card transition-colors duration-300">
              <Link2
                className="h-[40%] w-[40%] text-muted-foreground"
                strokeWidth={1.6}
              />
            </div>
            <span className="mt-2.5 block text-center text-token-base text-muted-foreground">
              kut.ac/x2
            </span>
          </div>
        </div>

        {/*  LINK 3  */}
        <div
          data-kutahak-node
          data-node="link3"
          className="absolute z-10 cursor-pointer"
          style={{
            left: `${(228 / 340) * 100}%`,
            top: `${(148 / 620) * 100}%`,
            width: `${(60 / 340) * 100}%`,
          }}
        >
          <div className="w-full">
            <div className="node-box flex aspect-square w-full items-center justify-center rounded-token-lg border border-border bg-card transition-colors duration-300">
              <Link2
                className="h-[40%] w-[40%] text-muted-foreground"
                strokeWidth={1.6}
              />
            </div>
            <span className="mt-2.5 block text-center text-token-base text-muted-foreground">
              kut.ac/x3
            </span>
          </div>
        </div>

        {/*  CENTER  */}
        <div
          className="absolute z-10"
          style={{
            left: `${(95 / 340) * 100}%`,
            top: `${(268 / 620) * 100}%`,
            width: `${(150 / 340) * 100}%`,
          }}
        >
          <div className="flex aspect-150/78 w-full flex-col items-center justify-center rounded-token-xl border border-info bg-card text-center">
            <div className="text-token-lg font-token-semibold leading-token-snug text-foreground">
              کوتاهک
            </div>
            <div className="mt-1 text-token-xs leading-token-snug text-muted-foreground">
              مدیریت و تغیر مسیر درخواست
            </div>
          </div>
        </div>

        {/*  DEST 1  */}
        <div
          data-kutahak-node
          data-node="dest1"
          className="absolute z-10 cursor-pointer"
          style={{
            left: `${(28 / 340) * 100}%`,
            top: `${(448 / 620) * 100}%`,
            width: `${(60 / 340) * 100}%`,
          }}
        >
          <div className="w-full">
            <div className="node-box flex aspect-square w-full items-center justify-center rounded-token-lg border border-border bg-card transition-colors duration-300">
              <Globe2
                className="h-[40%] w-[40%] text-muted-foreground"
                strokeWidth={1.6}
              />
            </div>
            <span className="mt-2.5 block text-center text-token-base text-muted-foreground whitespace-nowrap">
              لینک اصلی ۱
            </span>
          </div>
        </div>

        {/*  DEST 2  */}
        <div
          data-kutahak-node
          data-node="dest2"
          className="absolute z-10 cursor-pointer"
          style={{
            left: `${(140 / 340) * 100}%`,
            top: `${(448 / 620) * 100}%`,
            width: `${(60 / 340) * 100}%`,
          }}
        >
          <div className="w-full">
            <div className="node-box flex aspect-square w-full items-center justify-center rounded-token-lg border border-border bg-card transition-colors duration-300">
              <Globe2
                className="h-[40%] w-[40%] text-muted-foreground"
                strokeWidth={1.6}
              />
            </div>
            <span className="mt-2.5 block text-center text-token-base text-muted-foreground whitespace-nowrap">
              لینک اصلی ۲
            </span>
          </div>
        </div>

        {/*  DEST 3  */}
        <div
          data-kutahak-node
          data-node="dest3"
          className="absolute z-10 cursor-pointer"
          style={{
            left: `${(252 / 340) * 100}%`,
            top: `${(448 / 620) * 100}%`,
            width: `${(60 / 340) * 100}%`,
          }}
        >
          <div className="w-full">
            <div className="node-box flex aspect-square w-full items-center justify-center rounded-token-lg border border-border bg-card transition-colors duration-300">
              <Globe2
                className="h-[40%] w-[40%] text-muted-foreground"
                strokeWidth={1.6}
              />
            </div>
            <span className="mt-2.5 block text-center text-token-sm text-muted-foreground whitespace-nowrap">
              لینک اصلی ۳
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
