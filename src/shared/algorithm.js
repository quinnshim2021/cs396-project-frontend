/* recieve list of anime objects
    return anime preference object */
const findPreferences = (anime) => {
    const genres = {};
    const type = {};
    const rating = {};
    const preferences = {
        "Type": "",
        "Rating": "",
        "Genres": []
    };

    anime.forEach((a) => {
        let temp = a.Genres;
        
        if (a.Type in type){
            type[a.Type] += 1;
        }else{
            type[a.Type] = 1;
        }
        if (a.Rating in rating){
            rating[a.Rating] += 1;
        }else{
            rating[a.Rating] = 1;
        }


        // parse genres
        let words = temp.split(",");
        words.forEach((word) => {
            if (word in genres){
                genres[word] += 1;
            }
            else {
                genres[word] = 1;
            }
        });
    });

    // from stack overflow
    var sorted = [];
    for (let g in genres) {
        sorted.push([g, genres[g]]);
    }

    sorted.sort((a, b) => {
        return b[1] - a[1];
    });

    var sortedType = [];
    for (let g in type) {
        sortedType.push([g, type[g]]);
    }

    sortedType.sort((a, b) => {
        return b[1] - a[1];
    });

    var sortedRating = [];
    for (let g in rating) {
        sortedRating.push([g, rating[g]]);
    }

    sortedRating.sort((a, b) => {
        return b[1] - a[1];
    });

    if (sorted && sorted.length > 0){
        let count = 0;
        while (count < 3){
            if (sorted[count][0]){
                preferences["Genres"].push(sorted[count][0]);
                count += 1;
            }else{
                break;
            }
            
        }
    }
    if (sortedType && sortedType.length > 0){
        preferences["Type"] = sortedType[0][0];
    }
    if (sortedRating && sortedRating.length > 0){
        preferences["Rating"] = sortedRating[0][0];
    }


    return preferences;
};

export default findPreferences;