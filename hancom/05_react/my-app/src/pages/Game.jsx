import { useEffect, useRef, useState } from "react";

export default function Game() {
  const canvasRef = useRef(null);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // 게임 상태를 리렌더링과 상관없이 계속 유지하기 위한 ref
  const turtleX = useRef(200);
  const drops = useRef([]);
  const livesRef = useRef(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    let animationId;
    let frame = 0;

    // 마우스를 움직이면 거북이 x좌표를 따라가게
    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      turtleX.current = e.clientX - rect.left;
    }
    canvas.addEventListener("mousemove", handleMouseMove);

    function loop() {
      frame++;

      // 배경 지우기
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#dcecf7";
      ctx.fillRect(0, 0, width, height);

      // 30프레임마다 새 빗방울 하나 추가
      if (frame % 25 === 0) {
        drops.current.push({
          x: Math.random() * width,
          y: -10,
          speed: 3 + Math.random() * 3,
        });
      }

      // 빗방울 이동 + 그리기
      ctx.strokeStyle = "#5b8fc7";
      ctx.lineWidth = 2;
      drops.current.forEach((drop) => {
        drop.y += drop.speed;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + 12);
        ctx.stroke();
      });

      // 거북이랑 충돌한 빗방울 걸러내기
      const turtleY = height - 40;
      drops.current = drops.current.filter((drop) => {
        const dx = drop.x - turtleX.current;
        const dy = drop.y - turtleY;
        const hit = Math.sqrt(dx * dx + dy * dy) < 25;

        if (hit) {
          livesRef.current -= 1;
          setLives(livesRef.current);
          return false; // 맞은 빗방울은 제거
        }
        if (drop.y > height) {
          setScore((s) => s + 1); // 피한 빗방울마다 점수 +1
          return false;
        }
        return true;
      });

      // 거북이 그리기 (이모지로 간단하게)
      ctx.font = "36px serif";
      ctx.textAlign = "center";
      ctx.fillText("🐢", turtleX.current, turtleY + 12);

      if (livesRef.current > 0) {
        animationId = requestAnimationFrame(loop);
      } else {
        setGameOver(true);
      }
    }

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  function restart() {
    livesRef.current = 3;
    drops.current = [];
    setLives(3);
    setScore(0);
    setGameOver(false);
  }

  return (
    <div className="page game-page">
      <h1 className="about-title">거북이 비 피하기</h1>
      <p className="about-lead">마우스로 거북이를 움직여서 빗방울을 피하세요!</p>

      <div className="game-stats">
        <span>❤️ {lives}</span>
        <span>점수 {score}</span>
      </div>

      <div className="game-layout">
        <div className="game-canvas-wrap">
          <canvas ref={canvasRef} width={400} height={300} />
          {gameOver && (
            <div className="game-over-overlay">
              <p>게임 오버!</p>
              <p className="game-over-score">최종 점수: {score}</p>
              <button onClick={restart}>다시하기</button>
            </div>
          )}
        </div>

        <div className="fun-facts">
          <div className="fact-card">
            <span className="fact-emoji">🐢</span>
            <p>거북이는 등딱지로 <strong>숨도 쉴 수 있어요</strong></p>
          </div>
          <div className="fact-card">
            <span className="fact-emoji">☔</span>
            <p>빗방울은 초당 <strong>약 9m</strong>로 떨어져요</p>
          </div>
          <div className="fact-card">
            <span className="fact-emoji">🏆</span>
            <p>어떤 거북이는 <strong>150년</strong>도 넘게 살아요</p>
          </div>
        </div>
      </div>

      <div className="cute-divider">
        <span>🐢</span><span>☁️</span><span>💧</span><span>🐢</span>
      </div>

      <div className="floating-clouds" aria-hidden="true">
        <span className="cloud cloud-1">☁️</span>
        <span className="cloud cloud-2">☁️</span>
        <span className="cloud cloud-3">☁️</span>
      </div>
    </div>
  );
}