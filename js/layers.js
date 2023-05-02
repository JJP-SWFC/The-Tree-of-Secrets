addLayer("l", {
    name: "mess", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    tooltip() {return "Seemms like maybe you could mess around here..."},
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        num1: new Decimal(1),
        num2: new Decimal(1),
        num3: new Decimal(1),
        num4: new Decimal(1),
        num5: new Decimal(1),
    }},
    color: "#4BDC13", // Can be a function that takes requirement increases into account
    resource: "thingies", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    canReset: false,
    clickables:
    {
        11: {
            display(){return player.l.num1},
            canClick: true,
            onClick(){
                if(player.l.num1.equals(9))
                {
                    player.l.num1 = new Decimal(1)
                }
                else
                {
                    player.l.num1 = player.l.num1.add(1)
                }
            }
        },
        12: {
            display(){return player.l.num2},
            canClick: true,
            onClick(){
                if(player.l.num2.equals(9))
                {
                    player.l.num2 = new Decimal(1)
                }
                else
                {
                    player.l.num2 = player.l.num2.add(1)
                }
            }
        },
        13: {
            display(){return player.l.num3},
            canClick: true,
            onClick(){
                if(player.l.num3.equals(9))
                {
                    player.l.num3 = new Decimal(1)
                }
                else
                {
                    player.l.num3 = player.l.num3.add(1)
                }
            }
        },
        14: {
            display(){return player.l.num4},
            canClick: true,
            onClick(){
                if(player.l.num4.equals(9))
                {
                    player.l.num4 = new Decimal(1)
                }
                else
                {
                    player.l.num4 = player.l.num4.add(1)
                }
            }
        },
        15: {
            display(){return player.l.num5},
            canClick: true,
            onClick(){
                if(player.l.num5.equals(9))
                {
                    player.l.num5 = new Decimal(1)
                }
                else
                {
                    player.l.num5 = player.l.num5.add(1)
                }
            }
        },
        
    },
    tabFormat: [
        "main-display",
        "clickables"
    ],
    update(delta){
        if(player.tab != "l"){
        player.l.points = player.l.points.add(5)
        }
        else{
            player.l.points = player.l.points.add(0.05)
        }
    }
    
        
})

addLayer("s", {
    startData() {return {
        unlocked: true,
        points: new Decimal(0),
        clicks:new Decimal(0),
        ts: false,
        hr: false,
        found: false,
    }},
symbol() {return "S"},
position: 1,
tooltip(){return "Secrets"},
    color: "#ffff00",
    resource: "Secrets",
    row: "side",


    requires(){
        return new Decimal(10).tetrate(1e300)},
    
    type: "none",
    exponent: 3,
    gainMult() {
        let gain = new Decimal(1)
        return gain
    },
    gainExp() {
        let gain = new Decimal(1)
        return gain
    },
    achievements: {
        11: {
            name: "Waste of time?",
            done(){return player.s.clicks.gte(20)},
            tooltip(){return (hasAchievement("s",11) ? "Click the useless button 50 times": "???")},
            onComplete(){
                player.s.points = player.s.points.add(1)
                doPopup("achievement", "Waste of time?", "Secret Found!",3, tmp["s"].color)
            },
        },
        12: {
            name: "Changing things up",
            done(){return player.s.ts == true},
            tooltip(){return (hasAchievement("s",12) ? "Go aqua mode!": "???")},
            onComplete(){
                doPopup("achievement", "Changing things up", "Secret Found!",3, tmp["s"].color)
                player.s.points = player.s.points.add(1)
            },
        },
        13: {
            name: "Almost a disaster",
            done(){return player.s.hr == true},
            tooltip(){return (hasAchievement("s",13) ? "You almost hard reset :(": "???")},
            onComplete(){
                player.s.points = player.s.points.add(1)
                doPopup("achievement", "Almost a disaster", "Secret Found!",3, tmp["s"].color)
            }
        },
        14: {
            name: "Math or Maths?",
            done(){
                if(player.l.num1.equals(3) && player.l.num2.equals(1) && player.l.num3.equals(4) && player.l.num4.equals(1) && player.l.num5.equals(5))
                {
                    return true
                }
            },
            tooltip(){return (hasAchievement("s",14) ? "Make the digits of pi with the clickables": "???")},
            onComplete(){
                doPopup("achievement", "Math or Maths?", "Secret Found!",3, tmp["s"].color)
                player.s.points = player.s.points.add(1)
            }
        },
        15: {
            name: "Probably could've hidden it better",
            done(){return player.s.found == true},
            tooltip(){return (hasAchievement("s",15) ? "Find the hidden button in the settings": "???")},
            onComplete(){
                doPopup("achievement", "Probably could've hidden it better", "Secret Found!",3, tmp["s"].color)
                player.s.points = player.s.points.add(1)
            }
        },
        16: {
            name: "A Watched Pot Never Boils",
            done(){return player.l.points.gte(2500)},
            tooltip(){return (hasAchievement("s",16) ? "Get 1000 thingies by not watching them": "???")},
            onComplete(){
                doPopup("achievement", "A Watched Pot Never Boils", "Secret Found!",3, tmp["s"].color)
                player.s.points = player.s.points.add(1)
            },
        },
        17: {
            name: "I thought it looked a bit odd...",
            done(){return player.points.gte(1)},
            tooltip(){return (hasAchievement("s",17) ? "Get 1 point by clicking on it": "???")},
            onComplete(){
                doPopup("achievement", "I thought it looked a bit odd...", "Secret Found!",3, tmp["s"].color)
                player.s.points = player.s.points.add(1)
            }
        }
    },
    clickables: {
        11: {
            display() {return "Does nothing, but shows your clicks: " + player.s.clicks},
            canClick() {return true},
            onClick(){player.s.clicks = player.s.clicks.add(1)},

            },
        },
    achievementPopups: false,
},)

addLayer("credits", {
    symbol: "C",
    startData() {return {
        unlocked: true,
    }},
    infoboxes :{
        ideas: {
            title: "Ideas",
            body: "Thank you to the following people who have given me ideas that I have then used",
        },
        players: {
            title: "Feedback",
            body: "Thank you to the following people who have given me helpful feedback on the game",
        }
    },
    row: "side",
    position: 2,
    tabFormat: [
        ["infobox", "ideas"],
        ["raw-html", "<h2><b>Acamaeda</b></h2> - Inspired 2 of the achievements"],
        ["raw-html","<br><br><br><br>"],
        ["infobox", "players"],
        ["raw-html", ""]
    ],
    tooltip: "Credits",
})
