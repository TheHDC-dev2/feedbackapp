'use strict';
app.customerform = kendo.observable({
    onShow: function () {
        app_dbinit();
        app.createtablecustomer();
    },
    afterShow: function () {
        $("#inputcname").val('');
        $("#inputcmail").val('');
        $("#inputcmobile").val('');
    },
    gotofeedbackform: function () {
        var fullname = $.trim($("#inputcname").val());
        var email = $.trim($("#inputcmail").val());
        var mobile = $.trim($("#inputcmobile").val());
        var validateflag = true;
        if (fullname == "") {
            $("#h3errormessage").html('Enter fullname!');
            $("#modalview-error").kendoMobileModalView("open");
            validateflag = false;
            return;
        }
        else if (fullname.length < 3) {
            $("#h3errormessage").html('Fullname should be atleast 3 character!');
            $("#modalview-error").kendoMobileModalView("open");
            validateflag = false;
            return;
        }
        else if (!validatealphawithspace(fullname)) {
            $("#h3errormessage").html('Fullname should be only alphabets and spaces!');
            $("#modalview-error").kendoMobileModalView("open");
            return;
        }
        else if ((email != "") && (!checkmail(email))) {
            $("#h3errormessage").html('Enter valid Email!');
            $("#modalview-error").kendoMobileModalView("open");
            validateflag = false;
            return;
        }
        else if (mobile == "") {
            $("#h3errormessage").html('Enter mobile number!');
            $("#modalview-error").kendoMobileModalView("open");
            validateflag = false;
            return;
        }
        else if (mobile.length < 10) {
            $("#h3errormessage").html('Mobile number should be 10 digits!');
            $("#modalview-error").kendoMobileModalView("open");
            validateflag = false;
            return;
        }
        if (validateflag) {
            fun_setcustomerinfor(fullname, email, mobile);
            app.mobileApp.navigate("components/feedbackformView/view.html");
        }
    }
});

// START_CUSTOM_CODE_customerform
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_customerform 
// START_CUSTOM_CODE_customerformModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

function fun_setcustomerinfor(fullname, email, mobile) {
    var storeid = localStorage.getItem('storeid');
    var testid = localStorage.getItem('testid');
    app.addtocustomerinfor(storeid, testid, fullname, email, mobile);
}
// END_CUSTOM_CODE_customerformModel