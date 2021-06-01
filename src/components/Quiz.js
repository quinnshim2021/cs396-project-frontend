import Item from "./Item";
import { useEffect, useState } from "react"

const Quiz = ({ handler }) => {
    const [show1, setShow1] = useState("60aae2bc4796232c58097617");
    const [show2, setShow2] = useState("60aae2bc4796232c58097618");
    const [status, setStatus] = useState(0);
    const [anime, setAnime] = useState([]); /* state with anime for results */
    
    const newIds = () => {
        // generate random show id
        // 617 through c31
        
        let new1 = 0;
        let new2 = 0;
        const base = '60aae2bc4796232c58097';
        
        while (new1 === new2){
            new1 = ((Math.random()*1562) + 1559).toString(16);
            new2 = ((Math.random()*1562) + 1559).toString(16);

            if (new1.includes('.')){
                new1 = new1.split('.')[0];
            }
            if (new2.includes('.')){
                new2 = new2.split('.')[0];
            }
        }

        setShow1(base + new1);
        setShow2(base + new2);

        // update status
        setStatus(status + 1);
    }

    useEffect(() => {
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
            <p>Quiz Complete! See your results below!</p>
        }
      </div>
    );
  }
  
  export default Quiz;
  