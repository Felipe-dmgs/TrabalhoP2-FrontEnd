class Character{
    _Life = 1;
    MaxLife = 1;
    Attack = 0;
    Defense = 0;

    constructor(name) {
        this.name = name
    }

    get life(){
        return this._Life.toFixed(2)
    }

    set life(newLife){
        newLife = parseFloat(newLife);
        this._Life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character{
    constructor(name){
        super(name);
        this.life = 110;
        this.Attack = 20;
        this.Defense = 15;
        this.MaxLife = this.life;
        this._image = document.createElement("img");
        this._image.src = "assets/Images/hero.jpg";
    }
    get image(){
        return this._image
    }
}

class Sorcerer extends Character{
    constructor(name){
        super(name);
        this.life = 70;
        this.Attack = 30;
        this.Defense = 3;
        this.MaxLife = this.life;
        this._image = document.createElement("img");
        this._image.src = "assets/Images/sorcerer.webp";
    }
    get image(){
        return this._image
    }
}
class Ladino extends Character{
    constructor(name){
        super(name);
        this.life = 90;
        this.Attack = 25;
        this.Defense = 5;
        this.MaxLife = this.life;
        this._image = document.createElement("img");
        this._image.src = "assets/Images/ladino.jpg";
    }
    get image(){
        return this._image
    }
}
class Lancer extends Character{
    constructor(name){
        super(name);
        this.life = 100;
        this.Attack = 20;
        this.Defense = 20;
        this.MaxLife = this.life;
        this._image = document.createElement("img");
        this._image.src = "assets/Images/lancerHero.jpg";
    }
    get image(){
        return this._image
    }
}
class Archer extends Character{
    constructor(name){
        super(name);
        this.life = 70;
        this.Attack = 25;
        this.Defense = 10;
        this.MaxLife = this.life;
        this._image = document.createElement("img");
        this._image.src = "assets/Images/ArcherHero.jpg";
    }
    get image(){
        return this._image
    }
}

class LittleMonster extends Character{
    constructor(){
        super("Little Monster")
        this.life = 40;
        this.Attack = 4;
        this.Defense = 4;
        this.MaxLife = this.life;
        this._image = document.createElement("img");
        this._image.src = "assets/Images/littlemonster.jpg";
    }
    get image(){
        return this._image
    }
}
class BatMonster extends Character{
    constructor(){
        super("Bat monster")
        this.life = 60;
        this.Attack = 12;
        this.Defense = 20;
        this.MaxLife = this.life;
        this._image = document.createElement("img");
        this._image.src = "assets/Images/BatMonster.png";
    }
    get image(){
        return this._image
    }
}
class Lizard extends Character{
    constructor(){
        super("Lizard")
        this.life = 120;
        this.Attack = 24;
        this.Defense = 36;
        this.MaxLife = this.life;
        this._image = document.createElement("img");
        this._image.src = "assets/Images/LizardMonster.png";
    }
    get image(){
        return this._image
    }
}
class BigMonster extends Character{
    constructor(){
        super("Big Monster")
        this.life = 150;
        this.Attack = 25;
        this.Defense = 30;
        this.MaxLife = this.life;
        this._image = document.createElement("img");
        this._image.src = "assets/Images/BigMonster.png";
    }
    get image(){
        return this._image
    }
}
class Lynel extends Character{
    constructor(){
        super("Lynel")
        this.life = 180;
        this.Attack = 40;
        this.Defense = 35;
        this.MaxLife = this.life;
        this._image = document.createElement("img");
        this._image.src = "assets/Images/LynelMonster.png";
    }
    get image(){
        return this._image
    }
}


class Boss extends Character{
    constructor(){
        super("Ganondorf")
        this.life = 230;
        this.Attack = 45;
        this.Defense = 45;
        this.MaxLife = this.life;
        this._image = document.createElement("img");
        this._image.src = "assets/Images/Boss.jpg";
    }
    get image(){
        return this._image
    }
}


class Log {
    list = [];

    constructor(listEL){
        this.listEL = listEL;
    }

    addMessage(msg, classP){
        this.list.push({ msg, classP });
        this.render();
    }
    Reset(){
        this.list = []
    }

    render() {
        this.listEL.innerHTML = "";
        for (let item of this.list){
            this.listEL.innerHTML += `<li class="${item.classP}">${item.msg}</li>`;
        }
        this.listEL.scrollTop = this.listEL.scrollHeight
    }
}
class Stage {

    constructor(fighter1, monsters, fighter1EL, fighter2EL, logObject, buffSelector, buffScreenEL, buffListEL, fightArena, BossIntroGifEL){   
        this.fighter1 = fighter1;
        this.monsters = monsters; 
        this.currentMonsterIndex = 0; 
        this.fighter2 = this.monsters[this.currentMonsterIndex];
        this.fighter1EL = fighter1EL;
        this.fighter2EL = fighter2EL;
        this.log = logObject;
        this.turno = true;
        this.PlayerDamage = [];
        this.MonsterDamage = [];
        this.MediaDamage = 0;
        this.classPerso = '';
        this.buffSelector = buffSelector;
        this.buffScreenEL = buffScreenEL;
        this.buffListEL = buffListEL;
        this.fightArena = fightArena;
        this.isAutoMode = false;       
        this.autoBattleInterval = null;
        this.bossIntroGifEL = BossIntroGifEL;
    }

    start(){
        this.fighter1EL.querySelector(".imgHero").innerHTML = '';
        this.fighter2EL.querySelector(".imgMonster").innerHTML = '';
        this.fighter1EL.querySelector(".imgHero").appendChild(this.fighter1.image); 
        this.fighter2EL.querySelector(".imgMonster").appendChild(this.fighter2.image);
        document.querySelector(".statusHero").innerHTML = `Força: ${this.fighter1.Attack} | Defesa: ${this.fighter1.Defense}`;
        
        this.fighter1EL.querySelector(".AttackButton").addEventListener("click", () => {
            this.DoAttack(this.fighter1, this.fighter2);
        });
        this.fighter2EL.querySelector(".AttackButton").addEventListener("click", () => {
            this.DoAttack(this.fighter2, this.fighter1);
        });
        this.fighter1EL.querySelector(".AutoButton").addEventListener("click", () => this.toggleAutoMode());
        this.turno = true;
        this.fighter1EL.querySelector(".AttackButton").disabled = false;
        this.fighter2EL.querySelector(".AttackButton").disabled = true;

        this.update()
    }

    playBossIntroGif() {
        this.fightArena.style.display = "none";
        this.buffScreenEL.style.display = "none";
        const imgElement = this.bossIntroGifEL.querySelector("img");
        imgElement.src = "assets/Images/GanondorfEntering.webp";
        this.bossIntroGifEL.style.display = "flex";
        setTimeout(() => {
            this.bossIntroGifEL.style.display = "none"; 
        }, 2000);
    }

    toggleAutoMode() {
        this.isAutoMode = !this.isAutoMode;

        if (this.isAutoMode) {
            this.log.addMessage("Modo Automático ATIVADO", "System");
            this.fighter1EL.querySelector(".AttackButton").disabled = true;
            this.autoBattleInterval = setInterval(() => {
                
                if (this.fighter1.life <= 0 || this.fighter2.life <= 0) {
                    this.toggleAutoMode(); 
                    return;
                }
                if (this.turno) {
                    this.DoAttack(this.fighter1, this.fighter2);
                } else {
                    this.DoAttack(this.fighter2, this.fighter1);
                }
            }, 1000);
        } else {
            this.log.addMessage("Modo Automático DESATIVADO", "System");
            if (this.autoBattleInterval) {
                clearInterval(this.autoBattleInterval);
                this.autoBattleInterval = null;
            }
            if (this.turno) {
                this.fighter1EL.querySelector(".AttackButton").disabled = false;
            }
        }
    }
    goToNextMonster() {
        this.log.addMessage(`${this.fighter2.name} foi derrotado!`, "System");
        this.currentMonsterIndex++;
        if (this.currentMonsterIndex >= this.monsters.length) {
            this.log.addMessage("PARABÉNS! Você derrotou todos os monstros!", "System");
            this.endGame();
        } else {
            this.log.Reset();
            if (this.isAutoMode) {
                this.toggleAutoMode();
            }
            this.log.addMessage(`Escolha um buff para se preparar!`, "System");
            this.fightArena.style.display = "none";
            this.buffScreenEL.style.display = "block"; 
            const handleBuffSelection = (buff) => {
                if (buff.Tipo === "vida") {
                    this.fighter1.MaxLife = parseFloat(this.fighter1.MaxLife) + buff.Valor;
                    this.fighter1.life += buff.Valor; 
                    this.log.addMessage(`BUFF: +${buff.Valor} de Vida!`, "heroi");
                } else if (buff.Tipo === "força") {
                    this.fighter1.Attack += buff.Valor;
                    this.log.addMessage(`BUFF: +${buff.Valor} de Força!`, "heroi");
                } else if (buff.Tipo === "defesa") {
                    this.fighter1.Defense += buff.Valor;
                    this.log.addMessage(`BUFF: +${buff.Valor} de Defesa!`, "heroi");
                }
                this.buffScreenEL.style.display = "none";
                document.querySelector(".statusHero").innerHTML = `Força: ${this.fighter1.Attack} | Defesa: ${this.fighter1.Defense}`;
                this.resumeNextMonster();
            };
            this.buffSelector.CreateBuffSelection(this.buffListEL, handleBuffSelection);
            
        }
    }

    AutoMode() {
        this.AutoMode = !this.AutoMode
        while(this.AutoMode){this.DoAttack(this.fighter1, this.fighter2); setTimeout(() => {this.DoAttack(this.fighter2, this.fighter1);})}
    }

    resumeNextMonster() {
        this.update();
        this.fighter1.life = this.fighter1.MaxLife; 
        
        this.fighter2 = this.monsters[this.currentMonsterIndex];
        if (this.monsters[this.currentMonsterIndex] instanceof Boss) {
                this.log.addMessage("Uma aura maligna preenche o ar... O grande demônio surge!", "Monster");
                this.playBossIntroGif();
            }
        this.log.addMessage(`Um novo oponente surge: ${this.fighter2.name}!`, "monster");

        this.fightArena.style.display = "flex";

        let f2ImgContainer = this.fighter2EL.querySelector(".imgMonster");
        f2ImgContainer.innerHTML = '';
        f2ImgContainer.appendChild(this.fighter2.image);

        this.MonsterDamage = [];
        this.turno = true;
        this.fighter1EL.querySelector(".AttackButton").disabled = false;
        this.fighter2EL.querySelector(".AttackButton").disabled = true;

        this.update();
    }

    
    endGame() {
        this.fighter1EL.querySelector(".AttackButton").disabled = true;
        this.fighter2EL.querySelector(".AttackButton").disabled = true;
        this.log.addMessage(`Você deu um total de ${this.PlayerDamage.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0).toFixed(2)} com uma média de ${(this.PlayerDamage.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0)/this.PlayerDamage.length).toFixed(2)} dano por hit`)
        this.log.addMessage("FIM DE JOGO. Atualize a página para jogar novamente.", "System");
    }

    DoAttack(attacking, attacked){
        
        if (attacking.life <= 0) { 
            this.log.addMessage("Morto não ataca", "System"); 
        }
        if (attacked.life <= 0) {
            this.log.addMessage("Você está atacando um morto", "System");
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);
        let damage = attacking.Attack * attackFactor;
        let actualDefense = attacked.Defense * defenseFactor;

        if(this.turno) {
            this.PlayerDamage.push(damage);
            let DanoTotal = this.PlayerDamage.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
            let hits = this.PlayerDamage.length;
            this.MediaDamage = DanoTotal/hits;
            this.classPerso = "heroi";
            this.defesa = "monster";
        } else {
            this.MonsterDamage.push(damage);
            let DanoTotal = this.MonsterDamage.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
            let hits = this.MonsterDamage.length;
            this.MediaDamage = DanoTotal/hits;
            this.classPerso = "monster";
            this.defesa = "heroi";
        }

        if (damage > actualDefense){
            attacked.life -= damage.toFixed(2);
            this.log.addMessage(`${attacking.name} causou ${damage.toFixed(2)} pontos de dano no ${attacked.name}`,`${this.classPerso}`);
            if(damage < this.MediaDamage-10){
                if (this.fighter1.life <= 0) {
                    this.log.addMessage(`${this.fighter1.name} foi derrotado!`, "heroi");
                    this.log.addMessage("GAME OVER.", "System");
                    this.endGame();
                    this.update();
                    return;
                }else{
                    this.log.addMessage(`${attacking.name} é muito fraco e por isso terá uma nova chance`,"System");
                    this.DoAttack(attacking,attacked);
                    return;
                }
            }
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender o ataque de ${attacking.name}`,`${this.defesa}`);
        }

        if (this.fighter1.life <= 0) {
            // Jogador perdeu
            this.log.addMessage(`${this.fighter1.name} foi derrotado!`, "heroi");
            this.log.addMessage("GAME OVER.", "System");
            this.endGame();
            this.update();
            return;
        }

        if (this.fighter2.life <= 0) {
            this.goToNextMonster();
            return;
        }
        this.turno = !this.turno
        if (this.fighter1.life > 0 && this.currentMonsterIndex < this.monsters.length) {
            if(this.turno) {
                this.fighter1EL.querySelector(".AttackButton").disabled = false;
                this.fighter2EL.querySelector(".AttackButton").disabled = true;
            } else {
                this.fighter1EL.querySelector(".AttackButton").disabled = true;
                this.fighter2EL.querySelector(".AttackButton").disabled = false;
            }
        }
        this.update()
    }

    update(){
        this.fighter1EL.querySelector(".Name").innerHTML = `${this.fighter1.name} - ${this.fighter1.life} HP`;
        let f1pct = (this.fighter1.life / this.fighter1.MaxLife) * 100;
        this.fighter1EL.querySelector(".Bar").style.width = `${f1pct}%`;

        this.fighter2EL.querySelector(".Name").innerHTML = `${this.fighter2.name} - ${this.fighter2.life} HP`;
        let f2pct = (this.fighter2.life / this.fighter2.MaxLife) * 100;
        this.fighter2EL.querySelector(".Bar").style.width = `${f2pct}%`;
    }
}
class SelectHero {
    constructor(){
        this.personagens = [Knight, Sorcerer, Ladino, Archer, Lancer]
    }

    CreateSelection(objetolista, FuncaoStart){
        objetolista.innerHTML = ""; 

        this.personagens.forEach((HeroClass) => {
            
            const tempChar = new HeroClass("Temp"); 

            const containerP = document.createElement("li"); 

            containerP.className = "hero-card";

            const img = document.createElement("img");
            img.src = tempChar.image.src; 

            const button = document.createElement("button");
            button.innerHTML = `Escolher ${HeroClass.name}`; 

            button.addEventListener('click', () => {
                FuncaoStart(HeroClass); 
            });

            containerP.appendChild(img);
            containerP.appendChild(button);
            objetolista.appendChild(containerP);
        });
    }
}

class SelectBuffs {
    obterNumeroAleatorio(n1, n2) {
    const min = Math.ceil(n1);
    const max = Math.floor(n2);
    return Math.floor(Math.random() * (max - min)) + min;
    }
    obterRaridade(){
        let numRaridade = this.obterNumeroAleatorio(0,21)
        if (numRaridade <= 12){return "comum";}
        else if(numRaridade <= 16) {return "raro"}
        else if(numRaridade <= 19){return "épico"}
        else if(numRaridade == 20){return "lendário"}
    }   
    obterTipo(){
        let numTipo = this.obterNumeroAleatorio(1,4)
        if (numTipo == 1) {return "vida";}
        else if(numTipo == 2){return "força";}
        else if(numTipo == 3) {return "defesa";}
    }
    TipoBuff() {
        const raridade = this.obterRaridade();
        const tipo = this.obterTipo();
        
        if(raridade == "lendário") {
            if(tipo == "vida"){
                let imgVida = document.createElement("img")
                imgVida.src = "assets/Images/LifeBuff.png"
                return {
                    "Raridade": raridade,
                    "Tipo":tipo,
                    "Valor": 100,
                    "imagem": imgVida};
            } else if(tipo == "força"){
                let imgForca = document.createElement("img")
                imgForca.src = "assets/Images/AttackBuff.png"
                return {
                    "Raridade": raridade,
                    "Tipo":tipo, 
                    "Valor": 20,
                    "imagem":imgForca};
            } else if(tipo == "defesa"){
                let imgDefesa = document.createElement("img")
                imgDefesa.src = "assets/Images/DefenseBuff.png"
                return {
                    "Raridade": raridade,
                    "Tipo":tipo,
                    "Valor": 30,
                    "imagem":imgDefesa};
            }
        } else if(raridade == "épico") {
            if(tipo == "vida"){
                let imgVida = document.createElement("img")
                imgVida.src = "assets/Images/LifeBuff.png"
                return {
                    "Raridade": raridade,
                    "Tipo":tipo,
                    "Valor": this.obterNumeroAleatorio(50,80),
                    "imagem":imgVida};
            } else if(tipo == "força"){
                let imgForca = document.createElement("img")
                imgForca.src = "assets/Images/AttackBuff.png"
                return {
                    "Raridade": raridade,
                    "Tipo":tipo,
                    "Valor": 15,
                    "imagem":imgForca};
            } else if(tipo == "defesa"){
                let imgDefesa = document.createElement("img")
                imgDefesa.src = "assets/Images/DefenseBuff.png"
                return {
                    "Raridade": raridade,
                    "Tipo":tipo,
                    "Valor":  20,
                    "imagem": imgDefesa};
            }
        } else if(raridade == "raro") {
            if(tipo == "vida"){
                let imgVida = document.createElement("img")
                imgVida.src = "assets/Images/LifeBuff.png"
                return {
                    "Raridade": raridade,
                    "Tipo":tipo,
                    "Valor": this.obterNumeroAleatorio(30,50),
                    "imagem": imgVida}; 
            } else if(tipo == "força"){
                let imgForca = document.createElement("img")
                imgForca.src = "assets/Images/AttackBuff.png"
                return {
                    "Raridade": raridade,
                    "Tipo":tipo,
                    "Valor": this.obterNumeroAleatorio(5,10),
                    "imagem": imgForca};
            } else if(tipo == "defesa"){
                let imgDefesa = document.createElement("img")
                imgDefesa.src = "assets/Images/DefenseBuff.png"
                return {
                    "Raridade": raridade,
                    "Tipo":tipo,
                    "Valor": this.obterNumeroAleatorio(7,12),
                    "imagem": imgDefesa}; 
            }
        } else if(raridade == "comum") {
            if(tipo == "vida"){
                let imgVida = document.createElement("img")
                imgVida.src = "assets/Images/LifeBuff.png"
                return {
                    "Raridade": raridade,
                    "Tipo":tipo,
                    "Valor": this.obterNumeroAleatorio(20,30),
                    "imagem": imgVida};
            } else if(tipo == "força"){
                let imgForca = document.createElement("img")
                imgForca.src = "assets/Images/AttackBuff.png"
                return {
                    "Raridade": raridade,
                    "Tipo":tipo,
                    "Valor": this.obterNumeroAleatorio(3,5),
                    "imagem": imgForca};
            } else if(tipo == "defesa"){
                let imgDefesa = document.createElement("img")
                imgDefesa.src = "assets/Images/DefenseBuff.png"
                return {
                    "Raridade": raridade,
                    "Tipo":tipo,
                    "Valor": this.obterNumeroAleatorio(3,7),
                    "imagem": imgDefesa};
            }
        }
    }
    textoRaridade(buff) {
        const textoRaridade = document.createElement("p");
        
        if (buff.Raridade === "lendário") {
            textoRaridade.innerHTML = "Lendário";
            textoRaridade.style.color = 'orange'; 
        } else if (buff.Raridade === "épico") {
            textoRaridade.innerHTML = "Épico";
            textoRaridade.style.color = 'purple';
        } else if (buff.Raridade === "raro") {
            textoRaridade.innerHTML = "Raro";
            textoRaridade.style.color = 'blue';
        } else if (buff.Raridade === "comum") {
            textoRaridade.innerHTML = "Comum";
            textoRaridade.style.color = 'gray';
        }
        return textoRaridade;
    }
    CreateBuffSelection(buffContainerElement, onBuffSelectedCallback) {
        buffContainerElement.innerHTML = ""; 
        this.buffsList = [];

        for (let i = 0; i < 3; i++) {
            let buff = this.TipoBuff();
            this.buffsList.push(buff);
        }

        this.buffsList.forEach((buff) => {
            const containerB = document.createElement("li");
            containerB.className = "Buff-Card";
            const textoraridade = this.textoRaridade(buff);

            const button = document.createElement("button");
            button.innerHTML = `+${buff.Valor} de ${buff.Tipo}`;

            button.addEventListener('click', () => {
                onBuffSelectedCallback(buff);
            });

            containerB.append(textoraridade);
            containerB.appendChild(buff.imagem);
            containerB.appendChild(button);
            buffContainerElement.appendChild(containerB);
        });
    }
}