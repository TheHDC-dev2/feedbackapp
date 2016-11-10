'use strict';

app.home = kendo.observable({
    onShow: function () {
        app_dbinit();
    },
    afterShow: function () {
        
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
            fun_checkstoreinfo(username, password); 
        }
    }
});



// START_CUSTOM_CODE_homeModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

function fun_checkstoreinfo(username, password) { 
    var storelogin = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://api.everlive.com/v1/zn4pzp5j7joaj6hq/Invoke/SqlProcedures/USP_Mobile_LoginCheck_GetTestDetailsByStoreId_GetProductDetails",
                type: "POST",
                dataType: "json",
                data: {
                    "StoreUserName": username, "StorePassword": password
                }
            }
        },
        schema: {
            parse: function (response) {
                var getstorelogin = response.Result.Data; 
                return getstorelogin;
            }
        }
    });
    
    $("#btnsignin").hide();
    $("#dvstartsigninprocess").show(); 
    storelogin.fetch(function () {
        var data = this.data(); 
        if (parseInt(data[0][0].STORE_MASTER_ID) > 0) { 
            $("#btnsignin").show();
            $("#dvstartsigninprocess").hide();
            localStorage.setItem("storeid", data[0][0].STORE_MASTER_ID); //store details 
            fun_checktestinfo(data[1]);//test details 
            getallproductdetails(data[2]); // product detalils 
            //redirect dashboard page 
            app.mobileApp.navigate("components/storedashboard/view.html");
        }
        else { 
            $("#btnsignin").show();
            $("#dvstartsigninprocess").hide();
            localStorage.setItem("storeid", 0);
            $("#h3errormessage").html('Invalid credentials!');
            $("#modalview-error").kendoMobileModalView("open");
        } 
    });
   
}


function fun_checktestinfo(data) {
    if (data[0].TEST_ID > 0) {
        var objdistincttest = Enumerable
            .From(data)
            .Select("$.TEST_ID")
            .Distinct().ToArray();
        // Assigining distinct testdetails in local
        localStorage.setItem("distincttestdetails", JSON.stringify(objdistincttest));

        // Assigining testdetails in local
        localStorage.setItem("testdetails", JSON.stringify(data));
        // Assigining distinct question in local
        var objdistinctquestions = Enumerable
            .From(data)
            .Select("$.QUESTION_MASTER_ID")
            .Distinct().ToArray();
        localStorage.setItem("distinctquestions", JSON.stringify(objdistinctquestions));
        localStorage.setItem("testid", data[0].TEST_ID);
    }
    else {
        localStorage.setItem("testid", 0);
    }
}

function getallproductdetails(data) {
    var fileSystemHelper = new FileSystemHelper();
    var fileName = "himalayaproductdetails.txt";
    fileSystemHelper.writeLine(fileName, JSON.stringify(data), app.onSuccess, app.onError);
}

// END_CUSTOM_CODE_homeModel