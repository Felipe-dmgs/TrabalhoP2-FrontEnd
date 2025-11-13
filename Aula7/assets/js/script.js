const selectionScreen = document.querySelector(".selecao");
const fightArena = document.querySelector(".FightArea");
const logElement = document.querySelector(".log");
const log = new Log(logElement);

function startGame(SelectedHeroClass) {
    // 1. Esconde a seleção e mostra a arena
    selectionScreen.style.display = "none";
    fightArena.style.display = "flex"; 
    logElement.style.display = "block"; 

    // 2. Cria o Herói
    let charName = prompt(`Qual o nome do seu ${SelectedHeroClass.name}?`, "Herói");
    if (!charName) { charName = SelectedHeroClass.name; }
    
    let char = new SelectedHeroClass(charName);

    // 3. Cria a LISTA de monstros
    let monsterList = [
        new LittleMonster(),
        new BigMonster(),
        new Boss()
    ];

    // 4. Cria o Stage (passando a lista inteira)
    const stage = new Stage(
        char,
        monsterList, // Passa o array de monstros
        document.querySelector("#char"),
        document.querySelector("#monster"),
        log
    );

    // 7. E inicia o jogo (só é chamado UMA VEZ)
    stage.start();
}
fightArena.style.display = "none";
logElement.style.display = "none";

const heroSelector = new SelectHero();

heroSelector.CreateSelection(selectionScreen, startGame);
