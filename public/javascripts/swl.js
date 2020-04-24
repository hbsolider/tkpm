

async function add() {
    let body = new Object();
    const { value: formValues } = await Swal.fire({
        title: 'Input Class',
        html: '<lable for="number">Number</lable><input id="swal-input1" class="swal2-input">' +
            '<lable for="Description">Description</lable><input id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value
            ]
        }
    })
    body.name = formValues[0];
    body.description = formValues[1];
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/class/new",
        data: body,
        dataType: "json",
        success: async function (res) {
            console.log(res)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            location.reload()
        },
        error: function (e) {
            console.log(e);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    });
};


//* student add new student
$(document).ready(() => {
    const frm = $('#addstudentcc')
    $('#submit3').click(function (e) {
        $('#addstudentcc').submit();
    });
    $('#addstudentcc').on('submit', (e) => {
        e.preventDefault();
        const url = frm.attr('action')
        const data = frm.serialize()
        $.ajax({
            type: "post",
            url: url,
            data: data,
            dataType: "json",
            success: async (response) => {
                successSwal('Add sucess')

            },
            error: async (e) => {
                const json = JSON.parse(e.responseText)
                Swal.fire({
                    text: json.error,
                    title: 'OOPS!',
                    icon: 'error',
                    timer: 1000
                })

            }

        });
    });

})
//! class
function del(id) {
    $.ajax({
        type: "DELETE",
        url: `/class/delete/${id}`,
        dataType: "json",
        success: async function (response) {
            successSwal('Delete success!')
        },
        error: function (e) {
            console.log(e)
        }
    });
}

function view(id) {
    window.location.href = `http://localhost:3000/academy/${id}`
}

//! student
function editS(id) {

    tempedit(() => {
        $('#editinvisible').click()

        $('#submit1').click(() => {
            $('#updatestudentcc').submit();
        })

    })
    const frm = $('#updatestudentcc')
    $('#updatestudentcc').on('submit', (e) => {
        e.preventDefault();
        const url = frm.attr('action')
        const data = frm.serialize()
        $.ajax({
            type: "PUT",
            url: url + `/${id}`,
            data: data,
            dataType: "json",
            success: async function (response) {
                successSwal('Update Success !!')
            },
            error: function (e) {
                alert(e);
            }

        });
    })
}

function tempedit(callback) {
    $("#tablestudent").on('click', '.editselect', async function () {
        // get the current row
        var currentRow = $(this).closest("tr");

        var namecr = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value
        var classcrr = currentRow.find("td:eq(3)").html(); // get current row 3rd table cell  TD value
        var birtdaycrr = slitx(currentRow.find("td:eq(2)").html()).toString();
        var addresscr = currentRow.find("td:eq(4)").html();
        $('#nameU').val(namecr);
        document.getElementById("datepickerU").value = birtdaycrr;
        $('#classU').val(classcrr);
        $('#addressU').val(addresscr)
    });
    callback();
}
function delS(id) {
    $.ajax({
        type: "DELETE",
        url: `/student/delete/${id}`,
        dataType: "json",
        success: async function (response) {
            successSwal('Delete success!')
        },
        error: function (e) {
            console.log(e)
        }
    });
}
function clone() {
    $.ajax({
        type: "post",
        url: "/student/clone",
        dataType: "json",
        success: function (response) {
            successSwal('Clone success');
        }
    });
}
$('document').ready(() => {

    $('#chooseclass select').on('change', function (e) {
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
        console.log(valueSelected)
        if (valueSelected == '-1') {
            window.location.href = `http://localhost:3000/academy`
        } else {
            window.location.href = `http://localhost:3000/academy/${valueSelected}`
        }

    });

})

function successSwal(title) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: `${title}`
    })
    location.reload();
}
function slitx(data) {
    var dat = data.split('-');
    var a = dat[2] + '-' + dat[1] + '-' + dat[0];
    return a;
}