const methodSelected = loadFromSession("detail-method-selected");
const directionList = loadFromSession(`directions-${mapKeyTranslator(methodSelected)}`);
directionList.forEach(function(line, index){
    $("#directions").append(`<p>${index+1} : ${line.instruction}`)
})