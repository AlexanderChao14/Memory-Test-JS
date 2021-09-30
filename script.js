$(document).ready(function(){
    const gameCanvas = generateGameCanvas();
    const canvas = $(".Canvas");
    canvas.append(gameCanvas);
    const emojis = "😀 😍 🧐 😎 🥺 🤬 🐶 🐹 🦊 🐨 🙊".split(" ");
    let emojiElements = [];
    const viewWidth = canvas[0].offsetWidth + 'px';
    const viewHeight = canvas[0].offsetHeight + 'px';


    function endGameCanvas() {
        const className = 'class=endGameCanvas';
        const props = className;
        const html = "<div " + props + "> </div>";
        return $(html);
    };

    function clearCanvas() {
        gameCanvas.remove();
        endGameCanvas();
    };

    document.getElementById('clearCanvas').onclick = () => {clearCanvas()};

    main(gameCanvas);

    function main (canvas) {
        const sequence = generateSequence(5);
        for(let i = 0; i < sequence.length; i++){
            addToCanvas(sequence[i], canvas);
        }
    };

    function addToCanvas(emoji, canvas){
        element = makeEmojiElement(emoji);
        canvas.append(element);
        element.css('top', generateYPositionPercentage());
        
    }


    function makeEmojiElement(emoji){
        const className = "class='emoji'";
        const idNum = Math.floor(Math.random() * 10000);
        const id = "id=" + idNum;
        const props = className + id;
        const html = "<h1 " + props + "> " + emoji + " </h1>";
        const element = $(html);
        emojiElements.push(idNum);
        return element;
    } 

    function generateGameCanvas(){
        const className = 'class=GameCanvas';
        const props = className;
        const html = "<div " + props + "> </div>";
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

    document.getElementById('moveButton').onclick = () => {animate()};

    function animate() {
        console.log('animate');
        emojiElements.forEach(id => {
            let element = document.getElementById(id);
            anime({
                targets: element,  // switch to Element ID
                translateX: viewWidth,
                duration: Math.floor(Math.random() * (2000-1000) + 1000),     // generate a random time sequence
                easing: 'linear',
                delay: Math.random() * 2000,
                // can we add a delay so they all run animate at the beginning?
            });
        });

    }
})