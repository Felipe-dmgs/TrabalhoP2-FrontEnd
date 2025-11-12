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
        this._Life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character{
    constructor(name){
        super(name);
        this.life = 100;
        this.Attack = 10;
        this.Defense = 8;
        this.MaxLife = this.life
    }
}

class Sorcerer extends Character{
    constructor(name){
        super(name);
        this.life = 80;
        this.Attack = 20;
        this.Defense = 3;
        this.MaxLife = this.life
    }
}


class LittleMonster extends Character{
    constructor(){
        super("Little Monster")
        this.life = 40;
        this.Attack = 4;
        this.Defense = 4;
        this.MaxLife = this.life
    }
}

class BigMonster extends Character{
    constructor(){
        super("Big Monster")
        this.life = 120;
        this.Attack = 20;
        this.Defense = 10;
        this.MaxLife = this.life
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

    render() {
        this.listEL.innerHTML = "";
        for (let item of this.list){
            this.listEL.innerHTML += `<li class="${item.classP}">${item.msg}</li>`;
        }
    }
}
class Stage {

    constructor(fighter1, fighter2, fighter1EL, fighter2EL, logObject){
        this.fighter1 = fighter1
        this.fighter2 = fighter2
        this.fighter1EL = fighter1EL
        this.fighter2EL = fighter2EL
        this.log = logObject
        this.turno = true;
        this.PlayerDamage = [];
        this.MonsterDamage = [];
        this.MediaDamage = 0;
        this.classPerso = '';
    }

    start(){
        this.update()
        this.fighter1EL.querySelector(".AttackButton").addEventListener("click", () => {
            this.DoAttack(this.fighter1,this.fighter2)
        })
        this.fighter2EL.querySelector(".AttackButton").addEventListener("click", () => {
            this.DoAttack(this.fighter2,this.fighter1)
        })
        this.fighter2EL.querySelector(".AttackButton").disabled = true;
        this.turno = true;
    }

    DoAttack(attacking, attacked){
        if(attacking.life <= 0) { this.log.addMessage("Morto não ataca","System"); return;}
        else if(attacked.life <= 0){this.log.addMessage("Você está atacando um morto","System"); return;}
        let attackFactor = (Math.random() * 2).toFixed(2)
        let defenseFactor = (Math.random() * 2).toFixed(2)
        let damage = attacking.Attack * attackFactor
        let actualDefense = attacked.Defense * defenseFactor
        if(this.turno)
            {
                this.PlayerDamage.push(damage)
                let DanoTotal = this.PlayerDamage.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
                let hits = this.PlayerDamage.length;
                this.MediaDamage = DanoTotal/hits;
                this.classPerso = "heroi";
                this.defesa = "monster";
            }else{
                this.MonsterDamage.push(damage)
                let DanoTotal = this.MonsterDamage.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
                let hits = this.MonsterDamage.length;
                this.MediaDamage = DanoTotal/hits;
                this.classPerso = "monster";
                this.defesa = "heroi";
            }
        if (damage > actualDefense){
            attacked.life -= damage.toFixed(2)
            this.log.addMessage(`${attacking.name} causou ${damage.toFixed(2)} pontos de dano no ${attacked.name}`,`${this.classPerso}`)
            if(damage < this.MediaDamage-10){
                this.log.addMessage(`${attacking.name} é muito fraco e por isso terá uma nova chance`,"System");
                this.DoAttack(attacking,attacked);
                }
        }
        else{
            this.log.addMessage(`${attacked.name} conseguiu defender o ataque de ${attacking.name}`,`${this.defesa}`)
        }
        this.update()
    }

    update(){

        //Player 1
        this.fighter1EL.querySelector(".Name").innerHTML = `${this.fighter1.name} - ${this.fighter1.life} HP`
        let f1pct = (this.fighter1.life/this.fighter1.MaxLife) * 100
        this.fighter1EL.querySelector(".Bar").style.width = `${f1pct}%`

        //Player 2
        this.fighter2EL.querySelector(".Name").innerHTML = `${this.fighter2.name} - ${this.fighter2.life} HP`
        let f2pct = (this.fighter2.life/this.fighter2.MaxLife) * 100
        this.fighter2EL.querySelector(".Bar").style.width = `${f2pct}%`
        // Turno
        if(this.fighter2EL.querySelector(".AttackButton").disabled){this.fighter1EL.querySelector(".AttackButton").disabled = true; this.fighter2EL.querySelector(".AttackButton").disabled = false; this.turno = false;}
        else if(this.fighter1EL.querySelector(".AttackButton").disabled){this.fighter2EL.querySelector(".AttackButton").disabled = true; this.fighter1EL.querySelector(".AttackButton").disabled = false; this.turno = true}
    }
}

