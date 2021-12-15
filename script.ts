class Game {
	constructor() {
		this.game();
	}

	game() {
		const textElement: any = document.querySelector('.text');
		const optionButtonsElement: any = document.querySelector('.buttons-wrapper')
		
		let state = {}

		let startGame = () => {
			state = {};
			showTextNode(1);
		}

		let showTextNode = (textNodeIndex: number) => {
			const textNode: any = textNodes.find(textNode => textNode.id === textNodeIndex);
			textElement.innerText = textNode.text;

			while(optionButtonsElement.firstChild) 
				optionButtonsElement.removeChild(optionButtonsElement.firstChild);
			
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
				text: 'You wake up in a strange place and you see a jar of blue goo newar you',
				options: [
					{
						text: 'Take goo',
						setState: {blueGoo: true},
						nextText: 2,
					},
					{
						text: 'Leave the goo',
						nextText: 2,
					}
				]
			},
			{
				id: 2,
				text: 'You ventured forth in search of answers to where you are when you came across a merchant.',
				options: [
					{
						text: 'Trade the goo for a sword',
						requireState: (currentState) => currentState.blueGoo,
						setState: {blueGoo: false, sword: true},
						nextText: 3,
					},
					{
						text: 'Trade the goo for a shield',
						requireState: (currentState) => currentState.blueGoo,
						setState: {blueGoo: false, shield: true},
						nextText: 3,
					},
					{
						text: 'Ignore',
						nextText: 3,
					},
				]
			},
			{
				id: 3,
				text: 'Siema jesteś zmęczony co robisz?',
				options: [
					{
						text: 'Idź do zamku',
						nextText: 4,
					},
					{
						text: 'Idź se spać do hotelu',
						nextText: 5,
					},
					{
						text: 'Idź spać do siana',
						nextText: 6,
					},
				]
			},
			{
				id: 4,
				text: 'Umarłeś bo cie zajebały mobki kurwa w zamku',
				options: [
					{
						text: 'restart',
						nextText: -1,
					}
				]
			}
		]



		startGame();
	}
}

const game = new Game();
