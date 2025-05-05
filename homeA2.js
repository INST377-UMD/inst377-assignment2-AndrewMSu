async function loadQuote() {
    const quote = document.getElementById('quote');
    const url = `https://zenquotes.io/api/random`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        quote.textContent = `${data[0].q} — ${data[0].a}`;
    } catch(error) {
        alert('Error loading quote');
    }
} 

loadQuote();