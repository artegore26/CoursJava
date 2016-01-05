var nbCards = 16;
var _colors = [
    "#463ebb",
    "#330144",
    "#d0404b",
    "#43947a",
    "#20e9eb",
    "#c2146e",
    "#8fd5da",
    "#fcb09f"
];
var bWait = false;

//wait window loaded before excute some script
$(function() 
{
    //log message in console
    console.log("Page loaded");
    //call setGrid to generate all Cards
    //HUB();
    
    setGrid();
    setColors();
    addListeners();
    
});

function HUB()
{
    console.log("mission accomplie")
    var text = jQuery('<div class="textAlignUp"></div>')
    var overlay = jQuery('<div id="overlay"><div class="button"><div class="textAlign"></div></div></div>');
    overlay.appendTo(document.body);
    text.appendTo(document.body);
    $(".textAlignUp").text("Are you ready to play?")
    $(".textAlign").text("Start");
    $("#overlay").fadeOut;
    $("#overlay").fadeIn;

}

function setGrid()
{
    console.log("Generate Grid");
    
    //loop 16 time to generate each card
    for(var i = 0; i<nbCards; i++)
    {
        var aCard = '<div class="card" data-id="'+ i +'"><div class="content"></div></div>';
        $("#game-container").append(aCard);  
    }
}

function setColors()
{
    console.log("Set Colors");
    var _colorPairs = new Array(nbCards);

    for(var i = 0; i<nbCards; i++)
    {
        _colorPairs[i] = _colors[i%(nbCards/2)];
    }
    
    var _shufflePairs = new Array(nbCards);
    
    for(var i = 0; i<nbCards; i++)
    {
        var randomIndex = Math.floor(Math.random() * _colorPairs.length);
        
        _shufflePairs[i] = _colorPairs[randomIndex];
        
        _colorPairs.splice(randomIndex, 1);
    }
    
    
    $(".card .content").each(function(index)
    {
        $(this).css("background-color", _shufflePairs[index]);
    });
}


function addListeners()
{
    console.log("add Listeners");
    
    var currentSelection = null;
    
    $(".card").click(function(e)
    {
        if(bWait) return;
        
        if($(this).attr("data-find") == "true") return;
        
        if(!currentSelection)
        {
            currentSelection = $(this).attr("data-id");
            $(this).find(".content").addClass("open");
            return;
        }
        
        if(currentSelection == $(this).attr("data-id"))
        {
            console.log("same card");
            return;
        }
        
        console.log("new card");
        $(this).find(".content").addClass("open");
        
        var color1 = getColorById(currentSelection);
        var color2 = getColorById($(this).attr("data-id"));
        
        if( isSameColor(color1, color2) )
        {
            setFindById(currentSelection);
            setFindById($(this).attr("data-id"));
        }
        
        
        bWait = true;
        
        currentSelection = null;
        
        setTimeout(closeAllNotFind, 500);
    });
}

function closeAllNotFind()
{
    $('.card[data-find!="true"] .content').removeClass("open");
    bWait = false;
}

function getColorById(id)
{
    var $el = $('.card[data-id="'+id+'"]');
    
    var color = $el.find(".content").css("background-color");
    
    return color;
}

function isSameColor(c1, c2)
{
    if(c1 == c2) return true;
    
    else return false;
}

function setFindById(id)
{
    var $el = $('.card[data-id="'+id+'"]');
    
    $el.attr("data-find", true);
}