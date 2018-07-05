function isDefined(element) {
    return typeof element !== 'undefined' && element.length > 0;
}

function checkPaxs(context, plusBtn, minusBtn, current) {
    debugger;
    if (context) {
        if (current == 0) {
            context.parent().find(minusBtn).addClass('disabled');
        } else {
            context.parent().find(minusBtn).removeClass('disabled');
        }
    } else {
        $(minusBtn).each(function(idx, item) {
            $this = $(item);
            var cur = parseInt($this.parent().find('>p').text(), 10);
            if (cur == 0) {
                $this.addClass('disabled');
            } else {
                $this.removeClass('disabled');
            }
        })
    }
}

function paxSelectorAction(context, plusBtn, minusBtn, isIncrement, label) {
    var current = parseInt(label.text(), 10);
    if (!isNaN(current)) {
        if (isIncrement) {
            current += 1;
        } else if (!isIncrement && current > 0) {
            current -= 1;
        }
        label.text(current);
    }

    checkPaxs(context, plusBtn, minusBtn, current);
}