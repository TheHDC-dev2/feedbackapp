'use strict';

app.home = kendo.observable({
    onShow: function () {
        app_dbinit();
    },
    afterShow: function () {
        //$('#btnsignin').removeClass('loaderHeading'); 
    },

    checksignin: function () { 
        var username = $.trim($("#inputEmail").val());
        var password = $.trim($("#inputPassword").val());
        if (username == "") {
            $("#h3errormessage").html('Enter a valid Username!');
            $("#modalview-error").kendoMobileModalView("open");
        }
        else if (password == "") {
            $("#h3errormessage").html('Enter Password!');
            $("#modalview-error").kendoMobileModalView("open");
        }
        else { 
            // check username and password in db  
            //$('#btnsignin').hide();
            fun_checkstoreinfo(username, password);
            //$('#btnsignin').show();
        }
    }
});



// START_CUSTOM_CODE_homeModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

function fun_checkstoreinfo(username, password) { 
    var storelogin = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://api.everlive.com/v1/hdqghlo0hh1fhobk/Invoke/SqlProcedures/USP_Mobile_Select_Survey_Login",
                type: "POST",
                dataType: "json",
                data: {
                    "StoreUserName": username, "StorePassword": password
                }
            }
        },
        schema: {
            parse: function (response) {
                var getstorelogin = response.Result.Data[0]; 
                return getstorelogin;
            }
        }
    });
    startLoading();
    storelogin.fetch(function () {
        var data = this.data();
        
        if (parseInt(data[0].STORE_MASTER_ID) > 0) {
           // alert(data[0].STORE_MASTER_ID);
            localStorage.setItem("storeid", data[0].STORE_MASTER_ID);
            //redirect dashboard page 
            app.mobileApp.navigate("components/storedashboard/view.html");
        }
        else {
           // alert(data[0].STORE_MASTER_ID);
            localStorage.setItem("storeid", 0);
            $("#h3errormessage").html('Invalid credentials!');
            $("#modalview-error").kendoMobileModalView("open");
        }
        hideLoader();
    });
   
}

// END_CUSTOM_CODE_homeModel