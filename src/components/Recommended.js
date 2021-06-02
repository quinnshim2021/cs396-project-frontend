import { useEffect, useState } from 'react';
import findPreferences from '../shared/algorithm';

const Recommended = ({anime}) => {
    const BaseUrl = /* "http://localhost:8081/anime/query"; // */"https://anime-recommendator.herokuapp.com/anime/query"
    // use anime prop to get info about what we liked
    const [preferences, setPreferences] = useState({});
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
      setPreferences(findPreferences(anime));
    }, [anime])

    useEffect(() => {
      // fetch
      if (!preferences || preferences.length === 0 || !preferences.Genres || preferences.Type === "" || preferences.Recommended === ""){
        return;
      }
          fetch(BaseUrl, {method: "POST", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }, body: JSON.stringify(preferences)})
            .then(res => res.json())
            .then(result => {
              let res = [];
              for (let i = 0; i < 3; i++){
                let item = result[Math.floor(Math.random()*result.length-1)];
                res.push(item);
              }
              setRecommended(res);
            });
        // all of our preferences
    }, [preferences])

    return (
      <div className="Recommended">
        {
          recommended.length > 0 ?
            <div>
              {
                recommended.map((recommend) => {
                  return <p>{recommend.Title}</p>
                })
              }
            </div>
          :
            <div>
              <p>Complete the Quiz to Find Recommended Shows!</p>
            </div>
        }
      </div>
    );
  }
  
  export default Recommended;
  