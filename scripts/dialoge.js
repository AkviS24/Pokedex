function dialogOpen(dialogID) {
    document.getElementById(dialogID).classList.add('visible');
    document.getElementById("body-overlay").classList.add('visible');
}

function dialogClose(dialogId) {
    document.getElementById(dialogId).classList.remove('visible');
    document.getElementById("body-overlay").classList.remove('visible');
}