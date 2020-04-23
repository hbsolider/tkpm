const hbs = require('handlebars')

hbs.registerHelper('classdata', (data) => {
    let a = '';
    data.forEach((e, i) => {
        
        a += `<tr>
        <td>${i+1}</td>
        <td>${e.number}</td>
        <td>${e.description}</td>
        <td class="text-center">
            <a class='btn btn-info btn-xs' href="#">
                <i class="fas fa-edit" onclick="edit('${e._id}')"></i>
            </a>
            <a href="#" class="btn btn-danger btn-xs" onclick="return del('${e._id}')">
                <i class="fas fa-trash-alt"></i>
            </a>
            <a href="#" class="btn btn-danger btn-xs">
                <i class="fas fa-eye" onclick="view('${e._id}')"></i>
            </a>
        </td>
        </tr>`
    });
    return a;
})
hbs.registerHelper('studentdata',(data)=>{
    let a = '';
    data.forEach((e,i)=>{
        date = slitdate(e.birthday);
        var number =''
        if(e.class == 0){
            number +='not asigned'
        }else{
            number+=e.class;
        }
        a+=`<tr id='${e._id}'>
        <td>${i+1}</td>
        <td>${e.name}</td>
        <td>${date}</td>
        <td>${number}</td>
        <td>${e.address}</td>
        <td class="text-center editselect"><a class='btn btn-info btn-xs' onclick="return editS('${e._id}')" ><span
                    class="glyphicon glyphicon-edit"></span> Edit</a> <a onclick="return delS('${e._id}')"
                class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span> Del</a></td>
    </tr>`
    })
    return a;
})
hbs.registerHelper('selected',(data,check)=>{
    let a= '';
    if(check=='-1'){
        a+='<option selected>All</option>'
        for(var i =0 ;i<data.length;i++){
            d = data[i];
            a+=`<option value="${d}">${d}</option>`
        }
    }else{
        a+=`<option value ='-1'>All</option>`
        for(var i = 0;i<data.length;i++){
            d = data[i];
            if(data[i]==check){
               
                a+=`<option value="${d}" selected>${d}</option>`
            }else{
                a+=`<option value="${d}">${d}</option>`
            }
        }
    }
    return a;
})
function slitdate(date) {
    var dat = date.split('-');
    var a=dat[2]+'-'+dat[1]+'-'+dat[0];
    return a;
}
module.exports = hbs