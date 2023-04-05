import "./utils.scss"
// ---function to give every letter index class so i can animate it---
export const AnimatedLetters = ({ letterClass, strArray, idx }) => {
    return (
        <span>
            {
                strArray.map((char, i) => (
                    <span key={char + i} className={`${letterClass} _${i + idx}`}>
                        {char}
                    </span>
                ))
            }
        </span>
    );
};
//-----function to disable right click-----
export function disableRightClick(event) {
    event.preventDefault();
}