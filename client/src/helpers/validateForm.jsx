export const validateForm = (values, errors, input) => {
    const err = {}
    //    ^[a-zA-ZáéíóúüñÑ\s]*$ SOLO LETRAS ESPAÑOL
    //
    //    ^\d+$  => SOLO NUMEROS


    const keyName = Object.keys(input)[0] 
    switch (keyName) {
      case 'name':
        if(input.name ===''){
           err.name = `Please, enter the name`;
        } else {
          if(!/^[a-zA-Z\s]*$/.test(input.name)){
               err.name =`The name can only contain letters.`;
          }
        }    
        return err
      case 'addTemp':
          if(!/^[a-zA-Z\s]*$/.test(input.addTemp)){
            err.addTemp =`The temperament can only contain letters.`;
        }
        return err
      case 'weightMin':
      case 'weightMax':
      case 'heightMin':
      case 'heightMax':  
        if(!input[keyName]){
          err[keyName] = `Please, enter the value.`
        } else {
          
          if(!/^\d+$/.test(input[keyName])){
              err[keyName] =`Only positive numbers are allow.`;
          }
        }
        if(keyName === 'weightMax' && parseInt(values.weightMin)>= parseInt(input[keyName]) ) err[keyName] =`The maximum value must be greater then the minimum.`;
        if(keyName === 'heightMax' && parseInt(values.heightMin)>= parseInt(input[keyName]) ) err[keyName] =`The maximum value must be greater then the minimum.`;
        return err;
      case 'life_spanMin':
      case 'life_spanMax':
        if(!/^\d+$/.test(input[keyName])){
          err[keyName] =`Only positive numbers are allow`;
        }
        if(keyName === 'life_spanMax' && parseInt(values.life_spanMin)>= parseInt(input[keyName]) ) err[keyName] =`The maximum value must be greater then the minimum`;
  
        return err;
      default:
        
        
        let hasErrors = false;
        for (const key in errors) {
          
          if(errors[key]){
            console.log(errors[key])
            hasErrors=true
          }
          
        }
        if(!hasErrors) err.final=''
        else   err.final='The form contains errors.'
        return err; 
    }
  
  }