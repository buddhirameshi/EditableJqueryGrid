var itemDataURL = 'http://ramz:4545/api/item/';
var pageId = 1;
var dataLoad = [];
var pageSize = 5;


$(document).ready(function () {
    loadData();
});



$(document).on("click", "div.editBtn", function () {
    var row = $(this).closest("tr");
    var rowNum = row.index();
    var tds = $(row).find("td");
    for (var i = 0; i < tds.length; i++) {
        if (i > 0 && i < 3) {
            var currentValue = $(tds[i]).html();
            $(tds[i]).html("<input id='edit" + rowNum + i + "' type='text' value='" + currentValue + "'/>");
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
          url: itemDataURL + "DeleteItem/" + itemId,
          type: "DELETE",
          success: function (data) {

              dataLoad = dataLoad.filter(function (item) {
                  return item.ItemID != itemId;
              });
              displayData(dataLoad);
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
    var isValidPrice;
    var isValidDesc;
    for (var i = 0; i < tds.length; i++) {
        switch (i) {
            case 0:
                itemId = $(tds[i]).html();
                break;
            case 1:
                description = $(tds[i]).find('input').val();
                isValidDesc = checkDescription('edit' + rowNum + i);
                break;
            case 2:
                price = $(tds[i]).find('input').val();
                isValidPrice = checkPrice('edit' + rowNum + i);
                break;
            default: break;
        }

    }
    if (isValidDesc && isValidPrice) {
        var obj = { "ItemID": itemId, "Description": description, "Price": price };
        $.ajax(
            {
                url: itemDataURL + "UpdateItem",
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
    }
});


$('#addNewPrice').focusout(function () {
    checkPrice('addNewPrice');
});

$('#addNewDescription').focusout(function () {
    checkDescription('addNewDescription');
});

$(document).on('focusout', '#itemTbl tbody tr td:nth-child(2) input', function () {
    var id=$(this).attr('id');
   checkDescription(id);
});

$(document).on('focusout', '#itemTbl tbody tr td:nth-child(3) input', function () {
    var id = $(this).attr('id');
    checkPrice(id);
});




$('#addBtn').click(function () {
    var price = $('#addNewPrice').val();
    var description = $('#addNewDescription').val();
    var isValidDesc = checkDescription('addNewDescription');
    var isValidPrice = checkPrice('addNewPrice');
    if (isValidDesc && isValidPrice) {
        var obj = { "ItemID": 0, "Description": description, "Price": price };
        $.ajax(
            {
                url: itemDataURL + "InsertItem",
                type: "POST",
                data: obj,
                success: function (data) {
                    loadData();
                    //  displayData(dataLoad);
                    isValidDescription = false;
                    isvalidPrice = false;
                    $('#addNewPrice').val('');
                    $('#addNewDescription').val('');
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
    }
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
        source: function (request, response) {
            $.ajax({
                url: itemDataURL + "GetItems",
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
        .append("<a>" + item.label + "</a>")
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


/*Reusable Functions regon*/

function loadData() {
    $.ajax({
        url: itemDataURL + "GetItems",
        type: "GET",
        success: function (data) {
            dataLoad = data;
            displayData(data);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function getDataById(itemId, rowNum) {
    $.ajax({
        url: itemDataURL + "GetItem/" + itemId,
        type: "GET",
        success: function (rowData) {
            displayDataRow(rowData, rowNum);
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
    $('.page-bar input').remove();

    var begin = (pageId - 1) * pageSize;
    var end = (pageId) * pageSize;
    var filtered = $(gridData).slice(begin, end);

    $.each(filtered, function (key, value) {
        $('#itemTbl tbody').append('<tr><td>' + value.ItemID + '</td><td>' + value.Description + '</td><td>' + value.Price + '</td><td><div class="editBtn">  <img type="button" src="Styles/Edit.ico" class="imgBtn btn" id="editBtn' + key + '"/></div></td><td><div class="deleteBtn"><img src="Styles/delete.png" class="imgBtn btn" id="deleteBtn' + key + '"/></div></td></tr>');
    });
    setPages(gridData.length);
}

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

function setPages(itemCount) {
    var pageCount = 0;
    pageCount = (itemCount / pageSize).ceil();
    if (pageCount > 1 && pageId < pageCount && pageId > 1) {
        $('.page-bar').append('<input class="text-primary input-lg pageNum" id="home" value="<<" type="button"/><input class="text-primary input-lg pageNum" id="prev" value="<" type="button"/>');

        for (var i = 1; i <= pageCount; i++) {

            $('.page-bar').append('<input class="text-primary input-lg pageNum" id="' + i + '" value="' + i + '" type="button"/>');
        }
        $('.page-bar').append('<input class="text-primary input-lg pageNum" id="next" value=">" type="button"/><input class="text-primary input-lg pageNum" id="end" value=">>" type="button"/>');
    }
    else if (pageId == 1 && pageCount > 1) {
        for (var i = 1; i <= pageCount; i++) {
            $('.page-bar').append('<input class="text-primary input-lg pageNum" id="' + i + '" value="' + i + '" type="button"/>');
        }
        $('.page-bar').append('<input class="text-primary input-lg pageNum" id="next" value=">" type="button"/><input class="text-primary input-lg pageNum" id="end" value=">>" type="button"/>');

    }
    else if (pageId == pageCount && pageCount > 1) {
        $('.page-bar').append('<input class="text-primary input-lg pageNum" id="home" value="<<" type="button"/><input class="text-primary input-lg pageNum" id="prev" value="<" type="button"/>');

        for (var i = 1; i <= pageCount; i++) {
            $('.page-bar').append('<input class="text-primary input-lg pageNum" id="' + i + '" value="' + i + '" type="button"/>');
        }

    }
    $(document).find('input[id="' + pageId + '"]').addClass('selected');
}

$(document).on("click", "input.pageNum", function () {
    var selectedPage = $(this).val();
    if (selectedPage == '<<') {
        pageId = 1;
    }
    else if (selectedPage == '<') {
        pageId--;
    }
    else if (selectedPage == '>') {
        pageId++;
    }
    else if (selectedPage == '>>') {
        pageId = (dataLoad.length / pageSize).ceil();
    }
    else {
        pageId = selectedPage;
    }
    displayData(dataLoad);

});

function checkDescription(elementId) {
    var isValidDescription;
    var element = document.getElementById(elementId);
    var description = element.value;
    if (description == '' || description == 'undefined') {
        isValidDescription = false;
        if (element.className != 'error') {

            element.className += 'error';
        }

        //element.append('<spand>Please enter a valid description</span>');
    }
    else if (description.length > 50) {
        isValidDescription = false;
        if (element.className != 'error') {

            element.className += 'error';
        }

     //   element.append('<spand>Max allowed character limit is 50</span>');
    }
    else {
        isValidDescription = true;
        if (element.className == 'error') {

            element.className -= 'error';
        }

     //   element.removeChild('span');
    }
    return isValidDescription;

}

function checkPrice(elementId) {
    var isValidPrice;
    var element = document.getElementById(elementId);
    var currency_regex = /^\$?(\d*)(\.?\d{0,4})$/;
    var price = element.value;
    if (price == '' || price == 'undefined') {
        isValidPrice = false;
        if (element.className != 'error') {

            element.className += 'error';
}
        //$(elementId).append('<spand>Please enter a valid price</span>');

    }
    else if (!currency_regex.test(price)) {
        isValidPrice = false;
        if (element.className != 'error') {

            element.className += 'error';
        }
       // $(elementId).append('<spand>Please enter a valid currency value</span>');
    }
    else {
        isValidPrice = true;
        if (element.className == 'error') {
            element.className -= 'error';
        }
     //   $(elementId + ' span').remove();
    }
    return isValidPrice;
}



Number.prototype.ceil = function () {
    return Math.ceil(this);
}

function Item(ItemId, Description, Price) {
    this.itemId = ItemId;
    this.price = Price;
    this.description = Description;
    this.checkPrice = function () {
        var currency_regex = /^\$?(\d*)(\.?\d{0,4})$/;
        if (this.price == '' || this.price == 'undefined')
        {
            return 'Please enter a valid price';
        }
        else if (!currency_regex.test(this.price)) {
            return 'Please enter a valid currency value';
        }
        else {
            return true;
        }

    }
    this.checkDescription = function()
    {
        if (this.description == '' || this.description == 'undefined') {
            return 'Please enter a valid description';
        }
        else if (this.description.length > 50) {
            return 'Max allowed character limit is 50';
        }
        else {
            return true;
        }

}

}

/*End of reusable functions region*/