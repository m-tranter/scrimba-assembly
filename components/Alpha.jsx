export default function Alpha({ gameState, letter, status, keyClick }) {

  const disabled = gameState === "won" || gameState === "lost" || status !== "unused";
  return (
    <button
      aria-disabled={disabled}
      aria-label={`Letter ${letter}`}
      disabled={disabled}
      onClick={keyClick}
      className={status}
    >{letter}</button  >
  )
}
