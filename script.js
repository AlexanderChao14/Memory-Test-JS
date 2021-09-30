$(document).ready(function(){
    const canvas = $(".Canvas");
    const emojis = "😀 😍 🧐 😎 🥺 🤬 🐶 🐹 🦊 🐨 🙊".split(" ");
    const viewWidth = canvas[0].offsetWidth + 'px';
    const viewHeight = canvas[0].offsetHeight + 'px';


    main(canvas);

    function main (canvas) {
        const sequence = generateSequence(10);
        for(let i = 0; i < sequence.length; i++){
            addToCanvas(sequence[i], canvas);
        }
    };

    function addToCanvas(emoji, canvas){
        element = makeEmojiElement(emoji);
        canvas.append(element);
        element.css('top', generateYPositionPercentage());
        
    }

    document.getElementById('moveButton').onclick = () => {animate()};

    function animate() {
        console.log('animate');
        anime({
            targets: '.emoji',  // switch to Element ID
            translateX: viewWidth,
            duration: 1500,     // generate a random time sequence
            easing: 'linear',
            // can we add a delay so they all run animate at the beginning?
        });
    }

    document.getElementById('resetEmojis').onclick = () => {resetEmojis()};
    function resetEmojis () {
        $('.emoji').css('transform', 'translateX(0px)');
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






})