$(function() {

    function filler() {
        $.each($('input'), function(index, el) {
            $(el).val(~~(Math.random() * 1000000));
        });
        $('input[type="email"]').val('mail@example.com');
    }

    function showError(message) {
        $('.signup-error').show().text(message);
    }

    function signUp() {
        var formData = new FormData($('.form-signup')[0]);
        $.ajax({
                type: "POST",
                processData: false,
                contentType: false,
                url: "http://codeit.pro/frontTestTask/user/registration",
                data: formData,
                dataType: 'json'
            })
            .done(function(data) {
                console.log('data', data);
                if (data["status"]==="OK") {
                	console.log("Вышло");
                	window.location.replace("inner.html");
                }else{
                	showError(data["message"]);
                }

            });
    }



    function validate(event) {
        console.log("Handler for .submit() called.");
        event.preventDefault();

        $('.signup-error').hide();


        var $userField = $('.form-signup input[name="name"]');
        if ($userField.val().length === 0) {
            showError("Enter a valid username");
            return;
        }


        var $secondNameField = $('.form-signup input[name="secondname"]');
        if ($secondNameField.val().length === 0) {

            showError("Enter a valid Second name");
            return;
        }

        var $email = $('.form-signup input[name="email"]');
        console.log('$email', $email.val());
        var reEmail = new RegExp(/^[a-z0-9_\-\.]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}/);
        if (!reEmail.test($email.val())) {
            showError("Enter a valid email");
            return;
        }

        var $password = $('.form-signup input[name="pass"]');
        var rePassword = new RegExp(/[A-Za-z0-9_-]{6,18}$/);
        if (!rePassword.test($password.val())) {
            showError("Enter a valid password.min password length of 6,the max length of 18.Should contain upper and lower case. ");
            return;
        }


        var $checkbox = $('.form-signup input[type="checkbox"]');
        if (!$checkbox.is(':checked')) {
            showError("Please agree with conditions");
            return;
        }


        console.log($userField.val());
        console.log($secondNameField.val());
        signUp();
    }


    $(".form-block").submit(validate);

    filler();

});
