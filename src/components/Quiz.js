import Item from "./Item";
import { useEffect, useState } from "react"


/* still need to add help button to explain what to do */
const Quiz = ({ handler }) => {
    const randomId = () => {
        const base = '60aae2bc4796232c58097';
        // random number 617 through c31
        let new1 = ((Math.random()*1562) + 1559).toString(16);
        if (new1.includes('.')){
            new1 = new1.split('.')[0];
        }
        return base + new1;
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
                    <p>OR</p>
                    <div onClick={(e) => newIds(e)}>
                        <Item id={show2} handler={(res) => setAnime(anime.concat(res))} />
                    </div>
                </div>
            :
            <p>Quiz Complete! See your recommended anime below!</p>
        }
      </div>
    );
  }
  
  export default Quiz;
  