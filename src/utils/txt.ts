const countCharacter = (text:string, character:string) => {
    return(text.match(new RegExp(character, "g")) || []).length;
    
}
module.exports.countCharacter=countCharacter;