function closemodalviewerror() {
    $("#modalview-error").kendoMobileModalView("close");
}
function closemodalviewsuccess() {
    $("#modalview-success").kendoMobileModalView("close");
}

function validatealphawithspace(testvalue) {
    var expr = /^[a-zA-Z ]+$/;
    return expr.test(testvalue);
}
function validatealphawithoutspace(testvalue) {
    var expr = /^[a-zA-Z]+$/;
    return expr.test(testvalue);
}
function validatemobile10to14(testvalue) {
    var expr = /^\d{10,14}$;/
    return expr.test(testvalue);
}

function validatenumeric(testvalue) {
    var expr = /^[0-9]+$/;
    return expr.test(testvalue);
}

function checkmail(t) {
    if ("" != Trim(t)) {
        var e, i, n; n = 0;
        var o = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
        for (e = t.split(","), i = 0; i < e.length; i++) {
            var r = o.test(e[i]); 0 == r && (n += 1)
        }
        if (n >= 1)
            return !1;
        if (0 == n) return !0
    }
}


function checkWebsiteURL(t) {
    var urlregex = new RegExp(
           "^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
    return urlregex.test(t);
}


function checkPincode(t) {
    if ("" != Trim(t)) {
        if (parseInt(t.length) == 6) {
            return true;
        }
    }
    else { return false; }
}



function blockNonNumbers(t, e, i, n) {
    var o, r, a, s = !1; if (window.event ? (o = e.keyCode, s = window.event.ctrlKey) : e.which && (o = e.which, s = e.ctrlKey), isNaN(o)) return !0; if (r = String.fromCharCode(o), 8 == o || s) return !0; a = /\d/; var h = n ? "-" == r && -1 == t.value.indexOf("-") : !1, l = i ? "." == r && -1 == t.value.indexOf(".") : !1; return h || l || a.test(r)
}


function Trim(t) {
    for (; ;) { if (" " != t.charAt(0)) break; t = t.substr(1) } for (; ;)
    { if (" " != t.charAt(t.length - 1)) break; t = t.substr(0, t.length - 1) } return t
}

/* Loading popup start */
var showButton, interval, loaderElement;

function viewInit(e) {
    showButton = $("#loading").bind(kendo.support.mouseup, function () {
        showButton.animate({ opacity: 0 });
        startLoading();
    });

   // $("#loading") = kendo.mobile.application.pane.loader.element.find("h2");
} 
function hideLoader() {
    clearInterval(interval);
    kendo.mobile.application.hideLoading(); //hide loading popup
    kendo.mobile.application.changeLoadingMessage("Loading...");
    //alert(loaderElement);
    $("#spinner").removeClass('loaderHeading');
}

function viewHide(e) {
   // showButton.animate({ opacity: 1 });
    hideLoader();
}

function startLoading() { 
    hideLoader();
    var seconds = 5;

    $("#loading").addClass('loaderHeading');
    kendo.mobile.application.changeLoadingMessage(seconds + " seconds left!");

    kendo.mobile.application.showLoading(); //show loading popup

    interval = setInterval(function () {
        kendo.mobile.application.changeLoadingMessage(--seconds + " seconds left!"); //update text of the loading popup

        if (seconds == 0) {
           // showButton.animate({ opacity: 1 });
            hideLoader();
        }
    }, 1000);
}
/* Loading popup end */


// waiting image displaying while ajax request
//$body = $("body");
//$(document).on({

//    ajaxStart: function () { $("#spinner").show(); },
//    ajaxStop: function () { $("#spinner").hide(); },

//});
//$(document).ready(function () {
//!function ($) {
//    $.extend($.fn, {
//        busyIndicator: function (c) {
//            b = $(this);
//            var d = b.find(".k-loading-mask");
//            c ? d.length || (d = $("<div class='k-loading-mask'><span class='k-loading-text'>Loading...</span><div class='k-loading-image'/><div class='k-loading-color'/></div>").width(b.outerWidth()).height(b.outerHeight()).prependTo(b)) : d && d.remove()
//        }
//    });
//}(jQuery);

//$("#spinner").busyIndicator(true); // show
//$("#spinner").busyIndicator(false); // hide
//});