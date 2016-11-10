'use strict';

app.thankyou = kendo.observable({
    onShow: function () {
        
    },
    afterShow: function () {
         setTimeout(gotocustomerdashboard, 3000);
    } 
});

// START_CUSTOM_CODE_thankyou
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function gotocustomerdashboard() {
    app.mobileApp.navigate("components/customerdashboard/view.html");
}
// END_CUSTOM_CODE_thankyou