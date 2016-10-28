
$(document).ready(function () {
    var centered = $("#centeredNotification").kendoNotification({
        stacking: "down",
        show: onShowPopup,
        button: true
    }).data("kendoNotification");
});

function onShowPopup(e) {
    if (e.sender.getNotifications().length == 1) {
        var element = e.element.parent(),
            eWidth = element.width(),
            eHeight = element.height(),
            wWidth = $(window).width(),
            wHeight = $(window).height(),
            newTop, newLeft;

        newLeft = Math.floor(wWidth / 2 - eWidth / 2);
        newTop = Math.floor(wHeight / 2 - eHeight / 2);

        e.element.parent().css({ top: newTop, left: newLeft });
    }
}