import { useState } from "react";
import produce from "immer";
import classnames from "classnames";
import "./App.css";

type State = {
   visible: boolean;
   owner: number | null;
};

function App() {
   const [showQuestion, setShowQuestion] = useState(true);
   const [text, setText] = useState("");
   const [player, setPlayer] = useState<number | null>(1);
   const [state, setState] = useState<State[]>([]);

   const getState = (index: number, _state: State[] = state) => {
      return _state[index] || { visible: false, owner: null };
   };

   const onClick = (index: number) => {
      setState((prev) =>
         produce(prev, (draft) => {
            draft[index] = {
               visible: player !== null,
               owner: player,
            };
         })
      );
   };

   const goNext = () => {
      if (player === null) {
         setPlayer(1);
      } else if (player === 4) {
         setPlayer(null);
      } else {
         setPlayer(player + 1);
      }
      setState((prev) => prev.map((st) => ({ ...st, visible: false })));
   };

   const reset = () => {
      setState([]);
      setPlayer(1);
   };

   return (
      <div className="App">
         <div className="input">
            <div
               className="header"
               onClick={() => setShowQuestion(!showQuestion)}
            >
               <div>問題文</div>
               <div className="symbol">{showQuestion ? "▼" : "▶"}</div>
            </div>
            {showQuestion && (
               <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
               />
            )}
         </div>
         <div className={classnames("current-player", `owner-${player}`)} />
         <div className="panels">
            <div className="wrapper">
               {[...Array(text.length)].map((_, i) => (
                  <div
                     key={i}
                     className={classnames(
                        "panel",
                        getState(i).visible && "visible",
                        getState(i).owner && `owner-${getState(i).owner}`
                     )}
                     onClick={() => onClick(i)}
                  >
                     {text.charAt(i)}
                  </div>
               ))}
            </div>
         </div>
         <div className="toolbar">
            <div className="button" onClick={goNext}>
               next
            </div>
            <div className="button" onClick={reset}>
               reset
            </div>
            <div className="button owner-null" onClick={() => setPlayer(null)}>
               null
            </div>
            <div className="button owner-1" onClick={() => setPlayer(1)}>
               1
            </div>
            <div className="button owner-2" onClick={() => setPlayer(2)}>
               2
            </div>
            <div className="button owner-3" onClick={() => setPlayer(3)}>
               3
            </div>
            <div className="button owner-4" onClick={() => setPlayer(4)}>
               4
            </div>
         </div>
      </div>
   );
}

export default App;
