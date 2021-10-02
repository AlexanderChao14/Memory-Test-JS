const delay = 5000;
const minDuraction = 5000;
const maxDuration = 10000;
let sequenceSize = 5;
const endScreenTimer = 10;

$(document).ready(function(){
    const gameCanvas = generateGameCanvas();
    const canvas = $(".Canvas");
    let round = 2;

    const emojis = "😀 😍 🧐 😎 🥺 🤬 🐶 🐹 🦊 🐨 🙊".split(" ");
    let emojiElements = [];
    const viewWidth = canvas[0].offsetWidth;
    const viewHeight = canvas[0].offsetHeight + 'px';
    let sequence = [];

    startNewRound(round);

    function startNewRound (limit) {
        canvas.append(gameCanvas);
        sequence = generateSequence(limit, sequenceSize);
        console.log(sequence);
        for(let i = 0; i < sequence.length; i++){
           appendEmojiToCanvas(sequence[i], canvas);
        }
        document.getElementById('moveButton').style.display="block";       
    };

    function setRound(didWin){
        if(didWin){
            round = round + 1;
            sequenceSize = sequenceSize +2;
            console.log('won');
        }else{
            round = 2;
            sequenceSize = 5;
        }
        console.log("round: ", round);
    }

    function loadEndScreen() {
        gameCanvas.remove();
        const endGameCanvas = createEndCanvas();
        canvas.append(endGameCanvas);
    };

    function appendEmojiToCanvas(emoji, canvas){
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


    function generateSequence(limit, sequenceSize){
        let sequence = [];
        if(limit > emojis.length) limit = emojis.length;
        for(let i = 0; i < sequenceSize; i++){
            let emoji = emojis[Math.floor(Math.random() * limit)];
            sequence.push(emoji);
        }
        return sequence;
    }

    document.getElementById('moveButton').onclick = () => {animate()};

    function animate() {
        document.getElementById('moveButton').style.display="none";
        console.log('animate');
        var totalTime=0;
        emojiElements.forEach(id => {
            let element = document.getElementById(id);
            var randDur = Math.floor(Math.random() * (maxDuration-minDuraction) + minDuraction);
            var randDelay = Math.random() * delay
            if(totalTime < (randDelay+randDur)){
                totalTime = randDelay+randDur;
            }
            anime({
                targets: element,  // switch to Element ID
                translateX: viewWidth + 100 + 'px',
                duration: randDur,     // generate a random time sequence
                easing: 'linear',
                delay: randDelay,
                // can we add a delay so they all run animate at the beginning?
                complete: function(){
                    console.log('complete animation for: ', element);
                    element.remove();
                }
            });
        });

        setTimeout(function(){
            console.log("Loading Question");
            emojiElements = [];
            loadEndScreen();
        }, totalTime+250)
    }



    function appendElements(canvas, elements){
        elements.forEach(element => {
            canvas.append(element);
        });
    };

    function createEndCanvas(){
        const question = genDic(sequence);
        console.log('question', question);
        const className = 'class=endgameContainer';
        const props = className;
        const html = "<div " + props + "> </div>";
        const endGameCanvas = $(html);
        appendElements(endGameCanvas, [ createTimer(endScreenTimer), createCount(incrementCounter), createQuestion(question.QuestionEmoji), createCounter()]);
        countDown(() => {
            displayResults();
        });
        return endGameCanvas;

        function createCount(func_incrementCount){
            const className = 'class=countButton';
            const props = className;
            const html = "<div " + props + "></div>";
            const countDiv = $(html);
            const button = createCountButton();
            button.click(() => {func_incrementCount()});
            countDiv.append(button);
            return countDiv;

            function createCountButton(){
                const className = 'class=countButton ';
                const id = "id=countButton";
                const props = className + id;
                const innerHtml = "Count Emoji";
                const html = "<div " + props + "> " + innerHtml + "</div>";
                return $(html);
            }
        }

        function displayResults(){
            const didWin = isGuessCorrect();
            console.log('countdown complete: ', didWin);
            const message = createResult(didWin);
            endGameCanvas.append(message);
            setTimeout(() => {
                endGameCanvas.remove();
                setRound(didWin);
                startNewRound(round);
            }, 3000);   
        }

        function createResult(result) {
            const className = 'class=resultMessage ';
            let props = "";
            let innerHtml = "";
            if (result == true) {
                const id = "id=winMessage";
                props = className + id;
                innerHtml = "<h1>You got it right! Moving to round " + (round) + "</h1>"
                console.log("winner")
            }
            else {
                const id = "id=loseMessage";
                props = className + id;
                innerHtml = "<h1>You were incorrect. Moving to round 1.</h1>"
                console.log("loser")
            
            }

            const html = "<div " + props + "> " + innerHtml + "</div>";
            return $(html);
        }

        

        function isGuessCorrect(){
            let counter = parseInt($('.counter > h1').text());
            return counter == question.RightAmount ? true : false;
        }

        function incrementCounter(){
            let value = parseInt($('.counter > h1').text());
            $('.counter > h1').text(value + 1);
            console.log(value, value == question.RightAmount ? 'correct' : 'incorrect');
        }

        function createTimer(time){
            const className = 'class=timer ';
            const id = 'id=timer';
            const props = className + id;
            const html = $("<div " + props + "></div>").append($('<h1></h1>').text(time + 1));
            return html;
        }

        function countDown(callback){
            $('.timer').ready(function (){
                decrementTimer();
                function decrementTimer(){
                    let time = parseInt($('.timer > h1').text());
                    console.log(time);
                    if(time > 0){
                        $('.timer > h1').text(time - 1);
                        setTimeout(decrementTimer, 1000);
                    }else{
                        callback();
                    }
                }
            });
        }
    
        function createQuestion(emoji){
            const className = 'class=question';
            const props = className;
            const innerHtml = "<h1>Count the number of times " + emoji + " appeared</h1>";
            const html = "<div " + props + "> " + innerHtml + "</div>";
            return $(html);
        }

        function createCounter(){
            const className = 'class=counter ';
            const id = 'id=counter';
            const props = className + id;
            const html = $("<div " + props + "></div>")
                .append($("<h1></h1>")
                        .text(0));
            return html;
        }
    }

    function genDic(sequence){
        var dic = {};
        sequence.forEach(emojiEl => {
            if(dic[emojiEl] == NaN || dic[emojiEl] == null){
                dic[emojiEl] =1;
            }else{
                dic[emojiEl]= dic[emojiEl]+1;
            }
        });
        return genAns(dic);
        function genAns(dict){
            // console.log(Object.keys(dict).length);
            const randomAns = Math.floor(Math.random()* Object.keys(dict).length) 
            var emoArray= Object.keys(dict);
            var emoji = emoArray[randomAns];
            var amountAns = dict[emoji]
            // console.log(randomAns)
            // console.log(Object.keys(dict))
            // console.log(emoArray[randomAns])
            // console.log(dict[emoji])
            var answerKey = {QuestionEmoji:emoji, RightAmount:amountAns}
            return answerKey
        }
    }







})