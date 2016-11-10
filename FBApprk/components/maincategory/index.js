'use strict';

app.maincategory = kendo.observable({
    onShow: function () {
        //alert('main');
      //  setTimeout(timewaiting, 2000);
    },
    afterShow: function () {
         //setTimeout(pageredirect, 3000);
    } 
});
 


// START_CUSTOM_CODE_thankyou
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function gotosubcategory(idval, name) {
    // alert(ee);
    app.mobileApp.navigate("components/subcategory/view.html?id=" + idval + "&name=" + name);
}

// END_CUSTOM_CODE_thankyou