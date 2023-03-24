export const getTemps = (obj) => {


    const temperaments = obj.Temperaments;
    if (typeof temperaments === "string") {


        let tempName = temperaments.replaceAll(",", "||")
        return tempName
    } else {

        const tempName = temperaments.map(temp => temp.name)
        tempName.join().replaceAll(",", "||")
        return tempName
    }

}