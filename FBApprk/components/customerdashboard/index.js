'use strict';
app.customerdashboard = kendo.observable({
    onShow: function () { 
        $("#customerformModel").show();
        $(".km-header").hide();
    },
    afterShow: function () {

    },
    gotoproduct: function () {
        app.mobileApp.navigate("components/maincategory/view.html");
    },
    gotocustomerform: function () { 
        var testid = localStorage.getItem('testid');
        if (testid != 0)
        {
            var objdistincttest = JSON.parse(localStorage.getItem('distincttestdetails'));
            if (objdistincttest.length > 1) {
                $('#dvstartfeedback').show();
                $('#dvstartfeedbackprocess').hide();
                var message = 'Something went wrong...!';
                app.mobileApp.navigate("components/nofoundmessage/view.html?typevalue=" + message);
                return;
            }
            app.mobileApp.navigate("components/customerform/view.html");
        }
        else { 
            var message = 'There is no feedback form available now...!';
            app.mobileApp.navigate("components/nofoundmessage/view.html?typevalue=" + message);
        } 
    }
});


// START_CUSTOM_CODE_dashboard
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

 


// END_CUSTOM_CODE_dashboard 

// START_CUSTOM_CODE_dashboardModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_dashboardModel