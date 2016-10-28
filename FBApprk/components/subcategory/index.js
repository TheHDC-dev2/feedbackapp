'use strict';

app.subcategory = kendo.observable({
    onShow: function (e) {
      //  alert('Sub');
        var id = e.view.params.id;
        // alert('#dv' + id + '');
        $("div[id^='dv']").hide();
        $('#dv' + id + '').show(); 
        $('#headervalue').html(e.view.params.name);
        //alert(e.view.params.name);
    },
    afterShow: function () { 
       // alert(id);
         //setTimeout(pageredirect, 3000);
    } 
});
function pageredirect() {
    app.mobileApp.navigate("components/dashboard/view.html");
}

function goback() {
    app.mobileApp.navigate("components/maincategory/view.html"); 
}
function gotoproductdetail(idval) {
    app.mobileApp.navigate("components/productdetail/view.html?id=" + idval);
    // app.mobileApp.navigate("components/subcategory/view.html");
}
// START_CUSTOM_CODE_thankyou
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_thankyou