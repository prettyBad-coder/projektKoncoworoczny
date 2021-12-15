class Game {
	constructor() {
		this.game();
	}

	game() {
		const textElement: HTMLElement = document.querySelector('.text');
		const optionButtonsElement: HTMLElement = document.querySelector('.buttons-wrapper');
		const body: HTMLElement = document.querySelector('body');
		
		let state = {}
		let audiosArr: HTMLAudioElement[] = [];

		let startGame = () => {
			state = {};
			
			showTextNode(1);
		}

		let showTextNode = (textNodeIndex: number) => {
			console.log(state);
			
			const textNode: any = textNodes.find(textNode => textNode.id === textNodeIndex);
			textElement.innerText = textNode.text;

			while(optionButtonsElement.firstChild) 
				optionButtonsElement.removeChild(optionButtonsElement.firstChild);
			
			body.style.backgroundImage = `url(${textNode.img})`;
			console.log(textNode.img);
			
			
			if(audiosArr.length > 0) {
				audiosArr.forEach(element => {
					element.pause();
				})
			}
			let audio = new Audio(`./sounds/${textNode.audio}`); 
			audiosArr.push(audio)
			audio.play();

			textNode.options.forEach((element: any, index: number) => {
				if(showOption(element)) {
					const button: HTMLElement = document.createElement('BUTTON');
					button.innerText = element.text;
					button.classList.add('button');
					button.addEventListener('click', () => selectOption(element));
					optionButtonsElement.appendChild(button);
				}
			});
		}

		let showOption = (option: any) => {
			return option.requireState == null || option.requireState(state);
		}

		let selectOption = (option: any) => {
			const nextTextNodeId = option.nextText;
			if(nextTextNodeId <= 0) 
				return startGame()
			
			state = Object.assign(state, option.setState);
			showTextNode(nextTextNodeId);
		}

		const textNodes = [
			{ 
				id: 1, 
				text: 'Wita Cię nowy dzień. Jak zwykle budzisz się niewyspany bo odpowiadałeś na pytania ze stacka po nocy. Jaka jest 1 czynność jaką zrobisz po wstaniu?',
				img: 'https://png.clipart.me/previews/18d/sunrise-cartoon-02-vector-14765.jpg',
				options: [
					{
						text: 'Idziesz na papierzosa',
						setState: {szlug: true},
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
						setState: {korpoSzczur: true, szlug: false},
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
						setState: {fit: true},
						nextText: 6,
					},
					{
						text: 'Z buta',
						setState: {fit: true, tired: true},
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
				text: 'W drodze do pracy okazało się, że nie umiesz jeździć na rowerze i się przewracasz przez co jesteś cały brudny i poobijany. Co robisz',
				// audio: './sounds/1.mp3',
				options: [
					{
						text: 'Odechciewa ci się i idziesz do parku na piwo',
						nextText: 191919,
					},
					{
						text: 'Wsiadasz spowrotem na rower i jedziesz do pracy',
						setState: {tired: true},
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
						text: 'Wychodzisz z roboty bo masz to w d i idziesz na browara.',
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
						setState: {korpoSzczur: true},
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
						setState: {bogacz: true},
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
						setState: {bogacz: true},
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
				id: 2137,
				text: 'Niestety taka sytuacja nie jest możliwa więc twórca nie przewidział dalszego ciągu linii fabularnej',
				img: 'https://i.ytimg.com/vi/7G2jMBlB0D8/maxresdefault.jpg',
				// audio: './sounds/1.mp3',
				options: [
					{
						text: 'Reset',
						nextText: -1,
					},
				]
			},
		]



		startGame();
	}
}

const game = new Game();
