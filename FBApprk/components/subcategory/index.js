'use strict';

app.subcategory = kendo.observable({
    onShow: function (e) { 
        var id = e.view.params.id;
        $("#dvsubcatgories div[id^='dv']").hide();
        $('#dv' + id + '').show();
        $(".km-header").show();
      //  alert(e.view.params.name);
        localStorage.setItem("parentcategory_name", e.view.params.name);
        localStorage.setItem("categoryid", e.view.params.id); 
    },
    afterShow: function () {

        $('#headervaluesubcat').html(localStorage.getItem("parentcategory_name"));
    } 
}); 
  
// START_CUSTOM_CODE_thankyou
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_thankyou