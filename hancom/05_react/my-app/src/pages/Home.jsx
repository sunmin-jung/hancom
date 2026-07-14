export default function Home() {
  return (
    <div className="home">
      <div className="home-scene">
        <svg viewBox="0 0 400 260" className="home-illustration">
          <circle cx="90" cy="70" r="45" className="sun" />
          <path
            d="M0 210 Q100 170 200 200 T400 195 V260 H0 Z"
            className="hill"
          />
          <g className="tree">
            <rect x="192" y="120" width="16" height="90" className="trunk" />
            <circle cx="200" cy="105" r="55" className="canopy" />
            <circle cx="160" cy="130" r="35" className="canopy" />
            <circle cx="240" cy="130" r="35" className="canopy" />
          </g>
        </svg>
      </div>
      <h1 className="home-title">잔잔한 오후, 선선한 바람</h1>
      <p className="home-subtitle">
        날씨 메뉴에서 일기예보를 확인해보세요
      </p>
    </div>
  );
}