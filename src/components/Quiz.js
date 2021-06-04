import Item from "./Item";
import { useEffect, useState } from "react"


/* still need to add help button to explain what to do */
const Quiz = ({ handler }) => {
    const randomId = () => {
        const base = '60b925b9f03c692dbc3bd'; // if > 696
        const base2 = "60b925b8f03c692dbc3bd"; // if <= 696
        // random number 617 through c31
        let new1 = (Math.floor(Math.random()*1562) + 1303).toString(16);
        
        let id = parseInt(new1, 16) <= parseInt(696, 16) ? base2 + new1 : base + new1;
        
        return id;
    }

    const [show1, setShow1] = useState(randomId());
    const [show2, setShow2] = useState(randomId());
    const [status, setStatus] = useState(0);
    const [anime, setAnime] = useState([]); /* state with anime for results */

    const newIds = () => {
        let new1 = randomId();
        let new2 = randomId();
        
        while (new1 === new2){
            new1 = randomId();
            new2 = randomId();
        }

        setShow1(new1);
        setShow2(new2);

        // update status
        setStatus(status + 1);
    }

    useEffect(() => {
        /* if we chose 5 shows, call App's handler to update anime */
        if (status === 5){
            handler(anime);
        }
    }, [status])

    return (
      <div className="Quiz">
        {
            status < 5 ? /* let them choose 5 shows */
                <div className="Quiz">
                    <div onClick={(e) => newIds(e)}>
                        <Item id={show1} handler={(res) => setAnime(anime.concat(res))} />
                    </div>
                    <p><b>OR</b></p>
                    <div onClick={(e) => newIds(e)}>
                        <Item id={show2} handler={(res) => setAnime(anime.concat(res))} />
                    </div>
                </div>
            :
            <p><b>Quiz Complete! See your recommended anime below!</b></p>
        }
      </div>
    );
  }
  
  export default Quiz;
  