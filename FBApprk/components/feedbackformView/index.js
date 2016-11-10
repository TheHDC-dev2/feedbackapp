'use strict'; 
app.feedbackformView = kendo.observable({
    onShow: function () { 
        localStorage.setItem("customerid", 1); 
    },
    afterShow: function () {
        var questiondetails = JSON.parse(localStorage.getItem("testdetails"));
        $("#spanquestionnumber").html('1');
        $("#btnnext").text('Next');
        var defaultquestion = 0;
        fun_displayquestion(defaultquestion);
        getlastcustomerid(); 
    },
     

    gotonext: function () {
        var defaultquestion = parseInt($("#spanquestionnumber").html());
        var inputid = "";
        var inputvalue = "";
        var question_type = $("#hdnquestion_type").val();
        var question_master_id = parseInt($('#hdnquestion_master_id').val());
        var question_option_master_id = 0;

        if (question_type == "Email-Address") {
            inputvalue = $("#txtmailaddres").val();
            if (inputvalue == "") {
                $("#h3errormessage").html('Enter email address!');
                $("#modalview-error").kendoMobileModalView("open");
                return;
            }
            else if (!checkmail(inputvalue)) {
                $("#h3errormessage").html('Enter valid email address!');
                $("#modalview-error").kendoMobileModalView("open");
                return;
            } else {
                app.addtocustomerqainfor($("#hdncustomer_test_info_id").val(), question_master_id, question_option_master_id, inputvalue);
            }
        }
        else if (question_type == "Text-SingleLine") {
            inputvalue = $("#textsingleline").val();
            if (inputvalue == "") {
                $("#h3errormessage").html('Enter your answer!');
                $("#modalview-error").kendoMobileModalView("open");
                return;
            }
            else {
                app.addtocustomerqainfor($("#hdncustomer_test_info_id").val(), question_master_id, question_option_master_id, inputvalue);
            }
        }
        else if (question_type == "Text-MultiLine") {
            $("#dvtextmultiline").show();
            inputvalue = $("#textmultiline").val();
            if (inputvalue == "") {
                $("#h3errormessage").html('Enter your answer!');
                $("#modalview-error").kendoMobileModalView("open");
                return;
            }
            else {
                app.addtocustomerqainfor($("#hdncustomer_test_info_id").val(), question_master_id, question_option_master_id, inputvalue);
            }
        }
        else if (question_type == "Website-URL") {
            inputvalue = $("#txtwebsiteurl").val();
            if (inputvalue == "") {
                $("#h3errormessage").html('Enter website url!');
                $("#modalview-error").kendoMobileModalView("open");
                return;
            }
            else if (!checkWebsiteURL(inputvalue)) {
                $("#h3errormessage").html('Enter valid website url!');
                $("#modalview-error").kendoMobileModalView("open");
                return;
            }
            else {
                app.addtocustomerqainfor($("#hdncustomer_test_info_id").val(), question_master_id, question_option_master_id, inputvalue);
            }
        }
        else if (question_type == "Pincode") {
            inputvalue = $("#txtpincode").val();
            if (inputvalue == "") {
                $("#h3errormessage").html('Enter pin code!');
                $("#modalview-error").kendoMobileModalView("open");
                return;
            }
            else if (!checkPincode(inputvalue)) {
                $("#h3errormessage").html('Enter valid pin code!');
                $("#modalview-error").kendoMobileModalView("open");
                return;
            }
            else {
                app.addtocustomerqainfor($("#hdncustomer_test_info_id").val(), question_master_id, question_option_master_id, inputvalue);
            }
        }
        else if (question_type == "Multi-Choice") {
            inputvalue = [];
            inputvalue = $("#dvmultichoice input[type='checkbox']:checked");

            inputid = [];
            if (inputvalue.length == 0) {
                $("#h3errormessage").html('Select an option for a question!');
                $("#modalview-error").kendoMobileModalView("open");
                return;
            }
            else {
                $(inputvalue).each(function (i) {
                    inputvalue[i] = $(this).val();
                    inputid[i] = $(this).attr('id');
                    app.addtocustomerqainfor($("#hdncustomer_test_info_id").val(), question_master_id, inputid[i], inputvalue[i]);
                });
            }
        }
        else if (question_type == "Single-Choice") {
            inputvalue = $("#dvsinglechoice input[type='radio']:checked").val();
            if (inputvalue == undefined || inputvalue == "") {
                $("#h3errormessage").html('Select an option for a question!');
                $("#modalview-error").kendoMobileModalView("open");
                return;
            }
            else {
                app.addtocustomerqainfor($("#hdncustomer_test_info_id").val(), question_master_id, inputid, inputvalue);
            }
        }
        else if (question_type == "True-False") {
            inputvalue = $("#dvtruefalse input[type='radio']:checked").val();
            if (inputvalue == undefined || inputvalue == "") {
                $("#h3errormessage").html('Select an option for a question!');
                $("#modalview-error").kendoMobileModalView("open");
                return;
            }
            else {
                app.addtocustomerqainfor($("#hdncustomer_test_info_id").val(), question_master_id, question_option_master_id, inputvalue);
            }
        }
        else if (question_type == "Yes-No") {
            inputvalue = $("#dvyesno input[type='radio']:checked").val();
            if (inputvalue == undefined || inputvalue == "") {
                $("#h3errormessage").html('Select an option for a question!');
                $("#modalview-error").kendoMobileModalView("open");
                return;
            }
            else {
                app.addtocustomerqainfor($("#hdncustomer_test_info_id").val(), question_master_id, question_option_master_id, inputvalue);
            }
        }
        fun_displayquestion(defaultquestion);
        defaultquestion = defaultquestion + 1;
        $("#spanquestionnumber").html(defaultquestion);
    }
});

function getlastcustomerid() {
    var render = function (tx, rs) {
        if (rs.rows.length == 0) {
            $("#hdncustomer_test_info_id").val(1);
        } else {
            $("#hdncustomer_test_info_id").val(rs.rows.item(0).ID);
        }
    }
    app.db.transaction(function (tx) {
        tx.executeSql("SELECT id FROM sl_SURVEY_CUSTOMER_TEST_INFO ORDER BY id desc limit 1", [],
					  render,
					  app.onError);
    });
}

function hideallcontrols() {
    $('input:checkbox').removeAttr('checked');
    $('input:radio').removeAttr('checked');
    $('#dvemailaddress').hide();
    $('#dvtextsingleline').hide();
    $('#dvtextmultiline').hide();
    $('#dvwebsiteurl').hide();
    $('#dvpincode').hide();
    $('#dvmultichoice').hide();
    $('#dvsinglechoice').hide();
    $('#dvyesno').hide();
    $('#dvtruefalse').hide();
    // Clear controls 
    $("#txtmailaddres").val('');
    $("#textsingleline").val('');
    $("#textmultiline").val('');
    $("#txtwebsiteurl").val('');
    $("#txtpincode").val('');
}

function fun_displayquestion(defaultquestion) {
    var questiondetails = JSON.parse(localStorage.getItem("testdetails"));
    var objdistinctquestions = JSON.parse(localStorage.getItem("distinctquestions"))[defaultquestion];
    var totalquestions = Enumerable.From(JSON.parse(localStorage.getItem("distinctquestions"))).ToArray().length;
    totalquestions = totalquestions - 1;
    if (defaultquestion == totalquestions) {
        $("#btnnext").html('Submit');
    } 
    if (objdistinctquestions == undefined)
    { 
        tocompletetest(); 
    }
    else
    {
        var objquestion = Enumerable.From(questiondetails)
            .Where("$.QUESTION_MASTER_ID==" + objdistinctquestions)
                .ToArray();
        var questionvalue = objquestion[0].QUESTION;
        var questionid = objquestion[0].QUESTION_MASTER_ID;
        $("#hdnquestion_master_id").val(questionid);

        $("#headerquestion").empty();
        $("#headerquestion").append('<h1> ' + questionvalue + ' </h1>');
        var input_type = objquestion[0].INPUT_TYPE;
        var question_type = objquestion[0].QUESTION_TYPE;
        var question_option_master_id = objquestion[0].QUESTION_OPTION_MASTER_ID
        $("#hdnquestion_type").val(question_type);
        if (question_type == "Email-Address") {
            hideallcontrols();
            $("#dvemailaddress").show();
        }
        else if (question_type == "Text-SingleLine") {
            hideallcontrols();
            $("#dvtextsingleline").show();
        }
        else if (question_type == "Text-MultiLine") {
            hideallcontrols();
            $("#dvtextmultiline").show();
        }
        else if (question_type == "Website-URL") {
            hideallcontrols();
            $("#dvwebsiteurl").show();
        }
        else if (question_type == "Pincode") {
            hideallcontrols();
            $("#dvpincode").show();
        }
        else if (question_type == "Multi-Choice") {
            hideallcontrols();
            $("#dvmultichoice").show();
            //Assigning Options 
            var options = Enumerable.From(questiondetails)
                 .Where("$.QUESTION_MASTER_ID==" + objdistinctquestions).ToJSON();
            $.each(JSON.parse(options), function (i, item) { 
                $("#dvmultichoice input[type='checkbox']").eq(i).attr('id', item.QUESTION_OPTION_MASTER_ID);
                $("#dvmultichoice input[type='checkbox']").eq(i).attr('name', questionid);
                $("#dvmultichoice label").eq(i).attr('for', item.QUESTION_OPTION_MASTER_ID);
                $("#dvmultichoice input[type='checkbox']").eq(i).attr('value', item.OPTION);
                $("#dvmultichoice label").eq(i).html(item.OPTION);
            });
        }
        else if (question_type == "Single-Choice") {
            hideallcontrols();
            $("#dvsinglechoice").show();
            //Assigning Options 
            var options = Enumerable.From(questiondetails)
                 .Where("$.QUESTION_MASTER_ID==" + objdistinctquestions).ToJSON();
            $.each(JSON.parse(options), function (i, item) {
                $("#dvsinglechoice input[type='radio']").eq(i).attr('id', item.QUESTION_OPTION_MASTER_ID);
                $("#dvsinglechoice input[type='radio']").eq(i).attr('name', questionid);
                $("#dvsinglechoice label").eq(i).attr('for', item.QUESTION_OPTION_MASTER_ID);
                $("#dvsinglechoice input[type='radio']").eq(i).attr('value', item.OPTION);
                $("#dvsinglechoice label").eq(i).html(item.OPTION);
            });
        }
        else if (question_type == "True-False") {
            hideallcontrols();
            $("#dvtruefalse").show();
        }
        else if (question_type == "Yes-No") {
            hideallcontrols();
            $("#dvyesno").show();
        }
    }
}

function tocompletetest() {
    if ($("#btnnext").text() == 'Submit') {
        app.tocompletecustomertest($("#hdncustomer_test_info_id").val());
        app.mobileApp.navigate("components/thankyou/view.html");
        return;
    }
}


 

// START_CUSTOM_CODE_feedbackformView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_feedbackformView


// START_CUSTOM_CODE_feedbackformViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_feedbackformViewModel