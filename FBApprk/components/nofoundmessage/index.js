'use strict';

app.nofoundmessage = kendo.observable({
    onShow: function () {
        $(".km-header").show(); 
    },
    afterShow: function (e) {
        $("#spantypevalue").html(e.view.params.typevalue);
    }
});

// START_CUSTOM_CODE_nofoundmessage
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
 
// END_CUSTOM_CODE_customerformModel