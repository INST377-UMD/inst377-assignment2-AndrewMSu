function startAudio() {
    if (annyang) {
        basicAudio();
        stockAudio();
        dogAudio();
        annyang.start();
    }
}

function stopAudio() {
    if (annyang) {
        annyang.abort();
    }
}

function basicAudio() {
    if (annyang) {
        const navPage = function(page) {
            if(page === 'home') {
                window.location.href = 'homeA2.html';
            } else if (page === 'stocks') {
                window.location.href = 'stocksA2.html';
            } else if (page === 'dogs') {
                window.location.href = 'dogsA2.html';
            } else {
                alert('nah');
            }
        }

        const changeColor = function(color) {
            document.body.style.backgroundColor = color;
        }
        const commands = {
            'navigate to *page': navPage,
            'change the color to *color': changeColor,
            'hello': () => { alert('Hello world!'); }
        };

        annyang.addCommands(commands);
    }
}

function stockAudio() {
    if (annyang) {
        const stockTicker = function(stock) {
            document.getElementById('ticker').value = stock.toUpperCase();
            loadChartData();
        }

        const commands = {
            'lookup *stock': stockTicker
        };

        annyang.addCommands(commands);
    }
}

function dogAudio() {
    if (annyang) {
        const breedName = function(name) {
            breeds(name.name, name.description, name.life.min, name.life.max)
        }

        const commands = {
            'load Dog Breed *name': breedName
        };

        annyang.addCommands(commands);
    }
}