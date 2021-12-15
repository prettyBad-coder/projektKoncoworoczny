class Game {
    constructor() {
        this.game();
    }
    game() {
        const textElement = document.querySelector('.text');
        const optionButtonsElement = document.querySelector('.buttons-wrapper');
        const body = document.querySelector('body');
        let state = {};
        let audiosArr = [];
        let startGame = () => {
            state = {};
            showTextNode(1);
        };
        let showTextNode = (textNodeIndex) => {
            console.log(state);
            const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
            textElement.innerText = textNode.text;
            while (optionButtonsElement.firstChild)
                optionButtonsElement.removeChild(optionButtonsElement.firstChild);
            body.style.backgroundImage = `url(${textNode.img})`;
            console.log(textNode.img);
            if (audiosArr.length > 0) {
                audiosArr.forEach(element => {
                    element.pause();
                });
            }
            let audio = new Audio(`./sounds/${textNode.audio}`);
            audiosArr.push(audio);
            audio.play();
            textNode.options.forEach((element, index) => {
                if (showOption(element)) {
                    const button = document.createElement('BUTTON');
                    button.innerText = element.text;
                    button.classList.add('button');
                    button.addEventListener('click', () => selectOption(element));
                    optionButtonsElement.appendChild(button);
                }
            });
        };
        let showOption = (option) => {
            return option.requireState == null || option.requireState(state);
        };
        let selectOption = (option) => {
            const nextTextNodeId = option.nextText;
            if (nextTextNodeId <= 0)
                return startGame();
            state = Object.assign(state, option.setState);
            showTextNode(nextTextNodeId);
        };
        const textNodes = [
            {
                id: 1,
                text: 'Wita Cię nowy dzień. Jak zwykle budzisz się niewyspany bo odpowiadałeś na pytania ze stacka po nocy. Jaka jest 1 czynność jaką zrobisz po wstaniu?',
                img: 'https://png.clipart.me/previews/18d/sunrise-cartoon-02-vector-14765.jpg',
                options: [
                    {
                        text: 'Idziesz na papierzosa',
                        setState: { szlug: true },
                        nextText: 2,
                    },
                    {
                        text: 'Kawusia',
                        nextText: 2,
                    }
                ]
            },
            {
                id: 2,
                text: 'Ubierasz się, jesz śniadanie, zbierasz się do pracy, w jakie ubranie się ubierasz?',
                img: 'https://www.gry-online.pl/Galeria/Html/Poradniki/1397/108000724.jpg',
                options: [
                    {
                        text: 'Garnitur',
                        setState: { korpoSzczur: true, szlug: false },
                        nextText: 3,
                    },
                    {
                        text: 'Dresik',
                        requireState: (currentState) => currentState.szlug,
                        nextText: 3,
                    },
                    {
                        text: 'Casual',
                        nextText: 3,
                    },
                ]
            },
            {
                id: 3,
                text: 'Czym pojechać do pracy?',
                img: 'https://img.redro.pl/plakaty/zestaw-ikon-transportu-rozne-srodki-transportu-drogowego-kolejowego-lotniczego-wodnego-rozne-typy-pojazdow-700-104231625.jpg',
                options: [
                    {
                        text: 'Samochód',
                        requireState: (currentState) => currentState.szlug,
                        nextText: 4,
                    },
                    {
                        text: 'Hulajnoga elektryczna',
                        requireState: (currentState) => currentState.korpoSzczur,
                        nextText: 10,
                    },
                    {
                        text: 'Rower',
                        setState: { fit: true },
                        nextText: 6,
                    },
                    {
                        text: 'Z buta',
                        setState: { fit: true, tired: true },
                        nextText: 10,
                    },
                ]
            },
            {
                id: 4,
                img: 'https://i.wpimg.pl/730x0/m.autokult.pl/opel-zafira-616x462-8ac2a44bcd1e.jpg',
                audio: 'car.mp3',
                text: 'Wybrałeś: Samochód, idziesz do garażu wsiadasz do samochodu i wyjeżdżasz. Po paru minutach jazdy okazało się, że nie masz paliwa. Co robisz?',
                options: [
                    {
                        text: 'Wracam się do domu po inny środek transportu',
                        nextText: 3,
                    },
                    {
                        text: 'Odechciewa Ci się iść do pracy idziesz do parku na piwo',
                        nextText: 191919,
                    },
                ]
            },
            {
                id: 191919,
                img: 'https://d2b8wt72ktn9a2.cloudfront.net/mediocre/image/upload/v1552039006/ulxk2xy8c9vacazewcxh.jpg',
                audio: 'beer.mp3',
                text: 'Jakie piwo wybierasz?',
                options: [
                    {
                        text: 'Harnold',
                        nextText: 19191919,
                    },
                    {
                        text: 'Romper mocne',
                        nextText: 19191919,
                    },
                ]
            },
            {
                id: 19191919,
                img: 'https://i.dailymail.co.uk/1s/2020/11/18/10/35813976-0-image-m-10_1605696556959.jpg',
                sound: 'Boo Sound Effect.mp3',
                text: 'Jak można pić coś takiego, umierasz.',
                options: [
                    {
                        text: 'Restart',
                        nextText: -1,
                    },
                ]
            },
            {
                id: 6,
                img: 'http://3.bp.blogspot.com/-0uhkHlymkPs/UrL_8HrhsZI/AAAAAAAAAM8/GVFgcOWP8cY/s1600/rower-z-muszla-klozetowa-przypiety-do-stojaka-rowerowego.jpg',
                text: 'W drodze do pracy okazało się, że nie umiesz jeździć na rowerze i się przewracasz przez co jesteś cały brudny i poobijany. Co robisz',
                // audio: './sounds/1.mp3',
                options: [
                    {
                        text: 'Odechciewa ci się i idziesz do parku na piwo',
                        nextText: 191919,
                    },
                    {
                        text: 'Wsiadasz spowrotem na rower i jedziesz do pracy',
                        setState: { tired: true },
                        nextText: 10,
                    },
                ]
            },
            {
                id: 10,
                text: 'Po pojawieniu się w pracy pierwsze co słyszysz to krzyki szefa, że znowu się spóźniłeś.',
                img: 'https://previews.123rf.com/images/auremar/auremar1306/auremar130600074/20018832-boss-shouting-at-employee.jpg',
                options: [
                    {
                        text: 'Wychodzisz zdenerwowany z pracy i idziesz na piwo',
                        nextText: 191919,
                    },
                    {
                        text: 'Udaje Ci się uspokoić szefa i wytłumaczyć mu na spokojnie powód swojego spóźnienia',
                        nextText: 20,
                    },
                    {
                        text: 'Błagasz szefa o przebaczenie i mówisz mu, że jako zadośćuczynienie popracujesz dziś 2h dłużej za darmo',
                        requireState: (currentState) => currentState.korpoSzczur,
                        nextText: 14,
                    },
                    {
                        text: 'Zaczynasz się kłócić z szefem i z racji na stres jesteś zmuszony iść zapalić szluga',
                        requireState: (currentState) => currentState.szlug,
                        setState: { korpoSzczur: true },
                        nextText: 11,
                    },
                ]
            },
            {
                id: 14,
                text: 'Szef zadowolony z twojej postawy postanawia Ci dać podwyżkę',
                audio: 'cash.mp3',
                img: 'https://demotywatory.pl/uploads/201203/1331134297_by_Mustang1990_600.jpg',
                options: [
                    {
                        text: 'Przyjmujesz',
                        setState: { bogacz: true },
                        nextText: 20,
                    },
                    {
                        text: 'Odmawiasz',
                        nextText: 15,
                    },
                ]
            },
            {
                id: 15,
                text: 'Wracaj po tą podwyżkę',
                img: 'https://previews.123rf.com/images/aquir/aquir1411/aquir141100491/34008290-return-red-square-stamp-isolated-on-white-background.jpg',
                audio: 'return.mp3',
                options: [
                    {
                        text: 'Powrót',
                        nextText: 14,
                    },
                ]
            },
            {
                id: 11,
                text: 'Wychodzisz przed firme i wyciągasz paczkę fajek, okazuje się, że jest ona pusta. Co robisz?',
                img: 'https://image.freepik.com/darmowe-wektory/pusta-paczka-papierosow-ze-zlota-folia_1441-4219.jpg',
                options: [
                    {
                        text: 'Kończysz z nałogiem,',
                        nextText: 2137,
                    },
                    {
                        text: 'Idziesz do nabliższej żabki po pakę',
                        nextText: 12,
                    },
                ]
            },
            {
                id: 12,
                text: 'Jakie papierzosy wybierasz?',
                img: 'https://image.shutterstock.com/image-photo/amsterdam-december-2017-display-different-260nw-771517594.jpg',
                // audio: './sounds/1.mp3',
                options: [
                    {
                        text: 'Najtańsze',
                        nextText: 20,
                    },
                    {
                        text: 'Średnio drogie',
                        nextText: 20,
                    },
                    {
                        text: 'Premium',
                        setState: { bogacz: true },
                        nextText: 13,
                    },
                ]
            },
            {
                id: 13,
                text: 'Nie stać cię',
                audio: 'return.mp3',
                img: 'https://media.istockphoto.com/photos/showing-an-empty-wallet-picture-id594481556?k=20&m=594481556&s=170667a&w=0&h=ZFnrUvfYCYRuRYUW701_smzEC6Q1fw3Rx5-06PdRvuE=',
                options: [
                    {
                        text: 'Powrót',
                        nextText: 12,
                    },
                ]
            },
            {
                id: 20,
                text: 'Dalsza część dnia w pracy przebiega spokojnie lecz nagle słyszysz alarm pożarowy i jest ewakuacja. Co robisz?',
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9nX1blVSuioI4Jbjx7dxvj4xbSXZ1m_wCiA&usqp=CAU',
                options: [
                    {
                        text: 'Podążasz za resztą pracowników',
                        nextText: 1001,
                    },
                    {
                        text: 'Uciekasz na właśną rękę',
                        nextText: 1001,
                    },
                    {
                        text: 'Wyskakujesz przez okno',
                        requireState: (currentState) => currentState.fit,
                        nextText: 2000,
                    },
                    {
                        text: 'Chowasz się pod stół',
                        nextText: 7777,
                    },
                ]
            },
            {
                id: 2000,
                text: 'Z racji na swoją sprawność fizyczną udaje Ci się wylądować bez szfanku! Wygrywasz grę!',
                img: 'https://thumbs.dreamstime.com/b/podium-wygrana-30987794.jpg',
                options: [
                    {
                        text: 'Zagraj jeszcze raz!',
                        nextText: -1,
                    },
                ]
            },
            {
                id: 21,
                img: 'https://images.pond5.com/people-running-away-fire-footage-073593677_iconl.jpeg',
                text: 'siema eniu',
                options: [
                    {
                        text: 'Podążasz za resztą pracowników',
                        nextText: 21,
                    },
                ]
            },
            {
                id: 1001,
                text: 'W ferworze nie zauważasz butelki na ziemi i potykasz się o nią. Nagle z butelki wyskakuje dżin i mówi, że jak odpowiesz dobrze na zagadkę to spełni twoje jedno życzenie. Zgadzasz się?',
                img: 'data:image/jpeg;base64,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',
                options: [
                    {
                        text: 'Tak',
                        nextText: 1002,
                    },
                    {
                        text: 'Nie',
                        nextText: 123123,
                    },
                ]
            },
            {
                id: 1002,
                text: 'Czy najlepszy uczeń ZSŁ, Oskar Jaworski,  zda z aplikacji?',
                img: 'data:image/jpeg;base64,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',
                options: [
                    {
                        text: 'Tak',
                        nextText: 1003,
                    },
                    {
                        text: 'Nie',
                        nextText: 1004,
                    },
                    {
                        text: 'Nie wiem',
                        nextText: 2137,
                    },
                ]
            },
            {
                id: 1003,
                text: 'Dobra odpowiedź. Wybierz życzenie:',
                img: 'https://media-exp1.licdn.com/dms/image/C4D0BAQHeZyD5y8Pgrw/company-logo_200_200/0/1625252729917?e=2159024400&v=beta&t=kC0i0zqGXUNgGQDeztVq3QAME9sOier7J-NKEh1Wank',
                options: [
                    {
                        text: 'Prosisz go o uratowanie swojego życia przed pożarem',
                        nextText: 1500,
                    },
                    {
                        text: 'Prosisz go o uratowanie życia całej firmy przed pożarem (wraz z tym znienawidzonym szefem)',
                        requireState: (currentState) => currentState.szlug,
                        nextText: 3000,
                    },
                    {
                        text: 'Prosisz go o uratowanie życia całej firmy przed pożarem (wraz z ukochanym szefem)',
                        requireState: (currentState) => currentState.bogacz,
                        nextText: 3000,
                    },
                    {
                        text: 'prosisz go o paczke papierosów',
                        requireState: (currentState) => currentState.szlug,
                        nextText: 9876,
                    }
                ]
            },
            {
                id: 1500,
                text: 'Przez swoją samolubność dżin postanawia uratować całą firmę a ciebie zabić',
                img: 'https://i.ytimg.com/vi/7G2jMBlB0D8/maxresdefault.jpg',
                options: [
                    {
                        text: 'Restart',
                        nextText: -1,
                    },
                ]
            },
            {
                id: 3000,
                text: 'Dżin ratuje wszystkich pracowników firmy razem z tobą! Wygrałeś grę!',
                img: 'https://thumbs.dreamstime.com/b/podium-wygrana-30987794.jpg',
                options: [
                    {
                        text: 'Zagraj jeszcze raz!',
                        nextText: -1,
                    },
                ]
            },
            {
                id: 9876,
                text: 'Z uśmiechem na tworzy otrzymujesz to o co prosiłeś. Niestety dopiero teraz zdałeś sobie sprawę, że był to bardzo zły wybór, ponieważ nie ma drogi ucieczki z miejsca gdzie jesteś. Umierasz',
                img: 'https://media.istockphoto.com/photos/cigarette-man-and-fire-picture-id144720356',
                options: [
                    {
                        text: 'Restart',
                        nextText: -1,
                    }
                ]
            },
            {
                id: 123123,
                text: 'Zdenerwowany dżin zabija cię',
                img: 'https://i.ytimg.com/vi/7G2jMBlB0D8/maxresdefault.jpg',
                options: [
                    {
                        text: 'Restart',
                        nextText: -1,
                    },
                ]
            },
            {
                id: 7777,
                text: 'Niestety twoja metoda nie zadziałała i zostałeś spalony żywcem',
                img: 'https://static.planetminecraft.com/files/resource_media/preview/sketch%207_733543_minecraft_skin-733543.jpg',
                options: [
                    {
                        text: 'Restart',
                        nextText: -1,
                    },
                ]
            },
            {
                id: 2137,
                text: 'Niestety taka sytuacja nie jest możliwa więc twórca nie przewidział dalszego ciągu linii fabularnej',
                img: 'https://i.ytimg.com/vi/7G2jMBlB0D8/maxresdefault.jpg',
                options: [
                    {
                        text: 'Reset',
                        nextText: -1,
                    },
                ]
            },
        ];
        startGame();
    }
}
const game = new Game();
