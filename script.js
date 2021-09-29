const emojis = "😀 😍 🧐 😎 🥺 🤬 🐶 🐹 🦊 🐨 🙊".split(" ");
function main (canvas) {
    const sequence = generateSequence(20);
    for(let i = 0; i < sequence.length; i++){
        addToCanvas(sequence[i], canvas);
    }
};

function addToCanvas(emoji, canvas){
    console.log(emoji)
    element = makeEmojiElement(emoji);
    canvas.append(element);
    element.css('top', generateYPositionPercentage());
    console.log(element);
}


function makeEmojiElement(emoji){
    const className = "class='emoji'";
    const idNum = Math.floor(Math.random() * 100);
    const id = "id=" + idNum;
    const props = className + id;
    const html = "<h1 " + props + "> " + emoji + " </h1>";
    return $(html);
} 

function generateYPositionPercentage(){
    return Math.floor(Math.random() * 90) + '%';
}


function generateSequence(size){
    let sequence = [];
    for(let i = 0; i < size ; i++){
        let emoji = emojis[Math.floor(Math.random() * emojis.length)];
        sequence.push(emoji);
    }
    return sequence;
}



$(document).ready(function(){
    const canvas = $(".Canvas")
    main(canvas);

})