export const checkForm = (form, model) => {

    let isValid = true
    // Создание базового обьекта
    let validObj = Object.assign({},  ...Object.keys(form).map(el =>{
        if(Array.isArray(form[el])){
            return {[el] : form[el].map(field => {
                    const newFields = Object.assign({}, ...Object.keys(field).map(boolField => ({[boolField]: true})))
                    return newFields
                })}
        }
        return {[el]: true}
    } ))

    // Заполнение обьекта согласно схемы
    Object.assign(validObj, ...Object.keys(model).map(el => {
        if (Array.isArray(form[el])) {
            return {
                [el]: form[el].map((arrEl, i) => {
                    const newFields = Object.assign(validObj[el][i], ...Object.keys(model[el][0]).map(subField => {
                        return !!form[el][i][subField] ? {[subField]: true} : {[subField]: false}
                    }))
                    return newFields
                })
            }
        } else {
            return !!form[el] ? {[el]: true} : {[el]: false}
        }
        return {[el]: true}
    }))

    //Общая проверка по схеме
    isValid = Object.values(validObj).every(el => {
        if(Array.isArray(el)){
            return el.every(subElem => {
                return  Object.values(subElem).every(bool =>{
                    return bool
                } )
            })
        }
        return el
    })
    return {isValid, validObj}
}