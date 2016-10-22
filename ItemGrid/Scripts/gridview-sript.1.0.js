

$(document).ready(function () {
    loadData();
});

function searchData() {
    alert('hpnd');
}


function loadData() {
    $.ajax({
        url: "http://ramz:4545/api/item/GetItems",
        type: "GET",
        success: displayData,
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function displayData(gridData) {
    $.each(gridData, function (key, value) {
        $('#itemTbl tbody').append('<tr><td>' + value.ItemID + '</td><td>' + value.Description + '</td><td>' + value.Price + '</td><td><div class="editBtn">  <img type="button" src="Styles/Edit.ico" class="imgBtn btn" id="editBtn' + key + '"/></div></td><td><div class="deleteBtn"><img src="Styles/delete.png" class="imgBtn btn" id="deleteBtn' + key + '"/></div></td></tr>');

    });
}

$(document).on("click", "div.editBtn", function () {
    var row = $(this).closest("tr");
    var tds = $(row).find("td");
    for (var i = 0; i < tds.length; i++) {

        if(i<3)
        {
            var currentValue=$(tds[i]).html();
            $(tds[i]).html("<input class='cellEdit' type='text' value='" + currentValue + "'/>");
        }

        else if (i == 3) {
            $(tds[i]).html("<div class='btn-group form-inline'><div id='updateBtn'><img src='Styles/update.ico' class='imgBtn btn'/></div><div id='cancelBtn'><img src='Styles/cancel.ico' class='imgBtn btn'/></div></div>");
        }
        else {
            break;
        }
    }
});


//$(document).on("click", "div.deleteBtn", function () {
//    var row = $(this).closest("tr");
//    var tds = $(row).find("td");
//    for (var i = 0; i < tds.length; i++) {
//        if (i == 4) {
//            $(tds[i]).html("<div class='btn-group form-inline'><div id='updateBtn'><img src='Styles/update.ico' class='imgBtn btn'/></div><div id='cancelBtn'><img src='Styles/cancel.ico' class='imgBtn btn'/></div></div>");
//        }
//        else {
//            break;
//        }
//    }
//});

$(document).on("click", "div#updateBtn", function () {
    var row=$(this).closest('tr');
    var tds = $(row).find("td");
    var itemId;
    var description;
    var price;
    for (var i = 0; i < tds.length; i++) {


        switch(i) {
            case 0:
                itemId = $(tds[i]).find('input').val();
                $(tds[i]).html(itemId);
                break;
            case 1:
                description=  $(tds[i]).find('input').val();
                $(tds[i]).html(description);
                break;
            case 2:
                price=  $(tds[i]).find('input').val();
                $(tds[i]).html(price);
                break;
            case 3:
                var rowNum = $(this).parent().parent().children().index($(this).parent());
                $(tds[i]).html("<div class='editBtn'><img src='Styles/Edit.ico' class='imgBtn btn' id='editBtn" + rowNum + "'/></div></td>");
                break;

            default: break;
        }



    
    }
    var obj = { "ItemID": itemId, "Description": description, "Price":  price };

    $.ajax(
        {

            url: "http://localhost:52944/api/item/UpdateItem",
            type: "POST",
            //crossDomain: 'true',
            //contentType: 'application/json',
            data: obj,
            success: function (data) {
                console.log(data);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
                console.log(errorThrown);
            }

        });
    loadData();
});







