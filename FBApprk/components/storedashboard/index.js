
'use strict'; 
app.storedashboard = kendo.observable({
    onShow: function () {
       
    },
    afterShow: function () {  
        app.createtablecustomer();
        app.createtablecustomerqa();
        var rendercustomertestdetail = function (tx, rs) {
            var valcustomertestdetail_string = []; 
            for (var i = 0; i < rs.rows.length; i++) {
                valcustomertestdetail_string.push(rs.rows.item(i));
            }  
            $("#hdnvalcustomertestdetail_string").val(JSON.stringify(valcustomertestdetail_string)); 
        }
        app.selectallcustomertestdetail(rendercustomertestdetail);

        var rendercustomerqadetail = function (tx, rs1) {
            var valcustomerqadetail_string = [];
            for (var i = 0; i < rs1.rows.length; i++) {
                valcustomerqadetail_string.push(rs1.rows.item(i));
            }
            $("#hdvalcustomerqadetail_string").val(JSON.stringify(valcustomerqadetail_string)); 
        }
        app.selectallcustomertestqadetail(rendercustomerqadetail);
    },
    gotostart: function () {
        // redirect to customer dashboard  
        app.mobileApp.navigate("components/dashboard/view.html");
    },
    pushtodb: function () {
        // push to all customer and its QA to Db
        // 14 empty in app and 4 empty in appbilder 
        //alert($("#hdnvalcustomertestdetail_string").val());
        if ($("#hdnvalcustomertestdetail_string").val().length == 0 || $("#hdnvalcustomertestdetail_string").val()=="[]") {
            $("#h3errormessage").html("There is no record to sync!");
            $("#modalview-error").kendoMobileModalView("open"); 
        }
        else {
            //alert(1);
            pushalldatatodb();
        } 
    }
});


function getallproductdetails() {


    try {
         var fileSystemHelper = new FileSystemHelper();
        var fileName = "rkproductdetails.txt"; 
        var productfulllist = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "https://api.everlive.com/v1/hdqghlo0hh1fhobk/Invoke/SqlProcedures/USP_Mobile_Get_ProductDetails",
                    type: "POST",
                    dataType: "json",
                    data: JSON.stringify({ "key": "value" })
                }
            },
            schema: {
                parse: function (response) {
                    var productinfo = response.Result.Data[0];
                    return productinfo;
                }
            }
        });
        productfulllist.fetch(function () {
             var data = this.data();
            fileSystemHelper.writeLine(fileName, JSON.stringify(data), app.onSuccess, app.onError);
           
        });
    }
    catch (err) {
        console.log("Trigger for Product Update : " + err);
    }
}

function pushalldatatodb() { 
    var pushtestdetails = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://api.everlive.com/v1/hdqghlo0hh1fhobk/Invoke/SqlProcedures/USP_Mobile_Insert_Customer_Test_Details",
                type: "POST",
                dataType: "json",
                data: {
                    "CustomerTest_String": $("#hdnvalcustomertestdetail_string").val(),
                    "CustomerTest_QA_String": $("#hdvalcustomerqadetail_string").val()
                }
            }
        },
        schema: {
            parse: function (response) {
                var pushtestdata = response.Result.Data[0];
                return pushtestdata;
            }
        }
    });
    startLoading();
    pushtestdetails.fetch(function () {
        var data = this.data();
        if (data[0].Result_Status == "1") {
            // to detele
            app.deletecustomertestrecords();
            app.deletecustomerqarecords();   
            $("#h3successmessage").html(data[0].Result_String);
            $("#modalview-success").kendoMobileModalView("open");
            $("#hdnvalcustomertestdetail_string").val('');
            $("#hdvalcustomerqadetail_string").val(''); 
            getallproductdetails();
            success
        }
        else { 
            $("#h3errormessage").html(data[0].Result_String);
            $("#modalview-error").kendoMobileModalView("open");
            adderrorlog(localStorage.getItem('storeid'),
                localStorage.getItem('testid'), data[0].Result_String, data[0].ErrorMessage);
        }

        hideLoader();
    });
}

function adderrorlog(store_master_id, test_id, errorkey, errormessage) {
    var errorlogds = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://api.everlive.com/v1/hdqghlo0hh1fhobk/Invoke/SqlProcedures/USP_Mobile_Upsert_ErrorLog",
                type: "POST",
                dataType: "json",
                data: {
                    "ID": 0,
                    "STORE_MASTER_ID": store_master_id,
                    "TEST_ID": test_id,
                    "ERRORKEY": errorkey,
                    "ERRORMESSAGE": errormessage,
                    "ErrorStatus": 1,
                }
            }
        },
        schema: {
            parse: function (response) {
                var errordetails = response.Result.Data[0];
                return errordetails;
            }
        }
    });

    errorlogds.fetch();
}

// START_CUSTOM_CODE_dashboard
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_dashboard 

// START_CUSTOM_CODE_dashboardModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_dashboardModel