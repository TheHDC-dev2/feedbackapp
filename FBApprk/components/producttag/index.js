'use strict';

app.producttag = kendo.observable({
    onShow: function (e) {
        $(".km-header").show();
        localStorage.setItem("categoryid", e.view.params.categoryid);
        setTimeout(loadproducttags, 1000);
    },
    afterShow: function () {
        
       
    },
    _FileonSuccess: function (value) {
        
        var obj = JSON.parse(value);
        var obj2 = JSON.parse(Enumerable.From(obj).Where("$.Categoryid==" + localStorage.getItem("categoryid")).ToJSON());
       // alert(obj2[0].parentcategory_name); 
        //alert(JSON.stringify(obj2));
        //alert(localStorage.getItem("categoryid") + ":" + obj2[0].parentcategory_name + ":" + obj2[0].parentcategory_name);

        $('#headermainvalueproducttag').html(obj2[0].parentcategory_name);
        $('#headersubvalueproducttag').html(obj2[0].subcategory_name);
        if (obj2.length > 0) {
            var prodlist = new kendo.data.DataSource({
                data: obj2
            });

            $("#producttag-listview").kendoMobileListView({
                dataSource: prodlist,
                template: $("#template-productlist").text(),
                //filterable: {
                //    field: "cname",
                //    operator: "startswith",
                //    ignoreCase: true, // search for "foo" or "Foo" will return same item
                //    placeholder: "Type to search..."
                //},
                virtualViewSize: 100, // this configuration is needed to determine the items displayed, since the datasource does not (and should not) have paging set.
                 
            });
            $("img.lazy").lazyload();
        }
        else {
            $("#producttag-listview").html("There is no data on current page.");
        }
       // $("#headersubvalue").html("There is no data on current page."); 
    },
    _FileonError: function (error) {
        //alert('eee');
    }
});


// START_CUSTOM_CODE_thankyou
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function loadproducttags() {
    var fileSystemHelper = new FileSystemHelper();
    var fileName = "himalayaproductdetails.txt";
    fileSystemHelper.readTextFromFile(fileName, app.producttag._FileonSuccess,
    app.producttag._FileonError);
}

function gotoproductdetail(idval) {
    app.mobileApp.navigate("components/productdetail/view.html?id=" + idval + "&maincat=" + $('#headerpdttagmainvalue').html() + "&name=" + $('#headerpdttagsubvalue').html());
    // app.mobileApp.navigate("components/subcategory/view.html");
}
// END_CUSTOM_CODE_thankyou

app.productdetail = kendo.observable({
    onShow: function (e) {
        
        localStorage.setItem("catalogid", e.view.params.catalogid);
        localStorage.setItem("categoryid", e.view.params.categoryid);
        setTimeout(loadproductdetails, 1000);
    },
    afterShow: function (e) {
        
    },
    _FileonSuccess: function (value) {
        try {
            
            var obj = JSON.parse(value);
            var pdtde = JSON.parse(Enumerable.From(obj).Where("$.catalogid==" + localStorage.getItem("catalogid") + " && $.Categoryid==" + localStorage.getItem("categoryid")).ToJSON());
            //$('#headermainvalue').html(pdtde[0].parentcategory_name);
            //$('#headersubvalue').html(pdtde[0].subcategory_name);
            //alert(JSON.stringify(pdtde));
            $('#headermainvalueproductdetails').html(pdtde[0].parentcategory_name);
            $('#headersubvalueproductdetails').html(pdtde[0].subcategory_name);
            if (pdtde.length > 0) { 
                var prodlistdetails = new kendo.data.DataSource({
                    data: pdtde
                });
                $("#productdetail-listview").kendoMobileListView({
                    dataSource: prodlistdetails,
                    template: $("#template-productdetail").html()
                });
            }
            else {
                $("#productdetail-listview").html("There is no data on current page.");
            }
        }
        catch (err) {
            console.log("product detail : " + err);
        }
    }
    ,
    _FileonError: function (error) {
        console.log("product detail : " + err);
    }
});


// START_CUSTOM_CODE_thankyou
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function loadproductdetails() {
    var fileSystemHelper = new FileSystemHelper();
    var fileName = "himalayaproductdetails.txt";
    fileSystemHelper.readTextFromFile(fileName, app.productdetail._FileonSuccess,
    app.productdetail._FileonError);
}
// END_CUSTOM_CODE_thankyou