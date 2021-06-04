import { useEffect, useState } from 'react';
import findPreferences from '../shared/algorithm';
import ResultItem from './ResultItem';

const Recommended = ({anime}) => {
    const BaseUrl = /* "http://localhost:8081/anime/query"; // */"https://anime-recommendator.herokuapp.com/anime/query"
    // use anime prop to get info about what we liked
    const [preferences, setPreferences] = useState({});
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (anime){
        setPreferences(findPreferences(anime));
      }
    }, [anime])

    useEffect(() => {
      // fetch
      if (!preferences || preferences.length === 0 || !preferences.Genres || preferences.Type === "" || preferences.Recommended === ""){
        return;
      }
      setLoading(true);
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
              setLoading(false);
              setRecommended(res);
            });
        // all of our preferences
    }, [preferences])

    return (
      <div className="Recommended">
        {
          recommended.length > 0 ?
            <div className="Recommended">
              <ResultItem anime={recommended[0]}/>
              <ResultItem anime={recommended[1]}/>
              <ResultItem anime={recommended[2]}/>
            </div>
          :
          loading ? 
          <div>
              <p><b>Loading Results.....</b></p>
            </div>
          :
            <div>
              <p><b>Complete the Quiz to Find Recommended Shows!</b></p>
            </div>
        }
      </div>
    );
  }
  
  export default Recommended;
  