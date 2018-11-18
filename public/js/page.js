var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/c_cpp");

$(document).ready(function () {
    $.get('/api/contract/0', function (data) {
        editor.setValue(atob(data));
    });

    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
});
