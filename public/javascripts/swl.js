

async function add(){
    let body=new Object();
    const { value: formValues } = await Swal.fire({
        title: 'Input Class',
        html: '<lable for="number">Number</lable><input id="swal-input1" class="swal2-input">'+
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
    body.description=formValues[1];
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/class/new",
        data: body,
        dataType: "json",
        success: function (res) {
            if(!res.check){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        }
    });
};

function edit(params) {
    console.log(params);
}
function del(params){
    console.log(params);
}