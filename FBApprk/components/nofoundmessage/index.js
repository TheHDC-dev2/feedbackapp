'use strict';

app.nofoundmessage = kendo.observable({
    onShow: function () { },
    afterShow: function (e) {
        $("#typevalue").html(e.view.params.typevalue);
    }
});

// START_CUSTOM_CODE_nofoundmessage
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_nofoundmessage

// START_CUSTOM_CODE_customerform
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_customerform 
// START_CUSTOM_CODE_customerformModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_customerformModel