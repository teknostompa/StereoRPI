$('.select').click(function(){
    var parent = this.parentElement;
    var number;
    var elems = parent.childNodes;
    for(var i = 0; i < 3; i++){
        console.log(elems.item(1));
        var elem = elems.item(i*2+1);
        if(elem == this){
            number = i;
        }
        elem.style.backgroundColor = "#333333";
    }
    this.style.backgroundColor = "#272727";
    document.getElementsByClassName("content")[0].scrollTop = 480*number;
    console.log(document.getElementsByClassName("content")[0].scrollTop);
})

$('.select:nth-child(1)').css('backgroundColor', '#272727')