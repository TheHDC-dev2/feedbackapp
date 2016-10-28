'use strict'; 
app.dashboard = kendo.observable({
    onShow: function () {
        //alert('dash');
      
    },
    afterShow: function () {   
    },
    gotoproduct: function () { 
         app.mobileApp.navigate("components/maincategory/view.html");
    },
    gotocustomerform: function () {
        var storeid = localStorage.getItem('storeid'); 
        // check test details based on store id in db  
        fun_checktestinfo(storeid); 
    } 
});
 

// START_CUSTOM_CODE_dashboard
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
 
function fun_checktestinfo(storeid) {
    var testdetails = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://api.everlive.com/v1/hdqghlo0hh1fhobk/Invoke/SqlProcedures/USP_Mobile_Get_TestDetailsByStoreId",
                type: "POST",
                dataType: "json",
                data: {
                    "StoreId": storeid
                }
            }
        },
        schema: {
            parse: function (response) {
                var gettestdetails = response.Result.Data[0];
                return gettestdetails;
            }
        }
    });
    startLoading();
    testdetails.fetch(function () {
        var data = this.data();
        //alert(data);
        if (data[0].TEST_ID > 0) {

            //var objdistincttest = Enumerable
            //    .From(data)
            //    .Select("$.TEST_ID")
            //    .Distinct().ToArray();
            //if (objdistincttest.length > 1) {
            //    $("#h3errormessage").html('Please Contact administrator.!');
            //    $("#modalview-error").kendoMobileModalView("open");
            //    return;
            //}

            // Assigining testdetails in local
            localStorage.setItem("testdetails", JSON.stringify(data));
            // Assigining distinct question in local
            var objdistinctquestions = Enumerable
                .From(data)
                .Select("$.QUESTION_MASTER_ID")
                .Distinct().ToArray();
            localStorage.setItem("distinctquestions", JSON.stringify(objdistinctquestions));

            localStorage.setItem("testid", data[0].TEST_ID);

            //redirect customerform page 
            app.mobileApp.navigate("components/customerform/view.html");
        }
        else {
            app.mobileApp.navigate("components/nofoundmessage/view.html?typevalue=feedback");
        }
        hideLoader();
    });
  
}
 

// END_CUSTOM_CODE_dashboard 

// START_CUSTOM_CODE_dashboardModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_dashboardModel