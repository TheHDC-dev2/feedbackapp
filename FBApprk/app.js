'use strict';

(function (global) {
    var app = global.app = global.app || {};
    window.app = app;


    // using sql db for storing offline information 
    app.openDb = function () {
        if (window.sqlitePlugin !== undefined) {
            app.db = window.sqlitePlugin.openDatabase("feedbackApp1.0");
        } else {
            // For debugging in simulator fallback to native SQL Lite
            app.db = window.openDatabase("feedbackApp1.0", "1.0", "Cordova Demo", 200000);
        }
    };

    var bootstrap = function () {
     //  var os = kendo.support.mobileOS,
    //statusBarStyle = os.ios && os.flatVersion >= 700 ? 'white-translucent' : 'white';
        $(function () {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                //transition: 'slide',
                skin: 'nova',
                initial: 'components/home/view.html' 
                //statusBarStyle: statusBarStyle  
            });
        });
    };

    //$(document).ready(function () {
    //    var navigationShowMoreView = $('#navigation-show-more-view').find('ul'),
    //        allItems = $('#navigation-container-more').find('a'),
    //        navigationShowMoreContent = '';

    //    allItems.each(function (index) {
    //        navigationShowMoreContent += '<li>' + allItems[index].outerHTML + '</li>';
    //    });

    //    navigationShowMoreView.html(navigationShowMoreContent);
    //});

    //app.listViewClick = function _listViewClick(item) {
    //    var tabstrip = app.mobileApp.view().footer.find('.km-tabstrip').data('kendoMobileTabStrip');
    //    tabstrip.clear();
    //};

    if (window.cordova) {
        document.addEventListener('deviceready', function () {
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
            bootstrap();
        }, false);
    } else {
        bootstrap();
    }

    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li.active').removeClass('active');
        currentItem.addClass('active');
    };

    window.app = app;

    app.isOnline = function () {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };

    app.openLink = function (url) {
        if (url.substring(0, 4) === 'geo:' && device.platform === 'iOS') {
            url = 'http://maps.apple.com/?ll=' + url.substring(4, url.length);
        }

        window.open(url, '_system');
        if (window.event) {
            window.event.preventDefault && window.event.preventDefault();
            window.event.returnValue = false;
        }
    };

    /// start appjs functions
    /// end appjs functions
    app.showFileUploadName = function (itemViewName) {
        $('.' + itemViewName).off('change', 'input[type=\'file\']').on('change', 'input[type=\'file\']', function (event) {
            var target = $(event.target),
                inputValue = target.val(),
                fileName = inputValue.substring(inputValue.lastIndexOf('\\') + 1, inputValue.length);

            $('#' + target.attr('id') + 'Name').text(fileName);
        });

    };

    app.clearFormDomData = function (formType) {
        $.each($('.' + formType).find('input:not([data-bind]), textarea:not([data-bind])'), function (key, value) {
            var domEl = $(value),
                inputType = domEl.attr('type');

            if (domEl.val().length) {

                if (inputType === 'file') {
                    $('#' + domEl.attr('id') + 'Name').text('');
                }

                domEl.val('');
            }
        });
    };



    // I wanted a confirm button first opening setting, 
    app.checkconnection = function () {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';

        // $('#sp_connection_type').text(states[networkState] + " "  );
        // but not available now 
        if (states[networkState] == 'No network connection') {
            // alert("we do something");
            $("#h3errormessage").html(states[networkState] + " ");
            $("#modalview-error").kendoMobileModalView("open");
            $("#btnsignin").hide();
            return;
        }
        else {
            // alert('we do nothing! '); 
            $("#btnsignin").show();
        }
    }

    // create customer information for storing customer test details start 
    app.createtablecustomer = function () {
        var db = app.db;
        db.transaction(function (tx) {
            // tx.executeSql("DROP TABLE sl_SURVEY_CUSTOMER_TEST_INFO", []);
            tx.executeSql("CREATE TABLE IF NOT EXISTS sl_SURVEY_CUSTOMER_TEST_INFO(ID INTEGER PRIMARY KEY ASC,"
                + "STORE_MASTER_ID INTEGER,"
                + "TEST_ID INTEGER,"
                + "CNAME TEXT,"
                + "CEMAIL TEXT,"
                + "CMOBILE TEXT,"
                + "STATUS TEXT,"
                + " added_on BLOB)", []);
        });

    }

    app.createtablecustomerqa = function () {
        var db = app.db;

        db.transaction(function (tx) {
            //  tx.executeSql("DROP TABLE sl_SURVEY_CUSTOMER_TEST_QA_INFO", []);
            tx.executeSql("CREATE TABLE IF NOT EXISTS sl_SURVEY_CUSTOMER_TEST_QA_INFO(ID INTEGER PRIMARY KEY ASC,"
                + "CUSTOMER_TEST_INFO_ID INTEGER,"
                + "QUESTION_MASTER_ID INTEGER,"
                + "QUESTION_OPTION_MASTER_ID INTEGER,"
                + "QUESTION_OPTION_VALUE TEXT,"
                + " added_on BLOB)", []);
        });
    }



    app.addtocustomerinfor = function (store_master_id, test_id, cname, cemail, cmobile) {
        app.db.transaction(function (tx) {
            var addedOn = new Date();
            tx.executeSql("INSERT INTO sl_SURVEY_CUSTOMER_TEST_INFO(STORE_MASTER_ID,TEST_ID,CNAME ,CEMAIL,CMOBILE,STATUS,added_on) "
                + " VALUES (?,?,?,?,?,?,?)",
                          [store_master_id, test_id, cname, cemail, cmobile, 'Started', addedOn],
                          app.onSuccess,
                          app.onError);
        });
    }

    app.addtocustomerqainfor = function (customer_test_info_id, question_master_id, question_option_master_id, question_option_value) {
        app.db.transaction(function (tx) {
            var addedOn = new Date();
            tx.executeSql("INSERT INTO sl_SURVEY_CUSTOMER_TEST_QA_INFO(CUSTOMER_TEST_INFO_ID,QUESTION_MASTER_ID,QUESTION_OPTION_MASTER_ID ,QUESTION_OPTION_VALUE,added_on) "
                + " VALUES (?,?,?,?,?)",
                          [customer_test_info_id, question_master_id, question_option_master_id, question_option_value, addedOn],
                          app.onSuccess,
                          app.onError);
        });
    }

    app.tocompletecustomertest = function (customer_test_info_id) {
        app.db.transaction(function (tx) {
            var addedOn = new Date();
            tx.executeSql("UPDATE sl_SURVEY_CUSTOMER_TEST_INFO set added_on =?,  STATUS='Completed' WHERE ID =? ", [addedOn, customer_test_info_id],
                          app.onSuccess,
                          app.onError);
        });
    };

    app.deletecustomertestrecords = function () {
        app.db.transaction(function (tx) {
            tx.executeSql("delete from sl_SURVEY_CUSTOMER_TEST_INFO ", [],
                          app.onSuccess,
                          app.onError);
        });
    };

    app.deletecustomerqarecords = function () {
        app.db.transaction(function (tx) {
            tx.executeSql("delete from sl_SURVEY_CUSTOMER_TEST_QA_INFO ", [],
                          app.onSuccess,
                          app.onError);
        });
    };

    app.selectallcustomertestdetail = function (fn) {
        app.db.transaction(function (tx) {
            tx.executeSql("SELECT id,STORE_MASTER_ID,TEST_ID,CNAME ,CEMAIL,CMOBILE,STATUS,added_on FROM sl_SURVEY_CUSTOMER_TEST_INFO where STATUS='Completed'", [],
                          fn,
                          app.onError);
        });
    }

    app.selectallcustomertestqadetail = function (fn) {
        app.db.transaction(function (tx) {
            tx.executeSql("SELECT id,CUSTOMER_TEST_INFO_ID,QUESTION_MASTER_ID,QUESTION_OPTION_MASTER_ID ," +
            " QUESTION_OPTION_VALUE,added_on FROM sl_SURVEY_CUSTOMER_TEST_QA_INFO " +
            "where CUSTOMER_TEST_INFO_ID in (SELECT id FROM sl_SURVEY_CUSTOMER_TEST_INFO where STATUS='Completed')  ", [],
                          fn,
                          app.onError);
        });
    }

    app.onError = function (tx, e) {
        alert(e.message);
        console.log("Error: " + e.message);
        //  app.hideOverlay();
    }

    app.onSuccess = function (tx, r) {
        // console.log("Your SQLite query was successful!");
        // app.refresh();
        // app.hideOverlay();
    }

    // create customer information for storing customer test details end 



}(window));

function app_dbinit() {
    app.checkconnection();
    app.openDb();
    app.createtablecustomer();
    app.createtablecustomerqa();
}


// START_CUSTOM_CODE_kendoUiMobileApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_kendoUiMobileApp