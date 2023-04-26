export function wrap(text : string, columnWidth : number) : string{
    checkForColumnWidthLessThan1(columnWidth);
    
    if(checkForEmptyString(text)){
        return "";
    }

    if(checkForTextLengthIsLessOrEqualThanColumnWidth(columnWidth, text)){
        return text;
    }

    let result : string = "";
    let final : boolean = false;
    while(!final){

        let indexLastBlank = text.lastIndexOf(" ", columnWidth)

        if(indexLastBlank > -1){
            result += text.substring(0, indexLastBlank) + " \n"
            text = text.substring(indexLastBlank + 1)
        }
        else{
            result += text.substring(0, columnWidth) + "\n"
            text = text.substring(columnWidth)
        }

        if(checkForTextLengthIsLessOrEqualThanColumnWidth(columnWidth,text)){
            final = true;
            result += text;
        }
    }
    return result;
}

function checkForEmptyString(text : string){
    return text == null || text == "";
}

function checkForColumnWidthLessThan1(columnWidth : number){
    if(columnWidth < 1){
        throw new Error("Column Width must be greater than 0")
    }
}

function checkForTextLengthIsLessOrEqualThanColumnWidth(columnWidth : number, text : string){
    return columnWidth >= text.length
}