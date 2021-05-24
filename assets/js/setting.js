$('.form-input').on('click', '.js-delete-column', function () {
    let current = $(this),
        parent = current.parent().parent(),
        index = parent.index() + 1;
    current.closest('.js-form-edit').find('.form-row:nth-child(' + index + ')').remove();
})
$('.js-bt-add').on('click', function () {
    let formEdit = $('.js-form-edit'),
        template = $('.form-row-clone').clone();
    formEdit.append(template.html());
})
