
const {
    API_URL_IMG
 } = process.env;


const dogObject = (objDog,source) => {
    
    return {
        
        id: (source === 'db') ? objDog.uuid : objDog.id,
        name: nameToStandar(objDog.name),
        weight: (source === 'db') ? objDog.weight : objDog.weight.metric,
        height: (source === 'db') ? objDog.height : objDog.height.metric,
        life_span: objDog.life_span,
        image: (source === 'db') ?  '' : objDog.image.url,
        // image: (source === 'db') ?  '' : `${API_URL_IMG}${objDog.reference_image_id}.jpg`,
        temperament: (source === 'db') ? listDogTemperament(objDog.temperaments) : objDog.temperament,
        weightMin: (source === 'db') ? objDog.weightMin : getMin(objDog.weight.metric),
        heightMin: (source === 'db') ? objDog.heightMin : getMin(objDog.height.metric),
        life_spanMin: (source === 'db') ? objDog.life_spanMin : parseInt(objDog.life_span),
    }
}

const listDogTemperament = (temps) => {
    const temperaments =  temps.map(t => {
        return ' '+ t.temperament
    })
    return temperaments.toString().trim();
}

const getMin = (data) => {
    const arr = data.split('-')
    let value;
    if(arr.length>1){
        value = isNaN(Number(arr[0].trim())) ?  Number(arr[1].trim()) : Number(arr[0].trim())
    } else {
        value = isNaN(Number(arr[0].trim())) ?  0 : Number(arr[0].trim())
    }
    return value;
}

const nameToStandar = (name) => {
    const words = name.trim().split(' ');
    const standar = words.map(w =>{
       return w.split('').map((l,i) => i=== 0 ? l.toUpperCase() : l.toLowerCase()).join('')
       
        // console.log(w)
    } )
    return standar.join(' ');
  }



module.exports = {
    listDogTemperament,
    dogObject,
    getMin,
    nameToStandar
}