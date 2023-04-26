export function wrap(text : string, columnWidth : number) : string{
    checkForColumnWidthLessThan1(columnWidth);
    if(checkForEmptyString(text)) return ""
    if(checkForTextLengthLessThanColumnWidth(columnWidth, text)) return text

    let indexLastBlank : number = text.lastIndexOf(" ", columnWidth);

    let split : number;
    let offset : number;
    let newLine : string = "\n";
    if(indexLastBlank > -1){
        split = indexLastBlank;
        offset = 1;
        newLine = " \n"
    }
    else{
        split = columnWidth;
        offset = 0;
    }

    return text.substring(0, split) + newLine + wrap(text.substring(split + offset), columnWidth);
}

function checkForEmptyString(text : string){
    return text == null || text == "";
}

function checkForColumnWidthLessThan1(columnWidth : number){
    if(columnWidth < 1) throw new Error("Column Width must be greater than 0")
}

function checkForTextLengthLessThanColumnWidth(columnWidth : number, text : string){
    return columnWidth > text.length
}