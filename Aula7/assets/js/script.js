const selectionScreen = document.querySelector(".selecao");
const fightArena = document.querySelector(".FightArea");
const logElement = document.querySelector(".log");
const log = new Log(logElement);

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
        log
    );
    stage.start();
}
fightArena.style.display = "none";
logElement.style.display = "none";

const heroSelector = new SelectHero();

heroSelector.CreateSelection(selectionScreen, startGame);
