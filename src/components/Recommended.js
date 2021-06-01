const Recommended = ({anime}) => {
    console.log(anime)
    return (
      <div className="Recommended">
        {
          anime.length === 5 ?
            <div>
              <p>Do algo here</p>
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
  