'use strict';

app.producttag = kendo.observable({
    onShow: function (e) {
       // alert('product tag');
        var id = e.view.params.id;
        $("#ccategory").html(id);
        loadproductdetails();
    },
    afterShow: function () {
    },
    _FileonSuccess: function (value) {
        var obj = JSON.parse(value);
         var categoryid = $("#ccategory").html();
        //var categoryid = 61;
        //alert(categoryid);
        var obj2 = JSON.parse(Enumerable.From(obj).Where("$.ccategory==" + categoryid).ToJSON());
        if (obj2.length > 0) {
            var prodlist = new kendo.data.DataSource({
                data: obj2
            });

            $("#filterable-listview").kendoMobileListView({
                dataSource: prodlist,
                template: $("#template-productlist").text(),
                filterable: {
                    field: "cname",
                    operator: "startswith",
                    ignoreCase: true, // search for "foo" or "Foo" will return same item
                    placeholder: "Type to search..."
                },
                virtualViewSize: 100, // this configuration is needed to determine the items displayed, since the datasource does not (and should not) have paging set.
                 
            });
        }
        else {
            $("#filterable-listview").html("There is no data on current page.");
        }
    },
    _FileonError: function (error) {
        //alert('eee');
    }
});


// START_CUSTOM_CODE_thankyou
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function loadproductdetails() {
    var fileSystemHelper = new FileSystemHelper();
    var fileName = "rkproductdetails.txt";
    fileSystemHelper.readTextFromFile(fileName, app.producttag._FileonSuccess,
    app.producttag._FileonError);
}

function gotoproducttag(idval) {
    app.mobileApp.navigate("components/producttag/view.html?id=" + idval);
    // app.mobileApp.navigate("components/subcategory/view.html");
}
// END_CUSTOM_CODE_thankyou