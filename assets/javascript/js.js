console.log('js загружен');
document.addEventListener('DOMContentLoaded', () => {

    const dogEl = document.querySelector('.dog');
    const duckEl = document.querySelector('.duck');
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;

        console.log('screenWidth', screenWidth);
        console.log('screenHeight', screenHeight);

    const startPositionDog = getComputedStyle(dogEl).left;
    const startPositionDuck = screenHeight - parseInt(getComputedStyle(duckEl).bottom) - 50;

    function dog() {
        dogEl.classList.remove('dog_jump')
        dogEl.classList.add('dog_walk');
        dogEl.style.left = startPositionDog;
        console.log('dog_walk');
        dogEl.style.zIndex = '1';
        setTimeout(() => {
            dogEl.classList.remove('dog_walk');
            dogEl.classList.add('dog_jump');
            setTimeout(() => {
                dogEl.style.zIndex = '0';
            }, 1000);
            console.log('dog_jump');
        }, 6000);
    };

    function random(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    };

    function duck() {
        duckEl.classList.add('duck_fly');
        duckEl.style.transition = 'all 1s linear 0s';
        console.log('duck_fly');

        let positionDuckX = random(0, screenWidth - 104) + 'px';
        let positionDuckY = startPositionDuck + 'px';

        duckEl.style.left = positionDuckX;
        duckEl.style.top = positionDuckY;
        const steep = 200;

        var timerId = setInterval(function duckFlay() {

            duckEl.classList.remove('duck_fly_top_left');
            duckEl.classList.remove('duck_fly_right');
            duckEl.classList.remove('duck_fly_top_right');
            duckEl.classList.remove('duck_fly_left');

            switch (random(1, 4)) {
                case 1:
                    duckEl.classList.add('duck_fly_left');
                    positionDuckX = parseInt(positionDuckX) - steep + 'px';
                    break;

                case 2:
                    duckEl.classList.add('duck_fly_top_left');
                    positionDuckX = parseInt(positionDuckX) - steep + 'px';
                    positionDuckY = parseInt(positionDuckY) - steep + 'px';
                    break;

                case 3:
                    duckEl.classList.add('duck_fly_right');
                    positionDuckX = parseInt(positionDuckX) + steep + 'px';
                    break;

                default: duckEl.classList.add('duck_fly_top_right');
                    positionDuckX = parseInt(positionDuckX) + steep + 'px';
                    positionDuckY = parseInt(positionDuckY) - steep + 'px';
            };

            if (parseInt(positionDuckX) > screenWidth - duckEl.clientWidth) {
                positionDuckX = screenWidth - duckEl.clientWidth + 'px';
            };
            if (parseInt(positionDuckX) < 0) {
                positionDuckX = 0 + 'px';
            }

            duckEl.style.left = positionDuckX;
            duckEl.style.top = positionDuckY;

            console.log('positionDuckX', positionDuckX);
            console.log('positionDuckY', positionDuckY);

            if (parseInt(positionDuckY) < -50) {
                alert('ИГРА ПРОИГРАНА!');
                duckEl.classList.remove('duck_fly');

                if (confirm('ПОВТОРИТЬ?')) {
                    // game();
                    window.location.reload();
                    return clearInterval(timerId);
                } else {
                    return clearInterval(timerId);
                };
            };
        }, 1000);

        duckEl.addEventListener('click', function () {
            duckEl.classList.remove('duck_fly');
            alert('ПОПАДАНИЕ!');

            if (confirm('ПОВТОРИТЬ?')) {
                // game();
                window.location.reload();
                return clearInterval(timerId);
            } else {
                return clearInterval(timerId);

            };
        });
    };

    game();
    function game() {

        setTimeout(dog, 100);
        setTimeout(duck, 8000);

    };

});
