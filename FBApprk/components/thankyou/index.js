'use strict';

app.thankyou = kendo.observable({
    onShow: function () {
        
    },
    afterShow: function () {
         setTimeout(pageredirect, 3000);
    }
    //,
    //gotodashboard: function () {
    //    app.mobileApp.navigate("components/dashboard/view.html");
    //},
    //gotoretest: function () {
    //    app.mobileApp.navigate("components/customerform/view.html");
    //}
});
function pageredirect() {
    app.mobileApp.navigate("components/dashboard/view.html");
}
// START_CUSTOM_CODE_thankyou
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_thankyou