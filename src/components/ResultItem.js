import { useEffect, useState } from "react";
import error from './../error.jpeg';
import loadingGif from './../loading.gif';

const ResultItem = ({anime}) => {
    const [image, setImage] = useState(error);
    const [loading, setLoading] = useState(true);
    const [hovering, setHover] = useState(false);
    const loadingImage = loadingGif;
    const BaseCoverUrl = /* "http://localhost:8081/cover/"; // */ "https://anime-recommendator.herokuapp.com/cover/"

    useEffect(() => {
        setLoading(true)
        if (anime && anime.Url){
            setImage(anime.Url)
            setLoading(false)
        } 
    }, [anime])

    const formatGenres = (genres) => {
        let res = "";
        let g = genres.split(",")
        for (let i = 0; i < g.length; i++){
            if (i === g.length-1){
                res += g[i]
            } else{
                res += g[i] + ", "
            }
        }
        return res;
    }

    return (
      <div className="Item" onMouseOver={(e) => {e.preventDefault(); setHover(true)}} onMouseLeave={(e) => {e.preventDefault(); setHover(false)}}>
          {
              loading ?
                <img 
                    src={loadingImage}
                    alt="if you're seeing this then oops, please reload the page"
                    />
              :
            hovering ?
                <div className={"Info"}>
                    <p><b>Type:</b> {anime.Type + "\n"}</p>                    
                    <p><b>Number of Episodes:</b> {anime.Episodes + "\n"}</p>
                    <p><b>Genres:</b> {formatGenres(anime.Genres) + "\n"}</p>
                </div>
            :
            <img 
                src={image}
                alt="if you're seeing this then oops, please reload the page"
                />
              
          }
          <p className={"title"}>{anime.Title}</p>
      </div>
    );
  }
  
  export default ResultItem;
  