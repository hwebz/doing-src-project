$(document).ready(function () {
    $('input[name="CardNumber"]').on('keyup change', function () {
        $t = $(this);

        if ($t.val().length > 3) {
            $t.next().focus();
        }

        var card_number = $t.val();

        $('.credit-card-box .number').html(card_number.replace(/(....)(?=.)/g, "$1 "));
    });

    $('input[name="CardName"]').on('keyup change', function () {
        $t = $(this);
        $('.credit-card-box .card-holder div').html($t.val());
    });

    $('input[name="CardDate"]').on('keyup change', function () {
        $('.card-expiration-date div').html($(this).val());
    })

    $('input[name="CardCCV"]').on('focus', function () {
        $('.credit-card-box').addClass('hover');
    }).on('blur', function () {
        $('.credit-card-box').removeClass('hover');
    }).on('keyup change', function () {
        $('.ccv div').html($(this).val());
    });

    setTimeout(function () {
        $('input[name="CardCCV"]').focus().delay(1000).queue(function () {
            $(this).blur().dequeue();
        });
    }, 500);
});