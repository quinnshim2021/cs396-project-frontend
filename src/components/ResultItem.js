import { useEffect, useState } from "react";
import error from './../error.jpeg';
import loadingGif from './../loading.gif';

const ResultItem = ({anime}) => {
    const [image, setImage] = useState(error);
    const [loading, setLoading] = useState(true);
    const [hovering, setHover] = useState(false);
    const loadingImage = loadingGif;
    const BaseCoverUrl = /* "http://localhost:8081/cover/"; // */ "https://anime-recommendator.herokuapp.com/cover/"

    /* get the image for the anime */
    useEffect(() => {
        setLoading(true);
        if (anime && anime.Title){
            (async() => {
                const words = anime.Title.replace(/[/]/g, " ").split(" ");
                let query = "";
                words.map((word) => query += word + "+")
                const BASEURL = BaseCoverUrl;
                fetch(BASEURL + query)
                    .then(res => res.json())
                    .then((result) => {
                        setImage(result);
                        setLoading(false);
                    })
                    .catch(() => {
                        setImage(error);
                        setLoading(false);
                    })
            })();
        } else {
            setImage(error);
            setLoading(false);
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
                    <p><b>Duration:</b> {anime.Duration + "\n"}</p>
                    <p><b>Number of Episdoes:</b> {anime.Episodes + "\n"}</p>
                    <p><b>Genres:</b> {formatGenres(anime.Genres) + "\n"}</p>
                    <p><b>Rating:</b> {anime.Rating + "\n"}</p>
                    <p><b>Status:</b> {anime.Status + "\n"}</p>
                    <p><b>Air Date:</b> {anime.StartAiring + "\n"}</p>
                    <p><b>Score:</b> {anime.Score + "/10\n"}</p>
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
  