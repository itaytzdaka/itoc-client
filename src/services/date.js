
export function dateToString(date, format) {
    if(!date) return;
    
    if(typeof date == "string"){
        date=new Date(date);
    }

    console.log(date);

    if(format==="dd.mm.yyyy")
        return `${addZero(date.getDate())}.${addZero(date.getMonth()+1)}.${date.getFullYear()}`;
    if(format==="dd.mm.yy")
        return `${addZero(date.getDate())}.${addZero(date.getMonth()+1)}.${date.getFullYear().toString().slice(2,4)}`;
    if(format==="dd.mm")
        return `${addZero(date.getDate())}.${addZero(date.getMonth()+1)}`;
    if(format==="hd")
        return `${dateGetDay(date)}`;
    if(format==="hd dd.mm")
        return `${dateGetDay(date)} ${addZero(date.getDate())}.${addZero(date.getMonth()+1)}`;
    if(format==="hd dd.mm.yy")
        return `${dateGetDay(date)} ${addZero(date.getDate())}.${addZero(date.getMonth()+1)}.${date.getFullYear().toString().slice(2,4)}`;
    if(format==="hd dd.mm.yyyy")
        return `${dateGetDay(date)} ${addZero(date.getDate())}.${addZero(date.getMonth()+1)}.${date.getFullYear()}`;
    return ``;
}

export function dateGetDay(date){
    if(!date) return;
    if(typeof date == "string"){
        date=new Date(date);
    }

    const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
    return days[date.getDay()];
}

export function dateToSqlFormat(date){
    if(!date) return;
    
    if(typeof date == "string"){
        date=new Date(date);
    }

    return `${date.toJSON().slice(0, 10)} 07:00:00`;

}

function addZero(num){
    num=num.toString();
    return num.length==1? `0${num}` : num;
}

export function getHebrewDate(dayNumber,monthNumber){
    const days = [`א`,`ב`,`ג`,`ד`,`ה`,`ו`,`ז`,`ח`,`ט`,`י`,`י"א`,`י"ב`,`י"ג`,`י"ד`,`ט"ו`,`ט"ז`,`י"ז`,`י"ח`,`י"ט`,`כ`,`כ"א`,`כ"ב`,`כ"ג`,`כ"ד`,`כ"ה`,`כ"ו`,`כ"ז`,`כ"ח`,`כ"ט`,`ל`];
    const months = ["ניסן","אייר","סיון","תמוז","אב","אלול","תשרי","חשון","כסלו","טבת","שבט","אדר","אדר ב"];
    return `${days[dayNumber-1]} ${months[monthNumber-1]}`;
}