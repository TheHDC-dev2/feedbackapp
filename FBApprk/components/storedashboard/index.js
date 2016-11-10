
'use strict'; 
app.storedashboard = kendo.observable({
    onShow: function () {
       
    },
    afterShow: function () {   
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
        app.mobileApp.navigate("components/customerdashboard/view.html");
    },
    pushtodb: function () {
        $('#dvstartsync').hide();
        $('#dvstartsyncprocess').show();
        if ($("#hdnvalcustomertestdetail_string").val().length == 0
            || $("#hdnvalcustomertestdetail_string").val() == "[]") {
            $("#h3errormessage").html("There is no record to sync!");
            $("#modalview-error").kendoMobileModalView("open");
            $('#dvstartsync').show();
            $('#dvstartsyncprocess').hide();
        }
        else { 
            // push to all customer and its QA to Db
            pushalldatatodb();
        } 
    }
});
 
function pushalldatatodb() { 
    var pushtestdetails = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://api.everlive.com/v1/zn4pzp5j7joaj6hq/Invoke/SqlProcedures/USP_Mobile_Insert_Customer_Test_Details",
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
        }
        else { 
            $("#h3errormessage").html(data[0].Result_String);
            $("#modalview-error").kendoMobileModalView("open");
            adderrorlog(localStorage.getItem('storeid'),
                localStorage.getItem('testid'), data[0].Result_String, data[0].ErrorMessage);
        } 
        $('#dvstartsync').show();
        $('#dvstartsyncprocess').hide(); 
        
    });
}

function adderrorlog(store_master_id, test_id, errorkey, errormessage) {
    var errorlogds = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://api.everlive.com/v1/zn4pzp5j7joaj6hq/Invoke/SqlProcedures/USP_Mobile_Upsert_ErrorLog",
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