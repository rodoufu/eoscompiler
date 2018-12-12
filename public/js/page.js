const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/c_cpp");

$(document).ready(() => {
    $.get('/api/contract/0', (data) => {
        editor.setValue(atob(data));
    });

    $('pre code').each((i, block) => {
        hljs.highlightBlock(block);
    });
});
