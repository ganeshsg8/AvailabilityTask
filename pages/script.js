$(function () {
    $('.datetimepickerInput').datetimepicker({
        format: 'DD/MM/YYYY hh:mm A',
        minDate: new Date()
    });

    $("form").submit(function () {
        event.preventDefault();
        var data = {
            startTime: $('#startTime').val(),
            endTime: $('#endTime').val(),
            userId: $('#userId').val()
        }
        ajaxRequest('/api/availability', 'POST', data, function (err, success) {
            if (err) {
                alert(err);
            } else {
                alert("success");
                // reload table
                loadTable();
            }
        })

    });
    loadTable();

});

function ajaxRequest(url, method, data, callback) {
    $.ajax({
        url: url,
        type: method,
        data: data ? JSON.stringify(data) : '',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (data, textStatus, jqXHR) {
            callback(null, data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('textStatus ', textStatus);
            console.log('errorThrown ', errorThrown);
            callback(errorThrown)
        }
    });
}

function loadTable() {

    ajaxRequest('/api/availability?userId=5edb5eba5ba4ce3a54697b93', 'GET', null, function (err, result) {
        if (err) {
            alert(err);
        } else {
            var records = result.records;
            var tbody = '';
            records.forEach(function (element) {
                tbody += `<tr>
                    <td class="dtRow" colspan=3>${moment(new Date(element.date)).format('DD/MM/YYYY')}</td>
                </tr>`;
                element.data.forEach(function (e) {
                    tbody += `<tr>
                        <td>${e.userId}</td>
                        <td>${moment(new Date(e.startTime)).format('hh:mm a')}</td>
                        <td>${moment(new Date(e.endTime)).format('hh:mm a')}</td>
                    </tr>`
                })
            })
            $('#tbody').html(tbody);
        }
    })

}