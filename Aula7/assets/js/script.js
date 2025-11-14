const selectionScreen = document.querySelector(".selecao");
const fightArena = document.querySelector(".FightArea");
const logElement = document.querySelector(".log");
const buffScreen = document.querySelector(".BuffScreen");
const buffListElement = document.querySelector("#buff-list");
const log = new Log(logElement);
const buffSelector = new SelectBuffs();

function startGame(ClasseSelecionada) {
    selectionScreen.style.display = "none";
    fightArena.style.display = "flex"; 
    logElement.style.display = "block"; 
    let charName = prompt(`Qual o nome do seu ${ClasseSelecionada.name}?`, "Herói");
    if (!charName) { charName = ClasseSelecionada.name; }
    
    let char = new ClasseSelecionada(charName);

    let monsterList = [
        new LittleMonster(),
        new BigMonster(),
        new Boss()
    ];

    const stage = new Stage(
        char,
        monsterList,
        document.querySelector("#char"),
        document.querySelector("#monster"),
        log,
        buffSelector,
        buffScreen,
        buffListElement,
        fightArena
    );
    stage.start();
}

fightArena.style.display = "none";
logElement.style.display = "none";
buffScreen.style.display = "none"; 
const heroSelector = new SelectHero();
heroSelector.CreateSelection(selectionScreen, startGame);