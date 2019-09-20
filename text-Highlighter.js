export function textHighlighter(class_name) {
    var dataTextHighlighter = $('#page-add-info').data('textHighlighter'); /*получаем слова и фразы для выделения */
    if(dataTextHighlighter.indexOf('|')+1){
        var array = dataTextHighlighter.split("|"); /* преобразуем строку со словами в массив, для сортировки по длине */
    }
    else{
        array[0] = dataTextHighlighter;
    }
    var screening_modified1 = new RegExp("[-|$]?\\d+([.,]\\d{0,})?(%|x|X|&cent;|¢)?", "ig");

    array.forEach(function(item, i, array) {
        array[i]=item.replace(screening_modified1, 'obertka$&oberend');
    });

    array.sort(function(a, b){
        return b.length - a.length;
    });
    dataTextHighlighter=array.join("|"); /* сортированный массив, собираем обратно в строку, разделитель | */
    var screening_modified = dataTextHighlighter.replace(/\/|\.|\$|\+|\^|\*|\{|\}|\[|\]|\\|\(|\)/g, '\\$&'); /* экранируем спец. символы*/
    screening_modified="<sup.*?>.*?<\/sup>|<exception>.*?<\/exception>|<[^><[^]*?\=[^><[^]*?>|\\b("+screening_modified+")\\b";

    var dataTextHighlighterException ="";
    dataTextHighlighterException =dataTextHighlighterException+$('#page-add-info').data('textHighlighterException'); /*получаем стоп-фразы */
    if(dataTextHighlighterException.indexOf('|')+1){
        var array = dataTextHighlighterException.split("|"); /* преобразуем строку со словами в массив, для сортировки по длине */
    }
    else{
        array=[];
        array[0] = dataTextHighlighterException;
    }
    var dataTextHighlighterException1 = new RegExp("([-|$]?\\d+([.,]\\d{0,})?(%|x|X|&cent;|¢)?)", "ig");

    array.forEach(function(item, i, array) {
        array[i]=item.replace(dataTextHighlighterException1, 'obertka$&oberend');
    });
    array.sort(function(a, b){
        return b.length - a.length;
    });
    dataTextHighlighterException=array.join("|"); /* сортированный массив, собираем обратно в строку, разделитель | */
    dataTextHighlighterException1=dataTextHighlighterException.replace(/\/|\.|\$|\+|\^|\*|\{|\}|\[|\]|\\|\(|\)|\;/g, '\\$&');
    $("." + class_name).each(function () {
        if(dataTextHighlighterException) {
            var re_exception = new RegExp("\\b("+dataTextHighlighterException1+")\\b", "ig");
            var re_exception1 = new RegExp("([-|$]?\\d+([.,]\\d{0,})?(%|x|X|&cent;|¢)?)", "ig");
            var exception1 = $(this).html().replace(re_exception1, 'obertka$&oberend');
            var exception = exception1.replace(re_exception, '<exception>$&<\/exception>');
        }
        else{
            var re_exception1 = new RegExp("([-|$]?\\d+([.,]\\d{0,})?[%|x|X|&cent;|¢]?)", "ig");
            var exception = $(this).html().replace(re_exception1, 'obertka$&oberend');
        }
        var text = exception.replace(/<sup.*?>.*?<\/sup>|<exception>.*?<\/exception>|<[^><[^]*?\=[^><[^]*?>|(\b(obertka([-|$]?\d+([.,]\d{0,})?(%|x|X|&cent;|¢)?)oberend)\b)/g, (m, p1) => p1 ? `<b>${p1}<\/b>` : m);
        var re = new RegExp(screening_modified, "ig");
        text = text.replace(re, (m, p1) => p1 ? `<b>${p1}<\/b>` : m);
        text = text.replace(/<exception>|<\/exception>/g, '')
        text = text.replace(/obertka|oberend/g, '')
        $(this).html(text);
    });
}
