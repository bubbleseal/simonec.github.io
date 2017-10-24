var name_flag = false,
    email_flag = false,
    residence_flag = false,
    tel_flag = false,
    qualification_flag = false,
    location_flag = false;

$(document).ready(function () {

    getCountries();
    $(".invalid").hide();

    $("#InputName").focusout(validateName);
    $("#InputEmail").focusout(validateEmail);
    $("#residence").mouseup(validateResidence);
    $("#residence").on("mouseup keyup", validateResidence);
    $("#InputTel").focusout(validateTel);
    $("#highestQual").on("mouseup keyup", validateQualification);
    $("#courseLoc").on("mouseup keyup", validateLocation);

    $('button').click(function () {
        var qualification = $("#highestQual").val();

        validateName();
        validateEmail();
        validateResidence();
        validateTel();
        validateQualification();
        validateLocation();

        if (name_flag &&
            email_flag &&
            residence_flag &&
            tel_flag &&
            qualification_flag &&
            location_flag) {
            if (qualification == 0) {
                $("form").attr("action", "thankyou_x.html");
            } else {
                $("form").attr("action", "thankyou.html");
            }
            $("form").submit();
        }
    });

    //Change Calling code based on country
    //Disable course location
    $("#residence").change(function () {
        var input = $(this).val();
        updateCallCode(input);
    });
});


//Retrieve XML for countries list
function getCountries() {
    $.ajax({
        type: "GET",
        url: "countries.xml",
        success: function (xml) {
            $(xml).find('countries').find('country').each(function () {
                var c = $(this).text();
                var val = $(this).attr('code');
                $("#residence").append("<option value='" + val + "'>" + c + "</option>");
            });
        },
        error: function (xhr, status, error) {
            if (xhr.status == 404) { alert("There is a missing file."); }
        }
    });
}


//Update calling code based on selected country
function updateCallCode(input) {
    var code = input;
    $.ajax({
        type: "GET",
        url: "countries.xml",
        success: function (xml) {
            $(xml).find("countries").find("country").each(function () {
                if ($(this).attr("code") == code) {
                    var callcode = $(this).attr("callcode");
                    var continent = $(this).attr("continent");
                    $(".call-code").html("+" + callcode);

                    //Disable course location
                    if (continent != "europe") {
                        $(".courseLoc-con").hide().fadeOut("slow");
                        $('#courseLoc option:selected').val("online");
                        var value = $('#courseLoc').val();
                    }
                    else {
                        $(".courseLoc-con").show().fadeIn("slow");
                    }
                }
            });
        }
    });
}


//Validation for all fields
function validateName() {
    var name = $("#InputName").val();
    if (!/^[a-zA-Z\s]*$/.test(name) || name == '') {
        $(".name").show();
        name_flag = false;
    } else {
        $(".name").hide();
        name_flag = true;
    }
}

function validateEmail() {
    var email = $("#InputEmail").val();
    var ex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!ex.test(email) || email == '') {
        $(".email").show();
        email_flag = false;
    } else {
        $(".email").hide();
        email_flag = true;
    }
}

function validateResidence() {
    if ($("#residence").val() == "#") {
        $(".country").show();
        residence_flag = false;
    } else {
        $(".country").hide();
        residence_flag = true;
    }
}

function validateTel() {
    var tel = $("#InputTel").val();
    if (!/^\d+$/.test(tel) || tel == '') {
        $(".tel").show();
        tel_flag = false;
    } else {
        $(".tel").hide();
        tel_flag = true;
    }
}

function validateQualification() {
    if ($("#highestQual").val() == "#") {
        $(".qual").show();
        qualification_flag = false;
    } else {
        $(".qual").hide();
        qualification_flag = true;
    }
}

function validateLocation() {
    if ($("#courseLoc").val() == "#") {
        $(".location").show();
        location_flag = false;
    } else {
        $(".location").hide();
        location_flag = true;
    }
}