async function loadDogImage() {
    const dogs = document.getElementById('dogImage');
    const url = `https://dog.ceo/api/breeds/image/random/10`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        data.message.forEach(element => {
            const image = document.createElement('img');
            image.src = element;
            dogs.appendChild(image);
        });

        simpleslider.getSlider({
            delay: 5,
            duration: 4
        });

    } catch(error) {
        alert('Error');
    }
}

function loadDogButton() {
    const dogs = document.getElementById('dogButton');
    const url = `https://dogapi.dog/api/v2/breeds`;

    fetch(url)
        .then((response) => response.json())
        .then((dog) => {
            const dogData = dog.data;

            for (let i = 0; i < dogData.length; i++) {
                const button = document.createElement('button');
                const breed = dogData[i].attributes;
                button.textContent = breed.name;
                button.setAttribute('class', 'button-20');

                button.onclick = () => {
                    breeds(breed.name, breed.description, breed.life.min, breed.life.max);
                };
                dogs.append(button);
            }
        });
}

function breeds(name, description, min, max) {
    const breed = document.getElementById('dogButton');

    if (breed.querySelector('.breedInfo')) {
        breed.querySelector('.breedInfo').remove();
    }

    const breedInfo = document.createElement('div');
    breedInfo.setAttribute('class', 'breedInfo');

    const names = document.createElement('h1');
    const descriptions = document.createElement('h3');
    const mins = document.createElement('h3');
    const maxs = document.createElement('h3');

    names.textContent = `Name: ${name}`;
    descriptions.textContent = `Descriptions: ${description}`;
    mins.textContent = `Min Life: ${min}`;
    maxs.textContent = `Max Life: ${max}`;

    breedInfo.append(names);
    breedInfo.append(descriptions);
    breedInfo.append(mins);
    breedInfo.append(maxs);

    breed.append(breedInfo);
}

loadDogImage();
loadDogButton();