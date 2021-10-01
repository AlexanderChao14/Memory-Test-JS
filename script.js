$(document).ready(function(){
    const gameCanvas = generateGameCanvas();
    const canvas = $(".Canvas");
    canvas.append(gameCanvas);
    const emojis = "😀 😍 🧐 😎 🥺 🤬 🐶 🐹 🦊 🐨 🙊".split(" ");
    let emojiElements = [];
    const viewWidth = canvas[0].offsetWidth + 'px';
    const viewHeight = canvas[0].offsetHeight + 'px';

    function clearCanvas() {
        gameCanvas.remove();
        const endGameCanvas = createEndCanvas();
        canvas.append(endGameCanvas);
    };

    document.getElementById('clearCanvas').onclick = () => {clearCanvas()};

    main(gameCanvas);

    function main (canvas) {
        const sequence = generateSequence(5);
        for(let i = 0; i < sequence.length; i++){
            addToCanvas(sequence[i], canvas);
        }
        genDic(sequence);
    };

    function genDic(sequence){
        var dic = {};
        sequence.forEach(emojiEl => {
            
            if(dic[emojiEl] == NaN || dic[emojiEl] == null){
                dic[emojiEl] =1;
            }
            else{
                dic[emojiEl]= dic[emojiEl]+1;
            }
            
        });

        console.log(dic);
        genAns(dic);
    
    }

    function genAns(dict){
        // console.log(Object.keys(dict).length);
        const ans = Math.floor(Math.random()* Object.keys(dict).length) 
        var emoAns= Object.keys(dict);
        var y = emoAns[ans];
        var amountAns = dict[y]
        console.log(ans)
        // console.log(Object.keys(dict))
        console.log(emoAns[ans])
        console.log(dict[y])
    }

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



    function appendElements(canvas, elements){
        elements.forEach(element => {
            canvas.append(element);
        });
    };

    function createEndCanvas(){
        const className = 'class=endgameContainer';
        const props = className;
        const html = "<div " + props + "> </div>";
        const endGameCanvas = $(html);
        appendElements(endGameCanvas, [ createTimer(), createCount(), createQuestion(), createCounter()]);
        return endGameCanvas;

        function createCount(){
            const className = 'class=countButton';
            const props = className;
            const html = "<div " + props + "></div>";
            const countDiv = $(html);
            const button = createCountButton();
            countDiv.append(button);
            
            return countDiv;

            function createCountButton(){
                const className = 'class=countButton';
                const id = "id=countButton";
                const props = className + id;
                const innerHtml = "Count Emoji";
                const html = "<div " + props + "> " + innerHtml + "</div>";
                return $(html);
            }
        }

        function createTimer(){
            const className = 'class=timer';
            const props = className;
            const innerHtml = "20s";
            const html = "<div " + props + "> " + innerHtml + "</div>";
            return $(html);
        }
    
        function createQuestion(){
            const className = 'class=question';
            const props = className;
            const innerHtml = "Count the number of times 🦊 appeared";
            const html = "<div " + props + "> " + innerHtml + "</div>";
            return $(html);
        }

        function createCounter(){
            const className = 'class=counter';
            const props = className;
            const innerHtml = "0";
            const html = "<div " + props + "> " + innerHtml + "</div>";
            return $(html);
        }
    }






})