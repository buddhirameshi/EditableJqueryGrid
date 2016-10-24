var itemDataURL = 'http://ramz:4545/api/item/';

$(document).ready(function () {
    loadData();
});

function searchData() {
    alert('hpnd');
}


function loadData() {
    $.ajax({
        url: itemDataURL+"GetItems",
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
        url: itemDataURL+"GetItem/"+itemId,
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
    $("#itemTbl tbody tr").remove();
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
                break;
            }
        }
        $.ajax(
          {
              url: itemDataURL+"DeleteItem/"+itemId,
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

                url: itemDataURL+"UpdateItem",
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
            break;
        }
        }
        getDataById(itemId, rowNum);
});


$(function () {
    $("#searchId").autocomplete({
        minLength: 0,
        source: function(request,response)
        {
            $.ajax({
                url: itemDataURL+"GetItems",
                type: "GET",

                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                data: {
                    filter: request.term,
                },
                success: function (data) {                 
                    var array = $.map(data, function (item) {
                                            return {
                                                label: item.Description,
                                                value: item.ItemID
                                            }
                                        });
                    response($.ui.autocomplete.filter(array, request.term));
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#searchId").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            $("#itemDescription").html(ui.item.label);
            return false;
        }
    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {
        ul.addClass("search");
        return $("<li'>")
        .append("<a>"+ item.label +  "</a>")
        .appendTo(ul);
    };
});


$("#searchId").focusout(function () {
    var str = $(this).val();
    searchedResults(str);
});
$('#searchBtn').on("click", function () {
    var str = $('#searchId').val();
    searchedResults(str);
});


function searchedResults(str) {
    $.ajax({
        url: itemDataURL + "GetItems",
        type: "GET",

        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        data: {
            filter: str,
        },
        success: displayData,
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);

        }
    });
}











