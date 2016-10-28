'use strict';

app.productdetail = kendo.observable({
    onShow: function (e) {
       // alert('product detail');
        var id = e.view.params.id;
       // alert(id);
        $("#catalogid").html(id);
        loadproductdetail();
    },
    afterShow: function () {  
    },
    _FileonSuccess: function (value) {
        var obj = JSON.parse(value);
        var catalogid = $("#catalogid").html();
         var obj2 = JSON.parse(Enumerable.From(obj).Where("$.catalogid==" + catalogid).ToJSON());
        var prodlist = new kendo.data.DataSource({
            data: obj2
        }); 
        $("#productdetail-listview").kendoMobileListView({
            dataSource: prodlist, 
            template: $("#template-productdetail").html()
        }); 
    },
    _FileonError: function (error) {
        //alert('eee');
    }
}); 

 
// START_CUSTOM_CODE_thankyou
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function loadproductdetail() {
    var fileSystemHelper = new FileSystemHelper();
    var fileName = "rkproductdetails.txt";
    fileSystemHelper.readTextFromFile(fileName, app.productdetail._FileonSuccess,
    app.productdetail._FileonError);
}
// END_CUSTOM_CODE_thankyou