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

module.exports = hbs