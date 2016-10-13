$(function() {

    function filler() {
        $.each($('input'), function(index, el) {
            $(el).val(~~(Math.random() * 1000000));
        });
        $('input[type="email"]').val('mail@example.com');
    }

    function validate(event) {
        console.log("Handler for .submit() called.");
        event.preventDefault();

        $('.signup-error').hide();


        var $userField = $('.form-signup input[name="username"]');
        if ($userField.val().length === 0) {
            $('.signup-error').show().text("Enter a valid username");
            return;
        }


        var $secondNameField = $('.form-signup input[name="secondname"]');
        if ($secondNameField.val().length === 0) {
            $('.signup-error').show().text("Enter a valid Second name");
            return;
        }

        var $email = $('.form-signup input[name="email"]');
        console.log('$email', $email.val());
        var reEmail = new RegExp(/^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}/);
        if (reEmail.test($email.val())) {
            $('.signup-error').show().text("Enter a valid email");
            return;
        }

        var $password = $('.form-signup input[name="password"]');
        var rePassword = new RegExp(/[A-Za-z0-9]{6,}/);
        if (rePassword.test($password.val())) {
            $('.signup-error').show().text("Enter a valid password.min password length of 8,the max length of 20.Should contain upper and lower case + special characters. ");
            return;
        }


        // var $checkbox = $('.form-signup input[name="agreement"]');
        // if ($email.val().length === 0) {
        //     $('.signup-error').show().text("Enter a checkbox");
        // }




        console.log($userField.val());
        console.log($secondNameField.val());
    }


    $(".form-block").submit(validate);

    filler();

});
