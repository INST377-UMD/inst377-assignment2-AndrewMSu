function loadAPI() {
    return fetch(`https://tradestie.com/api/v1/apps/reddit?date=2022-04-03`)
    .then((response) => response.json());
}

async function loadStockTable() {
    const stockTable = document.getElementById('stockTable');

    try {
        const response = await loadAPI();
        let count = 0;

        response.forEach((stock) => {
            if (count < 5) {
                const tableRow = document.createElement('tr');
                const stockTicket = document.createElement('td');
                const stockTicketLink = document.createElement('a');
                const stockCount = document.createElement('td');
                const stockSentiment = document.createElement('td');
                const stockSentimentIcon = document.createElement('img');

                stockTicketLink.href = `https://finance.yahoo.com/quote/${stock.ticker}`;

                if (stock.sentiment === 'Bullish') {
                    stockSentimentIcon.src = 'bullish.png';
                } else {
                    stockSentimentIcon.src = 'bearish.png';
                }
    
                stockTicketLink.textContent = stock.ticker;
                stockCount.textContent = stock.no_of_comments;
        
                stockTicket.append(stockTicketLink);
                stockSentiment.append(stockSentimentIcon);
                tableRow.append(stockTicket);
                tableRow.append(stockCount);
                tableRow.append(stockSentiment);
                stockTable.append(tableRow);  
                count++;  
            }
        });
    } catch(error) {
        alert('Error loading table in!');
    }
}

let currChart = null;

async function loadChartData() {
    const ticker = document.getElementById('ticker').value.toUpperCase();
    const days = document.getElementById('days').value;
    const apiKey = 'lVOjysCxMKF3arSYBkgASzo1jyx7XQEz';
    const fromDate = new Date();
    const toDate = new Date();
    fromDate.setDate(toDate.getDate() - days);
    const from = fromDate.toISOString().split('T')[0];
    const to = toDate.toISOString().split('T')[0];
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;

    const plugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart, args, options) => {
          const {ctx} = chart;
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = options.color || '#99ffff';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };

    try {
        const response = await fetch(url);
        const data = await response.json();

        const dates = [];
        const prices = [];
        data.results.forEach(item => {
            const date = new Date(item.t).toLocaleDateString("en-US");
            dates.push(date);
            prices.push(item.c);
        });

        if(currChart) {
            currChart.destroy();
        }

        const ctx = document.getElementById('stockChart');
        currChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: ticker,
                    data: prices,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                plugins: {
                  customCanvasBackgroundColor: {
                    color: 'white',
                  }
                }
            },
            plugins: [plugin]
        });

    } catch(error) {
        alert('error');
    }

}

loadStockTable();