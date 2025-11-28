import { getFarewellText } from "../utils";
export default function Status({ status, lang }) {
  // status can be "correct", "wrong", "won", "lost"

  let elem;
  switch (status) {
    case "won":
      elem = <><h2>You won!</h2><p>Well done! 🎉</p></>;
      break;
    case "lost":
      elem = <><h2>Game over!</h2> <p>You lose! Better start learning Assembly</p></>;
      break;
    case "wrong":
      elem = <h2>{getFarewellText(lang)}!</h2>
      break;
    case "correct":
      elem = <h2>Good guess!</h2>
      break;
    default:
      elem = <></>
  }

  return (
    <div aria-live="polite" role="status" className={`status ${status}`}>
      {
        elem
      }
    </div >
  )
}
