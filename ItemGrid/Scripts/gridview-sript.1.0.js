

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

function getDataById(itemId,rowNum) {
    $.ajax({
        url: "http://ramz:4545/api/Item/GetItem/"+itemId,
        type: "GET",
        success: function (rowData) {
            displayDataRow(rowData,rowNum);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

};



function displayDataRow(rowData, rowNum) {
    var row = $('#itemTbl tbody tr').eq(rowNum);
    var tds = $(row).find("td");
    for (var i = 0; i < tds.length; i++) {
        switch (i) {
            case 0:
                $(tds[i]).html(rowData.ItemID);
                break;
            case 1:
                $(tds[i]).html(rowData.Description);
                break;
            case 2:
                $(tds[i]).html(rowData.Price);
                break;
            case 3:

                $(tds[i]).html("<div class='editBtn'><img src='Styles/Edit.ico' class='imgBtn btn' id='editBtn" + rowNum + "'/></div></td>");
                break;
                case4:
                    $(tds[i]).html("<div class='deleteBtn'><img src='Styles/delete.png' class='imgBtn btn' id='deleteBtn" + rowNum + "'/></div></td>");
                break;

            default: break;
        }
    }
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
          if (i >0 && i<3) {
                var currentValue = $(tds[i]).html();
                $(tds[i]).html("<input class='cellEdit' type='text' value='" + currentValue + "'/>");
            }
            else if (i == 3) {
                $(tds[i]).html("<div class='btn-group form-inline'><div id='updateBtn'><img src='Styles/update.ico' class='imgBtn btn'/></div><div id='cancelBtn'><img src='Styles/cancel.ico' class='imgBtn btn'/></div></div>");
            }
            else {
                continue;
            }
        }
    });

    $(document).on("click", "div.deleteBtn", function () {
        var row = $(this).closest('tr');
        var rowNum = row.index();
        var tds = $(row).find("td");
        var itemId;
        for (var i = 0; i < tds.length; i++) {
            if (i == 0) {
                itemId = $(tds[i]).html();
            }
        }
        $.ajax(
          {
              url: "http://ramz:4545/api/item/DeleteItem/"+itemId,
              type: "DELETE",
              success: function (data) {
                  alert(data);
                  row.remove();
              },
              error: function (xmlHttpRequest, textStatus, errorThrown) {
                  console.log(textStatus);
                  console.log(errorThrown);
              }
          });            
    });


    $(document).on("click", "div#updateBtn", function () {
        var row = $(this).closest('tr');
        var rowNum = row.index();
        var tds = $(row).find("td");
        var itemId;
        var description;
        var price;
        for (var i = 0; i < tds.length; i++) {
            switch (i) {
                case 0:
                    itemId = $(tds[i]).html();
                    break;
                case 1:
                    description = $(tds[i]).find('input').val();
                    break;
                case 2:
                    price = $(tds[i]).find('input').val();
                    break;
                default: break;
            }

        }
        var obj = { "ItemID": itemId, "Description": description, "Price": price };

        $.ajax(
            {

                url: "http://ramz:4545/api/item/UpdateItem",
                type: "POST",
                data: obj,
                success: function (data) {
                    console.log(data);
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });

        getDataById(itemId, rowNum);
    });




$(document).on("click", "div#cancelBtn", function () {
    var row = $(this).closest('tr');
    var rowNum = row.index();
    var tds = $(row).find("td");
    var itemId;
    var description;
    var price;
    for (var i = 0; i < tds.length; i++) {

        if (i == 0) {
            itemId = $(tds[i]).html();
        }
        }
        getDataById(itemId, rowNum);
});







