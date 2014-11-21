$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val(),
                email = $("input#email").val(),
                message = $("textarea#message").val();

            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            var button = $("#send-btn").attr("disabled", "disabled");

            $.ajax({
                url: "http://getsimpleform.com/messages/ajax?form_api_token=78df0a2763e793a7da433aa26bd8a765",
                dataType: 'jsonp',
                data: {
                    name: name,
                    email: email,
                    message: message
                },
                cache: false
            }).done (function(result, status) {
                if (result.success) {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Sua mensagem foi enviada :) Obrigado! </strong>");
                    $('#success > .alert-success')
                        .append('</div>');
                    $('#contactForm').trigger("reset");                        
                } else {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>" + firstName + ", algo deu errado. Poderia tentar novamente?");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                }

                button.removeAttr("disabled");
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
